import { Component, h, Host } from "@stencil/core";

@Component( {
   tag: "page-search",
   shadow: false,
} )
export class PageSearch {
   public render() {
      return (<Host>
         <no-capture-form />
      </Host>);
   }
}
