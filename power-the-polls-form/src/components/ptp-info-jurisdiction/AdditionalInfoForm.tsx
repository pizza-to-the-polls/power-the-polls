import { Fragment, h } from "@stencil/core";
import { FunctionalComponent } from "@stencil/router/dist/types/stencil.core";

import { PtpFormData } from "../../util";
import { submitToActionKit } from "../power-the-polls-form/ActionKit";

type OptionProps = {
   type: "radio" | "checkbox" | "select";
   choices: string[];
   inputName: string;
};
const Options: FunctionalComponent<OptionProps> = (
   { choices, inputName, type },
   children,
) =>
   type === "select" ? (
      <label>
         {children}
         <select name={inputName} required>
            {choices.map((x) => (
               <option value={x}>{x}</option>
            ))}
         </select>
      </label>
   ) : (
      <div>
         <label>{children}</label>
         <div class={{ "option-grid": choices.length > 3 }}>
            {choices.map((x) => (
               <label key={x} class="checkbox">
                  <input
                     type={type}
                     name={inputName}
                     value={x}
                     required={type === "radio" ? true : false}
                  />{" "}
                  {x}
               </label>
            ))}
         </div>
      </div>
   );

/**
 * Additional info be collected after users sign up
 */
const AdditionalInfoForm: FunctionalComponent<{
   data: PtpFormData;
   onSubmit: () => void;
}> = ({ data, onSubmit }) => {
   const submitForm = (e: Event) => {
      try {
         // gather up all the form data
         const form = e.target as HTMLFormElement;
         const elements = [
            ...form.getElementsByTagName("input"),
            ...form.getElementsByTagName("select"),
         ];
         const toActionKit = elements.reduce(
            (x, el) => {
               let add = false;

               // make sure radio and checkboxes are checked before adding their values
               if (
                  el instanceof HTMLInputElement &&
                  (el.type === "radio" || el.type === "checkbox")
               ) {
                  if (el.checked) {
                     add = true;
                  }
               } else {
                  add = true;
               }

               if (add) {
                  x[el.name] =
                     el.name in x ? x[el.name] + ", " + el.value : el.value;
               }

               return x;
            },
            {
               // ActionKit will clear the city, state, and zip when we update `address1`, so we have to pass them
               // through as well. They used to be hidden inputs in the form, but this is more explicit and cleaner.
               city: data?.city,
               state: data?.state,
               zip: data?.zip,
               // this acts as the ID/lookup for the user we're modifying
               email: data?.email,
               // Needs to match to a Page in ActionKit or it will return 400
               page: "mi-extra",
            } as any,
         );

         submitToActionKit(toActionKit).then((result) => {
            if (result !== true) {
               console.error(result);
            }
         });

         onSubmit();
      } catch (e) {
         console.error(e);
      } finally {
         e.preventDefault();
         return false;
      }
   };

   return (
      <Fragment>
         <p>
            We’re going to ask for some information that will be helpful to
            verify your eligibility to serve as a poll worker, and provide some
            information that will be helpful for election administrators.
         </p>
         <p>
            Many local jurisdictions in your state have indicated that they are
            set with poll workers for this year. However, you should still apply
            in case they have a last minute-shortage, or if you would like to
            serve in a future election.
         </p>

         <hr />

         <form onSubmit={submitForm} style={{ padding: "0" }}>
            {data.state === "MI" ? (
               <label>
                  Street address
                  <input type="text" required name="address1" />
               </label>
            ) : null}

            <Options
               type="radio"
               choices={["Yes", "No"]}
               inputName="action_workeday"
            >
               Are you available to work on the Tuesday, November 3rd election?
               Hours may begin as early as 5:30am and go until at least an hour
               after polls close at 8pm. Can you commit to working the full day
               on Election Day?
            </Options>

            <Options
               type="radio"
               choices={["Yes", "No"]}
               inputName="action_waitlist"
            >
               If you are not selected to be a poll worker, would you be willing
               to serve on a backup waitlist?
            </Options>

            <Options
               type="select"
               choices={["", "18+", "17", "16", "15 or younger"]}
               inputName="action_age"
            >
               What age will you be on Election Day (Nov. 3rd, 2020)?
            </Options>

            <Options
               type="select"
               choices={[
                  "",
                  "Yes",
                  "No, but I will register to vote so I can be a poll worker.",
                  "No, I am under 18",
               ]}
               inputName="action_registeredvoter"
            >
               Are you registered to vote in your state?
            </Options>

            <Options
               type="select"
               choices={[
                  "Not able to operate computers",
                  "Limited experience",
                  "Intermediate",
                  "Advanced",
                  "Expert",
               ]}
               inputName="action_computerliteracy"
            >
               Some poll worker roles require more familiarity with a computer
               than others. How would you rate your ability to use a computer?
            </Options>

            <Options
               type="checkbox"
               choices={[
                  "English only",
                  ...[
                     "Spanish",
                     "Arabic",
                     "Tagalog",
                     "Bangala",
                     "Somali",
                     "Hmong",
                     "Mandarin",
                     "Cantonese",
                     "Creole",
                     "Vietnamese",
                     "Navajo",
                     "Korean",
                     "French",
                     "Russian",
                     "ASL",
                     "Portugese",
                  ].sort(),
                  "Other",
               ]}
               inputName="language"
            >
               Some polling locations may require poll workers who speak
               different languages to help assist voters with limited English
               proficiency. Do you speak any other languages besides English?
               Please select all that apply.
            </Options>

            {data.state === "MI" ? (
               <Options
                  type="select"
                  choices={[
                     "Not willing to travel",
                     "Less than 10 miles",
                     "Less than 50 miles",
                     "I'll go wherever I'm needed",
                  ]}
                  inputName="action_travel_distance"
               >
                  In Michigan, eligible poll workers can serve anywhere in the
                  state. Are you willing to travel, and if so, how far can you
                  travel?
               </Options>
            ) : (
               <Options
                  type="radio"
                  choices={["Yes", "No", "Maybe"]}
                  inputName="action_travel"
               >
                  While people usually work at polling places close to their
                  home, sometimes people might be asked to travel to a nearby
                  location or even nearby county, other than their own. Would
                  you consider doing this?
               </Options>
            )}

            <Options
               type="radio"
               choices={["Yes", "No"]}
               inputName="action_pastpollworker"
            >
               Have you ever been a poll worker before?
            </Options>

            <br />

            <button type="submit" class="button">
               Continue application
            </button>
         </form>
      </Fragment>
   );
};
export default AdditionalInfoForm;
