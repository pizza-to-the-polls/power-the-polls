import { Component, h, Prop, State } from "@stencil/core";

import { fetchFromWE } from "../../util/workElections";

import Details from "./Details";
import { Jurisdiction } from "./types";

/**
 * Component to render work elections jurisdiction data.
 */
@Component({
  tag: "jurisdiction-info",
})
export class JurisdictionInfo {

    /**
      * City for matching to location
      */
    @Prop() public jurisdictionId?: number;

    @State() public jurisdiction?: Jurisdiction;


  public async componentWillLoad() {
    if( this.jurisdictionId ) {
      this.jurisdiction = await fetchFromWE(`/jurisdictions/${this.jurisdictionId}/`);
    }
  }

  public render() {
     return this.jurisdiction ? <Details {...this.jurisdiction} /> : null;
  }
}
