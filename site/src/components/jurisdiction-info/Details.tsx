import { h } from "@stencil/core";

import Hours from "./Hours";
import Reqs from "./Reqs";
import { Jurisdiction } from "./types";
import WorkReqs from "./WorkReqs";

const Details = (jurisdiction: Jurisdiction) => (
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
    <Reqs {...jurisdiction} />
    <Hours {...jurisdiction} />
    <WorkReqs {...jurisdiction} />
    {jurisdiction.further_notes
       && (<div>
             <h3>Further Notes</h3>
             <p>{jurisdiction.further_notes}</p>
           </div>)}
  </div>
);

export default Details;
