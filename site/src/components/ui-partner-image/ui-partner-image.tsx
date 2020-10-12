import { Component, Element, h, Listen, Prop, State, Watch } from "@stencil/core";

import { PartnerList } from "../../data";
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

   /**
    * A `Partner` object or partnerID string
    */
   @Prop() public partner: Partner | string;
   /**
    * If this value matches the `partner` ID then the image will have the `chosen-partner` class added which
    * currently pulses the image.
    */
   @Prop() public chosenPartnerId?: string;
   /**
    * By default, an empty <span> with an id set to the partnerId is added to this component. If you don't want to
    * pollute the ID space, you can exclude that span by setting this to `true`
    */
   @Prop() public excludeAnchor: boolean;
   /**
    * If `true` the image will not be loaded from the deployed assets but from the `partner-updates` branch on GitHub
    * @see page-partners-table
    */
   @Prop() public sourceFromDevBranch: boolean;

   @State() private loading: boolean;
   @State() private partnerData!: Partner | null;

   constructor() {
      this.partner = UiPartnerImage.InvalidPartner;
      this.excludeAnchor = false;
      this.sourceFromDevBranch = false;
      this.loading = true;
   }

   public componentWillLoad() {
      this.setPartnerData();
   }

   @Watch( "partner" )
   public onPartnerChange( newVal: Partner | string ) {
      this.setPartnerData( newVal );
   }


   public render() {
      const {
         partnerData,
         loading,
         excludeAnchor,
         chosenPartnerId,
         sourceFromDevBranch } = this;

      if( partnerData === null ) {
         return ( <div class="loading">
            <div class="double-bounce1"></div>
            <div class="double-bounce2"></div>
         </div> );
      }

      return (
         <div
            class={{
               "background": partnerData.logoIsDark ?? false,
               "chosen-partner": chosenPartnerId === partnerData.partnerId,
            }}
         >
            {!excludeAnchor &&
               <span id={partnerData.partnerId} class="anchor"></span>
            }
               <img
                  src={partnerData.logo?.startsWith( "data:" )
                     ? partnerData.logo
                     // allow sourcing from git repo for page-partners-table
                     : ( sourceFromDevBranch ? `https://raw.githubusercontent.com/${REPO_ORG}/${REPO_NAME}/partner-updates/site/public` : "" ) + `/assets/images/partners/${partnerData.logo}`}
                  title={partnerData.name}
                  onLoad={() => this.loading = false}
               />
            {loading &&
               <div class={{ "loading": true, "dark": partnerData.logoIsDark ?? false }}>
                  <div class="double-bounce1"></div>
                  <div class="double-bounce2"></div>
               </div>
            }
         </div>
      );
   }

   private setPartnerData( data?: string | Partner ) {
      data = data || this.partner;
      this.partnerData = typeof data === "string"
         ? [...PartnerList.filter( x => x.partnerId === data ), null][0]
         : data;
   }

}
