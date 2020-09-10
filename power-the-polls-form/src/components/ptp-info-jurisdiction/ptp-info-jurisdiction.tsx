import { Component, h, Host, Prop, State } from "@stencil/core";
import { FunctionalComponent } from "@stencil/router/dist/types/stencil.core";

import { JurisdictionInfo } from "../../data/States";
import { Fragment, PtpFormData, PtpLink, TextInput } from "../../util";
import { fetchJurisdictionInfo } from "../../util/WorkElections";

const VoterRegistrationReqs = ( j: JurisdictionInfo ) => (
   j.registration_status.length < 1
      ? null
      : (
         <div>
            <h4>Voter Registration Requirements</h4>
            <ul>
               <li>{j.registration_status === "S"
                  ? `You can be registered to vote anywhere in the state to work on Election Day in ${j.name}.`
                  : j.registration_status === "J"
                     ? `You must be registered to vote in ${j.name} to work on Election Day`
                     : j.registration_status}</li>
            </ul>
         </div>
      )
);

const HoursAndCompensation = ( j: JurisdictionInfo ) => j && (
   <div>
      <h4>Hours and Compensation</h4>
      <ul>
         {j.hours_start && ( <li><strong>Start Time: </strong>{j.hours_start}</li> )}
         {j.hours_end && ( <li><strong>End Time: </strong>{j.hours_end}</li> )}
         {j.compensation && ( <li><strong>Compensation: </strong>{j.compensation}</li> )}
         {j.full_day_req === "Y" ? <li>You must work the full day</li> : null}
         {j.full_day_req === "N" && ( <li>Part-day poll worker shifts are available.</li> )}
         {j.full_day_req.length > 1 && ( <li>{j.full_day_req}</li> )}
      </ul>
   </div>
);

const WorkReqs = ( j: JurisdictionInfo ) => j && (
   <div>
      <h4>Work Requirements</h4>
      <ul>
         {j.minimum_age && ( <li><strong>Minimum Age: </strong>{j.minimum_age}</li> )}
         {j.training === "Y" && ( <li>You must attend a training session.</li> )}
         {j.training.length > 1 && ( <li>{j.training}</li> )}
         {j.complete_training === "Y" && ( <li>You must work the full day.</li> )}
         {j.complete_training === "N" && ( <li>Part-day poll worker shifts are available.</li> )}
         {j.complete_training.length > 1 && ( <li>{j.complete_training}</li> )}
         {j.training_note && ( <li><strong>Training Details: </strong>{j.training_note}</li> )}
      </ul>
   </div>
);

const ContactInfo = ( j: JurisdictionInfo ) => j && (
   <div>
      <h4>Contact Information</h4>
      <p><strong>Phone: </strong><a href={`tel:${j.telephone}`}>{j.telephone}</a></p>
      <p><strong>Email: </strong><a href={`mailto:${j.email}`}>{j.email}</a></p>
      {j?.office_address &&
         <p><strong>Office Address: </strong><a target="_blank" href={`https://www.google.com/maps/search/${encodeURIComponent( j?.office_address )}`}>{j?.office_address}</a></p>}
   </div>
);

const CompleteApplicationButton = ( j: JurisdictionInfo ) => {
   return j?.application && j?.application !== "" && (
      <a
         class="poll-worker-action cta"
         href={j.application}
         target="_blank"
      >Complete your application</a>
   );
};

/**
 * Email application that will only render if there is no application link for the jurisdiction
 */
const MailApplicationForm: FunctionalComponent<{ jurisdiction: JurisdictionInfo, data: PtpFormData }> = ( { jurisdiction, data } ) => {

   const j = jurisdiction;
   if( j?.application != null && j.application !== "" ) {
      // jurisdiction has an application link, do not show the e-mail form
      return;
   }

   const submitForm = ( e: Event ) => {
      try {
         console.log( "Format into email or submit to some backend functions which will do that", j.email, data );
      } finally {
         // make sure we cancel the submit so the browser doesn't do anything
         e.preventDefault();
         return false;
      }
   };

   const ages = [
      "18 and under",
      "19 to 25",
      "26 to 35",
      "36 to 50",
      "51 to 64",
      "65 and older",
   ];

   return ( <Fragment>
      <h3>Complete your application</h3>
      <p>You need to email your local jurisdiction directly in order to apply to be a poll worker. This form generates an email that is sent to your local election administrator on your behalf.</p>
      <form onSubmit={submitForm} style={{ padding: "0" }}>
         <label>
            Name
            <TextInput data={data} field="name" />
         </label>
         <label>
            City
            <TextInput data={data} field="city" />
         </label>
         <label>
            County
            <TextInput data={data} field="county" />
         </label>
         <label>
            Email
            <TextInput data={data} field="email" />
         </label>
         <label>
            Phone Number
            <TextInput data={data} field="phone" />
         </label>
         <label>
            What languages do you speak other than English?
            <TextInput data={data} field="languages" />
         </label>
         <label>
            Age
            <select name="age">
               <option>Please select</option>
               {ages.map( a => <option value={a} selected={data.age === a}>{a}</option> )}
            </select>
         </label>

         <input type="hidden" value={data.state} name="state" />

         <button
            type="submit"
            class="button"
         >Submit Application</button>
      </form>

      <p>
         Or you can send an email yourself to <a href={`mailto:${j.email}?subject=Becoming%20a%20Poll%20Worker`} target="_blank">{j.email}</a>.
         Be sure to include your first and last name, city and county of residence, email, phone number, age, and any additional languages you speak other than English.
      </p>
      <a
         class="poll-worker-action"
         href={`mailto:${j.email}?subject=Becoming%20a%20Poll%20Worker`}
         target="_blank"
      >Email your poll administrator directly</a>

      <hr />
   </Fragment> );
};

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
    * Props possibly passed in from the form
    */
   @Prop() public addtl?: PtpFormData;

   @State() private jurisdiction?: JurisdictionInfo;
   @State() private formData: PtpFormData = {};

   public componentWillLoad() {
      this.formData = this.addtl || {};
      if( this.jurisdictionId ) {
         fetchJurisdictionInfo( this.jurisdictionId ).then( x => this.jurisdiction = x );
      }
   }

   public render() {
      const j = this.jurisdiction;

      if( j == null ) {
         return ( <Host>
            <slot />
            <loading-spinner dark={true} />
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

      return (
         <Host>
            <h2>{j.name}, {j.state.alpha}</h2>
            {j.jurisdiction_link_text && j.jurisdiction_link &&
               ( <p>
                  {j.jurisdiction_link_text}
                  {" "}
                  <PtpLink path={`/jurisdiction/${j.jurisdiction_link.id}`} >click here</PtpLink>.
               </p> )}

            <CompleteApplicationButton {...j} />

            <MailApplicationForm jurisdiction={j} data={this.formData} />

            <slot />

            <HoursAndCompensation {...j} />
            <VoterRegistrationReqs {...j} />
            <WorkReqs {...j} />

            {j.further_notes && (
               <div>
                  <h4>Further Notes</h4>
                  <p>{j.further_notes}</p>
               </div>
            )}

            <ContactInfo {...j} />

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
            {j?.application !== "" && <CompleteApplicationButton {...j} />}

         </Host>
      );
   }
}