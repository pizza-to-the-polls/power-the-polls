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
         {state != null && state in data.States.partners ?
            ( <Fragment>
               <h2>{data.States.partners[state]}</h2>
               <p>
                  We are sharing your information with election administrators and our state partners.
               </p>
               <p>
                  You'll hear from a partner in the next week about how you can help serve as a poll worker in {data.States.partners[state]}.
               </p>
            </Fragment> )
            : state != null && state in data.States.noPollWorkersNeeded ?
               ( <Fragment>
                  <h2>{data.States.noPollWorkersNeeded[state]}</h2>
                  <p>Thank you so much for your interest in being a poll worker!</p>
                  <p>
                     Good news: <strong>{data.States.noPollWorkersNeeded[state]} has indicated that they have all the election workers they need this year!</strong>
                  </p>
                  <p>
                     The bad news is, that means we won’t have a place for you to serve as a poll worker, since your state is all set, and jurisdiction requirements unfortunately mean
                     you won’t be eligible to serve in another state.
                  </p>
                  <p>
                     We are passing your information on to your state's election administrators who will reach out if their needs change or if there are other
                     opportunities to help their offices.
                  </p>
                  <p>
                     <strong>You can still help power the polls</strong> by voting in this upcoming election, and encouraging your friends and family across the country to register
                     to vote and, for those who live in other states - signing up to be poll workers.
                  </p>
               </Fragment> )
               : null}
      </Host> );
   }

}
