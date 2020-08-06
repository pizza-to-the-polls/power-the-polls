import { Component, h, Host, Prop, Element } from "@stencil/core";
import { RouterHistory, injectHistory } from "@stencil/router";

import { findJurisdiction, findState } from "../../util/WorkElections";

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

   @Prop() history?: RouterHistory;
   @Element() el?: HTMLElement;


  public render() {
    const { state, county, city } = this;
    const jurisdictionId = state ? findJurisdiction(state, county, city) : null;
    const stateId = state ? findState(state) : null;

   if( !state && this.history ) return this.history.replace('/search');

    return (
      <Host>
         { state
            ? jurisdictionId
               ? (<jurisdiction-info jurisdictionId={jurisdictionId} />)
               : (<state-info state={state} stateId={stateId} />)
            : null }
      </Host>
    );
  }
}

injectHistory(PollWorkerInfo);
