import { Fragment, h } from "@stencil/core";
import { FunctionalComponent } from "@stencil/router/dist/types/stencil.core";

import { PtpFormData } from "../../util";

import { submitToActionKit } from "./ActionKit";

/**
 * Michigan requires additional info be collected.
 * @see
 */
const MichiganAdditionalInfoForm: FunctionalComponent<{ data: PtpFormData, formSubmitted: boolean, onSubmit: () => void }> = ( { data, formSubmitted, onSubmit } ) => {

   const michiganSubmitForm = ( e: Event ) => {
      try {
         // gather up all the form data
         // TODO: Clean this up
         const form = e.target as HTMLFormElement;
         const elements = [
            ...form.getElementsByTagName( "input" ),
            ...form.getElementsByTagName( "select" ),
         ];
         submitToActionKit( elements.reduce(
            ( x, el ) => { x[el.name] = el.value; return x; },
            ( {} as any ),
         ) )
            .then( result => {
               if( result !== true ) {
                  console.error( result );
               }
            } );
         onSubmit();
      } catch( e ) {
         console.error( e );
      } finally {
         e.preventDefault();
         return false;
      }
   };

   const travelOptions = [
      "Not willing to travel",
      "Less than 10 miles",
      "Less than 50 miles",
      "I'll go wherever I'm needed",
   ];

   return data.state === "MI" && !formSubmitted ? ( <Fragment>

      <p>
         We are sharing your information with election administrators and our state partners who will follow up to help you be placed as a poll worker!&nbsp;
         <strong>We just need a few more pieces of information from you to help with your application:</strong>
      </p>

      <form onSubmit={michiganSubmitForm} style={{ padding: "0" }}>

         <input
            type="hidden"
            name="city"
            value={data?.city}
         />
         <input
            type="hidden"
            name="state"
            value={data?.state}
         />
         <input
            type="hidden"
            name="zip"
            value={data?.zip}
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
            <input
               type="text"
               required
               name="user_additional_language"
               value="English only"
            />
         </label>

         <label>
            In Michigan, eligible poll workers can serve anywhere in the state. Are you willing to travel, and if so, how far can you travel?
            <select name="user_mi_travel" required>
               {travelOptions.map( x => <option value={x}>{x}</option> )}
            </select>
         </label>

         <input type="hidden" name="page" value="mi-extra" />
         <input
            type="hidden"
            name="email"
            value={data?.email}
         />

         <button
            type="submit"
            class="button"
         >Complete application</button>

      </form>

      <hr />

   </Fragment> ) : null;
};
export default MichiganAdditionalInfoForm;
