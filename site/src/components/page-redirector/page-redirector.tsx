import { data } from "@ptp-us/power-the-polls-form";
import { Component, h, Host } from "@stencil/core";

import { Fragment } from "../../util/Fragment";

@Component( {
   tag: "page-redirector",
   shadow: false,
} )
export class PageRedirector {
   public render() {

      const hash = document.location.hash.replace( "#", "" );

      const [state, county, city] = hash.split( "?" )[0].split( "-" ).map( el => unescape( el ) );

      return ( <Host>
         <poll-worker-info city={city} county={county} state={state} />
         {state != null && state in data.PartnerStates ?
            (
               <Fragment>
                  <h2>{data.PartnerStates[state]}</h2>
                  <p>
                     You'll hear from a partner election official or nonprofit soon
                     about how you can help everyone in {data.PartnerStates[state]} vote.
                  </p>
               </Fragment>
            ) : null}
      </Host> );
   }

}
