import { h } from "@stencil/core";

import { Jurisdiction } from "./types";

const WorkReqs = (jurisdiction: Jurisdiction) => (
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

export default WorkReqs;
