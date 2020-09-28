import { Component, h, Host, State } from "@stencil/core";

import ZipGeocode from "./zipGeocoding";

/**
 * An input and (optional) select element for a US postal address and state which will lookup address values based on
 * the user's input to allow the user to select from.
 */
@Component( {
   tag: "input-address",
   shadow: false,
} )
export class AddressInput {

   @State() private cityValue: string;
   @State() private countyValue: string;
   @State() private stateValue: string;
   @State() private zipValue: string;
   @State() private cityOptions: Set<string>;
   @State() private countyOptions: Set<string>;
   @State() private stateOptions: Map<string, string>;

   constructor() {
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

      const onZipInputChange = ( event: Event ) => {
         this.zipValue = ( event.target as HTMLInputElement ).value;
         if( zipValidationRegex.test( this.zipValue ) ) {
            ZipGeocode( this.zipValue )
               .then( ( result ) => {
                  if( "error" in result ) {
                     console.log( result.error );
                  } else {
                     this.cityOptions = result.cities;
                     this.cityValue = this.cityOptions.values().next().value;
                     this.countyOptions = result.counties;
                     this.countyValue = this.countyOptions.values().next().value;
                     this.stateOptions = result.states;
                     this.stateValue = this.stateOptions.keys().next().value;
                  }
               } );
         }
      };

      return ( <Host>

         <label>
            ZIP
            <input
               name="zip"
               required
               value={this.zipValue}
               pattern={"\\d{5}"}
               maxLength={5}
               title={"Please enter a valid ZIP code"}
               onInput={onZipInputChange}
            />
         </label>

         <input-possibly-hidden-select
            fieldLabel="City"
            name="city"
            selected={this.cityValue}
            options={this.cityOptions}
         />

         <input-possibly-hidden-select
            fieldLabel="County"
            name="user_county"
            selected={this.countyValue}
            options={this.countyOptions}
         />

         <input-possibly-hidden-select
            fieldLabel="State"
            name="state"
            selected={this.stateValue}
            options={this.stateOptions}
         />
      </Host> );
   }
}
