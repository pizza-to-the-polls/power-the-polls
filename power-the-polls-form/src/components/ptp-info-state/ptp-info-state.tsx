import { Component, h, Prop, State, Watch } from "@stencil/core";

import { JurisdictionInfo, StateInfo } from "../../data/States";
import { PtpLink } from "../../util";
import {
   fetchStateInfo,
   fetchStateJurisdictionsList,
   findStateId,
} from "../../util/WorkElections";

/**
 * When we have no specific polling jurisdiction for a user and just their state we
 * display a list of all the counties for them to choose from.
 */
@Component({
   tag: "ptp-info-state",
   styleUrl: "ptp-info-state.scss",
})
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

   @Watch("state")
   public onStateChanged() {
      this.resetState();
   }

   public render() {
      const info = this.stateInfo;

      return info == null ? (
         <ui-loading-spinner />
      ) : (
         <div>
            <h2>{info.name}</h2>
            {info.notes && <p>{info.notes}</p>}
            <div class="jurisdictions">
               {this.stateJurisdictions.map(({ id, name }) => (
                  <PtpLink
                     path={`/jurisdiction/${id}`}
                     anchorClass="jurisdiction"
                  >
                     {name}
                  </PtpLink>
               ))}
            </div>
         </div>
      );
   }

   private resetState() {
      this.stateId = this.state ? findStateId(this.state) : null;
      if (this.stateId) {
         fetchStateJurisdictionsList(this.stateId).then(
            (x) => (this.stateJurisdictions = x),
         );
         fetchStateInfo(this.stateId).then((x) => (this.stateInfo = x));
      } else {
         this.stateInfo = undefined;
         this.stateJurisdictions = [];
      }
   }
}
