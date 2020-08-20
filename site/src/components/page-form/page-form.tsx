import "@ptp-us/power-the-polls-form";
import { Component, h, Host, Prop, State } from "@stencil/core";
import { RouterHistory } from "@stencil/router";

import { PartnerList } from "../../data";
import analytics from "../../util/Analytics";
import { Fragment } from "../../util/Fragment";
import getParams from "../../util/getParams";


const SIGNUP_PATH: String = "signup";

/**
 * The power-the-polls-form for the main site because there are a few additional bits of text and branding that
 * aren't part of power-the-polls-form
 */
@Component( {
   tag: "page-form",
   styleUrl: "page-form.scss",
   shadow: false,
} )
export class PageForm {

   /**
    * The API key to access SmartyStreets which is used for address lookup.
    */
   @Prop() public smartyStreetsApiKey?: string;

   @Prop() public history?: RouterHistory;

   @State() private formComplete: boolean;

   constructor() {
      this.formComplete = false;
   }

   public render() {
      // see if this is a partner link, e.g., https://powerthepolls.org/aflcio
      const paths = document.location.pathname.split( "/" ).filter( x => x !== "" );
      const urlParam = paths.length > 0 ? paths[0].toLowerCase() : "";
      const partner = urlParam != null
         ? ( PartnerList.filter(
            p => ( p.vanityUrls && p.vanityUrls.filter( x => x.toLowerCase() === urlParam ).length > 0 ) || p.partnerId.toLowerCase() === urlParam,
         ) || [null] )[0]
         : null;

      if( urlParam !== "" && urlParam !== SIGNUP_PATH && partner == null ) {
         // change URL to /signup if the partner ID is invalid so there is no question that the partnerID will not be included in the form
         this.history?.replace( "/" + SIGNUP_PATH );
      } else if( partner != null && ( ( partner.vanityUrls && partner.vanityUrls.filter( x => x === paths[0] ).length === 0 ) || ( partner.vanityUrls == null && paths[0] !== partner.partnerId ) ) ) {
         // else normalize the URL if we've found a partner
         this.history?.replace( "/" + ( partner.vanityUrls != null ? partner.vanityUrls[0] : partner.partnerId ) );
      }

      // get the partnerID from the partner parsed out of the URL (if any), else see if there is a source querystring are and use that, exactly, as the partner ID
      const sourceParam = getParams()?.source;
      const partnerId = partner?.partnerId || sourceParam;
      if( partner?.partnerId != null && sourceParam != null && partner?.partnerId !== sourceParam ) {
         console.warn( `Error. Partner ID conflict:`, partner?.partnerId, sourceParam );
      }

      let daysLeft = Math.round( ( new Date( 2020, 9, 1 ).getTime() - Date.now() ) / 1000 / 60 / 60 / 24 / 7 ) * 7;
      // count down every 10 days (since the 2020-10-01 end is arbitrary) by extracting off the days less than 10 and rounding up or down
      daysLeft = ( daysLeft - daysLeft % 10 ) + Math.round( daysLeft % 10 / 10 ) * 10;

      const formCompleted = () => {
         analytics.signup();
         this.formComplete = true;
      };

      const formError = ( err: any ) => {
         console.log( "Error submitting data", err );
      };

      return (
         <Host>
            {!this.formComplete ? ( <Fragment>
               <img
                  class="main-logo"
                  alt="Power the Polls"
                  src="/assets/images/logo-icon-pink.png"
               />
               {partner?.customLandingLogo && (
                  <img
                     class={{ "custom-logo": true, "dark": partner.logoIsDark ?? false }}
                     src={`/assets/images/partners/${partner.logo}`}
                     title={partner.name}
                  />
               )}
               <h1>America is facing a record shortage of poll workers. </h1>
               <p>
                  As coronavirus continues to impact Americans across the country, we are also seeing a staggering decrease in poll workers &mdash;
                  which could mean closed polling places and long delays for elections in 2020. You can help make sure we have a safe, fair,
                  efficient election for all voters, and potentially get paid to do it
               </p>
               <hr />
               <div class="impact-boxes">
                  <impact-box>
                     <h2>250K</h2>
                     <p>Poll workers still needed</p>
                  </impact-box>
                  <impact-box>
                     <h2>&lt; {daysLeft} DAYS</h2>
                     <p>To recruit and train them</p>
                  </impact-box>
               </div>
            </Fragment> ) : null}
            <power-the-polls-form
               id="form"
               partnerId={partnerId}
               optUserOutOfChase={partner?.optUserOutOfChase || false}
               customFormFieldLabel={partner?.customSignupFormField}
               smartyStreetsApiKey={this.smartyStreetsApiKey}
               onSubmitCompleted={formCompleted}
               onSubmitError={formError}
            />
         </Host>
      );
   }
}
