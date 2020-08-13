import { Component, h, Prop, State } from "@stencil/core";

import { Jurisdiction, StateInfo } from "../../data/WorkElections";
import { PtpLink } from "../../util/PtpLink";
import { fetchFromWE } from "../../util/WorkElections";

/**
 * Component to render local info about how to be a poll worker.
 */
@Component( {
   tag: "state-info",
   styleUrl: "state-info.scss",
} )
export class StateInfoComponent {

   /**
    * State abrieviation
    */
   @Prop() public state?: string;

   /**
    * State id in work elections
    */
   @Prop() public stateId: number | null = null;

   @State() public jurisdictions: Array<Jurisdiction> = [];
   @State() public info?: StateInfo;

   public componentWillLoad() {
      if( this.stateId ) {
         fetchFromWE( `/jurisdictions/?summary=true&state_id=${this.stateId}` )
            .then( x => this.jurisdictions = x );
         fetchFromWE( `/states/${this.stateId}/` )
            .then( x => this.info = x );
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
