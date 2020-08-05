import { Component, h, Host, Prop } from "@stencil/core";

@Component( {
   tag: "page-search",
   shadow: false,
} )
export class PageSearch {
   /**
    * The API key to access SmartyStreets which is used for address lookup.
    */
   @Prop() public smartyStreetsApiKey?: string;

   public render() {
      return (<Host>
         <no-capture-form smartyStreetsApiKey={this.smartyStreetsApiKey} />
      </Host>);
   }
}
