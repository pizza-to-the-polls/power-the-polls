import { Component, h, Host } from "@stencil/core";

@Component( {
   tag: "page-contact",
   shadow: false,
} )
export class PageContact {

   public render() {
      return (
         <Host>
            <h1>Contact Power the Polls</h1>

            <p>
               We’re a non-partisan coalition of companies and civic engagement groups dedicated to recruiting poll workers for local election officials.
            </p>
            <p>
               Although we can’t guarantee a response to every email due to volume, selecting the appropriate category will help make sure the right person receives your inquiry.
            </p>

            <h3-bar>General Inquiries</h3-bar>
            <p>
               General inquiries can be submitted by emailing <a href="mailto:info@powerthepolls.org">info@powerthepolls.org</a>.
            </p>

            <h3-bar>Press Inquiries</h3-bar>
            <p>
               Press inquiries can be submitted by emailing <a href="mailto:press@powerthepolls.org">press@powerthepolls.org</a>.
            </p>

         </Host>
      );
   }

}
