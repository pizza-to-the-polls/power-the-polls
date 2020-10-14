import { Component, Fragment, h, Host, Prop, State } from "@stencil/core";
import { MultiPolygon } from "geojson";

import { States } from "../../data";
import { JurisdictionInfo } from "../../data/States";
import { allNullOrEmpty, isNullOrEmpty, PtpFormData, PtpLink } from "../../util";
import { fetchJurisdictionGeoJson, fetchJurisdictionInfo } from "../../util/WorkElections";

import CallToApplyButton from "./CallToApplyButton";
import CompleteApplicationButton from "./CompleteApplicationButton";
import EmailApplicationForm from "./EmailApplicationForm";

/**
 * Component to render work elections jurisdiction data.
 */
@Component( {
   tag: "ptp-info-jurisdiction",
   styleUrl: "ptp-info-jurisdiction.scss",
   shadow: false,
} )
export class JurisdictionInfoComponent {

   /**
     * ID of jurisdiction for Work Elections
     */
   @Prop() public jurisdictionId?: string | number;

   /**
    * If `true`, this component will lso render 1-3 bullet items indicating next steps for the user
    */
   @Prop() public showNextSteps: boolean;

   /**
    * Props possibly passed in from the main form
    */
   @Prop() public initialFormData?: PtpFormData;

   @Prop() public isJurisdictionFilled: boolean = false;

   @State() private jurisdiction?: JurisdictionInfo;
   @State() private jurisdictionShape?: MultiPolygon;
   @State() private formData: PtpFormData = {};
   @State() private isMailToFormComplete: boolean;

   constructor() {
      this.isMailToFormComplete = false;
      this.showNextSteps = false;
   }

   public componentWillLoad() {
      this.formData = this.initialFormData || {};
      if( this.jurisdictionId ) {
         fetchJurisdictionInfo( this.jurisdictionId ).then( x => this.jurisdiction = x );
         fetchJurisdictionGeoJson( this.jurisdictionId ).then( x => this.jurisdictionShape = x );
      }
   }

   public render() {
      const j = this.jurisdiction;

      if( j == null ) {
         return ( <Host>
            <slot />
            <ui-loading-spinner />
         </Host> );
      }

      if( !j.name ) {
         return ( <Host>
            <h3>Uh oh!</h3>
            <p>
               Unfortunately we're not able to retrieve jurisdiction{" "}
               <strong>#{this.jurisdictionId}</strong>{" "}
               at this time
            </p>
            <p>
               Please contact <a href={`mailto:info@powerthepolls.org?subject=Error%20with%20jurisdiction%20${this.jurisdictionId}`}>info@powerthepolls.org</a>{" "}
               and let us know the zip code you've entered.
            </p>
         </Host> );
      }

      const jurisdictionInfo = States[j.state.alpha];
      return ( <Host>

         <div style={{ display: "flex", alignItems: "start", flexDirection: "column" }}>
            <ui-geojson-to-svg
               geoJson={this.jurisdictionShape}
               height={180}
               width={250}
            />
         </div>

         <h2>{j.name}, {j.state.alpha}</h2>
         {j.jurisdiction_link_text && j.jurisdiction_link &&
            ( <p>
               {j.jurisdiction_link_text}
               {" "}
               <PtpLink path={`/jurisdiction/${j.jurisdiction_link.id}`} >click here</PtpLink>.
            </p> )}

         <CompleteApplicationButton jurisdiction={j} />

         {  // if jurisdiction has an application link, do not show the e-mail form
            ( j?.application == null || j?.application === "" )
               // use phone if specified to do so, else show email form
               ? jurisdictionInfo.usePhoneInsteadOfEmailForFormFallback
                  ? ( <Fragment>
                     <p>{jurisdictionInfo.name} is looking to quickly place poll workers in the coming weeks ahead of Election Day on November 3rd. <strong>In order to expedite placement, call your local election administrator directly to express your interest in being a poll worker.</strong></p>
                     <p>To complete your application, call {j.telephone}.</p>
                     <CallToApplyButton jurisdiction={j} />
                  </Fragment> )
                  // show email form unless it's already complete
                  : ( !this.isMailToFormComplete && <EmailApplicationForm
                     jurisdiction={j}
                     data={this.formData}
                     onComplete={() => this.isMailToFormComplete = true}
                  /> )
               // jurisdiction has an application link, no need for special email or phone section
               : null
         }

         <slot />
         {this.showNextSteps && !this.isJurisdictionFilled ? (
            <Fragment>
               <div class="next-steps">
                  {( // see: https://docs.google.com/document/d/10ngLtEP5wv48aNry3OzCgFhmzguBoSPNJtQfRS4Xn8Y/edit
                     this.formData.state === "MI" ? [
                        () => <Fragment>
                           <strong>You'll hear from a partner in the next week</strong> about how you can help serve as a poll worker in Michigan.
                                    </Fragment>,
                        () => "In the meantime, learn more about hours, compensation, and requirements for your community below and encourage your friends and family to sign up to be poll workers and help ensure a safe and fair election!",
                     ] : ( j?.application == null || j?.application === "" ) && jurisdictionInfo && jurisdictionInfo.usePhoneInsteadOfEmailForFormFallback ? [
                        () => <Fragment><strong>Complete your community's application by calling the number above!</strong> Learn more about hours, compensation, and requirements for your community below.</Fragment>,
                        () => "In the weeks leading up to the election, you will hear back from your local election administrators if you were selected to be a worker in your jurisdiction.",
                        () => "Please encourage your friends and family to sign up to help ensure a safe and fair election!",
                     ] : [
                        () => <Fragment><strong>Complete your official application to be a poll worker!</strong> Learn more about hours, compensation, and requirements for your community below and be sure to complete your official application!</Fragment>,
                        ( jurisdictionInfo == null || !jurisdictionInfo.semiPartner )
                           ? () => "In the weeks leading up to the election, you will hear back from your local election administrators if you were selected to be a worker in your jurisdiction."
                           : () => "We’ll be reaching out in the next week to answer any questions you have and make sure you’ve completed your application so we can help you become a poll worker. Be on the lookout for a call from our team!",
                        () => "Help us recruit more poll workers! Please encourage your friends and family to sign up to help ensure a safe and fair election!",
                     ] ).map( ( x, i ) => (
                        <p>
                           <span class="number">{i + 1}</span>
                           {x()}
                        </p>
                     ) )}
               </div>
               <hr />
            </Fragment> )
            : null}

         <section>
            <h4>Hours and Compensation</h4>
            {!allNullOrEmpty( j?.hours_start, j?.hours_end, j?.compensation, j?.full_day_req )
               ? (
                  <ul>
                     {j.hours_start && ( <li><strong>Start Time: </strong>{j.hours_start}</li> )}
                     {j.hours_end && ( <li><strong>End Time: </strong>{j.hours_end}</li> )}
                     {j.compensation && ( <li><strong>Compensation: </strong>{j.compensation}</li> )}
                     {j.full_day_req === "Y" ? <li>You must work the full day</li> : null}
                     {j.full_day_req === "N" && ( <li>Part-day poll worker shifts are available.</li> )}
                     {j.full_day_req.length > 1 && ( <li>{j.full_day_req}</li> )}
                  </ul>
               ) : <p>Please contact your local election official for more information</p>}
         </section>

         {!isNullOrEmpty( j.registration_status )
            ? (
               <section>
                  <h4>Voter Registration Requirements</h4>
                  <ul>
                     <li>{j.registration_status === "S"
                        ? `You can be registered to vote anywhere in the state to work on Election Day in ${j.name}.`
                        : j.registration_status === "J"
                           ? `You must be registered to vote in ${j.name} to work on Election Day`
                           : j.registration_status}</li>
                  </ul>
               </section>
            ) : null}

         <section>
            <h4>Work Requirements</h4>
            {!allNullOrEmpty( j?.minimum_age, j?.training, j?.complete_training, j?.training_note )
               ? (
                  <ul>
                     {j.minimum_age && ( <li><strong>Minimum Age: </strong>{j.minimum_age}</li> )}
                     {j.training === "Y" && ( <li>You must attend a training session.</li> )}
                     {j.training.length > 1 && ( <li>{j.training}</li> )}
                     {j.complete_training === "Y" && ( <li>You must work the full day.</li> )}
                     {j.complete_training === "N" && ( <li>Part-day poll worker shifts are available.</li> )}
                     {j.complete_training.length > 1 && ( <li>{j.complete_training}</li> )}
                     {j.training_note && ( <li><strong>Training Details: </strong>{j.training_note}</li> )}
                  </ul>
               ) : <p>Please contact your local election official for more information</p>}
         </section>

         {!allNullOrEmpty( j?.further_notes, j?.trusted_notes )
            ? (
               <section>
                  <h4>Further Notes</h4>
                  <p>{j.further_notes}</p>
                  {j.trusted_notes && ( // "trusted"
                     <div>
                        <iframe
                           sandbox="allow-popups"
                           width="100%"
                           height="100%"
                           frameBorder="0"
                           srcDoc={
                              // hacky way to add styles to the iframe
                              '<head><link href="/build/app.css" rel="stylesheet"></head><body>' +
                              j.trusted_notes.replace( /\<a/g, "<a target=\"_blank\"" ) +
                              "</body>"
                           } />
                     </div>
                  )}
               </section>
            ) : null}

         {!allNullOrEmpty( j?.telephone, j?.email, j?.office_address ) && !this.isJurisdictionFilled
             ? (
               <section>
                  <h4>Contact Information</h4>
                  {j?.telephone &&
                     <p><strong>Phone: </strong><a href={`tel:${j.telephone}`}>{j.telephone}</a></p>}
                  {j?.email &&
                     <p><strong>Email: </strong><a href={`mailto:${j.email}`}>{j.email}</a></p>}
                  {j?.office_address &&
                     <p><strong>Office Address: </strong><a target="_blank" href={`https://www.google.com/maps/search/${encodeURIComponent( j?.office_address )}`}>{j?.office_address}</a></p>}
               </section>
            ) : null}

         {j.website && ( <a
            class="poll-worker-action"
            href={j.website}
            target="_blank"
         >Poll Worker Information</a> )}
         {j.student_website && ( <a
            class="poll-worker-action"
            href={j.student_website}
            target="_blank"
         >Student Poll Worker Information</a> )}

         {j?.application !== null && j?.application !== ""
            ? <CompleteApplicationButton jurisdiction={j} />
            : jurisdictionInfo.usePhoneInsteadOfEmailForFormFallback
               ? <CallToApplyButton jurisdiction={j} />
               : null}

      </Host> );
   }
}
