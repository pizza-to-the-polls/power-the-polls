import { Component, FunctionalComponent, h, Host, Prop, State } from "@stencil/core";

import { Jurisdiction } from "../../data/States";
import { AdditionalFormData, TextInput } from "../../util";
import { PtpLink } from "../../util/PtpLink";
import { fetchJurisdiction } from "../../util/WorkElections";

const Fragment: FunctionalComponent<{}> = ( _, children ) => children;

const VoterRegistrationReqs = ( j: Jurisdiction ) => (
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

const HoursAndCompensation = ( j: Jurisdiction ) => j && (
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

const WorkReqs = ( j: Jurisdiction ) => j && (
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

const ContactInfo = ( j: Jurisdiction ) => j && (
   <div>
      <h4>Contact Information</h4>
      <p><strong>Phone: </strong><a href={`tel:${j.telephone}`}>{j.telephone}</a></p>
      <p><strong>Email: </strong><a href={`mailto:${j.email}`}>{j.email}</a></p>
      {j?.office_address &&
         <p><strong>Office Address: </strong><a target="_blank" href={`https://www.google.com/maps/search/${encodeURIComponent( j?.office_address )}`}>{j?.office_address}</a></p>}
   </div>
);

const CompleteApplicationButton = ( j: Jurisdiction ) => {
   return j?.application && j?.application !== "" && (
      <a
         class="poll-worker-action cta"
         href={j.application}
         target="_blank"
      >Complete your application</a>
   );
};

/**
 * Component to render work elections jurisdiction data.
 */
@Component( {
   tag: "jurisdiction-info",
   styleUrl: "jurisdiction-info.scss",
   shadow: false,
} )
export class JurisdictionInfo {

   /**
     * ID of jurisdiction for Work Elections
     */
   @Prop() public jurisdictionId?: string | number;

   /**
    * Props possibly passed in from the form
    */
   @Prop() public addtl?: AdditionalFormData;

   @State() public jurisdiction?: Jurisdiction;

   @State() private formData: AdditionalFormData = {};

   public componentWillLoad() {
      this.formData = this.addtl || {};
      if( this.jurisdictionId ) {
         fetchJurisdiction( this.jurisdictionId ).then( x => this.jurisdiction = x );
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
               Please contact <a href="mailto:info@powerthepolls.org">info@powerthepolls.org</a>{" "}
               and let us know the zip code you've entered and jurisdiction (#{this.jurisdictionId}).
            </p>
         </Host> );
      }

      const submitForm = ( e: Event ) => {
         try {
            console.log( "Format into email or submit to some backend functions which will do that", this.formData );
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

            {j?.application == null || j?.application === "" ?
               <Fragment>
                  <p>
                     To complete your application, e-mail your poll administrator: <a href={`mailto:${j.email}?subject=Becoming%20a%20Poll%20Worker`} target="_blank">{j.email}</a>.
                     Be sure to include your first and last name, city and county of residence, email, phone number, age, and any additional languages you speak other than English.
                  </p>
                  <p>Or you can fill out and submit the application below and we will email the poll administrator on your behalf:</p>
                  <form onSubmit={submitForm}>
                     <label>
                        Name
                        <TextInput data={this.formData} field="name" />
                     </label>
                     <label>
                        City
                        <TextInput data={this.formData} field="city" />
                     </label>
                     <label>
                        County
                        <TextInput data={this.formData} field="county" />
                     </label>
                     <label>
                        Email
                        <TextInput data={this.formData} field="email" />
                     </label>
                     <label>
                        Phone Number
                        <TextInput data={this.formData} field="phone" />
                     </label>
                     <label>
                        What languages do you speak other than English?
                        <TextInput data={this.formData} field="languages" />
                     </label>
                     <label>
                        Age
                        <select name="age">
                           <option>Please select</option>
                           {ages.map( a => <option value={a} selected={this.formData.age === a}>{a}</option> )}
                        </select>
                     </label>
                     <button
                        type="submit"
                        class="button"
                     >Send Email</button>
                  </form>
               </Fragment>
               : null}

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
