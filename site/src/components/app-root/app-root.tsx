import { Component, FunctionalComponent, h, State } from "@stencil/core";
import { Components } from "@stencil/router";

import { FaqData, PartnerList, Social } from "../../data";
import { Partner } from "../../data/PartnerList";
import getParams from "../../util/getParams";

type NavProps = {
   onSelectNavItem?: () => void,
   formPath: string,
   partnerId?: string,
};

const Nav: FunctionalComponent<NavProps> = ( { onSelectNavItem, formPath, partnerId } ) => (
   <nav aria-label="Main">
      <ul>
         <li>
            <stencil-route-link url={`/${formPath}#form`} onClick={onSelectNavItem}>Sign Up</stencil-route-link>
         </li>
         <li>
            <stencil-route-link url="/about" onClick={onSelectNavItem}>About</stencil-route-link>
         </li>
         <li>
            <stencil-route-link url="/faq" onClick={onSelectNavItem}>FAQ</stencil-route-link>
         </li>
         <li>
            <stencil-route-link
               url={`/partners${partnerId != null ? "#" + partnerId : ""}`}
               urlMatch={["/partners", "/partners#*"]}
               onClick={onSelectNavItem}
            >Partners</stencil-route-link>
         </li>
         <li>
            <stencil-route-link url="/contact" onClick={onSelectNavItem}>Contact</stencil-route-link>
         </li>
      </ul>
   </nav>
);

const RenderRoutes: FunctionalComponent<{ routes: Partial<Components.StencilRoute>[], partnerId?: string }> = ( { routes, partnerId } ) => (
   <stencil-router>
      <stencil-route-switch scrollTopOffset={1}>
         {routes.map( route => {
            // add partnerId to all components
            route = {
               ...route,
               componentProps: {
                  ...route.componentProps,
                  partnerId,
               },
            };
            return ( <stencil-route {...route} /> );
         } )}
      </stencil-route-switch>
   </stencil-router>
);

const SIGNUP_PATH: string = "signup";

@Component( {
   tag: "app-root",
   styleUrl: "app-root.scss",
   shadow: false,
} )
export class AppRoot {

   @State() private menuIsActive: boolean;

   /**
    * The source value from ether the URL (https://powerthepolls.org/partnerId) or querystring (https://powerthepolls.org/?source=aflcio)
    */
   private source?: { value: string, partner: Partner | null };
   private routes: Partial<Components.StencilRoute>[];

   constructor() {
      this.menuIsActive = false;

      // help out development by logging an explicit error if you forgot to copy dot_env to .env or to add SMARTY_STREETS_KEY env var in the production build
      let env = `process.env.SMARTY_STREETS_KEY`; // will be `"the-correct-key"` if replaced by the build as intended
      if( env === "process" + ".env.SMARTY_STREETS_KEY" || env === `""` ) {
         // if env var wasn't replaced at all or was replaced with a null/empty value, log an error
         console.error( "SMARTY_STREETS_KEY environment variable not present during build. Cannot continue." );
      }
      const smartyStreetsApiKey = process.env.SMARTY_STREETS_KEY/*replaced with correct value by build*/;

      // maps to stencil-route components, we need to be able to lookup these URLs in code as well
      this.routes = [
         {
            url: "/about",
            component: "page-about",
         },
         {
            url: "/contact",
            component: "page-contact",
         },
         {
            url: "/faq",
            component: "page-faq",
            componentProps: {
               data: FaqData,
            },
         },
         {
            url: "/partners",
            component: "page-partners",
            componentProps: {
               partners: PartnerList,
            },
         },
         {
            url: "/privacy",
            component: "page-privacy",
         },
         {
            url: "/search",
            component: "page-search",
            componentProps: {
               smartyStreetsApiKey: smartyStreetsApiKey,
            },
         },
         {
            url: "/redirector",
            component: "page-redirector",
         },
         {
            url: "/jurisdiction/:id",
            component: "page-jurisdiction",
         },
         {
            url: "/dev",
            component: "component-list",
         },
         {
            component: "page-form",
            componentProps: {
               smartyStreetsApiKey: smartyStreetsApiKey,
            },
         },
      ];
   }

   public connectedCallback() {
      // see if this is a partner link, e.g., https://powerthepolls.org/aflcio
      const paths = document.location.pathname.split( "/" ).filter( x => x !== "" );
      const urlParam = paths.length > 0 && !this.isNavRoute( paths[0] ) ? paths[0] : "";
      const queryStringParam = getParams()?.source;
      const partnerIdMatch = urlParam.toLowerCase() || queryStringParam?.toLowerCase();
      const partner = urlParam != null
         ? ( PartnerList.filter(
            p => ( p.vanityUrls && p.vanityUrls.filter( x => x.toLowerCase() === partnerIdMatch ).length > 0 ) || p.partnerId.toLowerCase() === partnerIdMatch,
         ) || [null] )[0]
         : null;

      // get the partnerID from the partner parsed out of the URL (if any), else see if there is a source querystring are and use that, exactly, as the partner ID
      if( partner != null && queryStringParam != null && partner?.partnerId !== queryStringParam ) {
         console.warn( `Error. Partner ID conflict:`, partner?.partnerId, queryStringParam );
      }

      const source = ( partner != null ? urlParam : null ) || queryStringParam;
      this.source = source == null ? undefined : {
         value: source,
         partner: partner,
      };

      // if there is a URL path included that isn't a valid partner, change URL to /signup so there is no question that the partnerID will not be included in the form
      if( partner == null && urlParam !== "" && urlParam !== SIGNUP_PATH ) {
         window.history.replaceState( {}, "", "/" + SIGNUP_PATH );
      } else if( partner != null ) {
         // if the source querystring param was used, remove it if we've matched a partner
         if( queryStringParam != null && paths.length > 0 && this.isNavRoute( paths[0] ) ) {
            window.history.replaceState( {}, "", "/" + paths[0] + "#" + partner.partnerId );
         } else {
            // else we've matched on a partner, so make sure their URL is normalized
            if( ( partner.vanityUrls && partner.vanityUrls.filter( x => x === urlParam ).length === 0 ) || ( partner.vanityUrls == null && urlParam !== partner.partnerId ) ) {
               window.history.replaceState( {}, "", "/" + ( partner.vanityUrls != null ? partner.vanityUrls[0] : partner.partnerId ) );
            }
         }
      }
   }

   public render() {
      const social = Social;
      const { source } = this;
      // get the proper path to the signup form considering the incoming partner or source
      const formPath = source == null ? SIGNUP_PATH
         : source.partner == null
            // if source is not a partner, use the source value directly
            ? SIGNUP_PATH + "?source=" + source.value
            // else use the partner's vanity URL or partner ID
            : ( source.partner.vanityUrls != null && source.partner.vanityUrls.length > 0 ? source.partner.vanityUrls[0] : source.partner.partnerId );

      const toggleMenu = () => {
         this.menuIsActive = !this.menuIsActive;
      };

      return (
         <div class="container">
            <a class="u_visually-hidden" href="#main-content">Skip to main content</a>

            <aside class="sidebar">
               <div class="container">
                  <h1>
                     <stencil-route-link url={"/" + ( source == null ? "" : formPath )}>
                        <img
                           class="logo"
                           alt="Power the Polls"
                           src="/assets/images/logo-blue.svg"
                        />
                     </stencil-route-link>
                  </h1>
                  <Nav
                     formPath={formPath}
                     partnerId={this.source?.partner?.partnerId}
                  />
                  {social.map( service => <social-share {...service} /> )}
               </div>
            </aside>

            <main>
               <div class={{
                  "mobile-menu": true,
                  "is-active": this.menuIsActive,
               }}>
                  <div class="header">
                     <h1>
                        <stencil-route-link
                           url={"/" + ( source == null ? "" : formPath )}
                           onClick={() => this.menuIsActive = false}
                        >
                           <img
                              style={{ display: ( this.menuIsActive ? "none" : "block" ) }}
                              alt="Power the Polls"
                              src="/assets/images/icon-white.svg"
                              width="25"
                           />
                           <img
                              style={{ display: ( this.menuIsActive ? "block" : "none" ) }}
                              alt="Power the Polls"
                              src="/assets/images/icon-blue.svg"
                              width="25"
                           />
                        </stencil-route-link>
                     </h1>
                     <button
                        class={{
                           "hamburger": true,
                           "hamburger--spin": true,
                           "is-active": this.menuIsActive,
                        }}
                        type="button"
                        onClick={toggleMenu}
                        aria-label="Show navigation menu"
                     >
                        <span class="hamburger-box"><span class="hamburger-inner"></span></span>
                     </button>
                  </div>
                  <Nav
                     onSelectNavItem={toggleMenu}
                     formPath={formPath}
                     partnerId={this.source?.partner?.partnerId}
                  />
               </div>
               <div
                  class="container"
                  id="main-content"
                  tabindex="-1"
               >
                  <RenderRoutes
                     routes={this.routes}
                     partnerId={this.source?.partner?.partnerId}
                  />

                  <footer>
                     <p>This work is licensed under a&nbsp;
                        <a
                           href="https://creativecommons.org/licenses/by/4.0/"
                           target="_blank"
                           rel="noopener"
                        >
                           Creative Commons Attribution 4.0 International License.
                        </a>
                     </p>
                     <p>Powered by Work Elections.</p>
                     <p>
                        <a
                           href="https://www.workelections.com/"
                           target="_blank"
                           rel="noopener"
                        >
                           <img
                              src="/assets/images/partners/work-elections.png"
                              alt="Work Elections"
                              width="100"
                           />
                        </a>
                     </p>
                  </footer>
               </div>
            </main>
         </div>
      );
   }

   /**
    * Returns `true` if the provided `path` is one of the app's nav routes (e.g., /partners, /contact etc). This will check
    * with and without a leading '/' so you don't need to add or trim it.
    */
   private isNavRoute( path: string ) {
      return this.routes.filter( x => x.url === path || x.url === "/" + path ).length > 0;
   }
}
