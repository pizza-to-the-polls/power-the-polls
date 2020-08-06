import { Component, h, Host, Prop, State } from "@stencil/core";

import { States } from "../../data";
import { toQueryString } from "../../util";

import { USAutocomplete, USStreetAddress } from "./SmartyStreets";

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
    * The state to narrow-down the address search to
    */
   @Prop() public showStateSelect: boolean;

   /**
    * The API key to access the SmartyStreets API
    */
   @Prop() public smartyStreetsApiKey?: string;

   /**
    * Delay, in ms, between user pressing a key while entering an address and the API call being made. Default: 200 (ms)
    */
   @Prop() public lookupDelay: number;

   @State() private addressValue: string;
   @State() private address2Value: string;
   @State() private zipValue: string;
   @State() private cityValue: string;
   @State() private countyValue: string;
   @State() private stateValue: string;
   /**
    * Address options returned from SmartyStreets
    */
   @State() private addressOptions: {
      text: string,
      suggestion: USAutocomplete.Suggestion,
   }[];

   private addressSelect?: HTMLSelectElement;
   private smartyStreetsLookupTimeout?: number;

   constructor() {
      this.lookupDelay = 200;
      this.showStateSelect = false;
      this.addressValue = "";
      this.address2Value = "";
      this.zipValue = "";
      this.cityValue = "";
      this.countyValue = "";
      this.stateValue = "";
      this.addressOptions = [];
   }

   public render() {

      const states = States;

      /**
       * When user alters address input, lookup address using SmartyStreets on a small delay to prevent thrashing
       */
      const addressOnInput = ( event: Event ) => {
         const value = ( ( event.target as HTMLInputElement ).value || "" ).trim();

         clearTimeout( this.smartyStreetsLookupTimeout );

         this.addressValue = value;
         // don't do lookup if user hasn't entered anything into the address input
         if( value !== "" ) {
            this.smartyStreetsLookupTimeout = window.setTimeout( () => {
               if( this.smartyStreetsApiKey != null ) {
                  this.getSuggestions( this.addressValue, false );
               } else {
                  console.log( "No SmartyStreets API key provided, cannot lookup addresses" );
               }
            }, this.lookupDelay );
         } else {
            this.addressOptions = [];
         }
      };

      /**
       * Focus the address selection list when user presses keydown with address input focused
       */
      const addressOnKeyDown = ( event: KeyboardEvent ) => {
         if( this.addressOptions.length > 0 && event.key === "ArrowDown" ) {
            if( this.addressSelect != null ) {
               this.addressSelect.focus();
               // select the first value if nothing is selected
               if( this.addressSelect.value == null ) {
                  this.addressSelect.value = "0";
               }
            }
            event.stopImmediatePropagation();
            event.preventDefault();
         }
      };

      /**
       * On select of an address option from the list, replace the address inputs with this value and clear
       * the suggestions.
       */
      const selectAddressOption = ( event: Event ) => {
         let index = parseInt( ( event.target as HTMLSelectElement ).value, 10 ) || 0;
         let address = this.addressOptions[index];
         this.addressValue = address.suggestion.street_line || "";
         this.cityValue = address.suggestion.city || "";
         this.stateValue = address.suggestion.state || "";

         // if( text.search( /(?:\ more\ entries\))/ ) === "-1" ) {
         this.getSingleAddressData( address.suggestion );
         // } else {
         //    this.addressValue = address[0] + " ";
         //    let selected = text.replace( " more entries", "" );
         //    selected = selected.replace( ",", "" );
         //    this.getSuggestions( address[0], selected );
         // }
      };

      const selectStateOption = ( event: Event ) => {
         this.stateValue = ( event.target as HTMLSelectElement ).value;
      };

      return ( <Host>

         {this.showStateSelect ? (
            <label>
               State
               <select
                  name="state"
                  onInput={selectStateOption}
               >
                  <option disabled selected value="">Select your state or territory</option>
                  {states.map( s => (
                     <option
                        value={s.short}
                        selected={s.short === this.stateValue}
                     >{s.full}</option>
                  ) )}
               </select>
            </label>
         ) : <input type="hidden" value={this.stateValue} name="state" />}

         <label>
            Street address<span class="ak-required-flag">*</span>
            <input
               type="text"
               required
               name="address1"
               id="id_address1"
               value={this.addressValue}
               onInput={addressOnInput}
               onKeyDown={addressOnKeyDown}
            />
            <select
               ref={el => this.addressSelect = el as HTMLSelectElement}
               onInput={selectAddressOption}
               size={this.addressOptions.length + 1}
               style={{
                  overflowY: "auto",
                  paddingRight: "17px",
                  marginRight: "-17px",
                  display: this.addressOptions.length > 0 ? "block" : "none",
                  padding: "0.1em",
               }}
               tabIndex={-1}
            >
               {this.addressOptions.map( ( address, i ) => (
                  <option
                     value={i}
                     style={{
                        padding: "0.25em",
                     }}
                  >{address.text}</option>
               ) )}
            </select>
            {/*
              this.stateSelect?.css( "width", ( $( "#id_address1" ).width() + 24 ) + "px" );
              <ul class="us-autocomplete-pro-menu" style={{ display: "none" }}></ul>
            */}
         </label>

         <input
            type="hidden"
            name="address2"
            value={this.address2Value}
         />
         <input
            type="hidden"
            name="zip"
            value={this.zipValue}
         />
         <input
            type="hidden"
            name="city"
            value={this.cityValue}
         />
         <input
            type="hidden"
            name="action_county"
            value={this.countyValue}
         />

      </Host> );
   }

   private getSuggestions( search: string, selected: boolean ) {

      const formatAddress = ( suggestion: any ) => {
         let whiteSpace = "";
         if( suggestion.secondary || suggestion.entries > 1 ) {
            if( suggestion.entries > 1 ) {
               suggestion.secondary += " (" + suggestion.entries + " more entries)";
            }
            whiteSpace = " ";
         }
         return suggestion.street_line + whiteSpace + suggestion.secondary + " " + suggestion.city + ", " + suggestion.state + " " + suggestion.zipcode;
      };

      fetch( "https://us-autocomplete-pro.api.smartystreets.com/lookup?" + toQueryString( {
         "auth-id": this.smartyStreetsApiKey,
         "search": search,
         "selected": ( selected ? selected : "" ),
         "include_only_states": this.stateValue || "",
      } ), {
         method: "GET",
      } )
         .then( response => response.json().then( ( data: USAutocomplete.QueryResult ) => {
            this.addressOptions = ( data.suggestions || [] ).map( ( suggestion, i: number ) => {
               return {
                  suggestion: suggestion,
                  value: i,
                  text: formatAddress( suggestion ),
               };
            } );
         } ) )
         .catch( err => console.log( "smartystreets error", err ) );
   }

   private getSingleAddressData( address: USAutocomplete.Suggestion ) {
      fetch( "https://us-street.api.smartystreets.com/street-address?" + toQueryString( {
         "auth-id": this.smartyStreetsApiKey,
         "street": address.street_line,
         "city": address.city,
         "state": address.state,
      } ), {
         method: "GET",
      } )
         .then( response => response.json().then( ( data: USStreetAddress.QueryResult ) => {
            const result = data[0];
            if( result != null ) {
               this.cityValue = result.components?.city_name || "";
               this.stateValue = result.components?.state_abbreviation || "";
               this.zipValue = result.components?.zipcode || "";
               this.address2Value = result.delivery_line_2 || "";
               this.countyValue = result.metadata?.county_name || "";
            }
         } ) )
         .catch( err => console.log( "smartystreets error", err ) );
   }
}
