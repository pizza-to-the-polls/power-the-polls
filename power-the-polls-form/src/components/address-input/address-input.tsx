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
    * Delay, in ms, between user pressing a key while entering an address and the API call
    * being made, in ms. (default: 200ms)
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
   private addressInput?: HTMLInputElement;
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
                  this.getSuggestions( this.addressValue );
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
            event.stopImmediatePropagation();
            event.preventDefault();
            this.addressSelect?.focus();
         }
      };

      /**
       * On select of an address option from the list, replace the address inputs with this value and clear
       * the suggestions. Optionally lookup further values if this was a multi-entry suggestion
       */
      const applySuggestionAtIndex = ( index: number ) => {
         let suggestion = this.addressOptions[index].suggestion;
         // if this is a multi-entry suggestion, lookup further entries
         if( suggestion.entries > 1 ) {
            this.getSuggestions( suggestion );
         } else {
            this.addressOptions = [];
            this.addressValue = suggestion.street_line || "";
            this.cityValue = suggestion.city || "";
            this.stateValue = suggestion.state || "";
            this.getSingleAddressData( suggestion );
         }
      };

      const addressSuggestionOnClick = ( event: Event ) => {
         let index = parseInt( ( event.target as HTMLSelectElement ).value, 10 ) || 0;
         applySuggestionAtIndex( index );
      };

      const addressSuggestionOnKeyDown = ( event: KeyboardEvent ) => {
         let index = parseInt( ( event.target as HTMLSelectElement ).value, 10 ) || 0;
         if( event.keyCode === 13 || event.keyCode === 32 || event.key === "Enter" || event.key === " " ) {
            applySuggestionAtIndex( index );
         } else if( event.key === "ArrowUp" && index === 0 ) {
            event.stopImmediatePropagation();
            event.preventDefault();
            this.addressSelect?.blur();
            this.addressInput?.focus();
            this.addressInput?.select();
         }
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
            Street address<span>*</span>
            <input
               type="text"
               ref={el => this.addressInput = el as HTMLInputElement}
               required
               name="address1"
               id="id_address1"
               value={this.addressValue}
               onInput={addressOnInput}
               onKeyDown={addressOnKeyDown}
            />
            <select
               ref={el => this.addressSelect = el as HTMLSelectElement}
               onKeyDown={addressSuggestionOnKeyDown}
               onClick={addressSuggestionOnClick}
               size={this.addressOptions.length + 1}
               style={{
                  display: this.addressOptions.length > 0 ? "block" : "none",
                  overflowY: "auto",
                  // offset the scrollbar for user agents that refuse to hide it
                  paddingRight: "17px",
                  marginRight: "-17px",
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

   private getSuggestions( search: string | USAutocomplete.Suggestion ) {
      // if passed a suggestion, search using the address and start from the suggestion as the selected value for SmartyStreets
      const selected = typeof search !== "string" ? search : null;
      search = typeof search !== "string" ? search.street_line || "" : search;
      fetch( "https://us-autocomplete-pro.api.smartystreets.com/lookup?" + toQueryString( {
         "auth-id": this.smartyStreetsApiKey,
         "search": search,
         // see: https://smartystreets.com/docs/cloud/us-autocomplete-api#pro-secondary-expansion
         "selected": selected == null || selected.entries < 2 ? ""
            : `${selected.street_line} ${selected.secondary} (${selected.entries}) ${selected.city} ${selected.state} ${selected.zipcode}`,
         "include_only_states": this.stateValue || "",
      } ), {
         method: "GET",
      } )
         .then( response => response.json().then( ( data: USAutocomplete.QueryResult ) => {
            let suggestions = ( data.suggestions || [] ).map( ( suggestion, i: number ) => {
               return {
                  suggestion: suggestion,
                  value: i,
                  text: suggestion.street_line
                     + ( suggestion.secondary ? " " + suggestion.secondary : "" )
                     + ( suggestion.entries > 1 ? " (" + suggestion.entries + " more entries)" : "" )
                     + " " + suggestion.city + ", " + suggestion.state + " " + suggestion.zipcode,
               };
            } );
            this.addressOptions = suggestions;
         } ) )
         .catch( err => console.log( "smartystreets error", err ) );
   }

   /**
    * Try to ge tmore detailed street data given the user's selection
    */
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
