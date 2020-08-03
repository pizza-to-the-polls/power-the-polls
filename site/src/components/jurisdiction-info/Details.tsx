import { h } from "@stencil/core";

import Hours from "./Hours";
import Reqs from "./Reqs";
import { Jurisdiction } from "./types";
import WorkReqs from "./WorkReqs";

const Details = ( j: Jurisdiction ) => (
   <div>
      <h2>{j.name}, {j.state.alpha}</h2>

      <div class="links">
         <a class="cta" href={j.application} target="_blank">Apply Now!</a>
         <a href={j.website} target="_blank">Poll Worker Information</a>
         {j.student_website && ( <a href={j.student_website} target="_blank">Student Poll Worker Information</a> )}
      </div>

      <h4>Contact Information</h4>
      <p><strong>Phone: </strong><a href={`tel:${j.telephone}`}>{j.telephone}</a></p>
      <p><strong>Email: </strong><a href={`mailto:${j.email}`}>{j.email}</a></p>
      <p><strong>Office Address: </strong><a target="_blank" href={`https://www.google.com/maps/search/${encodeURIComponent( j.office_address )}`}>{j.office_address}</a></p>

      <Reqs {...j} />
      <Hours {...j} />
      <WorkReqs {...j} />
      {j.further_notes
         && ( <div>
            <h4>Further Notes</h4>
            <p>{j.further_notes}</p>
         </div> )}
   </div>
);

export default Details;
