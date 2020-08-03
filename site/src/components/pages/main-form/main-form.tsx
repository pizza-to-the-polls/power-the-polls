import { Component, h, Host, Prop, State } from "@stencil/core";

import { PartnerList } from "../../../data";
import { Fragment } from "../../../util/Fragment";
import analytics from "../../../util/Analytics";

/**
 * The power-the-polls-form for the main site because there are a few additional bits of text and branding that
 * aren't part of power-the-polls-form
 */
@Component( {
   tag: "main-form",
   styleUrl: "main-form.scss",
   shadow: false,
} )
export class PageForm {

   /**
    * The API key to access SmartyStreets which is used for address lookup.
    */
   @Prop() public smartyStreetsApiKey?: string;

   @State() private formComplete: boolean;

   constructor() {
      this.formComplete = false;
   }
   public render() {
      const paths = document.location.pathname.split( "/" ).filter( x => x !== "" );
      const urlParam = paths.length > 0 ? paths[0] : "";
      const partner = ( PartnerList.filter( x => x.id === urlParam ) || [null] )[0];
      const partnerId = partner?.actionKitKey || partner?.id;
      const formCompleted = () => {
         analytics.signup();
         this.formComplete = true;
      };
      const formError = ( err: any ) => {
         console.error( "Error submitting data", err );
      };
      return (
         <Host>
            <img
               class="main-logo"
               alt="Power the Polls"
               src="assets/images/logo-icon-pink.png"
            />
            {!this.formComplete ? ( <Fragment>
               <h1>POWER THE POLLS IS RECRUITING A NEW WAVE OF POLL WORKERS</h1>
               <p>
                  America is facing an unprecedented shortage of poll
                  workers that could mean closed polling places and long
                  delays. You can help make sure we have a safe, fair,
                  efficient election for all voters.
                  </p>
               <hr />
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
