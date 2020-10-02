import { Component, h, Prop, State } from "@stencil/core";

import { Fragment } from "../../util";

import { submitToHelpScout }  from "./helpscout-webhook";

/**
 * Contact Modal is parent to the contact form
 * Contains logic to submit form information to helpscout via webhook
 * Also has logic to show the message submit state and change content based on submit state
 */

const SUBMIT_SUCCESS = "SUCCESS";
const SUBMIT_FAILURE = "FAILURE";

const NOT_SUBMITTED = "NOT_SUBMITTED";
const SUBMITTING = "SUBMITTING";
const SUBMITTED = "SUBMITTED";

@Component( {
    tag: "contact-modal",
    styleUrl: "contact-modal.scss",
    shadow: false,
 } )
export class ContactModal {

    @Prop({
        mutable: true,
        reflect: true,
    })
    public isOpen: boolean = false;

    @Prop()
    public onClose?: () => void;

    @State()
    private submittedState = NOT_SUBMITTED;

    @State()
    private submitResponseState = "";

    public render() {

        const submitForm = (e: Event) => {
            this.submittedState = SUBMITTING;
            const form = e.target as HTMLFormElement;
            const elements = [
               ...form.getElementsByTagName( "input" ),
               ...form.getElementsByTagName( "select" ),
               ...form.getElementsByTagName( "textarea" ),
            ];
            const data: any = elements.reduce(
               ( x, el ) => { x[el.name] = el.value; return x; },
               ( {} as any ),
            );

            try {
                this.submittedState = SUBMITTED;
                submitToHelpScout(data)
                    .then(( response ) => {
                        if( response === true ) {
                           this.submitResponseState = SUBMIT_SUCCESS;
                        } else {
                            this.submitResponseState = SUBMIT_FAILURE;
                        }
                })
                .catch( err => {
                    console.warn("Error submitting faq form", err);
                    this.submitResponseState = SUBMIT_FAILURE;
                });
            } catch(e) {
                this.submitResponseState = SUBMIT_FAILURE;
            } finally {
                e.preventDefault();
            }
        };

        const successMessage = (<div>
            <h3>Your Message was sent</h3>
            <div>
                Thank you for your email! While we can’t guarantee a response to every email due to volume, we will try to get back to you as soon as possible.
                For a faster response, please review our <a href="#" onClick={() => this.onClose && this.onClose()}>FAQ</a> or
                contact your <a href="https://www.powerthepolls.org/search">local election administrator directly</a>.
            </div>
        </div>);

        const failureMessage = (<div>
            <h3>Uh oh!</h3>
            <div>
                We're unable to process your request. Please email us at <a href="mailto:info@powerthepolls.org">info@powerthepolls.org</a>,
                or <a href="https://www.powerthepolls.org/search">contact your local election administrator directly</a>.
            </div>
        </div>);

        const mainContent = (
            <div>
                <h3>Contact us</h3>
                <p>
                    For Press inquiries, contact us at <a href="mailto:press@powerthepolls.org">press@powerthepolls.org</a>.
                    For all other inquiries, please select the appropriate category below.
                </p>
                <div>
                    <contact-form submitForm={e => submitForm(e)} />
                </div>
            </div>
        );

        const findContent = () => {
            if(this.submittedState === SUBMITTED && this.submitResponseState === SUBMIT_SUCCESS) {
                return successMessage;
            } else if ( this.submittedState === SUBMITTED && this.submitResponseState === SUBMIT_FAILURE) {
                return failureMessage;
            }

            return mainContent;
        };

        return (
            <Fragment>
                <div class={this.isOpen ? "modal-wrapper visible" : "modal-wrapper"}>
                    <div class="modal">
                        <button class="close-button" onClick={() => this.onClose && this.onClose()}>
                                <img
                                alt="Close"
                                src="/assets/images/icon-close.svg"
                                width="25"
                            />
                        </button>
                        {findContent()}
                    </div>
                </div>
            </Fragment>
        );
    }
}
