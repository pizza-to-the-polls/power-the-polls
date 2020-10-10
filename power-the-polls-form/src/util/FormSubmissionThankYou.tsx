import { Fragment, FunctionalComponent, h } from "@stencil/core";

import { StateInfo } from "../data/States";

/**
 * Display thank you and "here are next steps" to the user unless they are in a jurisdiction that no longer needs poll workers, in which case
 * tell them as much and as they share.
 */
const FormSubmissionThankYou: FunctionalComponent<{ stateInfo: StateInfo | null, isJurisdictionFilled: boolean | false }> = ( { stateInfo, isJurisdictionFilled } ) => {

   return (
   stateInfo != null && stateInfo.notSupported ? (
      <Fragment>
         <h1>Thank you so much for your interest in being a poll worker!</h1>
         <p>
            Unfortunately we are unable to support poll worker placement in {stateInfo.name}. You can still help power the polls by voting in this upcoming election, and encouraging your friends and family across the country to register to vote and &mdash; for those who live in other parts of the U.S. &mdash; signing up to be poll workers.
         </p>
      </Fragment>
   ) : stateInfo != null && stateInfo.noPollWorkersNeeded ? (
      <Fragment>
         <h1>Thank you so much for your interest in being a poll worker!</h1>
         <p>
            Good news: <strong>{stateInfo.name} has indicated that they have all the election workers they need this year!</strong>
         </p>
         <p>
            The bad news is, that means we won’t have a place for you to serve as a poll worker, since your state is all set, and jurisdiction requirements unfortunately mean
            you won’t be eligible to serve in another state.
         </p>
         <p>
            We are passing your information on to your state's election administrators who will reach out if their needs change or if there are other
            opportunities to help their offices.
         </p>
         <p>
            <strong>You can still help power the polls</strong> by voting in this upcoming election, and encouraging your friends and family across the country to register
            to vote and, for those who live in other states - signing up to be poll workers.
         </p>
      </Fragment>
   ) : (
            <Fragment>
               <h1>{isJurisdictionFilled ? "You’re one step closer to Powering the Polls!" : "Thank you so much for your interest in being a poll worker!"}</h1>
               {!isJurisdictionFilled && <h2>What’s next?</h2>}
               <hr />
            </Fragment>
         )
);
}
;
export default FormSubmissionThankYou;
