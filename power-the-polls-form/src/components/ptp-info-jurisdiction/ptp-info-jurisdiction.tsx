import { Component, Fragment, h, Host, Prop, State, Watch } from "@stencil/core";
import { MultiPolygon } from "geojson";

import { States } from "../../data";
import { JurisdictionInfo } from "../../data/States";
import { allNullOrEmpty, findIfJurisdictionFilled, isNullOrEmpty, PtpFormData, PtpLink } from "../../util";
import { fetchJurisdictionGeoJson, fetchJurisdictionInfo } from "../../util/WorkElections";

import AdditionalInfoForm from "./AdditionalInfoForm";
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
    * If `true`, this component should show next steps and any additional form data
    */
   @Prop() public showNextSteps: boolean;

   /**
    * Props possibly passed in from the main form
    */
   @Prop() public initialFormData?: PtpFormData;

   @State() private jurisdiction?: JurisdictionInfo;
   @State() private jurisdictionShape?: MultiPolygon;
   @State() private formData: PtpFormData = {};
   @State() private isMailToFormComplete: boolean;
   @State() private additionalInfoFormStatus: "pending" | "submitting" | "submitted";

   constructor() {
      this.isMailToFormComplete = false;
      this.showNextSteps = false;
      this.additionalInfoFormStatus = "pending";
   }

   public componentWillLoad() {
      this.formData = this.initialFormData || {};
      if( this.jurisdictionId ) {
         fetchJurisdictionInfo( this.jurisdictionId ).then( x => this.jurisdiction = x );
         fetchJurisdictionGeoJson( this.jurisdictionId ).then( x => this.jurisdictionShape = x );
      }
   }

   @Watch( "additionalInfoFormStatus" )
   public onAdditionalInfoFormStatusChanged( val: "pending" | "submitting" | "submitted" ) {
      // fake some loading so the user gets feedback
      if( val === "submitting" ) {
         window.scrollTo( { top: 0 } );
         setTimeout( () => this.additionalInfoFormStatus = "submitted", 1000 );
      }
   }

   public render() {

      //
      // Michigan is a special-case
      //
      if( this.formData.state === "MI" ) {
         return ( <Host>
            <h2>Michigan</h2>
            {this.showNextSteps && this.additionalInfoFormStatus === "submitting"
               ?
               <ui-loading-spinner />
               : this.showNextSteps && this.additionalInfoFormStatus === "pending"
                  ?
                  <AdditionalInfoForm
                     data={this.formData}
                     onSubmit={() => this.additionalInfoFormStatus = "submitting"}
                  />
                  :
                  <Fragment>
                     {this.showNextSteps &&
                        <Fragment>
                           <div class="next-steps">
                              <p>
                                 <span class="number">1</span>
                                 We are sharing your information with election administrators and our state partners who will follow up to help you
                                 be placed as a poll worker!
                              </p>
                              <p>
                                 <span class="number">2</span>
                                 Since we are so close to Election Day, you will likely only hear back from your local
                                 elections office if you are selected. Be sure to answer your phone since it is unlikely that they’ll leave messages.
                              </p>
                           </div>
                           <hr />
                        </Fragment>
                     }

                     <h4>Requirements</h4>
                     <p>
                        Requirements vary and are determined by cities and towns in Michigan, but all poll workers must be a registered Michigan voter
                        or 16 or 17 years old residing in Michigan. While you can vote with a felony record, you cannot serve as a poll worker in
                        Michigan if you have a felony or any infraction related to voting.
                     </p>

                     <h4>Hours &amp; Compensation</h4>
                     <ul>
                        <li>Serving as a poll worker is a paid position with a flat daily rate. Many cities are also providing hazard pay for poll workers who serve during the 2020 election.</li>
                        <li>While hours vary, both by city and by position worked, most poll workers should expect to work long days, beginning before polls open at 7am and concluding after polls close at 8pm.</li>
                     </ul>
                  </Fragment>
            }
         </Host> );
      }

      const j = this.jurisdiction;
      if( j == null ) {
         return ( <Host>
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

      const stateInfo = States[j.state.alpha];
      const isJurisdictionFilled = findIfJurisdictionFilled( this.formData );
      return ( <Host>

         <div style={{ display: "flex", alignItems: "flex-start", flexDirection: "column" }}>
            <ui-geojson-to-svg
               geoJson={this.jurisdictionShape}
               height={180}
               width={250}
            />
         </div>

         <h2>{j.name}, {j.state.alpha}</h2>

         {this.showNextSteps && stateInfo.noPollWorkersNeeded !== true && this.additionalInfoFormStatus === "submitting"
            ? <ui-loading-spinner />
            : this.showNextSteps && stateInfo.noPollWorkersNeeded !== true && this.additionalInfoFormStatus === "pending"
               ?
               <AdditionalInfoForm
                  data={this.formData}
                  onSubmit={() => this.additionalInfoFormStatus = "submitting"}
               />
               :
               <Fragment>
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
                        ? stateInfo.usePhoneInsteadOfEmailForFormFallback
                           ? ( <Fragment>
                              <p>{stateInfo.name} is looking to quickly place poll workers in the coming weeks ahead of Election Day on November 3rd. In order to expedite placement, call your local election administrator directly to express your interest in being a poll worker.</p>
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

                  {!isJurisdictionFilled && this.showNextSteps &&
                     <Fragment>
                        <div class="next-steps">
                           {( // see: https://docs.google.com/document/d/1b-mPTB1nGmOoziqxAZRhx9UUgvcWqsZtNXqfijXtgrY/edit
                              !!j?.application === false && stateInfo && stateInfo.usePhoneInsteadOfEmailForFormFallback
                                 ? [
                                    () => <Fragment><strong>Complete your community's application by calling the number above! Election Day is right around the corner, so don’t waste any time getting your application in.</strong> Learn more about hours, compensation, and requirements for your community below.</Fragment>,
                                    () => "Since we are so close to Election Day, you will likely only hear back from your local elections office if you are selected. Be sure to answer your phone since it is unlikely that they’ll leave messages.",
                                 ] : [
                                    () => <Fragment>
                                       <strong>Complete your official application to be a poll worker today! Election Day is right around the corner, so don’t waste any time getting your application in.</strong> Learn more about hours, compensation, and requirements for your community below and be sure to complete your official application!
                                       </Fragment>,
                                    () => "Since we are so close to Election Day, you will likely only hear back from your local elections office if you are selected. Be sure to answer your phone since it is unlikely that they’ll leave messages.",
                                 ]
                           ).map( ( x, i ) => (
                              <p>
                                 <span class="number">{i + 1}</span>
                                 {x()}
                              </p>
                           ) )}
                        </div>
                        <hr />
                     </Fragment>
                  }

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

                  {!isJurisdictionFilled && !allNullOrEmpty( j?.telephone, j?.email, j?.office_address )
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
                     : stateInfo.usePhoneInsteadOfEmailForFormFallback
                        ? <CallToApplyButton jurisdiction={j} />
                        : null}
               </Fragment>
         }

      </Host> );
   }
}
