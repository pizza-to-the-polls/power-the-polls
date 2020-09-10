import { data, util } from "@ptp-us/power-the-polls-form";
import { Component, h, Host } from "@stencil/core";

import { getParams } from "../../util";

/**
 * Render poll worker info for the jurisdiction as parsed from the querystring or hash
 */
@Component( {
   tag: "page-info",
   shadow: false,
} )
export class PageInfo {
   public render() {

      const query = getParams();
      const hash = document.location.hash?.replace( "#", "" ) || query.source || "";
      let [state, county, city] = hash.split( "?" )[0].split( "-" ).map( el => unescape( el ) );
      if( !state ) {
         state = query.state;
         county = query.county;
         city = query.city;
      }
      const stateInfo = state != null && state in data.States ? data.States[state] : null;

      if( !state ) {
         return <stencil-router-redirect url="/search" />;
      }

      return ( <Host>
         <ptp-info-poll-worker city={city} county={county} state={state} />
         {stateInfo != null && stateInfo.noPollWorkersNeeded && <util.FormSubmissionThankYou stateInfo={stateInfo} />}
      </Host> );
   }

}