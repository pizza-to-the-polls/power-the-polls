import { Component, h, Prop } from "@stencil/core";

import { Partner } from "../../data/types";

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
    * IF `true` the image will not be loaded from the deployed assets but from the `partner-updates` branch
    * on GitHub (https://raw.githubusercontent.com/pizza-to-the-polls/power-the-polls/partner-updates/site/public/assets/images/partners/aclugeorgia.png)
    */
   @Prop() public sourceFromDevBranch: boolean;

   constructor() {
      this.partner = UiPartnerImage.InvalidPartner;
      this.excludeAnchor = false;
      this.sourceFromDevBranch = false;
   }

   public render() {
      const { partner, chosenPartner } = this;
      return (
         <div
            class={{
               "dark": partner.logoIsDark ?? false,
               "chosen-partner": chosenPartner === partner.partnerId,
            }}>
            {!this.excludeAnchor &&
               <span id={partner.partnerId} class="anchor"></span>
            }
            <img
               src={partner.logo?.startsWith( "data:" )
                  ? partner.logo
                  : ( this.sourceFromDevBranch ? "https://raw.githubusercontent.com/nexussays/power-the-polls/partner-updates/site/public" : "" ) + `/assets/images/partners/${partner.logo}`}
               title={partner.name}
            />
         </div>
      );
   }

}
