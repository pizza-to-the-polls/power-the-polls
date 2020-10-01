import { Component, FunctionalComponent, h, State } from "@stencil/core";

import { FaqData, FaqESData, PartnerList, Social } from "../../data";
import { Partner } from "../../data/types";
import { parseQueryString, shuffle } from "../../util";

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
            <stencil-route-link
               url="/faq-contact"
               urlMatch={["/faq", "/faq-es", "/contact", "/faq-contact"]}
               onClick={onSelectNavItem}
            >FAQ & Contact</stencil-route-link>
         </li>
         <li>
            <stencil-route-link
               url={`/partners${partnerId != null ? "#" + partnerId : ""}`}
               urlMatch={["/partners", "/partners#*"]}
               onClick={onSelectNavItem}
            >Partners</stencil-route-link>
         </li>
      </ul>
   </nav>
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
   /**
    * Routes for app.
    * > Type is a simplified form of `Components.StencilRoute` from `@stencil/router`
    */
   private routes: {
      component: string;
      componentProps?: { [key: string]: any };
      exact?: boolean;
      url?: string;
   }[];

   constructor() {
      this.menuIsActive = false;

      // maps to stencil-route components, we need to be able to lookup these URLs in code as well
      this.routes = [
         {
            url: "/about",
            component: "page-about",
         },
         {
            url: "/faq-contact",
            component: "page-faq",
            componentProps: {
               data: FaqData,
               page_title: "Frequently Asked Questions about Poll Working",
            },
         },
         {
            // legacy route
            url: "/contact",
            component: "page-faq",
            componentProps: {
               data: FaqData,
               page_title: "Frequently Asked Questions about Poll Working",
            },
         },
         {
            // legacy route
            url: "/faq",
            component: "page-faq",
            componentProps: {
               data: FaqData,
               page_title: "Frequently Asked Questions about Poll Working",
            },
         },
         {
            url: "/faq-es",
            component: "page-faq",
            componentProps: {
               data: FaqESData,
               page_title: "Preguntas más frecuentes",
            },
         },
         {
            url: "/partners",
            component: "page-partners",
            componentProps: {
               partners: shuffle( PartnerList ),
            },
         },
         {
            // FYI this is short-circuited and rendered as the entire page, not used in the router switch
            url: "/partners-table",
            component: "page-partners-table",
         },
         {
            url: "/privacy",
            component: "page-privacy",
         },
         {
            url: "/search",
            component: "page-search",
         },
         {
            url: "/redirector",
            component: "page-info",
         },
         {
            url: "/info",
            component: "page-info",
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
         },
      ];
   }

   public connectedCallback() {
      // see if this is a partner link, e.g., https://powerthepolls.org/aflcio
      const path = document.location.pathname.split( "/" ).filter( x => x !== "" );
      const isNavRoute = path.length > 0 && this.isNavRoute( path[0] );
      const urlParam = path.length > 0 && !isNavRoute ? path[0] : "";
      // we also allow manually specifying a source value in the querystring
      const queryStringParam = parseQueryString()?.source;
      const partnerIdMatch = urlParam.toLowerCase() || queryStringParam?.toLowerCase();
      const partner = partnerIdMatch != null
         ? ( PartnerList.filter(
            p => ( p.additionalVanityUrls && p.additionalVanityUrls.filter( x => x.toLowerCase() === partnerIdMatch ).length > 0 ) || p.partnerId.toLowerCase() === partnerIdMatch,
         ) || [null] )[0]
         : null;

      // get the partnerID from the partner parsed out of the URL (if any), else see if there is a source querystring are and use that, exactly, as the partner ID
      if( partner != null && queryStringParam != null && partner?.partnerId !== queryStringParam ) {
         console.warn( `Error. Partner ID conflict:`, partner?.partnerId, queryStringParam );
      }

      // if the partner matched, use the exact urlParam as the source value (exact casing and all) the partnerId should be used in most cases though
      const source = ( partner != null ? urlParam : null ) || queryStringParam;
      this.source = source == null ? undefined : {
         value: source,
         partner: partner,
      };

      // if there is a URL path included that isn't a valid partner, change URL to /signup so there is no question that the partnerID will not be included in the form
      if( partner == null && urlParam !== "" && urlParam !== SIGNUP_PATH ) {
         window.history.replaceState( {}, "", "/" + SIGNUP_PATH );
      } else if( partner != null ) {
         // if we matched the source querystring param to a partner, redirect to their vanity URL
         if( queryStringParam != null && path.length > 0 && isNavRoute ) {
            window.history.replaceState( {}, "", "/" + path[0] + "#" + partner.partnerId );
         } else {
            // else we've matched the partner on their vanity URL, so make sure it is normalized in case and URL type (vanity vs partnerId)
            if( ( partner.additionalVanityUrls && partner.additionalVanityUrls.filter( x => x === urlParam ).length === 0 ) || urlParam !== partner.partnerId ) {
               window.history.replaceState( {}, "", "/" + ( partner.additionalVanityUrls != null ? partner.additionalVanityUrls[0] : partner.partnerId ) );
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
            : ( source.partner.additionalVanityUrls != null && source.partner.additionalVanityUrls.length > 0 ? source.partner.additionalVanityUrls[0] : source.partner.partnerId );

      const toggleMenu = () => {
         this.menuIsActive = !this.menuIsActive;
      };

      // short-circuit for the partners table
      if( document.location.pathname.split( "/" ).filter( x => x !== "" )[0] === "partners-table" ) {
         return <page-partners-table />;
      }

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
                  {social.map( service => <ui-social-share {...service} /> )}
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
                     <ui-menu-button
                        isActive={this.menuIsActive}
                        onToggle={( e ) => {
                           window.location.hash = "";
                           toggleMenu();
                           e.preventDefault();
                        }}
                        label="Show navigation menu"
                     />
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

                  <stencil-router>
                     <stencil-route-switch scrollTopOffset={1}>
                        {this.routes.map( route => {
                           return ( <stencil-route {...{
                              ...route,
                              componentProps: {
                                 ...route.componentProps,
                                 // Add partnerId to props of all components. If no found partner, use whatever source was given.
                                 partnerId: this.source?.partner?.partnerId || source?.value,
                              },
                           }} /> );
                        } )}
                     </stencil-route-switch>
                  </stencil-router>

                  <footer>
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
    * Returns `true` if the provided `firstPathSection` is one of the app's nav routes (e.g., /partners ).
    * This will check with and without a leading '/' so you don't need to add or trim it.
    */
   private isNavRoute( firstPathSection: string ) {
      return this.routes.filter( x => x.url && x.url.split( "/" ).filter( y => y !== "" )[0] === firstPathSection ).length > 0;
   }
}
