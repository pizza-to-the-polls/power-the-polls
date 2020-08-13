import { Component, h, Host, Prop, State } from "@stencil/core";

import { Jurisdiction } from "../../data/WorkElections";
import { fetchFromWE } from "../../util/WorkElections";

const Reqs = ( jurisdiction: Jurisdiction ) => (
   jurisdiction.registration_status.length < 1
      ? null
      : (
         <div>
            <h4>Voter Registration Requirements</h4>
            <ul>
               <li>{jurisdiction.registration_status === "S"
                  ? `You can be registered to vote anywhere in the state to work on Election Day in ${jurisdiction.name}.`
                  : jurisdiction.registration_status === "J"
                     ? `You must be registered to vote in ${jurisdiction.name} to work on Election Day`
                     : jurisdiction.registration_status}</li>
            </ul>
         </div>
      )
);

const Hours = ( j: Jurisdiction ) => (
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

   public async componentWillLoad() {
      if( this.jurisdictionId ) {
         this.jurisdiction = await fetchFromWE( `/jurisdictions/${this.jurisdictionId}/` );
      }
   }

   public render() {
      const j = this.jurisdiction;

      return ( j == null ? null :
         <Host>
            <h2>{j.name}, {j.state.alpha}</h2>
            {j.jurisdiction_link_text && j.jurisdiction_link &&
               ( <p>
                  {j.jurisdiction_link_text}
                  {" "}
                  <stencil-route-link url={`/jurisdiction/${j.jurisdiction_link.id}`} >click here</stencil-route-link>.
               </p> )}

            <div>
               <a
                  class="poll-worker-action cta"
                  href={j.application ? j.application : `mailto:${j.email}?subject=Becoming%20a%20Poll%20Worker`}
                  target="_blank"
               >Apply Now!</a>
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
            </div>

            <h4>Contact Information</h4>
            <p><strong>Phone: </strong><a href={`tel:${j.telephone}`}>{j.telephone}</a></p>
            <p><strong>Email: </strong><a href={`mailto:${j.email}`}>{j.email}</a></p>
            {j?.office_address && <p><strong>Office Address: </strong><a target="_blank" href={`https://www.google.com/maps/search/${encodeURIComponent( j?.office_address )}`}>{j?.office_address}</a></p>}

            <Reqs {...j} />
            <Hours {...j} />
            <WorkReqs {...j} />
            {j.further_notes
               && ( <div>
                  <h4>Further Notes</h4>
                  <p>{j.further_notes}</p>
               </div> )}
         </Host> );
   }
}
