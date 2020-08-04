import { Component, Event, EventEmitter, h, Host, Prop, State } from "@stencil/core";

import { Fragment } from "../../util/Fragment";
import { toQueryString } from "../../util";

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

   @State() private formComplete: boolean;
   @State() private showStateFallback: boolean;
   @State() private showPartner: boolean;
   @State() private stateName?: string;
   @State() private city?: string;
   @State() private county?: string;
   @State() private state?: string;

   constructor() {
      this.formComplete = false;
      this.showStateFallback = false;
      this.showPartner = false;
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
            const city: string = data.city || "";
            const county: string = data.action_county || "";
            const stateCode: string = data.state || "";

            this.city = city;
            this.county = county;
            this.state = stateCode;
            // query for work elections data so we can display the completion page with further information
            // this.getWorkElectionsData( stateCode, city, county );

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
                     || response.status === 0 /*we're currently makign a simple no-cors request and can't get the status*/ ) {
                     let evt = this.submitCompleted.emit();
                     if( !evt.defaultPrevented ) {
                        this.formComplete = true;
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
         {this.formComplete ? (
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

               {this.showStateFallback ? ( <Fragment>
                  <p>
                     Unfortunately it doesn't look like {this.stateName ? this.stateName : "your local election jurisdiction"} is signing up poll workers at this time.
                  </p>
                  <p>
                     We are still collecting information compiling a list of locations that accept poll workers from other jurisdictions and will be in touch with other options when we're closer to the election.
                  </p>
               </Fragment> ) : null}

               {this.showPartner ? ( <Fragment>
                  <p>
                     You'll hear from a partner election official or nonprofit soon about how you can help everyone in {this.stateName ? this.stateName : "your state"} vote.
                  </p>
               </Fragment> ) : null}

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
                  accept our <stencil-route-link url="./privacy">Privacy Policy</stencil-route-link>. You can unsubscribe
                  at any time. For texts, message and data rates may apply. Text HELP for Info. Text STOP to quit.
               </p>
            </form>
         </Fragment> )}
      </Host> );
   }

   /*
   private getWorkElectionsData( stateCode: string, city: string, county: string ){
      let state = WorkElections[stateCode];
      if( state == null ) {
         let fallback = WorkElectionsFallbacks[stateCode];
         if( fallback ) {
            this.showStateFallback = true;
            this.stateName = fallback;
            analytics.signupLinkClickedFallback( "fallback_state", fallback );
            // return ["fallback", fallback];
         } else {
            fallback = PartnerStates[stateCode];
            if( fallback ) {
               this.showPartner = true;
               this.stateName = fallback;
               analytics.signupLinkClickedFallback( "partner_state", fallback );
               // return ["partner", fallback];
            } else {
               // return ["unknown", ""];
            }
         }
      } else {
         let jurisdictionCode = -1;
         let matchingJurisdictionName = "";
         if( state.jurisdictions[county + " County"] != null ) {
            jurisdictionCode = state.jurisdictions[county + " County"];
            matchingJurisdictionName = county;
         }
         if( state.jurisdictions[city + " (City)"] != null ) {
            jurisdictionCode = state.jurisdictions[city + " (City)"];
            matchingJurisdictionName = city;
         }

         if( jurisdictionCode === -1 ) {
            let together = [city, "city,", county, "County"].join( " " );
            if( state.jurisdictions[together] ) {
               jurisdictionCode = state.jurisdictions[together];
               matchingJurisdictionName = together;
            }
         }

         analytics.signupLinkClicked( jurisdictionCode !== -1
            ? `/j/${jurisdictionCode}/${matchingJurisdictionName.replace( /\s/g, "-" )}`
            : `/states/${state.id}/${state.name}` );

         if( jurisdictionCode !== -1 ) {
            fetch( `https://workelections.powerthepolls.org/jurisdictions/${jurisdictionCode}/`, {
               mode: "cors",
               headers: {},
            } )
               .then( response => {
                  if( response.status !== 200 ) {
                     console.log( response.statusText, response.status );
                  } else {
                     response.json().then( ( data: JurisdictionQueryResponse ) => {
                        this.jurisdiction = data;
                     } );
                  }
               } )
               .catch( err => console.log( "workelections query error", err ) );
         }
         // return ["found", path];
      }
   }
   //*/

}
