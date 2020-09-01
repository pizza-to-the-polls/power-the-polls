import { Component, Event, EventEmitter, FunctionalComponent, h, Host, Method, Prop, State } from "@stencil/core";

import { States } from "../../data";
import { toQueryString } from "../../util";
import { PtpLink } from "../../util/PtpLink";

import NextSteps from "../../util/NextSteps";

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
      const stateInfo = this.state && this.state in States ? States[this.state] : null;
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

      //
      // see: https://docs.google.com/document/d/10ngLtEP5wv48aNry3OzCgFhmzguBoSPNJtQfRS4Xn8Y/edit
      //
      const nextSteps = this.state === "ME" ?
         [
            () => <Fragment>
               We are sharing your information with our state partners who will be following up to help you connect with your local administrators. <strong>You'll hear from a partner in the next week</strong> about how you can help serve as a poll worker in Maine.
            </Fragment>,
            () => "In the meantime, please review the state requirements and compensation below and encourage your friends and family to sign up to be poll workers and help ensure a safe and fair election!",
         ]
         : this.state === "MI" ?
            [
               () => <Fragment>
                  We are sharing your information with election administrators and our state partners who will follow up to help you be placed as a poll worker! <strong>You'll hear from a partner in the next week</strong> about how you can help serve as a poll worker in Michigan.
               </Fragment>,
               () => "In the meantime, learn more about hours, compensation, and requirements for your community below and encourage your friends and family to sign up to be poll workers and help ensure a safe and fair election!",
            ] :
            [
               () => <Fragment><strong>Complete your official application to be a poll worker!</strong> Learn more about hours, compensation, and requirements for your community below and be sure to complete your official application!</Fragment>,

               ( stateInfo == null || !stateInfo.semiPartner ) ?
                  () => "In the weeks leading up to the election, you will hear back from your local election administrators if you were selected to be a worker in your jurisdiction."
                  : () => "We’ll be reaching out in the next week to answer any questions you have and make sure you’ve completed your application so we can help you become a poll worker. Be on the lookout for a call from our team!",

               ( stateInfo == null || !stateInfo.semiPartner ) ?
                  () => "Please encourage your friends and family to sign up to be poll workers and help ensure a safe and fair election!"
                  : () => "Help us recruit more poll workers! Please encourage your friends and family to sign up to help ensure a safe and fair election!",
            ];

      return ( <Host>
         {this.formStatus === "completed" ? (
            <article>
               <NextSteps stateInfo={stateInfo} />
               <poll-worker-info
                  city={this.city}
                  county={this.county}
                  state={this.state}
               >
                  {stateInfo == null || !stateInfo.noPollWorkersNeeded && (
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
                     </div>
                  )}
               </poll-worker-info>
            </article>
         ) : ( <Fragment>
            <h3>Help your community and sign up to Power the Polls!</h3>
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
