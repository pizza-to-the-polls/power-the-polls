/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { PtpFormData } from "./util";
import { GeoJSON } from "geojson";
import { Options } from "./components/ui-geojson-to-svg/types";
export namespace Components {
    interface InputAddress {
        "state": () => Promise<"STARTED" | "COMPLETED">;
    }
    interface InputPossiblyHiddenSelect {
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
        "optUserOutOfChase"?: boolean;
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
        /**
          * The version of this `power-the-polls-form` component
         */
        "version": () => Promise<string>;
    }
    interface PtpInfoJurisdiction {
        /**
          * Props possibly passed in from the main form
         */
        "initialFormData"?: PtpFormData;
        "isJurisdictionFilled": boolean;
        /**
          * ID of jurisdiction for Work Elections
         */
        "jurisdictionId"?: string | number;
        /**
          * If `true`, this component will lso render 1-3 bullet items indicating next steps for the user
         */
        "showNextSteps": boolean;
    }
    interface PtpInfoPollWorker {
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
        "formData"?: PtpFormData;
        "isJurisdictionFilled": boolean;
        /**
          * If `true`, this component will lso render 1-3 bullet items indicating next steps for the user
         */
        "showNextSteps": boolean;
        /**
          * State for matching to location
         */
        "state"?: string;
    }
    interface PtpInfoState {
        /**
          * State abbreviation
         */
        "state"?: string;
    }
    interface UiGeojsonToSvg {
        "geoJson"?: GeoJSON;
        "height": number;
        "options"?: Options;
        "width": number;
    }
    interface UiLoadingSpinner {
        "small": boolean;
    }
}
declare global {
    interface HTMLInputAddressElement extends Components.InputAddress, HTMLStencilElement {
    }
    var HTMLInputAddressElement: {
        prototype: HTMLInputAddressElement;
        new (): HTMLInputAddressElement;
    };
    interface HTMLInputPossiblyHiddenSelectElement extends Components.InputPossiblyHiddenSelect, HTMLStencilElement {
    }
    var HTMLInputPossiblyHiddenSelectElement: {
        prototype: HTMLInputPossiblyHiddenSelectElement;
        new (): HTMLInputPossiblyHiddenSelectElement;
    };
    interface HTMLPowerThePollsFormElement extends Components.PowerThePollsForm, HTMLStencilElement {
    }
    var HTMLPowerThePollsFormElement: {
        prototype: HTMLPowerThePollsFormElement;
        new (): HTMLPowerThePollsFormElement;
    };
    interface HTMLPtpInfoJurisdictionElement extends Components.PtpInfoJurisdiction, HTMLStencilElement {
    }
    var HTMLPtpInfoJurisdictionElement: {
        prototype: HTMLPtpInfoJurisdictionElement;
        new (): HTMLPtpInfoJurisdictionElement;
    };
    interface HTMLPtpInfoPollWorkerElement extends Components.PtpInfoPollWorker, HTMLStencilElement {
    }
    var HTMLPtpInfoPollWorkerElement: {
        prototype: HTMLPtpInfoPollWorkerElement;
        new (): HTMLPtpInfoPollWorkerElement;
    };
    interface HTMLPtpInfoStateElement extends Components.PtpInfoState, HTMLStencilElement {
    }
    var HTMLPtpInfoStateElement: {
        prototype: HTMLPtpInfoStateElement;
        new (): HTMLPtpInfoStateElement;
    };
    interface HTMLUiGeojsonToSvgElement extends Components.UiGeojsonToSvg, HTMLStencilElement {
    }
    var HTMLUiGeojsonToSvgElement: {
        prototype: HTMLUiGeojsonToSvgElement;
        new (): HTMLUiGeojsonToSvgElement;
    };
    interface HTMLUiLoadingSpinnerElement extends Components.UiLoadingSpinner, HTMLStencilElement {
    }
    var HTMLUiLoadingSpinnerElement: {
        prototype: HTMLUiLoadingSpinnerElement;
        new (): HTMLUiLoadingSpinnerElement;
    };
    interface HTMLElementTagNameMap {
        "input-address": HTMLInputAddressElement;
        "input-possibly-hidden-select": HTMLInputPossiblyHiddenSelectElement;
        "power-the-polls-form": HTMLPowerThePollsFormElement;
        "ptp-info-jurisdiction": HTMLPtpInfoJurisdictionElement;
        "ptp-info-poll-worker": HTMLPtpInfoPollWorkerElement;
        "ptp-info-state": HTMLPtpInfoStateElement;
        "ui-geojson-to-svg": HTMLUiGeojsonToSvgElement;
        "ui-loading-spinner": HTMLUiLoadingSpinnerElement;
    }
}
declare namespace LocalJSX {
    interface InputAddress {
        "onLookup"?: (event: CustomEvent<"STARTED" | "COMPLETED">) => void;
    }
    interface InputPossiblyHiddenSelect {
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
    interface PtpInfoJurisdiction {
        /**
          * Props possibly passed in from the main form
         */
        "initialFormData"?: PtpFormData;
        "isJurisdictionFilled"?: boolean;
        /**
          * ID of jurisdiction for Work Elections
         */
        "jurisdictionId"?: string | number;
        /**
          * If `true`, this component will lso render 1-3 bullet items indicating next steps for the user
         */
        "showNextSteps"?: boolean;
    }
    interface PtpInfoPollWorker {
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
        "formData"?: PtpFormData;
        "isJurisdictionFilled"?: boolean;
        /**
          * If `true`, this component will lso render 1-3 bullet items indicating next steps for the user
         */
        "showNextSteps"?: boolean;
        /**
          * State for matching to location
         */
        "state"?: string;
    }
    interface PtpInfoState {
        /**
          * State abbreviation
         */
        "state"?: string;
    }
    interface UiGeojsonToSvg {
        "geoJson"?: GeoJSON;
        "height"?: number;
        "options"?: Options;
        "width"?: number;
    }
    interface UiLoadingSpinner {
        "small"?: boolean;
    }
    interface IntrinsicElements {
        "input-address": InputAddress;
        "input-possibly-hidden-select": InputPossiblyHiddenSelect;
        "power-the-polls-form": PowerThePollsForm;
        "ptp-info-jurisdiction": PtpInfoJurisdiction;
        "ptp-info-poll-worker": PtpInfoPollWorker;
        "ptp-info-state": PtpInfoState;
        "ui-geojson-to-svg": UiGeojsonToSvg;
        "ui-loading-spinner": UiLoadingSpinner;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "input-address": LocalJSX.InputAddress & JSXBase.HTMLAttributes<HTMLInputAddressElement>;
            "input-possibly-hidden-select": LocalJSX.InputPossiblyHiddenSelect & JSXBase.HTMLAttributes<HTMLInputPossiblyHiddenSelectElement>;
            "power-the-polls-form": LocalJSX.PowerThePollsForm & JSXBase.HTMLAttributes<HTMLPowerThePollsFormElement>;
            "ptp-info-jurisdiction": LocalJSX.PtpInfoJurisdiction & JSXBase.HTMLAttributes<HTMLPtpInfoJurisdictionElement>;
            "ptp-info-poll-worker": LocalJSX.PtpInfoPollWorker & JSXBase.HTMLAttributes<HTMLPtpInfoPollWorkerElement>;
            "ptp-info-state": LocalJSX.PtpInfoState & JSXBase.HTMLAttributes<HTMLPtpInfoStateElement>;
            "ui-geojson-to-svg": LocalJSX.UiGeojsonToSvg & JSXBase.HTMLAttributes<HTMLUiGeojsonToSvgElement>;
            "ui-loading-spinner": LocalJSX.UiLoadingSpinner & JSXBase.HTMLAttributes<HTMLUiLoadingSpinnerElement>;
        }
    }
}
