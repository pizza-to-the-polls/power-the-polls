import { h } from "@stencil/core";

import { Jurisdiction } from "./types";

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

export default Reqs;
