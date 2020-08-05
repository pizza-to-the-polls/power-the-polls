import { Component, h, Host, Prop } from "@stencil/core";

import { findJurisdiction, findState } from "../../util/workElections";

/**
 * Component to render local info about how to be a poll worker.
 */
@Component({
  tag: "poll-worker-info",
  shadow: false,
})
export class PollWorkerInfo {

   /**
    * State for matching to location
    */
   @Prop() public state?: string;

   /**
    * County for matching to location
    */
   @Prop() public county?: string;

   /**
    * City for matching to location
    */
   @Prop() public city?: string;

  public render() {
    const { state, county, city } = this;
    const jurisdictionId = state ? findJurisdiction(state, county, city) : null;
    const stateId = state ? findState(state) : null;

    return (
      <Host>
         { state
            ? jurisdictionId
               ? (<jurisdiction-info jurisdictionId={jurisdictionId} />)
               : (<state-info state={state} stateId={stateId} />)
            : <stencil-route-redirect url="/search" /> }
      </Host>
    );
  }

}
