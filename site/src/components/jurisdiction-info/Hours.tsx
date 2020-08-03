import { h } from "@stencil/core";

import { Jurisdiction } from "./types";

const Hours = (jurisdiction: Jurisdiction) => (
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

export default Hours;
