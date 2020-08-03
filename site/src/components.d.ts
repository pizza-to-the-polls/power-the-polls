/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { JurisdictionQueryResponse } from "./data/WorkElections";
export namespace Components {
    interface AddressInput {
        /**
          * Delay, in ms, between user pressing a key while entering an address and the API call being made. Default: 200 (ms)
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
    interface AppRoot {
    }
    interface ComponentList {
    }
    interface H3Bar {
    }
    interface JurisdictionInfo {
        /**
          * City for matching to location
         */
        "jurisdictionId"?: number;
    }
    interface PageAbout {
    }
    interface PageContact {
    }
    interface PageFaq {
        /**
          * A list of entries to display in the FAQ see: FaqData.ts see: app-root.tsx
         */
        "data"?: { question: string, answer: string }[];
    }
    interface PageForm {
        /**
          * The API key to access SmartyStreets which is used for address lookup.
         */
        "smartyStreetsApiKey"?: string;
    }
    interface PagePartners {
        /**
          * List of all the partner logos to display
         */
        "partners"?: { logo: string, name: string, founding: boolean }[];
    }
    interface PagePrivacy {
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
    interface SocialShare {
        /**
          * Key to send for analytics when user selects this social share
         */
        "analytics"?: string;
        /**
          * The displayed call-to-action text
         */
        "cta"?: string;
        /**
          * Image to use from `assets/images/social/*`
         */
        "image"?: string;
        /**
          * The full name of the social network. Used as the link title text.
         */
        "name"?: string;
        /**
          * href for anchor (will open in a new window)
         */
        "url"?: string;
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
    interface WorkElectionsInfo {
        "jurisdiction"?: JurisdictionQueryResponse;
    }
}
declare global {
    interface HTMLAddressInputElement extends Components.AddressInput, HTMLStencilElement {
    }
    var HTMLAddressInputElement: {
        prototype: HTMLAddressInputElement;
        new (): HTMLAddressInputElement;
    };
    interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {
    }
    var HTMLAppRootElement: {
        prototype: HTMLAppRootElement;
        new (): HTMLAppRootElement;
    };
    interface HTMLComponentListElement extends Components.ComponentList, HTMLStencilElement {
    }
    var HTMLComponentListElement: {
        prototype: HTMLComponentListElement;
        new (): HTMLComponentListElement;
    };
    interface HTMLH3BarElement extends Components.H3Bar, HTMLStencilElement {
    }
    var HTMLH3BarElement: {
        prototype: HTMLH3BarElement;
        new (): HTMLH3BarElement;
    };
    interface HTMLJurisdictionInfoElement extends Components.JurisdictionInfo, HTMLStencilElement {
    }
    var HTMLJurisdictionInfoElement: {
        prototype: HTMLJurisdictionInfoElement;
        new (): HTMLJurisdictionInfoElement;
    };
    interface HTMLPageAboutElement extends Components.PageAbout, HTMLStencilElement {
    }
    var HTMLPageAboutElement: {
        prototype: HTMLPageAboutElement;
        new (): HTMLPageAboutElement;
    };
    interface HTMLPageContactElement extends Components.PageContact, HTMLStencilElement {
    }
    var HTMLPageContactElement: {
        prototype: HTMLPageContactElement;
        new (): HTMLPageContactElement;
    };
    interface HTMLPageFaqElement extends Components.PageFaq, HTMLStencilElement {
    }
    var HTMLPageFaqElement: {
        prototype: HTMLPageFaqElement;
        new (): HTMLPageFaqElement;
    };
    interface HTMLPageFormElement extends Components.PageForm, HTMLStencilElement {
    }
    var HTMLPageFormElement: {
        prototype: HTMLPageFormElement;
        new (): HTMLPageFormElement;
    };
    interface HTMLPagePartnersElement extends Components.PagePartners, HTMLStencilElement {
    }
    var HTMLPagePartnersElement: {
        prototype: HTMLPagePartnersElement;
        new (): HTMLPagePartnersElement;
    };
    interface HTMLPagePrivacyElement extends Components.PagePrivacy, HTMLStencilElement {
    }
    var HTMLPagePrivacyElement: {
        prototype: HTMLPagePrivacyElement;
        new (): HTMLPagePrivacyElement;
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
    interface HTMLSocialShareElement extends Components.SocialShare, HTMLStencilElement {
    }
    var HTMLSocialShareElement: {
        prototype: HTMLSocialShareElement;
        new (): HTMLSocialShareElement;
    };
    interface HTMLStateInfoElement extends Components.StateInfo, HTMLStencilElement {
    }
    var HTMLStateInfoElement: {
        prototype: HTMLStateInfoElement;
        new (): HTMLStateInfoElement;
    };
    interface HTMLWorkElectionsInfoElement extends Components.WorkElectionsInfo, HTMLStencilElement {
    }
    var HTMLWorkElectionsInfoElement: {
        prototype: HTMLWorkElectionsInfoElement;
        new (): HTMLWorkElectionsInfoElement;
    };
    interface HTMLElementTagNameMap {
        "address-input": HTMLAddressInputElement;
        "app-root": HTMLAppRootElement;
        "component-list": HTMLComponentListElement;
        "h3-bar": HTMLH3BarElement;
        "jurisdiction-info": HTMLJurisdictionInfoElement;
        "page-about": HTMLPageAboutElement;
        "page-contact": HTMLPageContactElement;
        "page-faq": HTMLPageFaqElement;
        "page-form": HTMLPageFormElement;
        "page-partners": HTMLPagePartnersElement;
        "page-privacy": HTMLPagePrivacyElement;
        "poll-worker-info": HTMLPollWorkerInfoElement;
        "power-the-polls-form": HTMLPowerThePollsFormElement;
        "social-share": HTMLSocialShareElement;
        "state-info": HTMLStateInfoElement;
        "work-elections-info": HTMLWorkElectionsInfoElement;
    }
}
declare namespace LocalJSX {
    interface AddressInput {
        /**
          * Delay, in ms, between user pressing a key while entering an address and the API call being made. Default: 200 (ms)
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
    interface AppRoot {
    }
    interface ComponentList {
    }
    interface H3Bar {
    }
    interface JurisdictionInfo {
        /**
          * City for matching to location
         */
        "jurisdictionId"?: number;
    }
    interface PageAbout {
    }
    interface PageContact {
    }
    interface PageFaq {
        /**
          * A list of entries to display in the FAQ see: FaqData.ts see: app-root.tsx
         */
        "data"?: { question: string, answer: string }[];
    }
    interface PageForm {
        /**
          * The API key to access SmartyStreets which is used for address lookup.
         */
        "smartyStreetsApiKey"?: string;
    }
    interface PagePartners {
        /**
          * List of all the partner logos to display
         */
        "partners"?: { logo: string, name: string, founding: boolean }[];
    }
    interface PagePrivacy {
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
    interface SocialShare {
        /**
          * Key to send for analytics when user selects this social share
         */
        "analytics"?: string;
        /**
          * The displayed call-to-action text
         */
        "cta"?: string;
        /**
          * Image to use from `assets/images/social/*`
         */
        "image"?: string;
        /**
          * The full name of the social network. Used as the link title text.
         */
        "name"?: string;
        /**
          * href for anchor (will open in a new window)
         */
        "url"?: string;
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
    interface WorkElectionsInfo {
        "jurisdiction"?: JurisdictionQueryResponse;
    }
    interface IntrinsicElements {
        "address-input": AddressInput;
        "app-root": AppRoot;
        "component-list": ComponentList;
        "h3-bar": H3Bar;
        "jurisdiction-info": JurisdictionInfo;
        "page-about": PageAbout;
        "page-contact": PageContact;
        "page-faq": PageFaq;
        "page-form": PageForm;
        "page-partners": PagePartners;
        "page-privacy": PagePrivacy;
        "poll-worker-info": PollWorkerInfo;
        "power-the-polls-form": PowerThePollsForm;
        "social-share": SocialShare;
        "state-info": StateInfo;
        "work-elections-info": WorkElectionsInfo;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "address-input": LocalJSX.AddressInput & JSXBase.HTMLAttributes<HTMLAddressInputElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "component-list": LocalJSX.ComponentList & JSXBase.HTMLAttributes<HTMLComponentListElement>;
            "h3-bar": LocalJSX.H3Bar & JSXBase.HTMLAttributes<HTMLH3BarElement>;
            "jurisdiction-info": LocalJSX.JurisdictionInfo & JSXBase.HTMLAttributes<HTMLJurisdictionInfoElement>;
            "page-about": LocalJSX.PageAbout & JSXBase.HTMLAttributes<HTMLPageAboutElement>;
            "page-contact": LocalJSX.PageContact & JSXBase.HTMLAttributes<HTMLPageContactElement>;
            "page-faq": LocalJSX.PageFaq & JSXBase.HTMLAttributes<HTMLPageFaqElement>;
            "page-form": LocalJSX.PageForm & JSXBase.HTMLAttributes<HTMLPageFormElement>;
            "page-partners": LocalJSX.PagePartners & JSXBase.HTMLAttributes<HTMLPagePartnersElement>;
            "page-privacy": LocalJSX.PagePrivacy & JSXBase.HTMLAttributes<HTMLPagePrivacyElement>;
            "poll-worker-info": LocalJSX.PollWorkerInfo & JSXBase.HTMLAttributes<HTMLPollWorkerInfoElement>;
            "power-the-polls-form": LocalJSX.PowerThePollsForm & JSXBase.HTMLAttributes<HTMLPowerThePollsFormElement>;
            "social-share": LocalJSX.SocialShare & JSXBase.HTMLAttributes<HTMLSocialShareElement>;
            "state-info": LocalJSX.StateInfo & JSXBase.HTMLAttributes<HTMLStateInfoElement>;
            "work-elections-info": LocalJSX.WorkElectionsInfo & JSXBase.HTMLAttributes<HTMLWorkElectionsInfoElement>;
        }
    }
}
