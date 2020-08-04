import { Component, h, Host } from "@stencil/core";

@Component( {
   tag: "page-jurisdiction",
   shadow: false,
} )
export class PageJurisdiction {

   public render() {
      const jurisdictionId = document.location.hash.replace("#", "");

      return (<Host>
         <jurisdiction-info jurisdictionId={jurisdictionId} />
      </Host>);
   }

}
