import { Component, Event, EventEmitter, FunctionalComponent, h, Host, Method, Prop, State } from "@stencil/core";

import { PartnerStates, SemiPartnerStates } from "../../data";
import { toQueryString } from "../../util";

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

   /**
    * The URL where the form data will be submitted
    */
   private destination?: string;

   @State() private formStatus: "incomplete" | "submitting" | "completed";
   @State() private city?: string;
   @State() private county?: string;
   @State() private state?: string;

   constructor() {
      this.formStatus = "incomplete";
      this.optUserOutOfChase = false;
      this.destination = "https" + "://ptp.actionkit.com/rest/v1/action/";
   }

   @Method()
   public reset() {
      this.formStatus = "incomplete";
      this.city = undefined;
      this.county = undefined;
      this.state = undefined;
      return Promise.resolve();
   }

   public render() {
      const source = this.partnerId;
      const chase = this.optUserOutOfChase === true || ( this.optUserOutOfChase as any ) === "true" ? false : true;
      const partnerField = this.customFormFieldLabel;
      const submissionUrl = this.destination;
      let ski = "SMARTY_STREETS_KEY"; // injected by build, see stencil.config.ts
      const sk = this.smartyStreetsApiKey || ( ski === "none" ? undefined : ski );

      // Adapted from https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s02.html
      const phoneValidationRegex = "\\(?([0-9]{3})\\)?[-.\\s]?[0-9]{3}[-.\\s]?[0-9]{4}";

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
            const county = data.action_county || "";
            const state = data.state || "";

            this.formStatus = "submitting";

            // submit to actionkit
            fetch( form.action, {
               method: form.method,
               body: toQueryString( data ),
               mode: "no-cors",
               headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
               },
            } )
               .then( ( response ) => {
                  if( response.status === 200 || response.status === 201
                     || response.status === 0 /*we're currently making a simple no-cors request and can't get the status; presume success*/ ) {
                     let evt = this.submitCompleted.emit();
                     if( !evt.defaultPrevented ) {
                        this.formStatus = "completed";
                        this.city = city;
                        this.county = county;
                        this.state = state;
                     }
                  } else {
                     response.json()
                        .then( json => this.submitError.emit( { statusText: response.statusText, status: response.status, data: json } ) )
                        .catch( e2 => console.error( e2 ) );
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
               {this.state != null && this.state in PartnerStates ?
                  (
                     <Fragment>
                        <h1>Thanks for signing up to Power the Polls!</h1>
                        <p>
                           You'll hear from a partner election official or nonprofit soon about how you can help serve as a poll worker in {PartnerStates[this.state]}.
                        </p>
                     </Fragment>
                  ) : (
                     <Fragment>
                        <h1>You’re one step closer to Powering the Polls!</h1>
                        <h2>What’s next?</h2>
                        <hr />
                        <p>
                           <strong>You still need to complete an application to be a poll worker!</strong> Use the below information to apply to be a poll worker in your community.
                        </p>
                        {this.state != null && this.state in SemiPartnerStates ? (
                           <p>
                              Power the Polls is working with local organizations and election administrators to connect them with individuals like you that want
                              to serve as poll workers. We’ll be reaching out in the next week to answer any questions you have and make sure you’ve completed your
                              application so we can help you become a poll worker.
                           </p>
                        ) : (
                              <p>
                                 Power the Polls is working with local organizations and election administrators to connect them with individuals like you that want to
                                 serve as poll workers. In the weeks leading up to the election, you will hear back from your local election administrators if you were
                                 selected to be a worker in your jurisdiction.
                              </p>
                           )}
                        <p>
                           In the meantime, please encourage your friends and family to sign up to be poll workers!
                        </p>
                     </Fragment>
                  )}
               <poll-worker-info
                  city={this.city}
                  county={this.county}
                  state={this.state}
               />
            </article>
         ) : ( <Fragment>
            <h3>Help democracy in your community. Sign up to Power the Polls.</h3>
            <form
               method="POST"
               action={submissionUrl}
               onSubmit={submitForm}
            >
               <label>
                  Name<span class="required">*</span>
                  <input
                     type="text"
                     required
                     name="name"
                  />
               </label>

               <label>
                  Email address<span class="required">*</span>
                  <input
                     type="email"
                     required
                     name="email"
                  />
               </label>

               <label>
                  Mobile phone<span class="required">*</span>
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

               <address-input
                  smartyStreetsApiKey={sk}
               />

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
               >Sign Up</button>

               {chase && (
                  <p class="disclaimer">
                     By signing up, you agree to receive occasional emails or text messages from Power the Polls and
                     accept our <a href="https://powerthepolls.org/privacy" target="_blank">Privacy Policy</a>. You can unsubscribe
                     at any time. For texts, message and data rates may apply. Text HELP for Info. Text STOP to quit.
                  </p>
               )}
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
