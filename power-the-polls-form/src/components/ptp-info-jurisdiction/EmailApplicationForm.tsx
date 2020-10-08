import { Fragment, h } from "@stencil/core";
import { FunctionalComponent } from "@stencil/router/dist/types/stencil.core";

import { JurisdictionInfo } from "../../data/States";
import { PtpFormData, TextInput } from "../../util";

/**
 * Email application that will only render if there is no application link for the jurisdiction
 */
const EmailApplicationForm: FunctionalComponent<{ jurisdiction: JurisdictionInfo, data: PtpFormData, onComplete: () => void }> = ( { jurisdiction, data, onComplete } ) => {

   const j = jurisdiction;
   if(
      // if jurisdiction has no email, do not show the e-mail form
       ( j?.email == null || j.email === "" ) ) {
      return;
   }

   const submitForm = ( e: Event ) => {
      try {
         fetch( "https://smartystreet.powerthepolls.org/dev/electmail", {
            method: "POST",
            body: JSON.stringify( data ),
            headers: {
               "Content-Type": "application/json",
            },
         } )
            .then( result => {
               console.log( `Email sending ${result.statusText} (${result.status})` );
               onComplete();
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

   return ( <Fragment>
      <h3>Send statement of interest</h3>
      <p>You need to email your local jurisdiction directly in order to apply to be a poll worker. This form generates an email that is sent to your local election administrator on your behalf.</p>
      <form onSubmit={submitForm} style={{ padding: "0" }}>
         <label>
            Name
            <TextInput data={data} field="name" required />
         </label>
         <label>
            City
            <TextInput data={data} field="city" required />
         </label>
         <label>
            County
            <TextInput data={data} field="county" required />
         </label>
         <label>
            Email
            <TextInput data={data} field="email" required />
         </label>
         <label>
            Phone Number
            <TextInput data={data} field="phone" required />
         </label>
         <label>
            What languages do you speak other than English?
            <TextInput data={data} field="languages" initialValue="English only" required />
         </label>
         <label>
            Age
            <select name="age" required>
               <option>Please select</option>
               {ages.map( a => <option value={a} selected={data.age === a}>{a}</option> )}
            </select>
         </label>

         <input type="hidden" value={data.state} name="state" />

         <button
            type="submit"
            class="button"
         >Send statement of interest</button>
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
   </Fragment> );
};
export default EmailApplicationForm;
