import { Component, h, Host } from "@stencil/core";

@Component( {
   tag: "page-contact",
   shadow: false,
} )
export class PageContact {

   public render() {
      return (
         <Host>
            Contact
         </Host>
      );
   }

}
