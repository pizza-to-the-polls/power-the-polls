/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { RouterHistory } from "@stencil/router";
export namespace Components {
    interface AddressInput {
        /**
          * Delay, in ms, between user pressing a key while entering an address and the API call being made, in ms. (default: 200ms)
         */
        "lookupDelay": number;
        /**
          * The state to narrow-down the address search to
         */
        "showStateSelect": boolean;
        /**
          * The API key to access the SmartyStreets API
         */
        "smartyStreetsApiKey"?: string;
    }
    interface JurisdictionInfo {
        /**
          * ID of jurisdiction for Work Elections
         */
        "jurisdictionId"?: string | number;
    }
    interface PollWorkerInfo {
        /**
          * City for matching to location
         */
        "city"?: string;
        /**
          * County for matching to location
         */
        "county"?: string;
        "history"?: RouterHistory;
        /**
          * State for matching to location
         */
        "state"?: string;
    }
    interface PowerThePollsForm {
        /**
          * The label for an additional field to be displayed on the signup form. If undefined, no additional field will be displayed.
         */
        "customFormFieldLabel"?: string;
        /**
          * The URL where the form data will be submitted
         */
        "destination": string;
        "optUserOutOfChase": boolean;
        /**
          * To display custom text and images for a specific Power the Polls partner, enter their ID here.
         */
        "partnerId"?: string;
        /**
          * The API key to access SmartyStreets which is used for address lookup.
         */
        "smartyStreetsApiKey"?: string;
    }
    interface StateInfo {
        /**
          * State abrieviation
         */
        "state"?: string;
        /**
          * State id in work elections
         */
        "stateId": number | null;
    }
}
declare global {
    interface HTMLAddressInputElement extends Components.AddressInput, HTMLStencilElement {
    }
    var HTMLAddressInputElement: {
        prototype: HTMLAddressInputElement;
        new (): HTMLAddressInputElement;
    };
    interface HTMLJurisdictionInfoElement extends Components.JurisdictionInfo, HTMLStencilElement {
    }
    var HTMLJurisdictionInfoElement: {
        prototype: HTMLJurisdictionInfoElement;
        new (): HTMLJurisdictionInfoElement;
    };
    interface HTMLPollWorkerInfoElement extends Components.PollWorkerInfo, HTMLStencilElement {
    }
    var HTMLPollWorkerInfoElement: {
        prototype: HTMLPollWorkerInfoElement;
        new (): HTMLPollWorkerInfoElement;
    };
    interface HTMLPowerThePollsFormElement extends Components.PowerThePollsForm, HTMLStencilElement {
    }
    var HTMLPowerThePollsFormElement: {
        prototype: HTMLPowerThePollsFormElement;
        new (): HTMLPowerThePollsFormElement;
    };
    interface HTMLStateInfoElement extends Components.StateInfo, HTMLStencilElement {
    }
    var HTMLStateInfoElement: {
        prototype: HTMLStateInfoElement;
        new (): HTMLStateInfoElement;
    };
    interface HTMLElementTagNameMap {
        "address-input": HTMLAddressInputElement;
        "jurisdiction-info": HTMLJurisdictionInfoElement;
        "poll-worker-info": HTMLPollWorkerInfoElement;
        "power-the-polls-form": HTMLPowerThePollsFormElement;
        "state-info": HTMLStateInfoElement;
    }
}
declare namespace LocalJSX {
    interface AddressInput {
        /**
          * Delay, in ms, between user pressing a key while entering an address and the API call being made, in ms. (default: 200ms)
         */
        "lookupDelay"?: number;
        /**
          * The state to narrow-down the address search to
         */
        "showStateSelect"?: boolean;
        /**
          * The API key to access the SmartyStreets API
         */
        "smartyStreetsApiKey"?: string;
    }
    interface JurisdictionInfo {
        /**
          * ID of jurisdiction for Work Elections
         */
        "jurisdictionId"?: string | number;
    }
    interface PollWorkerInfo {
        /**
          * City for matching to location
         */
        "city"?: string;
        /**
          * County for matching to location
         */
        "county"?: string;
        "history"?: RouterHistory;
        /**
          * State for matching to location
         */
        "state"?: string;
    }
    interface PowerThePollsForm {
        /**
          * The label for an additional field to be displayed on the signup form. If undefined, no additional field will be displayed.
         */
        "customFormFieldLabel"?: string;
        /**
          * The URL where the form data will be submitted
         */
        "destination"?: string;
        /**
          * Dispatched when the user has submitted the form and it has successfully POSTed to `destination`
         */
        "onSubmitCompleted"?: (event: CustomEvent<any>) => void;
        /**
          * Dispatched when there is an error submitting the form to `destination`
         */
        "onSubmitError"?: (event: CustomEvent<any>) => void;
        "optUserOutOfChase"?: boolean;
        /**
          * To display custom text and images for a specific Power the Polls partner, enter their ID here.
         */
        "partnerId"?: string;
        /**
          * The API key to access SmartyStreets which is used for address lookup.
         */
        "smartyStreetsApiKey"?: string;
    }
    interface StateInfo {
        /**
          * State abrieviation
         */
        "state"?: string;
        /**
          * State id in work elections
         */
        "stateId"?: number | null;
    }
    interface IntrinsicElements {
        "address-input": AddressInput;
        "jurisdiction-info": JurisdictionInfo;
        "poll-worker-info": PollWorkerInfo;
        "power-the-polls-form": PowerThePollsForm;
        "state-info": StateInfo;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "address-input": LocalJSX.AddressInput & JSXBase.HTMLAttributes<HTMLAddressInputElement>;
            "jurisdiction-info": LocalJSX.JurisdictionInfo & JSXBase.HTMLAttributes<HTMLJurisdictionInfoElement>;
            "poll-worker-info": LocalJSX.PollWorkerInfo & JSXBase.HTMLAttributes<HTMLPollWorkerInfoElement>;
            "power-the-polls-form": LocalJSX.PowerThePollsForm & JSXBase.HTMLAttributes<HTMLPowerThePollsFormElement>;
            "state-info": LocalJSX.StateInfo & JSXBase.HTMLAttributes<HTMLStateInfoElement>;
        }
    }
}
