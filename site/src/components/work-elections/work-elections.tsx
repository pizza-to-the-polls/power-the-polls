import { Component, h, Host, Prop, State } from "@stencil/core";

import { findJurisdiction } from "../../util/workElections";


interface Jurisdiction {
   id: number;
   state: { alpha: string };
   jurisdiction_link?: { id: number, name: string };
   name: string;
   obtained_at: string;
   website: string;
   application: string;
   telephone: string;
   email: string;
   office_address: string;
   mailing_address: string;
   how_obtained: string;
   registration_status: string;
   pre_registration?: any;
   voter_registration_url: string;
   minimum_age: string;
   high_school_student: string;
   hours_start: string;
   hours_end: string;
   full_day_req: string;
   split_days_allowed?: any;
   compensation: string;
   interview?: any;
   training: string;
   training_note?: string;
   complete_training: string;
   post_training_exam: string;
   must_have_email: string;
   candidate_prohibition?: any;
   city: boolean;
   city_label: string;
   further_notes: string;
   trusted_notes: string;
   display: string;
   student_website?: string;
   jurisdiction_link_text?: string;
}

const WEJurisdictionReqs = (jurisdiction: Jurisdiction) => (
   jurisdiction.registration_status.length < 1
      ? null
      : (
         <div>
            <h3>Voter Registration Requirements</h3>
            <ul>
               <li>{ jurisdiction.registration_status === "S"
                 ? `You can be registered to vote anywhere in the state to work on Election Day in ${jurisdiction.name}.`
                 : jurisdiction.registration_status === "J"
                    ? `You must be registered to vote in ${jurisdiction.name} to work on Election Day`
                    : jurisdiction.registration_status }</li>
            </ul>
         </div>
      )
);


const WEHours = (jurisdiction: Jurisdiction) => (
  <div>
     <h3>Hours and Compensation</h3>
     <ul>
        {jurisdiction.hours_start && (<li>Start Time {jurisdiction.hours_start}</li>)}
        {jurisdiction.hours_end && (<li>End Time {jurisdiction.hours_end}</li>)}
        {jurisdiction.compensation && (<li>Compensation {jurisdiction.compensation}</li>)}
        {jurisdiction.full_day_req === "Y" && (<li>You must work the full day.</li>)}
        {jurisdiction.full_day_req === "N" && (<li>Part-day poll worker shifts are available.</li>)}
        {jurisdiction.full_day_req.length > 1 && (<li>{jurisdiction.full_day_req}</li>)}
     </ul>
  </div>
);

const WEWorkReq = (jurisdiction: Jurisdiction) => (
   <div>
      <h3>Work Requirements</h3>
      <ul>
        {jurisdiction.minimum_age && (<li>Minimum Age {jurisdiction.minimum_age}</li>)}
        {jurisdiction.training === "Y" && (<li>You must attend a training session.</li>)}
        {jurisdiction.training.length > 1 && (<li>{jurisdiction.training}</li>)}
        {jurisdiction.complete_training === "Y" && (<li>You must work the full day.</li>)}
        {jurisdiction.complete_training === "N" && (<li>Part-day poll worker shifts are available.</li>)}
        {jurisdiction.complete_training.length > 1 && (<li>{jurisdiction.complete_training}</li>)}
        {jurisdiction.training_note && (<li>{jurisdiction.training_note}</li>)}
      </ul>
   </div>
);

const WEJurisdiction = (jurisdiction: Jurisdiction) => (
   <div>
      <h2>{jurisdiction.name}</h2>

      <div class="links">
         <a class="cta" href={jurisdiction.application} target="_blank">Apply Now!</a>
         <a href={jurisdiction.website} target="_blank">Poll Worker Information</a>
         {jurisdiction.student_website && (<a href={jurisdiction.student_website} target="_blank">Student Poll Worker Information</a>)}
      </div>

      <h3>Contact Information</h3>
      <p>
         Phone: <a href={`tel:${jurisdiction.telephone}`}>{jurisdiction.telephone}</a><br />
         Email: <a href={`mailto:${jurisdiction.email}`}>{jurisdiction.email}</a><br />
         Office Address: <a target="_blank" href={`https://www.google.com/maps/search/${jurisdiction.office_address}`}>{jurisdiction.office_address}</a>
      </p>
      <WEJurisdictionReqs {...jurisdiction} />
      <WEHours {...jurisdiction} />
      <WEWorkReq {...jurisdiction} />
      {jurisdiction.further_notes
         && (<div>
               <h3>Further Notes</h3>
               <p>{jurisdiction.further_notes}</p>
             </div>)}
   </div>
);


/**
 * Component to render work elections or fallback data.
 */
@Component({
  tag: "work-elections",
  styleUrl: "work-elections.scss",
  shadow: false,
})
export class WorkElections {

   /**
    * State for matching to location
    */
   @Prop() public state: string = "";

   /**
    * County for matching to location
    */
   @Prop() public county: string = "";

   /**
    * City for matching to location
    */
   @Prop() public city: string = "";

   @State() public jurisdiction: Jurisdiction | null = null;

  public async componentWillLoad() {
     const url = findJurisdiction(this.state, this.county, this.city);
     if( url ) {
        const resp = await fetch(url);
        this.jurisdiction = await resp.json();
     }
  }

  public render() {
    return (
      <Host>
         { this.jurisdiction ? (<WEJurisdiction {...this.jurisdiction} />) : null}
      </Host>
    );
  }

}
