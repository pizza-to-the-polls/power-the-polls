import { Component, Fragment, h, Prop } from "@stencil/core";

import { States } from "../../data";
import { isJurisdictionFilled, PtpFormData } from "../../util";
import { findJurisdictionId } from "../../util/WorkElections";

/**
 * Display state or specific jurisdiction information for poll workers based on whether
 * the provided `state`, `county`, and `city` match a jurisdiction or not.
 */
@Component({
   tag: "ptp-info-poll-worker",
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

   /**
    * ID of jurisdiction for Work Elections. Use in place of `state`, `county`, and `city`
    */
   @Prop() public jurisdictionId?: string | number;

   /**
    * Complete form data, if available, for `ptp-info-jurisdiction`
    */
   @Prop() public formData?: PtpFormData;

   /**
    * If `true`, this component will lso render 1-3 bullet items indicating next steps for the user
    */
   @Prop() public showNextSteps: boolean;

   constructor() {
      this.showNextSteps = false;
   }

   public render() {
      const { state, county, city } = this;
      const jurisdictionId =
         this.jurisdictionId ||
         (state && findJurisdictionId(state, county, city)) ||
         undefined;
      const stateInfo = (state && state in States && States[state]) || null;
      const [isFull, nameIfFull] = isJurisdictionFilled(
         state || null,
         jurisdictionId != null ? jurisdictionId + "" : null
      );

      return stateInfo?.notSupported === true ? (
         <Fragment>
            <h1>Thank you so much for your interest in being a poll worker!</h1>
            <p>
               Unfortunately we are unable to support poll worker placement in{" "}
               {stateInfo.name}. You can still help power the polls by voting in
               this upcoming election, and encouraging your friends and family
               across the country to register to vote and &mdash; for those who
               live in other parts of the U.S. &mdash; signing up to be poll
               workers.
            </p>
         </Fragment>
      ) : isFull && false ? ( // added `&& false` to disable full check on 2020-12-05
         <Fragment>
            <h1>Thank you so much for your interest in being a poll worker!</h1>
            <p>
               Good news:{" "}
               <strong>
                  {nameIfFull || "Your jurisdiction"} has indicated that they
                  have all the election workers they need this year!
               </strong>
            </p>
            <p>
               We are passing your information on to your state's election
               administrators who will reach out if their needs change or if
               there are other opportunities to help their offices.
            </p>
            <p>
               <strong>You can still help power the polls</strong> by voting in
               this upcoming election, and encouraging your friends and family
               across the country to register to vote!
            </p>
         </Fragment>
      ) : (
         <Fragment>
            <h1>You’re one step closer to Powering the Polls!</h1>
            <h2>What’s next?</h2>
            <hr />
            {jurisdictionId != null ||
            stateInfo?.noPollWorkersNeeded === true ||
            state === "MI" ? (
               <ptp-info-jurisdiction
                  jurisdictionId={jurisdictionId}
                  initialFormData={
                     this.formData || {
                        city,
                        state,
                        county,
                        jurisdictionId: jurisdictionId + "",
                     }
                  }
                  showNextSteps={this.showNextSteps}
               />
            ) : (
               // if we can't find a jurisdiction ID and this state is not full, show the state selection
               <ptp-info-state state={state} />
            )}
         </Fragment>
      );
   }
}
