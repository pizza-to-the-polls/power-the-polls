import { Component, h, Host, Prop, State } from "@stencil/core";

import { Jurisdiction } from "../../data/States";
import { PtpLink } from "../../util/PtpLink";
import { fetchJurisdiction } from "../../util/WorkElections";

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

const HoursAndCompensation = ( j: Jurisdiction ) => (
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

const WorkReqs = ( j: Jurisdiction ) => (
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

const ContactInfo = ( j: Jurisdiction ) => (
   <div>
      <h4>Contact Information</h4>
      <p><strong>Phone: </strong><a href={`tel:${j.telephone}`}>{j.telephone}</a></p>
      <p><strong>Email: </strong><a href={`mailto:${j.email}`}>{j.email}</a></p>
      {j?.office_address &&
         <p><strong>Office Address: </strong><a target="_blank" href={`https://www.google.com/maps/search/${encodeURIComponent( j?.office_address )}`}>{j?.office_address}</a></p>}
   </div>
);

const CompleteApplicationButton = ( j: Jurisdiction ) => (
   <a
      class="poll-worker-action cta"
      href={j.application ? j.application : `mailto:${j.email}?subject=Becoming%20a%20Poll%20Worker`}
      target="_blank"
   >Complete your application</a>
);

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

   @State() public jurisdiction?: Jurisdiction;

   public componentWillLoad() {
      if( this.jurisdictionId ) {
         fetchJurisdiction( this.jurisdictionId ).then( x => this.jurisdiction = x );
      }
   }

   public render() {
      const j = this.jurisdiction;
      if( j && !j.name ) {
         return <Host>
            <h3>Uh oh!</h3>
            <p>
               Unfortunately we're not able to retrieve jurisdiction{' '}
               <strong>#{ this.jurisdictionId }</strong>{' '}
               at this time
            </p>
            <p>
               Please contact <a href="mailto:info@powerthepolls.org">info@powerthepolls.org</a>{' '}
               and let us know the zip code you've entered and jurisdiction (#{ this.jurisdictionId }).
            </p>
         </Host>
      }
      return j == null ?
         <Host>
            <slot />
            <loading-spinner dark={true} />
         </Host>
         : (
            <Host>
               <h2>{j.name}, {j.state.alpha}</h2>
               {j.jurisdiction_link_text && j.jurisdiction_link &&
                  ( <p>
                     {j.jurisdiction_link_text}
                     {" "}
                     <PtpLink path={`/jurisdiction/${j.jurisdiction_link.id}`} >click here</PtpLink>.
                  </p> )}

               <a
                  class="poll-worker-action cta"
                  href={j.application ? j.application : `mailto:${j.email}?subject=Becoming%20a%20Poll%20Worker`}
                  target="_blank"
               >Complete your application</a>

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
               <CompleteApplicationButton {...j} />

            </Host>
         );
   }
}
