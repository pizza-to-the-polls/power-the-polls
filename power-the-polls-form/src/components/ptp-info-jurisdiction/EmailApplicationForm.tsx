import { Fragment, h, Prop, State, Component } from "@stencil/core";
import { JurisdictionInfo } from "../../data/States";
import { PtpFormData, TextInput } from "../../util";

const emailValidationRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneValidationRegex = /(?:\\+1)?[-.\\s]?\\(?([0-9]{3})\\)?[-.\\s]?[0-9]{3}[-.\\s]?[0-9]{4}/;
const nonEmptyStringRegex = /^(?=.*\S).+$/;

type validationOptions = {
   [key: string]: boolean,
};

/**
 * Email application that will only render if there is no application link for the jurisdiction
 */

@Component( {
   tag: "EmailApplicationForm",
   // styleUrl: "power-the-polls-form.scss",
   shadow: false,
})

class EmailApplicationForm {

   @Prop()
   public jurisdiction: JurisdictionInfo;

   @Prop()
   public data: PtpFormData;

   @Prop()
   public onComplete: () => void;

   @State()
   private fieldValidState: validationOptions = {
      name: true,
      email: true,
      county: true,
      phone: true,
      city: true,
      languages: true
   };

   constructor(jurisdiction: JurisdictionInfo, data: PtpFormData, onComplete: () => void) {
      this.jurisdiction = jurisdiction;
      this.data = data;
      this.onComplete = onComplete;
   }

   public render() {
      const j = this.jurisdiction;

      if(
         // if jurisdiction has no email, do not show the e-mail form
         ( j?.email == null || j.email === "" ) ) {
         return;
      }

      const validateEmail = (e: Event) => {
         const inputValue =  ( e.target as HTMLInputElement ).value;
         this.fieldValidState.email = emailValidationRegex.test(inputValue);
      };

      const validatePhone = (e: Event) => {
         const inputValue =  ( e.target as HTMLInputElement ).value;
         this.fieldValidState.email = phoneValidationRegex.test(inputValue);
      };

      const validateNotEmpty = (e: Event, fieldName: string) => {
         const inputValue =  ( e.target as HTMLInputElement ).value;
         this.fieldValidState[fieldName] = nonEmptyStringRegex.test(inputValue);
      };

      const submitForm = ( e: Event ) => {
         try {
            fetch( "https://smartystreet.powerthepolls.org/dev/electmail", {
               method: "POST",
               body: JSON.stringify( this.data ),
               headers: {
                  "Content-Type": "application/json",
               },
            } )
               .then( result => {
                  console.log( `Email sending ${result.statusText} (${result.status})` );
                  this.onComplete();
               } )
               .catch( err => console.error( err ) );
         } finally {
            e.preventDefault();
            return false;
         }
      };

      const ages = [
         "18 and under",
         "19 to 25",
         "26 to 35",
         "36 to 50",
         "51 to 64",
         "65 and older",
      ];

      const IsFormValid = Object.values(this.fieldValidState).every(value => value === true);

      return (
         <Fragment>
         <h3>Send statement of interest</h3>
         <p>You need to email your local jurisdiction directly in order to apply to be a poll worker. This form generates an email that is sent to your local election administrator on your behalf.</p>
         <form onSubmit={submitForm} style={{ padding: "0" }}>
            <label>
               Name
               <TextInput data={this.data} field="name" required onChange={ (e: Event) => validateNotEmpty(e, "name")} />            <span>Please enter valid city</span>
               {!this.fieldValidState.name && <span>Please fill out required field</span>}
            </label>
            <label>
               City
               <TextInput data={this.data} field="city" required  onChange={(e: Event) => validateNotEmpty(e, "city")}/>
               {!this.fieldValidState.city && <span>Please fill out required field</span>}
            </label>
            <label>
               County
               <TextInput data={this.data} field="county" required onChange={(e: Event) => validateNotEmpty(e, "county")}/>
               {!this.fieldValidState.county && <span>Please fill out required field</span>}
            </label>
            <label>
               Email
               <TextInput data={this.data} field="email" required  onChange={validateEmail}/>
               {!this.fieldValidState.email && <span>Please enter valid email address</span>}
            </label>
            <label>
               Phone Number
               <TextInput data={this.data} field="phone" required onChange={validatePhone}/>
               {!this.fieldValidState.phone && <span>Please enter valid phone number</span>}
            </label>
            <label>
               What languages do you speak other than English?
               <TextInput data={this.data} field="languages" initialValue="English only" required onChange={(e: Event) => validateNotEmpty(e, "county")} />
               {!this.fieldValidState.languages && <span>Please fill out required field</span>}
            </label>
            <label>
               Age
               <select name="age" required>
                  <option>Please select</option>
                  {ages.map( a => <option value={a} selected={this.data.age === a}>{a}</option> )}
               </select>
            </label>

            <input type="hidden" value={this.data.state} name="state" />

            <button
               disabled={!IsFormValid}
               type="submit"
               class="button"
            >Send statement of interest
            </button>
            <p>Please fill out the required information</p>
         </form>

         <p>
            Or you can send an email yourself to <a href={`mailto:${j.email}?subject=Becoming%20a%20Poll%20Worker`} target="_blank">{j.email}</a>.
            Be sure to include your first and last name, city and county of residence, email, phone number, age, and any additional languages you speak other than English.
         </p>
         <a
            class="poll-worker-action"
            href={`mailto:${j.email}?subject=Becoming%20a%20Poll%20Worker`}
            target="_blank"
         >Email your poll administrator directly</a>

         <hr />
      </Fragment>
      );
   }
}


export default EmailApplicationForm;
