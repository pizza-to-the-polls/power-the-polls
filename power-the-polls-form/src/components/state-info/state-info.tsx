import { Component, h, Prop, State } from "@stencil/core";

import { JurisdictionInfo, StateInfo } from "../../data/States";
import { PtpLink } from "../../util";
import { fetchStateInfo, fetchStateJurisdictionsList } from "../../util/WorkElections";

/**
 * When we have no specific polling jurisdiction for a user and just their state we
 * display a list of all the counties for them to choose from.
 */
@Component( {
   tag: "state-info",
   styleUrl: "state-info.scss",
} )
export class StateInfoComponent {

   /**
    * State abbreviation
    */
   @Prop() public state?: string;

   /**
    * State id in work elections
    */
   @Prop() public stateId: number | null = null;

   @State() public jurisdictions: JurisdictionInfo[] = [];
   @State() public info?: StateInfo;

   public componentWillLoad() {
      // load data if given a valid state (and componentWillLoad will wait to render if async so don't `await`)
      if( this.stateId ) {
         fetchStateJurisdictionsList( this.stateId ).then( x => this.jurisdictions = x );
         fetchStateInfo( this.stateId ).then( x => this.info = x );
      }
   }

   public render() {
      if( this.stateId ) {
         const { info, jurisdictions } = this;
         return info == null ?
            <loading-spinner dark={true} /> :
            (
               <div>
                  <h2>{info.name}</h2>
                  {info.notes && <p>{info.notes}</p>}
                  <div class="jurisdictions">
                     {jurisdictions.map( ( { id, name } ) => (
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
   }

}
