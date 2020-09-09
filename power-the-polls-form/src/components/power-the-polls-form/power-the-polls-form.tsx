import { Component, Event, EventEmitter, FunctionalComponent, h, Host, Method, Prop, State } from "@stencil/core";

import { States } from "../../data";
import { AdditionalFormData } from "../../util";
import { submitToActionKit } from "../../util/ActionKit";
import NextSteps from "../../util/NextSteps";
import { PtpLink } from "../../util/PtpLink";

/**
 * Empty container element, i.e.: `<></>`
 **/
const Fragment: FunctionalComponent<{}> = ( _, children ) => children;

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

   @Prop() public optUserOutOfChase: boolean;

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

   @State() private formStatus: "incomplete" | "submitting" | "completed";
   @State() private formData: AdditionalFormData;

   constructor() {
      this.formStatus = "incomplete";
      this.formData = {};
      this.optUserOutOfChase = false;
   }

   @Method()
   public reset() {
      this.formStatus = "incomplete";
      this.formData = {};
      return Promise.resolve();
   }

   public render() {
      const source = this.partnerId;
      const chase = this.optUserOutOfChase === true || ( this.optUserOutOfChase as any ) === "true" ? false : true;
      const partnerField = this.customFormFieldLabel;
      const stateInfo = this.formData.state && this.formData.state in States ? States[this.formData.state] : null;
      // Adapted from https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s02.html
      const phoneValidationRegex = "(?:\\+1)?[-.\\s]?\\(?([0-9]{3})\\)?[-.\\s]?[0-9]{3}[-.\\s]?[0-9]{4}";

      const submitForm = ( e: Event ) => {
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
            // hacky way to get the data from address-input without wiring up events or callbacks
            const city = data.city || "";
            const county = data.user_county || "";
            const state = data.state || "";
            const name = data.name || "";
            const email = data.email || "";
            const phone = data.mobile_phone || "";
            const zip = data.zip || "";

            this.formStatus = "submitting";

            submitToActionKit( data )
               .then( ( response ) => {
                  if( response === true ) {
                     let evt = this.submitCompleted.emit();
                     if( !evt.defaultPrevented ) {
                        this.formStatus = "completed";
                        this.formData = { ...this.formData, city, county, state, name, email, phone, zip };
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

      //
      // see: https://docs.google.com/document/d/10ngLtEP5wv48aNry3OzCgFhmzguBoSPNJtQfRS4Xn8Y/edit
      //
      const nextSteps = this.formData.state === "ME" ?
         [
            () => <Fragment>
               We are sharing your information with our state partners who will be following up to help you connect with your local administrators.&nbsp;
               <strong>You'll hear from a partner in the next week</strong> about how you can help serve as a poll worker in Maine.
            </Fragment>,
            () => "In the meantime, please review the state requirements and compensation below and encourage your friends and family to sign up to be poll workers and help ensure a safe and fair election!",
         ]
         : this.formData.state === "MI" ?
            [
               () => <Fragment>
                  We are sharing your information with election administrators and our state partners who will follow up to help you be placed as a poll worker!&nbsp;
                  <strong>You'll hear from a partner in the next week</strong> about how you can help serve as a poll worker in Michigan.
               </Fragment>,
               () => "In the meantime, learn more about hours, compensation, and requirements for your community below and encourage your friends and family to sign up to be poll workers and help ensure a safe and fair election!",
            ] :
            [
               () => <Fragment><strong>Complete your official application to be a poll worker!</strong> Learn more about hours, compensation, and requirements for your community below and be sure to complete your official application!</Fragment>,

               ( stateInfo == null || !stateInfo.semiPartner ) ?
                  () => "In the weeks leading up to the election, you will hear back from your local election administrators if you were selected to be a worker in your jurisdiction."
                  : () => "We’ll be reaching out in the next week to answer any questions you have and make sure you’ve completed your application so we can help you become a poll worker. Be on the lookout for a call from our team!",

               () => "Help us recruit more poll workers! Please encourage your friends and family to sign up to help ensure a safe and fair election!",
            ];

      const michiganSubmitForm = ( e: Event ) => {
         try {
            // TODO: Remove this duplicate code with the form
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
            submitToActionKit( data )
               .then( result => {
                  if( result !== true ) {
                     console.error( result );
                  }
               } );
         } catch( e ) {
            console.error( e );
         } finally {
            e.preventDefault();
            return false;
         }
      };
      const michiganLanguages = [
         "English only",
         "Spanish",
         "Arabic",
         "Tagalog",
         "Chinese",
         "Creole",
         "Vietnamese",
         "Navajo",
         "Korean",
         "French",
         "Other", // TODO: provide an input and let user enter their own value
      ];
      const michiganTravelOptions = [
         "Not willing to travel",
         "Less than 10 miles",
         "Less than 50 miles",
         "I'll go wherever I'm needed",
      ];

      return ( <Host>
         {this.formStatus === "completed" ? (
            <article>
               <NextSteps stateInfo={stateInfo} />
               <poll-worker-info
                  city={this.formData.city}
                  county={this.formData.county}
                  state={this.formData.state}
                  formData={this.formData}
               >
                  {( stateInfo == null || !stateInfo.noPollWorkersNeeded ) && (
                     <div>
                        <div class="next-steps">
                           {nextSteps.map( ( x, i ) => (
                              <p>
                                 <span class="number">{i + 1}</span>
                                 {x()}
                              </p>
                           ) )}
                        </div>
                        <hr />
                        {this.formData.state === "MI" ? ( <Fragment>
                           <p>We just need a few more pieces of information from you to help with your application:</p>

                           <form onSubmit={michiganSubmitForm}>

                              <input
                                 type="hidden"
                                 name="city"
                                 value={this.formData?.city}
                              />
                              <input
                                 type="hidden"
                                 name="state"
                                 value={this.formData?.state}
                              />
                              <input
                                 type="hidden"
                                 name="zip"
                                 value={this.formData?.zip}
                              />
                              <label>
                                 Street address
                                 <input
                                    type="text"
                                    required
                                    name="address1"
                                 />
                              </label>

                              <label>
                                 Are you fluent in a language besides English?
                                 <select name="user_additional_language" required>
                                    {michiganLanguages.map( x => <option value={x}>{x}</option> )}
                                 </select>
                              </label>

                              <label>
                                 In Michigan, eligible poll workers can serve anywhere in the state. Are you willing to travel, and if so, how far can you travel?
                                 <select name="user_mi_travel" required>
                                    {michiganTravelOptions.map( x => <option value={x}>{x}</option> )}
                                 </select>
                              </label>

                              <input type="hidden" name="page" value="mi-extra" />
                              <input
                                 type="hidden"
                                 name="email"
                                 value={this.formData?.email}
                              />

                              <button
                                 type="submit"
                                 class="button"
                              >Submit</button>

                           </form>
                        </Fragment> ) : null}
                     </div>
                  )}
               </poll-worker-info>
            </article>
         ) : ( <Fragment>
            <h3>Help your community and sign up to Power the Polls!</h3>
            <form onSubmit={submitForm}>
               <label>
                  Name <span class="required">*</span>
                  <input
                     type="text"
                     required
                     name="name"
                  />
               </label>

               <label>
                  Email address <span class="required">*</span>
                  <input
                     type="email"
                     required
                     name="email"
                  />
               </label>

               <label>
                  Mobile phone <span class="required">*</span>
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

               <address-input />

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
               >Sign Up To Get Started</button>

               <p class="disclaimer">
                  By signing up, you agree to receive occasional emails or text messages from Power the Polls
                  and{!chase && this.partnerName && ` ${this.partnerName} and`}&nbsp;
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
