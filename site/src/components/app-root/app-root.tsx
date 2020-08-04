import { Component, FunctionalComponent, h, State } from "@stencil/core";

import { FaqData, PartnerList, Social } from "../../data";

const Nav: FunctionalComponent<{ onClick?: () => void }> = ( { onClick } ) => (
   <nav>
      <ul>
         <li>
            <stencil-route-link url="/signup" onClick={onClick}>Sign Up</stencil-route-link>
         </li>
         <li>
            <stencil-route-link url="/about" onClick={onClick}>About</stencil-route-link>
         </li>
         <li>
            <stencil-route-link url="/faq" onClick={onClick}>FAQ</stencil-route-link>
         </li>
         <li>
            <stencil-route-link url="/partners" onClick={onClick}>Partners</stencil-route-link>
         </li>
         <li>
            <stencil-route-link url="/contact" onClick={onClick}>Contact</stencil-route-link>
         </li>
      </ul>
   </nav>
);

@Component( {
   tag: "app-root",
   styleUrl: "app-root.scss",
   shadow: false,
} )
export class AppRoot {

   @State() private menuIsActive: boolean;

   constructor() {
      this.menuIsActive = false;
   }

   public render() {
      const social = Social;
      const faqData = FaqData;
      const partnerList = PartnerList;

      // help out development by logging an explicit error if you forgot to copy dot_env to .env or to add SMARTY_STREETS_KEY env var in the production build
      let env = `process.env.SMARTY_STREETS_KEY`; // will be `"the-correct-key"` if replaced by the build as intended
      if( env === "process" + ".env.SMARTY_STREETS_KEY" || env === `""` ) {
         // if env var wasn't replaced at all or was replaced with a null/empty value, log an error
         console.error( "SMARTY_STREETS_KEY environment variable not present during build. Cannot continue." );
      }

      const clickMenu = () => {
         this.menuIsActive = !this.menuIsActive;
      };

      return (
         <div class="container">
            <aside class="sidebar">
               <div class="container">
                  <h1>
                     <stencil-route-link url="/">
                        <img
                           class="logo"
                           alt="Power the Polls"
                           src="assets/images/logo-blue.svg"
                        />
                     </stencil-route-link>
                  </h1>
                  <Nav />
                  {social.map( service => <social-share {...service} /> )}
               </div>
            </aside>

            <main>
               <div class={"mobile-menu" + ( this.menuIsActive ? " is-active" : "" )}>
                  <div class="header">
                     <img
                        style={{ display: ( this.menuIsActive ? "none" : "block" ) }}
                        alt="Power the Polls"
                        src="assets/images/icon-white.png"
                        width="25"
                     />
                     <img
                        style={{ display: ( this.menuIsActive ? "block" : "none" ) }}
                        alt="Power the Polls"
                        src="assets/images/icon-blue.png"
                        width="25"
                     />
                     <button class={"hamburger hamburger--spin" + ( this.menuIsActive ? " is-active" : "" )} type="button" onClick={clickMenu}>
                        <span class="hamburger-box">
                           <span class="hamburger-inner"></span>
                        </span>
                     </button>
                  </div>
                  <Nav onClick={clickMenu} />
               </div>
               <div class="container">
                  <stencil-router>
                     <stencil-route-switch scrollTopOffset={1}>
                        <stencil-route
                           url="/about"
                           component="page-about"
                        />
                        <stencil-route
                           url="/contact"
                           component="page-contact"
                        />
                        <stencil-route
                           url="/faq"
                           component="page-faq"
                           componentProps={{ data: faqData }}
                        />
                        <stencil-route
                           url="/partners"
                           component="page-partners"
                           componentProps={{ partners: partnerList }}
                        />
                        <stencil-route
                           url="/privacy"
                           component="page-privacy"
                        />
                        <stencil-route
                           url="/dev"
                           component="component-list"
                        />
                        <stencil-route
                           component="page-form"
                           componentProps={{
                              smartyStreetsApiKey: process.env.SMARTY_STREETS_KEY/*replaced with correct value by build*/,
                           }}
                        />
                     </stencil-route-switch>
                  </stencil-router>

                  <footer>
                     <p>This work is licensed under a Creative Commons Attribution 4.0 International License.</p>
                     <p>Powered by Work Elections.</p>
                     <p>
                        <a
                           href="https://www.workelections.com/"
                           target="_blank"
                           rel="noopener"
                        >
                           <img
                              src="assets/images/partners/work-elections.png"
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
}
