import { Component, Event, EventEmitter, h, Host, Prop, State } from "@stencil/core";

import { toQueryString } from "../../util";
import { Fragment } from "../../util/Fragment";

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
    * The URL where the form data will be submitted
    */
   @Prop() public destination: string = "https://ptp.actionkit.com/rest/v1/action/";

   /**
    * The API key to access SmartyStreets which is used for address lookup.
    */
   @Prop() public smartyStreetsApiKey?: string;

   /**
    * The label for an additional field to be displayed on the signup form. If undefined,
    * no additional field will be displayed.
    */
   @Prop() public customFormFieldLabel?: string;

   @Prop() public optUserOutOfChase: boolean = false;

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

   @State() private isFormComplete: boolean;
   @State() private city?: string;
   @State() private county?: string;
   @State() private state?: string;

   constructor() {
      this.isFormComplete = false;
   }

   public render() {
      const source = this.partnerId;
      const chase = this.optUserOutOfChase === true ? "" : "true";
      const partnerField = this.customFormFieldLabel;
      const submissionUrl = this.destination;

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
            this.city = data.city || "";
            this.county = data.action_county || "";
            this.state = data.state || "";

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
                        this.isFormComplete = true;
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
         } finally { // make sure we cancel the submit so the browser doesn't do anything
            e.preventDefault();
            return false;
         }
      };

      return ( <Host>
         {this.isFormComplete ? (
            <article>
               <h1>Thanks for signing up to Power the Polls!</h1>
               <h2>We'll be in touch!</h2>
               <hr />
               <div class="disclaimer">
                  <p><strong>Please note:</strong> You still need to complete an application for your community!</p>
                  <p>The application process for poll workers is different for every state, county, and voting territory. In the weeks ahead, Power the Polls will follow up via email and text message to make sure you complete the correct application for your community and are connected with your local election administrator.</p>
               </div>
               <poll-worker-info
                  city={this.city}
                  county={this.county}
                  state={this.state}
               />
            </article>
         ) : ( <Fragment>
            <h3>Help democracy in your community. Sign up to Power the Polls.</h3>
            <form
               name="signup"
               method="POST"
               action={submissionUrl}
               onSubmit={submitForm}
            >
               <label>
                  Name<span class="ak-required-flag">*</span>
                  <input
                     type="text"
                     required
                     name="name"
                  />
               </label>

               <label>
                  Email address<span class="ak-required-flag">*</span>
                  <input
                     type="email"
                     required
                     name="email"
                  />
               </label>

               <label>
                  Mobile phone
                  <input
                     type="text"
                     name="mobile_phone"
                  />
               </label>

               {( partnerField ? (
                  <label>
                     {partnerField}
                     <input
                        type="text"
                        required
                        name="user_partner_field"
                     />
                  </label>
               ) : null )}

               <address-input
                  showStateSelect={true}
                  smartyStreetsApiKey={this.smartyStreetsApiKey}
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
                  value={chase}
               />

               <input type="hidden" name="country" value="United States" />
               <input type="hidden" name="page" value="join" />
               <input type="hidden" name="utf8" value={"\u1234"} />
               <input type="hidden" name="js" value="1" />

               <button
                  type="submit"
                  class="button"
               >Sign Up</button>

               <p class="disclaimer">
                  By signing up, you agree to receive occasional emails or text messages from Power the Polls and
                  accept our <stencil-route-link url="/privacy">Privacy Policy</stencil-route-link>. You can unsubscribe
                  at any time. For texts, message and data rates may apply. Text HELP for Info. Text STOP to quit.
               </p>
            </form>
         </Fragment> )}
      </Host> );
   }

}
