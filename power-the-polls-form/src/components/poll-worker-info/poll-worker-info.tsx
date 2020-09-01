import { Component, Element, h, Host, Prop } from "@stencil/core";
import { injectHistory, RouterHistory } from "@stencil/router";

import { findJurisdictionId, findStateId } from "../../util/WorkElections";

/**
 * Display state or specific jurisdiction information for poll worker information based on whether
 * the provided `state`, `county`, and `city` match a jurisdiction or not.
 */
@Component( {
   tag: "poll-worker-info",
   shadow: false,
} )
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

   @Prop() public history?: RouterHistory;
   @Element() public el?: HTMLElement;

   public render() {
      const { state, county, city } = this;
      const jurisdictionId = state ? findJurisdictionId( state, county, city ) : null;
      const stateId = state ? findStateId( state ) : null;

      if( !state && this.history ) { return this.history.replace( "/search" ); }

      if( state === "ME" ) {
         return ( <Host>
            <h2>Maine</h2>

            <slot />

            <h4>Requirements</h4>
            <p>In Maine, eligible poll workers can serve anywhere in the state, but requirements and compensation vary across the state.</p>

            <h4>Voter Registration Requirements</h4>
            You must be a registered voter to work on Election Day.

            <h4>Work Requirements</h4>
            <ul>
               <li><strong>Minimum Age: </strong> 17 years of age</li>
               <li>Candidates and family members of candidates cannot be poll workers</li>
            </ul>

            <h4>Compensation</h4>
            <p>Compensation varies depending on city or town, and is at least the state minimum wage of $12 per hour.</p>
         </Host> );
      }

      if( state === "MI" ) {
         return ( <Host>
            <h2>Michigan</h2>

            <slot />

            <h4>Requirements</h4>
            <p>Requirements vary and are determined by cities and towns in Michigan, but all poll workers must be a registered Michigan voter or 16 or 17 years old residing in Michigan. While you can vote with a felony record, you cannot serve as a poll worker in Michigan if you have a felony or any infraction related to voting.</p>

            <h4>Hours &amp; Compensation</h4>
            <ul>
               <li>Serving as a poll worker is a paid position with a flat daily rate. Many cities are also providing hazard pay for poll workers who serve during the 2020 election.</li>
               <li>While hours vary, both by city and by position worked, most poll workers should expect to work long days, beginning before polls open at 7am and concluding after polls close at 8pm.</li>
            </ul>
         </Host> );
      }
      return (
         <Host>
            {state
               ? jurisdictionId
                  ? (
                     <jurisdiction-info jurisdictionId={jurisdictionId}>
                        <slot />
                     </jurisdiction-info>
                  ) : (
                     <state-info state={state} stateId={stateId} />
                  )
               : null}
         </Host>
      );
   }
}

injectHistory( PollWorkerInfo );
