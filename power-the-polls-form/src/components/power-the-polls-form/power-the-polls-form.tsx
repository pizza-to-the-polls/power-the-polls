import { Component, Event, EventEmitter, Fragment, h, Host, Method, Prop, State } from "@stencil/core";

import { States } from "../../data";
import { FormSubmissionThankYou, PtpFormData, PtpLink } from "../../util";
import { findJurisdictionId } from "../../util/WorkElections";

import { submitToActionKit } from "./ActionKit";
import MichiganAdditionalInfoForm from "./MichiganAdditionalInfoForm";

/**
 * The Power the Polls sign-up form.
 */
@Component( {
   tag: "power-the-polls-form",
   styleUrl: "power-the-polls-form.scss",
   shadow: false,
} )
export class PowerThePollsForm {

   /**
    * To display custom text and images for a specific Power the Polls partner, enter their
    * ID here.
    */
   @Prop() public partnerId?: string;

   /**
    * Optional name displayed in privacy policy disclaimer when `optUserOutOfChase` is true
    */
   @Prop() public partnerName?: string;

   /**
    * The API key to access SmartyStreets which is used for address lookup.
    */
   @Prop() public smartyStreetsApiKey?: string;

   /**
    * The label for an additional field to be displayed on the signup form. If undefined,
    * no additional field will be displayed.
    */
   @Prop() public customFormFieldLabel?: string;

   @Prop() public optUserOutOfChase?: boolean;

   /**
    * Dispatched when the user has submitted the form and it has successfully POSTed to `destination`
    */
   @Event( {
      eventName: "submitCompleted",
      composed: true,
      cancelable: false,
   } ) public submitCompleted!: EventEmitter;

   /**
    * Dispatched when there is an error submitting the form to `destination`
    */
   @Event( {
      eventName: "submitError",
      composed: true,
      cancelable: false,
   } ) public submitError!: EventEmitter<any>;

   @State() private formStatus: "incomplete" | "processing" | "completed";
   @State() private formData: PtpFormData;
   @State() private michiganFormSubmitted: boolean;

   constructor() {
      this.formStatus = "incomplete";
      this.formData = {};
      this.michiganFormSubmitted = false;
   }

   @Method()
   public reset() {
      this.formStatus = "incomplete";
      this.formData = {};
      this.michiganFormSubmitted = false;
      return Promise.resolve();
   }

   /**
    * The version of this `power-the-polls-form` component
    */
   @Method()
   public version() {
      return Promise.resolve( "CURRENT_VERSION" );
   }

   public render() {
      const source = this.partnerId;
      const chase = this.optUserOutOfChase === true || ( this.optUserOutOfChase as any ) === "true" ? false : true;
      const partnerField = this.customFormFieldLabel;
      const stateInfo = this.formData.state && this.formData.state in States ? States[this.formData.state] : null;
      // Adapted from https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s02.html
      const phoneValidationRegex = "(?:\\+1)?[-.\\s]?\\(?([0-9]{3})\\)?[-.\\s]?[0-9]{3}[-.\\s]?[0-9]{4}";

      const submitForm = ( e: Event ) => {
         if( this.formStatus !== "incomplete" ) {
            e.preventDefault();
            return false;
         }

         try {
            // gather up all the form data
            const form = e.target as HTMLFormElement;
            const elements = [
               ...form.getElementsByTagName( "input" ),
               ...form.getElementsByTagName( "select" ),
            ];
            const data: any = elements.reduce(
               ( x, el ) => { x[el.name] = el.value; return x; },
               ( {} as any ),
            );
            // hacky way to get the data from input-address without wiring up events or callbacks
            const city = data.city || "";
            const county = data.user_county || "";
            const state = data.state || "";
            const name = data.name || "";
            const email = data.email || "";
            const phone = data.mobile_phone || "";
            const zip = data.zip || "";

            this.formStatus = "processing";

            submitToActionKit( data )
               .then( ( response ) => {
                  if( response === true ) {
                     let evt = this.submitCompleted.emit();
                     if( !evt.defaultPrevented ) {
                        this.formStatus = "completed";
                        this.formData = { ...this.formData, city, county, state, name, email, phone, zip, jurisdictionId: findJurisdictionId( state, county, city ) + "" };
                     }
                  } else {
                     this.submitError.emit( response );
                  }
               } )
               .catch( err => {
                  this.submitError.emit( err );
               } );
         } catch( e ) {
            this.submitError.emit( e );
         } finally {
            // make sure we cancel the submit so the browser doesn't do anything
            e.preventDefault();
            return false;
         }
      };

      return ( <Host>
         {this.formStatus === "completed" ? (
            <article>
               <FormSubmissionThankYou stateInfo={stateInfo} />
               {stateInfo?.noPollWorkersNeeded !== true && (
                  <ptp-info-poll-worker
                     city={this.formData.city}
                     county={this.formData.county}
                     state={this.formData.state}
                     formData={this.formData}
                     showNextSteps={true}
                  >
                     <MichiganAdditionalInfoForm
                        formSubmitted={this.michiganFormSubmitted}
                        data={this.formData}
                        onSubmit={() => this.michiganFormSubmitted = true}
                     />
                  </ptp-info-poll-worker>
               )}
            </article>
         ) : ( <Fragment>
            <h3>Help your community and sign up to Power the Polls!</h3>
            <form onSubmit={submitForm}>
               <label>
                  Name
                  <input
                     type="text"
                     required
                     name="name"
                  />
               </label>

               <label>
                  Email address
                  <input
                     type="email"
                     required
                     name="email"
                  />
               </label>

               <label>
                  Mobile phone
                  <input
                     type="tel"
                     required
                     name="mobile_phone"
                     pattern={phoneValidationRegex}
                     title="Please enter a valid US phone number"
                  />
               </label>

               {( partnerField ? (
                  <label>
                     {partnerField}
                     <input
                        type="text"
                        name="user_partner_field"
                     />
                  </label>
               ) : null )}

               <input-address onLookup={x => this.formStatus = x.detail === "STARTED" ? "processing" : "incomplete"} />

               <input
                  type="hidden"
                  name="source"
                  id="id_source"
                  value={source}
               />

               <input
                  type="hidden"
                  name="user_chase_enabled"
                  value={( chase ? "true" : "" )}
               />

               <input type="hidden" name="country" value="United States" />
               <input type="hidden" name="page" value="join" />
               <input type="hidden" name="utf8" value={"\u1234"} />
               <input type="hidden" name="js" value="1" />

               <button
                  type="submit"
                  class="button"
                  disabled={this.formStatus !== "incomplete"}
               >
                  {this.formStatus !== "incomplete" ?
                     <ui-loading-spinner small={true} style={{ padding: "0 0.5em" }} />
                     : null}
                  Sign Up To Get Started
               </button>

               <p class="disclaimer">
                  By signing up, you agree to receive occasional emails or text messages from Power the Polls
                  and {!chase && this.partnerName && `${this.partnerName} and `}
                  accept our <PtpLink path="/privacy">Privacy Policy</PtpLink>. You can unsubscribe
                  at any time. For texts, message and data rates may apply. Text HELP for Info. Text STOP to quit.
               </p>
            </form>
            <footer>
               <p class="disclaimer">
                  <a
                     href="https://www.workelections.com/"
                     target="_blank"
                     rel="noopener"
                  >Powered by Work Elections.</a>
               </p>
            </footer>
         </Fragment> )}
      </Host> );
   }

}
