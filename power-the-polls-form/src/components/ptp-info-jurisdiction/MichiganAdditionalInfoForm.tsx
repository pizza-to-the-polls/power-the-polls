import { Fragment, h } from "@stencil/core";
import { FunctionalComponent } from "@stencil/router/dist/types/stencil.core";

import { PtpFormData } from "../../util";
import { submitToActionKit } from "../power-the-polls-form/ActionKit";

const RadioOptions: FunctionalComponent<{ choices: string[], inputName: string }> =
   ( { choices, inputName } ) => (
      <Fragment>
         {choices.map( x => <label key={x} class="checkbox"><input type="radio" name={inputName} value={x} required />{" "}{x}</label> )}
      </Fragment>
   );

const SelectOptions: FunctionalComponent<{ choices: string[], inputName: string }> =
   ( { choices, inputName } ) => (
      <select name={inputName} required>
         <option value=""></option>
         {choices.map( x => <option value={x}>{x}</option> )}
      </select>
   );

/**
 * Michigan requires additional info be collected.
 * @see
 */
const MichiganAdditionalInfoForm: FunctionalComponent<{ data: PtpFormData, onSubmit: () => void }> = ( { data, onSubmit } ) => {

   const submitForm = ( e: Event ) => {
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

   return data.state === "MI" ? ( <Fragment>

      <p>
         We are sharing your information with election administrators and our state partners who will follow up to help you be placed as a poll worker!&nbsp;
        <strong>We just need a few more pieces of information from you to help with your application:</strong>
      </p>

      <form onSubmit={submitForm} style={{ padding: "0" }}>

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

         <div>
            <label>Are you available to work on the Tuesday November 3rd election? Hours may begin as early as 5:30am and go until at least an hour after polls close at 8pm?</label>
            <RadioOptions choices={["Yes", "No"]} inputName="action_workeday" />
         </div>

         <label>
            Would you be interested and available to work as a poll worker during early voting in the weeks leading up to the election?
            <RadioOptions choices={["Yes", "No"]} inputName="action_workev" />
         </label>

         <label>
            In Michigan, eligible poll workers can serve anywhere in the state. Are you willing to travel, and if so, how far can you travel?
            <SelectOptions
               choices={[
                  "Not willing to travel",
                  "Less than 10 miles",
                  "Less than 50 miles",
                  "I'll go wherever I'm needed",
               ]}
               inputName="travel_distance"
            />
         </label>
         {false && // use this travel question for states other than Michigan
            <label>
               While people usually work at polling places close to their home, sometimes people might be asked to travel to a nearby location or even nearby county, other than their own. Would you consider doing this?
               <RadioOptions choices={["Yes", "No", "Maybe"]} inputName="travel" />
            </label>
         }

         <label>
            Are you at least 18 years old?
             <SelectOptions
               choices={[
                  "Yes",
                  "No, but I will be 17 by Election Day",
                  "No, but I will be 16 by Election Day",
                  "I will be 15 or younger on Election Day",
               ]}
               inputName="action_age"
            />
         </label>

         <label>
            Are you registered to vote in your state?
            <SelectOptions
               choices={[
                  "Yes",
                  "No, but I will register to vote so I can be a poll worker.",
                  "No, I am under 18",
               ]}
               inputName="action_registeredvoter"
            />
         </label>

         <label>
            Some poll worker roles require more familiarity with a computer than others. How would you rate your ability to use a computer?
            <SelectOptions
               choices={[
                  "Not able to operate computers.",
                  "Limited experience. “I don’t really use a computer often, mostly just for email or social media, but I do know how to work one.”",
                  "Intermediate “I use a computer regularly, mostly for personal use or work, and feel comfortable.”",
                  "Advanced “I use different computer programs daily and am comfortable picking up new programs”",
                  "Expert “My professional background is in advanced computer programming”",
               ]}
               inputName="action_computerliteracy"
            />
         </label>

         <label>
            Some polling locations may require poll workers who speak different languages to help assist voters with limited English proficiency? Do you speak any other languages besides English?
            <SelectOptions
               choices={[
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
                  "Russian",
                  "ASL",
                  "Portugese",
                  "Other",
               ]}
               inputName="language"
            />
         </label>

         <label>
            Have you ever been a poll worker before?
            <RadioOptions choices={["Yes", "No"]} inputName="action_pastpollworker" />
         </label>

         <input type="hidden" name="page" value="mi-extra" />
         <input
            type="hidden"
            name="email"
            value={data?.email}
         />

         <br />

         <button
            type="submit"
            class="button"
         >Complete application</button>

      </form>

      <hr />

   </Fragment> ) : null;
};
export default MichiganAdditionalInfoForm;
