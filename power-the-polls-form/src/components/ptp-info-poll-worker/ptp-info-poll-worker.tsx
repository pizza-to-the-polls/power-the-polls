import { Component, h, Prop } from "@stencil/core";
import { injectHistory, RouterHistory } from "@stencil/router";

import { PtpFormData } from "../../util";
import { findJurisdictionId } from "../../util/WorkElections";

/**
 * Display state or specific jurisdiction information for poll worker information based on whether
 * the provided `state`, `county`, and `city` match a jurisdiction or not.
 */
@Component( {
   tag: "ptp-info-poll-worker",
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

   /**
    * Complete form data, if available
    */
   @Prop() public formData?: PtpFormData;

   @Prop() public history?: RouterHistory;

   public render() {
      const { state, county, city } = this;
      const jurisdictionId = state ? findJurisdictionId( state, county, city ) : null;

      if( !state && this.history ) {
         return this.history.replace( "/search" );
      }

      return jurisdictionId != null ?
         (
            <ptp-info-jurisdiction jurisdictionId={jurisdictionId} addtl={this.formData || { city, state, county, jurisdictionId: jurisdictionId + "" }}>
               <slot />
            </ptp-info-jurisdiction>
         ) : (
            <ptp-info-state state={state}>
               <slot />
            </ptp-info-state>
         );
   }
}

injectHistory( PollWorkerInfo );
