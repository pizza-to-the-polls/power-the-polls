import { data, util } from "@ptp-us/power-the-polls-form";
import { Component, h, Host } from "@stencil/core";

@Component( {
   tag: "page-redirector",
   shadow: false,
} )
export class PageRedirector {
   public render() {

      const hash = document.location.hash.replace( "#", "" );

      const [state, county, city] = hash.split( "?" )[0].split( "-" ).map( el => unescape( el ) );
      const stateInfo = state != null && state in data.States ? data.States[state] : null;

      return ( <Host>
         <ptp-info-poll-worker city={city} county={county} state={state} />
         {stateInfo != null && stateInfo.noPollWorkersNeeded && <util.FormSubmissionThankYou stateInfo={stateInfo} />}
      </Host> );
   }

}
