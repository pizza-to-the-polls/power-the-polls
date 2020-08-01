import { Component, h, Host } from "@stencil/core";

/**
 * The power-the-polls-form for the main site because there are a few additional bits of text and branding that
 * aren't part of power-the-polls-form
 */
@Component( {
   tag: "main-form",
   styleUrl: "main-form.scss",
   shadow: false,
} )
export class PageForm {

   public render() {
      return (
         <Host>
            <img
               class="main-logo"
               alt="Power the Polls"
               src="assets/images/logo-icon-pink.png"
            />
            <div>
               <h1>POWER THE POLLS IS RECRUITING A NEW WAVE OF POLL WORKERS</h1>
               <p>
                  America is facing an unprecedented shortage of poll
                  workers that could mean closed polling places and long
                  delays. You can help make sure we have a safe, fair,
                  efficient election for all voters.
               </p>
               <hr />
            </div>
            <power-the-polls-form id="form" />
         </Host>
      );
   }
}
