import { Component, h, Host, Prop, State, Watch } from "@stencil/core";

import { JurisdictionInfo, StateInfo } from "../../data/States";
import { PtpLink } from "../../util";
import { fetchStateInfo, fetchStateJurisdictionsList, findStateId } from "../../util/WorkElections";

/**
 * When we have no specific polling jurisdiction for a user and just their state we
 * display a list of all the counties for them to choose from.
 */
@Component( {
   tag: "ptp-info-state",
   styleUrl: "ptp-info-state.scss",
} )
export class StateInfoComponent {

   /**
    * State abbreviation
    */
   @Prop() public state?: string;

   @State() private stateId: number | null = null;
   @State() private stateJurisdictions: JurisdictionInfo[] = [];
   @State() private stateInfo?: StateInfo;

   public componentWillLoad() {
      this.resetState();
   }

   @Watch( "state" )
   public onStateChanged() {
      this.resetState();
   }

   public render() {
      const state = this.state;
      const info = this.stateInfo;

      if( state === "ME" ) {
         return ( <Host>
            <h2>Maine</h2>

            <slot />

            <h4>Requirements</h4>
            <p>In Maine, eligible poll workers can serve anywhere in the state, but requirements and compensation vary across the state.</p>

            <h4>Voter Registration Requirements</h4>
            <p>You must be a registered voter to work on Election Day.</p>

            <h4>Work Requirements</h4>
            <ul>
               <li><strong>Minimum Age:</strong> 17 years of age</li>
               <li>Candidates and family members of candidates cannot be poll workers</li>
            </ul>

            <h4>Compensation</h4>
            <p>Compensation varies depending on city or town, and is at least the state minimum wage of $12 per hour.</p>
         </Host> );
      }

      if( state === "MI" ) {
         return ( <Host>
            <h2>Michigan</h2>

            <slot />

            <h4>Requirements</h4>
            <p>
               Requirements vary and are determined by cities and towns in Michigan, but all poll workers must be a registered Michigan voter or 16 or 17 years old residing in Michigan.
               While you can vote with a felony record, you cannot serve as a poll worker in Michigan if you have a felony or any infraction related to voting.
            </p>

            <h4>Hours &amp; Compensation</h4>
            <ul>
               <li>Serving as a poll worker is a paid position with a flat daily rate. Many cities are also providing hazard pay for poll workers who serve during the 2020 election.</li>
               <li>While hours vary, both by city and by position worked, most poll workers should expect to work long days, beginning before polls open at 7am and concluding after polls close at 8pm.</li>
            </ul>

         </Host> );
      }

      return info == null ?
         <ui-loading-spinner dark={true} /> :
         (
            <div>
               <h2>{info.name}</h2>
               {info.notes && <p>{info.notes}</p>}
               <div class="jurisdictions">
                  {this.stateJurisdictions.map( ( { id, name } ) => (
                     <PtpLink
                        path={`/jurisdiction/${id}`}
                        anchorClass="jurisdiction"
                     >
                        {name}
                     </PtpLink>
                  ) )}
               </div>
            </div>
         );
   }

   private resetState() {
      this.stateId = this.state ? findStateId( this.state ) : null;
      if( this.stateId ) {
         fetchStateJurisdictionsList( this.stateId ).then( x => this.stateJurisdictions = x );
         fetchStateInfo( this.stateId ).then( x => this.stateInfo = x );
      } else {
         this.stateInfo = undefined;
         this.stateJurisdictions = [];
      }
   }
}
