import { Component, h, Host, Prop, State } from "@stencil/core";

import ZipGeocode from "../../util/zipGeocoding";

/**
 * An input and (optional) select element for a US postal address and state which will lookup address values based on
 * the user's input to allow the user to select from.
 */
@Component( {
   tag: "address-input",
   shadow: false,
} )
export class AddressInput {

   /**
    * The API key to access the SmartyStreets API
    */
   @Prop() public smartyStreetsApiKey?: string;

   /**
    * Delay, in ms, between user pressing a key while entering an address and the API call
    * being made, in ms. (default: 200ms)
    */
   @Prop() public lookupDelay: number;

   @State() private zipValue: string;
   @State() private cityValue: string;
   @State() private countyValue: string;
   @State() private stateValue: string;
   @State() private cityOptions: Set<string>;
   @State() private countyOptions: Set<string>;
   @State() private stateOptions: Map<string, string>;

   constructor() {
      this.lookupDelay = 200;
      this.zipValue = "";
      this.cityValue = "";
      this.countyValue = "";
      this.stateValue = "";
      this.cityOptions = new Set();
      this.countyOptions = new Set();
      this.stateOptions = new Map();
   }

   public render() {
      const zipValidationRegex = /^\d{5}$/;

      const onZipInputChange = (event: Event) => {
         this.zipValue = ( event.target as HTMLSelectElement ).value;

         if(zipValidationRegex.test(this.zipValue)) {
            ZipGeocode(this.zipValue).
            then((result) => {
               if(result.error) {
                  console.log(result.error);
                  return;
               }

               // @ts-ignore
               this.cityOptions = result.cities;
               // @ts-ignore
               this.cityValue = result.cities[0];
               // @ts-ignore
               this.countyOptions = result.counties;
               // @ts-ignore
               this.countyValue = result.counties[0];
               // @ts-ignore
               this.stateOptions = result.states;
               // @ts-ignore
               this.stateValue = result.states[0];
            });
         }
      };

      return ( <Host>

         <label>
            ZIP<span class="ak-required-flag">*</span>
            <input
               name="zip"
               required
               value={this.zipValue}
               pattern={"\\d{5}"}
               maxLength={5}
               title={"Please enter a valid ZIP code"}
               onChange={onZipInputChange}
            />
         </label>

         { AddressInput.possiblyHiddenSelect("City", "city", this.cityValue, this.cityOptions)}

         { AddressInput.possiblyHiddenSelect("County", "action_county", this.countyValue, this.countyOptions)}

         { AddressInput.possiblyHiddenSelect("State", "state", this.stateValue, this.stateOptions)}

      </Host> );
   }

   private static possiblyHiddenSelect(
      fieldLabel: string,
      name: string,
      selected: string,
      options: Map<string, string> | Set<string>
   ) {
      const labelClass = options.size <= 1 ? { class: "hide" } : {};
      let optionTags = new Array<HTMLElement>();

      for(let [value, label] of options.entries()) {
         optionTags.push(<option value={value} selected={selected === value}>{ label }</option>);
      }

      return (
         <label {...labelClass}>
            { fieldLabel }<span class="ak-required-flag">*</span>
            <select name={name} required>{ optionTags }</select>
         </label>
      );
   }
}
