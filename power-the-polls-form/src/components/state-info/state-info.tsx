import { Component, h, Prop, State } from "@stencil/core";

import { WorkElectionsFallbacks } from "../../data";
import { Jurisdiction, StateInfo } from "../../data/WorkElections";
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

   public async componentWillLoad() {
      if( this.stateId ) {
         this.jurisdictions = await fetchFromWE( `/jurisdictions/?summary=true&state_id=${this.stateId}` );
         this.info = await fetchFromWE( `/states/${this.stateId}/` );
      }
   }

   public render() {
      const fallbacks = WorkElectionsFallbacks;
      const { info, jurisdictions } = this;
      if( this.stateId ) {
         if( info != null ) {
            return (
               <div>
                  <h2>{info.name}</h2>
                  {info.notes && <p>{info.notes}</p>}
                  <div class="jurisdictions">
                     {jurisdictions.map( ( { id, name } ) => (
                        <stencil-route-link
                           url={`/jurisdiction/${id}`}
                           anchorClass="jurisdiction"
                        >
                           {name}
                        </stencil-route-link>
                     ) )}
                  </div>
               </div>
            );
         }
      } else if( this.state && fallbacks[this.state] ) {
         return (
            <div>
               <h2>{fallbacks[this.state]}</h2>
               <p>
                  You'll hear from a partner election official or nonprofit soon
                  about how you can help everyone in {fallbacks[this.state]} vote.
               </p>
            </div>
         );
      }
   }

}
