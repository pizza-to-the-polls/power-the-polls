import { Component, h, Host, Prop } from "@stencil/core";
import { MatchResults } from "@stencil/router";

@Component( {
   tag: "page-jurisdiction",
   shadow: false,
} )
export class PageJurisdiction {
   @Prop() public match?: MatchResults;

   public render() {
      const id = this.match ? this.match.params.id : null;

      return (<Host>
      { id && (<jurisdiction-info jurisdictionId={id} />)}
      </Host>);
   }

}
