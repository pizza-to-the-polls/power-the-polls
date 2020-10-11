import { Component, h, Prop } from "@stencil/core";

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

   /**
    * If `true`, this component will lso render 1-3 bullet items indicating next steps for the user
    */
   @Prop() public showNextSteps: boolean;

   constructor() {
      this.showNextSteps = false;
   }

   @Prop() public isJurisdictionFilled: boolean = false;

   public render() {
      const { state, county, city } = this;
      const jurisdictionId = state ? findJurisdictionId( state, county, city ) : null;

      return jurisdictionId != null ?
         (
            <ptp-info-jurisdiction
               isJurisdictionFilled={this.isJurisdictionFilled}
               jurisdictionId={jurisdictionId}
               initialFormData={this.formData || { city, state, county, jurisdictionId: jurisdictionId + "" }}
               showNextSteps={this.showNextSteps}
            >
               <slot />
            </ptp-info-jurisdiction>
         ) : (
            <ptp-info-state state={state}>
               <div style={{ display: "none" }}><slot /></div>
            </ptp-info-state>
         );
   }
}
