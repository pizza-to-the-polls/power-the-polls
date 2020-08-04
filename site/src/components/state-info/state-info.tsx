import { Component, h, Prop, State } from "@stencil/core";

import { fetchFromWE } from "../../util/workElections";

import { Jurisdiction, State as StateType } from "./types";
import WorkElectState from "./WorkElectState";

const fallbacks: {[abrieve: string]: string} = {
   OR: "Oregon",
   HI: "Hawaii",
   ME: "Maine",
   MI: "Michigan",
   WA: "Washington",
};

/**
 * Component to render local info about how to be a poll worker.
 */
@Component({
  tag: "state-info",
  styleUrl: "state-info.scss",
})
export class StateInfo {

   /**
    * State abrieviation
    */
   @Prop() public state?: string;

   /**
    * State id in work elections
    */
   @Prop() public stateId: number | null = null;

   @State() public jurisdictions: Array<Jurisdiction> = [];
   @State() public info?: StateType;

  public async componentWillLoad() {
    if( this.stateId ) {
      this.jurisdictions = await fetchFromWE(`/jurisdictions/?summary=true&state_id=${this.stateId}`);
      this.info = await fetchFromWE(`/states/${this.stateId}/`);
    }
  }

  public render() {
     if( this.stateId ) {
        if( this.info ) { return (<WorkElectState info={this.info} jurisdictions={this.jurisdictions} />); }
     } else if(this.state && fallbacks[this.state]) {
        return (<div>
           <h2>{fallbacks[this.state]}</h2>
           <p>
              You'll hear from a partner election official or nonprofit soon
              about how you can help everyone in {fallbacks[this.state]} vote.
           </p>
        </div>);
     }
  }

}
