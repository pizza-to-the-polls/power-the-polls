import { Component, h, Prop, State } from "@stencil/core";

import { Partner } from "../../data/types";
import { REPO_NAME, REPO_ORG } from "../../util/constants";

@Component( {
   tag: "ui-partner-image",
   styleUrl: "ui-partner-image.scss",
   shadow: false,
} )
export class UiPartnerImage {

   public static readonly InvalidPartner: Partner = {
      partnerId: "invalid",
      name: "Invalid",
   };

   @Prop() public partner: Partner;
   @Prop() public chosenPartner?: string;
   @Prop() public excludeAnchor: boolean;
   /**
    * If `true` the image will not be loaded from the deployed assets but from the `partner-updates` branch on GitHub
    */
   @Prop() public sourceFromDevBranch: boolean;

   @State() private loading: boolean;

   constructor() {
      this.partner = UiPartnerImage.InvalidPartner;
      this.excludeAnchor = false;
      this.sourceFromDevBranch = false;
      this.loading = true;
   }

   public render() {
      const { partner, chosenPartner } = this;
      return (
         <div
            class={{
               "background": partner.logoIsDark ?? false,
               "chosen-partner": chosenPartner === partner.partnerId,
            }}>
            {!this.excludeAnchor &&
               <span id={partner.partnerId} class="anchor"></span>
            }
            <img
               src={partner.logo?.startsWith( "data:" )
                  ? partner.logo
                  : ( this.sourceFromDevBranch ? `https://raw.githubusercontent.com/${REPO_ORG}/${REPO_NAME}/partner-updates/site/public` : "" ) + `/assets/images/partners/${partner.logo}`}
               title={partner.name}
               onLoad={() => this.loading = false}
            />
            {this.loading &&
               <div class={{ "loading": true, "dark": partner.logoIsDark ?? false }}>
                  <div class="double-bounce1"></div>
                  <div class="double-bounce2"></div>
               </div>
            }
         </div>
      );
   }

}
