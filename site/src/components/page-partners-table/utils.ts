import { Partner } from "../../data/types";
import { equals } from "../../util";

import { PartnerTableData } from "./types";

export const calculatePartnerSearchValue = ( partner: Partner ) => {
   return partner.partnerId.toLowerCase() + "|" + partner.name.toLowerCase() + "|" + ( partner.additionalVanityUrls?.map( y => y.toLowerCase() )?.join( "|" ) || "" );
};

/**
 * Try to ge tthe first non-null of local and branch, then default to master
 */
export const getLatest = ( partner: PartnerTableData ): Partner => {
   const { local, branch, master } = partner;
   return local !== undefined ? local : branch !== undefined ? branch : master;
};

export const getField = <T extends keyof Partner>( partner: PartnerTableData, field: T ): Partner[T] => {
   return getLatest( partner )[field];
};

export const isModified = ( partner: PartnerTableData ): boolean => {
   const { local, branch } = partner;
   return local !== undefined || branch !== undefined;
};

/**
 * Return `true` if the given field differs from master, either locally or in the committed branch.
 */
export const isFieldModified = <T extends keyof Partner>( partner: PartnerTableData, field: T ): boolean => {
   const { local, branch, master } = partner;
   return ( local !== undefined && !equals( local[field], master[field] ) )
      // if there is a local change and it equals master but doesn't equal the branch, then we're essentially reverting something in the branch
      || ( local === undefined && branch !== undefined && !equals( branch[field], master[field] ) );
};

/**
 * Return `true` if the local changes differ from either the branch or master (unless `masterOnly` is `true` then it will just check the branch)
 */
export const isFieldModifiedLocally = <T extends keyof Partner>( partner: PartnerTableData, field: T, masterOnly: boolean = false ): boolean => {
   const { local, branch, master } = partner;
   if( local === undefined ) {
      return false;
   }
   return !equals( local[field], master[field] ) || ( !masterOnly && branch !== undefined && !equals( local[field], branch[field] ) );
};

/**
 * Return `true` if the committed changes to the partner-updates branch differ from master
 */
export const isModifiedInBranch = <T extends keyof Partner>( partner: PartnerTableData, field: T ): boolean => {
   const { branch, master } = partner;
   return ( branch !== undefined && !equals( branch[field], master[field] ) );
};

export const findDuplicates = ( partners: PartnerTableData[], partnerId: string ) => {
   const normalizedPartnerId = partnerId.toLowerCase();
   const existing = partners.find( x => {
      // partnerId can't change so make sure we check the latest info to catch newly added but unsaved entries too
      const data = getLatest( x );
      return data.partnerId.toLowerCase() === normalizedPartnerId
         || data.additionalVanityUrls?.find( y => y.toLowerCase() === normalizedPartnerId ) != null;
   } );
   return existing;
};