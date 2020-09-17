import { request } from "@octokit/request";
// import { ReposGetBranchResponseData } from "@octokit/types";

import { Partner } from "../../data/types";
import { equals } from "../../util";
import { REPO_NAME, REPO_ORG } from "../../util/constants";

import { GitCreateTreeTreeItem, PartnerTableData } from "./types";
import { calculatePartnerSearchValue } from "./utils";

const orgName = REPO_ORG;
const repoName = REPO_NAME;

/**
 * Some nice global state for the parent of the next commit when `saveChanges` is called
 */
let parents: { commit: string; tree: string } | undefined;
let token: string | undefined;
let authenticatedUser: string | undefined;
let committingUser: string | undefined = localStorage.getItem( "committingUser" ) || undefined;

const defaultArgs = () => ( {
   owner: orgName,
   repo: repoName,
   headers: {
      authorization: token == null ? undefined : `token ${token}`,
      accept: "application/json",
   },
} );

export const getAuthenticatedUserName = () => authenticatedUser;
export const getCommittingUserName = () => committingUser;

export const setToken = async ( authToken?: string, user?: string ) => {
   token = authToken;
   if( token == null ) {
      authenticatedUser = undefined;
      localStorage.removeItem( "token" );
      localStorage.removeItem( "committingUser" );
      return true;
   } else {
      try {
         const r = await request( "GET /user", { ...defaultArgs() } );
         // console.log( "setToken", r );
         authenticatedUser = "@" + r.data.login;
         localStorage.setItem( "token", token );
         if( user !== undefined ) {
            localStorage.setItem( "committingUser", user );
         }
         return true;
      } catch {
         return false;
      }
   }
};

export const loadPartnerData = async ( progress: ( message: string, progress: number ) => void = () => ( {} ), type: "Loading" | "Refreshing" = "Loading" ): Promise<PartnerTableData[]> => {

   progress( `${type} user`, 0.1 );
   await setToken( localStorage.getItem( "token" ) || undefined );

   const master = await request( "GET /repos/:owner/:repo/branches/:branch", {
      ...defaultArgs(),
      branch: "master",
   } );

   progress( `${type} partner data`, 0.2 );
   // get the partner list data from the master branch
   const masterTreeSha = master.data.commit.commit.tree.sha;
   const masterTree = await getTree( masterTreeSha, true );
   let partners: Partner[] = [];
   for( let item of masterTree.data.tree ) {
      if( item.path === "site/src/data/PartnerList.json" ) {
         const partnersJson = await getBlob( item.sha );
         partners = JSON.parse( atob( partnersJson.data.content ) );
         break;
      }
   }
   // console.log( masterTree.data );

   progress( `${type} changes`, 0.6 );
   let modifiedPartners: Partner[] = [];
   // get the partner data from the partner updates branch and calculate the diff
   try {
      const branch = await request( "GET /repos/:owner/:repo/branches/:branch", {
         ...defaultArgs(),
         branch: "partner-updates",
      } );
      parents = {
         commit: branch.data.commit.sha,
         tree: branch.data.commit.commit.tree.sha,
      };
      const branchTreeSha = branch.data.commit.commit.tree.sha;
      const branchTree = await getTree( branchTreeSha, true );
      let branchPartners: Partner[] = [];
      for( let item of branchTree.data.tree ) {
         if( item.path === "site/src/data/PartnerList.json" ) {
            const partnersJson = await getBlob( item.sha );
            branchPartners = JSON.parse( atob( partnersJson.data.content ) );
            break;
         }
      }
      // find modified and new partners since master
      for( let partner of branchPartners ) {
         const match = partners.find( y => y.partnerId === partner.partnerId );
         if( match == null || !equals( partner, match ) ) {
            modifiedPartners.push( partner );
         }
      }
      // console.log( branchTree.data, "modifiedPartners", modifiedPartners );
   } catch {
      // no-op. Branch doesn't exist. We'll just create it on commit.
   }
   progress( `${type} partner data`, 1 );

   return partners.map( x => ( {
      master: x,
      search: calculatePartnerSearchValue( x ),
      branch: modifiedPartners.find( y => y.partnerId === x.partnerId ),
   } ) );
};

export const getCommit = async ( sha: string ) => {
   return await request( "GET /repos/:owner/:repo/git/commits/:commit_sha", {
      ...defaultArgs(),
      commit_sha: sha,
   } );
};

export const getTree = async ( sha: string, recursive: boolean = false ) => {
   return await request( "GET /repos/:owner/:repo/git/trees/:tree_sha", {
      ...defaultArgs(),
      tree_sha: sha,
      recursive: recursive + "",
   } );
};

export const getBlob = async ( sha: string ) => {
   return await request( "GET /repos/:owner/:repo/git/blobs/:file_sha", {
      ...defaultArgs(),
      file_sha: sha,
   } );
};

export const createBlobFromJson = async ( json: string ): Promise<string> => {
   // console.log( "createBlobFromJson", json );
   const result = await request( "POST /repos/:owner/:repo/git/blobs", {
      ...defaultArgs(),
      content: json,
      encoding: "utf-8",
   } );
   // console.log( "createBlobFromJson", result );
   return result.data.sha;
};

/**
 * Create a new blob whose bytes will be the provided base-64-encoded string
 * @param base64 Base64-encoded binary data
 * @returns THe SHA of the new blob
 */
export const createBlobFromBase64 = async ( base64: string ): Promise<string> => {
   // console.log( "createBlobFromBase64", base64 );
   const result = await request( "POST /repos/:owner/:repo/git/blobs", {
      ...defaultArgs(),
      content: base64,
      encoding: "base64",
   } );
   // console.log( "createBlobFromBase64", result );
   return result.data.sha;
};

export const modifyTree = async ( tree: GitCreateTreeTreeItem[], baseTreeHash: string ) => {
   // console.log( "modifyTree", tree );
   const result = await request( "POST /repos/:owner/:repo/git/trees", {
      ...defaultArgs(),
      tree: tree,
      base_tree: baseTreeHash,
   } );
   // console.log( "modifyTree", result );
   return result.data.sha;
};

export const getBlobInTree = async ( treeSha: string, path?: string ) => {
   let tree = await getTree( treeSha );
   if( path == null || path.trim() === "" ) {
      return tree;
   }

   const paths = path.split( "/" ).reverse();
   while( paths.length > 0 ) {
      path = paths.pop();
      for( let item of tree.data.tree ) {
         if( item.path === path ) {
            if( item.type === "tree" ) {
               tree = await getTree( item.sha );
            } else if( item.type === "blob" ) {
               return getBlob( item.sha );
            }
            break;
         }
      }
   }

   throw new Error( `Unable to find file ${path} in tree with SHA ${treeSha}` );
};

export const createCommmit = async ( treeHash: string, parentHash: string ): Promise<[hash: string, commitMessage: string]> => {
   const commitMessage = "Partner updates " + new Date( Date.now() ).toISOString() + ( committingUser !== undefined ? " by " + committingUser : "" );
   const result = await request( "POST /repos/:owner/:repo/git/commits", {
      ...defaultArgs(),
      message: commitMessage,
      tree: treeHash,
      parents: [parentHash],
   } );
   // console.log( "createCommmit", result );
   return [result.data.sha, commitMessage];
};

export const updateBranch = async ( commitHash: string, branchName: string ) => {
   const result = await request( "PATCH /repos/:owner/:repo/git/refs/:ref", {
      ...defaultArgs(),
      ref: `heads/${branchName}`,
      sha: commitHash,
   } );
   // console.log( "updateBranch", result );
   return result.data.object.sha;
};

export const saveChanges = async ( newData: PartnerTableData[], progress: ( message: string, progress: number ) => void = () => ( {} ) ) => {
   const parent = parents;
   if( parent == null ) {
      throw new Error( "Call init first" );
   }

   progress( "Uploading images", 0.1 );
   const partners = newData
      // get the most up-to-date changes
      .map( x => x.local !== undefined ? x.local : x.branch !== undefined ? x.branch : x.master )
      // make sure properties are in correct order
      .map( x => ( {
         partnerId: x.partnerId,
         name: x.name,
         isFoundingPartner: x.isFoundingPartner,
         additionalVanityUrls: x.additionalVanityUrls,
         logo: x.logo,
         logoIsDark: x.logoIsDark,
         logoAppearsOnLandingPage: x.logoAppearsOnLandingPage,
         excludeFromPartnerList: x.excludeFromPartnerList,
         optUserOutOfChase: x.optUserOutOfChase,
         customSignupFormField: x.customSignupFormField,
      } ) )
      // and sort by partnerId
      .sort( ( l, r ) => l.partnerId.toLowerCase() > r.partnerId.toLowerCase() ? 1 : -1 );

   // pull out any new images and upload them
   let images = partners.filter( x => x.logo?.startsWith( "data:" ) );
   let imageHashes: GitCreateTreeTreeItem[] = [];
   let count = 1;
   for( let partner of images ) {
      progress( `Uploading image ${count} of ${images.length}`, 0.1 + ( 0.5 * ( ( count - 1 ) / images.length ) ) );
      imageHashes.push( {
         sha: await createBlobFromBase64( partner.logo!.replace( "data:image/png;base64,", "" ).replace( "data:image/jpg;base64,", "" ) ),
         path: "site/public/assets/images/partners/" + partner.partnerId.toLowerCase() + ( partner.logo!.startsWith( "data:image/png" ) ? ".png" : ".jpg" ),
         mode: "100644",
         type: "blob",
      } );
      count += 1;
   }

   progress( "Uploading partner JSON", 0.6 );
   const partnerJsonHash = await createBlobFromJson( JSON.stringify(
      partners.map( x => x.logo?.startsWith( "data:" )
         ? {
            ...x,
            logo: x.partnerId.toLowerCase() + ( x.logo.startsWith( "data:image/png" ) ? ".png" : ".jpg" ),
         }
         : x ),
      undefined,
      3 ) );

   progress( "Creating new commit", 0.8 );
   const treeHash = await modifyTree( [
      {
         sha: partnerJsonHash,
         type: "blob",
         mode: "100644",
         path: "site/src/data/PartnerList.json",
      },
      ...imageHashes,
   ], parent.tree );

   progress( "Creating new commit", 0.85 );
   const [commitHash, commitMessage] = await createCommmit( treeHash, parent.commit );

   progress( "Updating branch", 0.9 );
   // make sure there is a PR, but don't error if it fails since we can easily do this manually
   try {
      await request( "POST /repos/:owner/:repo/pulls", {
         ...defaultArgs(),
         title: commitMessage,
         head: "partner-updates",
         base: "master",
         body: "This PR was created by the partner editor tool",
      } );
   } catch( e ) {
      // the PR probably already exists
      console.log( "This is probably not an error", e );
   }

   progress( "Updating branch", 0.95 );
   const newHead = await updateBranch( commitHash, "partner-updates" );

   progress( "Changes saved", 1 );
   parents = {
      commit: newHead,
      tree: treeHash,
   };
};
