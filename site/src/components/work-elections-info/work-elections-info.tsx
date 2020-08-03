import { Component, h, Host, Prop } from "@stencil/core";

import { JurisdictionQueryResponse } from "../../data/WorkElections";

/**
 * Displayed after the user submits the form
 */
@Component( {
   tag: "work-elections-info",
   styleUrl: "work-elections-info.css",
   shadow: false,
} )
export class WorkElectionsInfo {

   @Prop() public jurisdiction?: JurisdictionQueryResponse;

   public render() {
      const j = this.jurisdiction || null;
      if( j == null ) {
         return null;
      }
      return (
         <Host>
            <h2>{j.name}, {j.state.alpha}</h2>
            <p>{j.jurisdiction_link_text}</p>

            <p><a href={j.website}><button>Poll Worker Information</button></a></p>
            <p><a href={j.student_website}><button>Student Poll Worker Information</button></a></p>
            <p><a href={j.application}><button>Apply Now!</button></a></p>

            <h4>Contact Information</h4>
            <p><strong>Phone: </strong>{j.telephone}</p>
            <p><strong>Email: </strong><a href={`mainlto:${j.email}`}>{j.email}</a></p>
            <p><strong>Office Address: </strong>{j.office_address}</p>

            <h4>Hours and Compensation</h4>
            <p><strong>Start Time: </strong>{j.hours_start}</p>
            <p><strong>End Time: </strong>{j.hours_end}</p>
            <p><strong>Compensation: </strong>{j.compensation}</p>
            {j.full_day_req === "Y" ? <p>You must work the full day</p> : null}

            <h4>Work Requirements</h4>
            <p><strong>Minimum Age: </strong>{j.minimum_age}</p>
            <p><strong>Training Details: </strong>{j.training_note}</p>

            <h4>Further Notes</h4>
            <p>{j.further_notes}</p>
         </Host>
      );
   }

}
