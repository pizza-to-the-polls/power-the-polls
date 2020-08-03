import { h } from "@stencil/core";

import { Jurisdiction } from "./types";

const Hours = ( j: Jurisdiction ) => (
   <div>
      <h4>Hours and Compensation</h4>
      {j.hours_start && ( <p><strong>Start Time: </strong>{j.hours_start}</p> )}
      {j.hours_end && ( <p><strong>End Time: </strong>{j.hours_end}</p> )}
      {j.compensation && ( <p><strong>Compensation: </strong>{j.compensation}</p> )}
      {j.full_day_req === "Y" ? <p>You must work the full day</p> : null}
      {j.full_day_req === "N" && ( <p>Part-day poll worker shifts are available.</p> )}
      {j.full_day_req.length > 1 && ( <p>{j.full_day_req}</p> )}
   </div>
);

export default Hours;
