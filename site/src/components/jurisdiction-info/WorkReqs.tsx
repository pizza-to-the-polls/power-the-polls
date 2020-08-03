import { h } from "@stencil/core";

import { Jurisdiction } from "./types";

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

export default WorkReqs;
