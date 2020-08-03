/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AboutUs {
    }
    interface AppRoot {
    }
    interface ComponentList {
    }
    interface ContactUs {
    }
    interface H3Bar {
    }
    interface MainForm {
    }
    interface PartnersList {
        /**
          * List of all the partner logos to display
         */
        "partners"?: { logo: string, name: string, founding: boolean }[];
    }
    interface PowerThePollsForm {
        /**
          * The label for an additional field to be displayed on the signup form
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
    }
    interface PrivacyInfo {
    }
    interface PtpFaq {
        /**
          * A list of entries to display in the FAQ see: FaqData.ts see: app-root.tsx
         */
        "data"?: { question: string, answer: string }[];
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
    interface WorkElections {
        /**
          * City for matching to location
         */
        "city": string;
        /**
          * County for matching to location
         */
        "county": string;
        /**
          * State for matching to location
         */
        "state": string;
    }
}
declare global {
    interface HTMLAboutUsElement extends Components.AboutUs, HTMLStencilElement {
    }
    var HTMLAboutUsElement: {
        prototype: HTMLAboutUsElement;
        new (): HTMLAboutUsElement;
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
    interface HTMLContactUsElement extends Components.ContactUs, HTMLStencilElement {
    }
    var HTMLContactUsElement: {
        prototype: HTMLContactUsElement;
        new (): HTMLContactUsElement;
    };
    interface HTMLH3BarElement extends Components.H3Bar, HTMLStencilElement {
    }
    var HTMLH3BarElement: {
        prototype: HTMLH3BarElement;
        new (): HTMLH3BarElement;
    };
    interface HTMLMainFormElement extends Components.MainForm, HTMLStencilElement {
    }
    var HTMLMainFormElement: {
        prototype: HTMLMainFormElement;
        new (): HTMLMainFormElement;
    };
    interface HTMLPartnersListElement extends Components.PartnersList, HTMLStencilElement {
    }
    var HTMLPartnersListElement: {
        prototype: HTMLPartnersListElement;
        new (): HTMLPartnersListElement;
    };
    interface HTMLPowerThePollsFormElement extends Components.PowerThePollsForm, HTMLStencilElement {
    }
    var HTMLPowerThePollsFormElement: {
        prototype: HTMLPowerThePollsFormElement;
        new (): HTMLPowerThePollsFormElement;
    };
    interface HTMLPrivacyInfoElement extends Components.PrivacyInfo, HTMLStencilElement {
    }
    var HTMLPrivacyInfoElement: {
        prototype: HTMLPrivacyInfoElement;
        new (): HTMLPrivacyInfoElement;
    };
    interface HTMLPtpFaqElement extends Components.PtpFaq, HTMLStencilElement {
    }
    var HTMLPtpFaqElement: {
        prototype: HTMLPtpFaqElement;
        new (): HTMLPtpFaqElement;
    };
    interface HTMLSocialShareElement extends Components.SocialShare, HTMLStencilElement {
    }
    var HTMLSocialShareElement: {
        prototype: HTMLSocialShareElement;
        new (): HTMLSocialShareElement;
    };
    interface HTMLWorkElectionsElement extends Components.WorkElections, HTMLStencilElement {
    }
    var HTMLWorkElectionsElement: {
        prototype: HTMLWorkElectionsElement;
        new (): HTMLWorkElectionsElement;
    };
    interface HTMLElementTagNameMap {
        "about-us": HTMLAboutUsElement;
        "app-root": HTMLAppRootElement;
        "component-list": HTMLComponentListElement;
        "contact-us": HTMLContactUsElement;
        "h3-bar": HTMLH3BarElement;
        "main-form": HTMLMainFormElement;
        "partners-list": HTMLPartnersListElement;
        "power-the-polls-form": HTMLPowerThePollsFormElement;
        "privacy-info": HTMLPrivacyInfoElement;
        "ptp-faq": HTMLPtpFaqElement;
        "social-share": HTMLSocialShareElement;
        "work-elections": HTMLWorkElectionsElement;
    }
}
declare namespace LocalJSX {
    interface AboutUs {
    }
    interface AppRoot {
    }
    interface ComponentList {
    }
    interface ContactUs {
    }
    interface H3Bar {
    }
    interface MainForm {
    }
    interface PartnersList {
        /**
          * List of all the partner logos to display
         */
        "partners"?: { logo: string, name: string, founding: boolean }[];
    }
    interface PowerThePollsForm {
        /**
          * The label for an additional field to be displayed on the signup form
         */
        "customFormFieldLabel"?: string;
        /**
          * The URL where the form data will be submitted
         */
        "destination"?: string;
        "optUserOutOfChase"?: boolean;
        /**
          * To display custom text and images for a specific Power the Polls partner, enter their ID here.
         */
        "partnerId"?: string;
    }
    interface PrivacyInfo {
    }
    interface PtpFaq {
        /**
          * A list of entries to display in the FAQ see: FaqData.ts see: app-root.tsx
         */
        "data"?: { question: string, answer: string }[];
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
    interface WorkElections {
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
    interface IntrinsicElements {
        "about-us": AboutUs;
        "app-root": AppRoot;
        "component-list": ComponentList;
        "contact-us": ContactUs;
        "h3-bar": H3Bar;
        "main-form": MainForm;
        "partners-list": PartnersList;
        "power-the-polls-form": PowerThePollsForm;
        "privacy-info": PrivacyInfo;
        "ptp-faq": PtpFaq;
        "social-share": SocialShare;
        "work-elections": WorkElections;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "about-us": LocalJSX.AboutUs & JSXBase.HTMLAttributes<HTMLAboutUsElement>;
            "app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
            "component-list": LocalJSX.ComponentList & JSXBase.HTMLAttributes<HTMLComponentListElement>;
            "contact-us": LocalJSX.ContactUs & JSXBase.HTMLAttributes<HTMLContactUsElement>;
            "h3-bar": LocalJSX.H3Bar & JSXBase.HTMLAttributes<HTMLH3BarElement>;
            "main-form": LocalJSX.MainForm & JSXBase.HTMLAttributes<HTMLMainFormElement>;
            "partners-list": LocalJSX.PartnersList & JSXBase.HTMLAttributes<HTMLPartnersListElement>;
            "power-the-polls-form": LocalJSX.PowerThePollsForm & JSXBase.HTMLAttributes<HTMLPowerThePollsFormElement>;
            "privacy-info": LocalJSX.PrivacyInfo & JSXBase.HTMLAttributes<HTMLPrivacyInfoElement>;
            "ptp-faq": LocalJSX.PtpFaq & JSXBase.HTMLAttributes<HTMLPtpFaqElement>;
            "social-share": LocalJSX.SocialShare & JSXBase.HTMLAttributes<HTMLSocialShareElement>;
            "work-elections": LocalJSX.WorkElections & JSXBase.HTMLAttributes<HTMLWorkElectionsElement>;
        }
    }
}
