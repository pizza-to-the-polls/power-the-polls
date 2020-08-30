import { Component, h, Prop } from "@stencil/core";
import { MatchResults } from "@stencil/router";

@Component( {
   tag: "page-jurisdiction",
   styleUrl: "page-jurisdiction.scss",
   shadow: false,
} )
export class PageJurisdiction {
   @Prop() public match?: MatchResults;

   public render() {
      const id = this.match ? this.match.params.id : null;

      return id && ( <jurisdiction-info jurisdictionId={id} /> );
   }

}
