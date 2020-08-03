import { Component, h } from "@stencil/core";

import { FaqData, PartnerList, Social } from "../../data";

@Component( {
   tag: "app-root",
   styleUrl: "app-root.scss",
   shadow: false,
} )
export class AppRoot {

   public render() {
      const social = Social;
      const faqData = FaqData;
      const partnerList = PartnerList;

      // help out development by logging an explicit error if you forgot to copy dot_env to .env or to add SMARTY_STREETS_KEY env var in the production build
      let env = `process.env.SMARTY_STREETS_KEY`; // will be `"the-correct-key"` if replaced
      if( env === "process" + ".env.SMARTY_STREETS_KEY" || env === `""` ) {
         console.error( "SMARTY_STREETS_KEY environment variable not present during build. Cannot continue." );
      }

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
                  <nav>
                     <ul>
                        <li>
                           <stencil-route-link url="/signup">Sign Up</stencil-route-link>
                        </li>
                        <li>
                           <stencil-route-link url="/about">About</stencil-route-link>
                        </li>
                        <li>
                           <stencil-route-link url="/faq">FAQ</stencil-route-link>
                        </li>
                        <li>
                           <stencil-route-link url="/partners">Partners</stencil-route-link>
                        </li>
                        <li>
                           <stencil-route-link url="/contact">Contact</stencil-route-link>
                        </li>
                     </ul>
                  </nav>
                  {social.map( service => <social-share {...service} /> )}
               </div>
            </aside>

            <main>
               <div class="container">
                  <stencil-router>
                     <stencil-route-switch scrollTopOffset={0}>
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
