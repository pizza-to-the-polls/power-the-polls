import { Component, h, Host } from "@stencil/core";

@Component( {
   tag: "page-form",
   styleUrl: "page-form.scss",
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
            <ptp-form />
         </Host>
      );
   }
}
