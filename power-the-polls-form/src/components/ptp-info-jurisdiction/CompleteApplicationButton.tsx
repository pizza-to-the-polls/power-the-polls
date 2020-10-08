import { FunctionalComponent, h } from "@stencil/core";

import { JurisdictionInfo } from "../../data/States";

const CompleteApplicationButton: FunctionalComponent<{ jurisdiction: JurisdictionInfo }> = ( { jurisdiction: j } ) =>
   j?.application && j?.application !== "" && (
      <a
         class="poll-worker-action cta"
         href={j.application}
         target="_blank"
      >Complete your application</a>
   );
export default CompleteApplicationButton;
