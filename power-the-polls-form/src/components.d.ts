/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { AdditionalFormData } from "./util";
import { RouterHistory } from "@stencil/router";
export namespace Components {
    interface AddressInput {
    }
    interface JurisdictionInfo {
        /**
          * Props possibly passed in from the form
         */
        "addtl"?: AdditionalFormData;
        /**
          * ID of jurisdiction for Work Elections
         */
        "jurisdictionId"?: string | number;
    }
    interface LoadingSpinner {
        "dark": boolean;
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
        /**
          * Complete form data, if available
         */
        "formData"?: AdditionalFormData;
        "history"?: RouterHistory;
        /**
          * State for matching to location
         */
        "state"?: string;
    }
    interface PossiblyHiddenSelect {
        "fieldLabel": string;
        "name": string;
        "options": Map<string, string> | Set<string>;
        "selected": string;
    }
    interface PowerThePollsForm {
        /**
          * The label for an additional field to be displayed on the signup form. If undefined, no additional field will be displayed.
         */
        "customFormFieldLabel"?: string;
        "optUserOutOfChase": boolean;
        /**
          * To display custom text and images for a specific Power the Polls partner, enter their ID here.
         */
        "partnerId"?: string;
        /**
          * Optional name displayed in privacy policy disclaimer when `optUserOutOfChase` is true
         */
        "partnerName"?: string;
        "reset": () => Promise<void>;
        /**
          * The API key to access SmartyStreets which is used for address lookup.
         */
        "smartyStreetsApiKey"?: string;
    }
    interface StateInfo {
        /**
          * State abbreviation
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
    interface HTMLLoadingSpinnerElement extends Components.LoadingSpinner, HTMLStencilElement {
    }
    var HTMLLoadingSpinnerElement: {
        prototype: HTMLLoadingSpinnerElement;
        new (): HTMLLoadingSpinnerElement;
    };
    interface HTMLPollWorkerInfoElement extends Components.PollWorkerInfo, HTMLStencilElement {
    }
    var HTMLPollWorkerInfoElement: {
        prototype: HTMLPollWorkerInfoElement;
        new (): HTMLPollWorkerInfoElement;
    };
    interface HTMLPossiblyHiddenSelectElement extends Components.PossiblyHiddenSelect, HTMLStencilElement {
    }
    var HTMLPossiblyHiddenSelectElement: {
        prototype: HTMLPossiblyHiddenSelectElement;
        new (): HTMLPossiblyHiddenSelectElement;
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
        "loading-spinner": HTMLLoadingSpinnerElement;
        "poll-worker-info": HTMLPollWorkerInfoElement;
        "possibly-hidden-select": HTMLPossiblyHiddenSelectElement;
        "power-the-polls-form": HTMLPowerThePollsFormElement;
        "state-info": HTMLStateInfoElement;
    }
}
declare namespace LocalJSX {
    interface AddressInput {
    }
    interface JurisdictionInfo {
        /**
          * Props possibly passed in from the form
         */
        "addtl"?: AdditionalFormData;
        /**
          * ID of jurisdiction for Work Elections
         */
        "jurisdictionId"?: string | number;
    }
    interface LoadingSpinner {
        "dark"?: boolean;
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
        /**
          * Complete form data, if available
         */
        "formData"?: AdditionalFormData;
        "history"?: RouterHistory;
        /**
          * State for matching to location
         */
        "state"?: string;
    }
    interface PossiblyHiddenSelect {
        "fieldLabel"?: string;
        "name"?: string;
        "options"?: Map<string, string> | Set<string>;
        "selected"?: string;
    }
    interface PowerThePollsForm {
        /**
          * The label for an additional field to be displayed on the signup form. If undefined, no additional field will be displayed.
         */
        "customFormFieldLabel"?: string;
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
          * Optional name displayed in privacy policy disclaimer when `optUserOutOfChase` is true
         */
        "partnerName"?: string;
        /**
          * The API key to access SmartyStreets which is used for address lookup.
         */
        "smartyStreetsApiKey"?: string;
    }
    interface StateInfo {
        /**
          * State abbreviation
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
        "loading-spinner": LoadingSpinner;
        "poll-worker-info": PollWorkerInfo;
        "possibly-hidden-select": PossiblyHiddenSelect;
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
            "loading-spinner": LocalJSX.LoadingSpinner & JSXBase.HTMLAttributes<HTMLLoadingSpinnerElement>;
            "poll-worker-info": LocalJSX.PollWorkerInfo & JSXBase.HTMLAttributes<HTMLPollWorkerInfoElement>;
            "possibly-hidden-select": LocalJSX.PossiblyHiddenSelect & JSXBase.HTMLAttributes<HTMLPossiblyHiddenSelectElement>;
            "power-the-polls-form": LocalJSX.PowerThePollsForm & JSXBase.HTMLAttributes<HTMLPowerThePollsFormElement>;
            "state-info": LocalJSX.StateInfo & JSXBase.HTMLAttributes<HTMLStateInfoElement>;
        }
    }
}
