import { Component, h, Host, Prop } from "@stencil/core";

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
    * To display custom text and images for a specific Power the Polls partner, enter their ID here.
    */
   @Prop() public partnerId?: string;

   /**
    * The URL where the form data will be submitted
    */
   @Prop() public destination: string = "https://ptp.actionkit.com/act/";

   @Prop() public optUserOutOfChase: boolean = false;

   /**
    * The label for an additional field to be displayed on the signup form
    */
   @Prop() public customFormFieldLabel?: string;

   public render() {

      const source = this.partnerId;
      const chase = this.optUserOutOfChase === true ? "" : "true";
      const partnerField = this.customFormFieldLabel;
      const submissionUrl = this.destination;

      const submitForm = ( e: Event ) => {
         // TODO: Gather up all the form data and submit to submissionUrl
         e.preventDefault();
         return false;
      };

      return ( <Host>
         <h3>Help your community and sign up to Power the Polls.</h3>
         <form
            name="signup"
            method="POST"
            action={submissionUrl}
            onSubmit={submitForm}
         >
            <label>
               Name<span class="ak-required-flag">*</span>
               <input type="text" required name="name" />
            </label>

            <label>
               Email address<span class="ak-required-flag">*</span>
               <input type="email" required name="email" />
            </label>

            <label>
               Mobile phone
                  <input
                  type="text"
                  name="mobile_phone"
                  id="id_mobile_phone"
               />
            </label>

            {( partnerField ? (
               <label>
                  {partnerField}
                  <input type="text" required name="user_partner_field" />
               </label>
            ) : null )}

            <label>
               State
                  <select name="state">
                  <option disabled selected value="">Select your state or territory</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                  <option value="AS">American Samoa</option>
                  <option value="GU">Guam</option>
                  <option value="MP">Northern Mariana Islands</option>
                  <option value="PR">Puerto Rico</option>
                  <option value="VI">Virgin Islands</option>
               </select>
            </label>

            <label>
               Street address<span class="ak-required-flag">*</span>
               <input
                  type="text"
                  required name="address1"
                  id="id_address1"
               />
               <ul class="us-autocomplete-pro-menu" style={{ display: "none" }}></ul>
            </label>

            <input
               type="hidden"
               name="address2"
               id="id_address2"
            />
            <input
               type="hidden"
               value=""
               name="zip"
               id="id_zip"
            />
            <input
               type="hidden"
               name="city"
               id="id_city"
            />
            <input
               type="hidden"
               name="action_county"
               id="id_action_county"
            />
            <input
               type="hidden"
               name="source"
               id="id_source"
               value={source}
            />
            <input
               type="hidden"
               name="country"
               value="United States"
            />
            <input
               type="hidden"
               name="user_chase_enabled"
               value={chase}
            />
            <input
               type="hidden"
               name="page"
               value="join"
            />

            <button
               type="submit"
               class="button"
            >Sign Up</button>

            <p class="disclaimer">
               By signing up, you agree to receive occasional emails or text messages from Power the Polls and
               accept our <stencil-route-link url="./privacy-info">Privacy Policy</stencil-route-link>. You can unsubscribe
               at any time. For texts, message and data rates may apply. Text HELP for Info. Text STOP to quit.
            </p>
         </form>
      </Host> );
   }
}
