import { Component, h, Prop, State, Watch } from "@stencil/core";
import { Fragment } from "../../util";
import { submitToHelpScout }  from './helpscout-webhook';
@Component( {
    tag: "contact-modal",
    styleUrl: "contact-modal.scss",
    shadow: false,
 } )

export class ContactModal {
    
    @Prop({
        mutable: true,
        reflect: true
    })
    public isOpen: boolean = false;

    @Prop()
    public onClose?: () => void;

    @State()
    private formError = false;

    @Watch("isOpen")
    public render() {

        const submitForm = (e: Event) => {
            const form = e.target as HTMLFormElement;
            const elements = [
               ...form.getElementsByTagName( "input" ),
               ...form.getElementsByTagName( "select" ),
               ...form.getElementsByTagName( "textarea" )
            ];
            const data: any = elements.reduce(
               ( x, el ) => { x[el.name] = el.value; return x; },
               ( {} as any ),
            );

            try {
                submitToHelpScout(data)
            } catch(e){
                this.formError = true
            } finally {
                e.preventDefault();
                this.onClose && this.onClose();
            }           
        }

        return (
            <Fragment>
                <div class={this.isOpen ? "wrapper visible" : "wrapper"}>
                    <div class="modal">
                        <button class="close-button" onClick={this.onClose}>
                                <img
                                alt="Close"
                                src="/assets/images/icon-close.svg"
                                width="25"
                            />
                        </button>
                        <h3>Contact us</h3>
                        <p>
                            For Press inquiries, contact us at press@powerthepolls.org. 
                            For all other inquiries, please select the appropriate category below.
                        </p>
                        <div>
                            <contact-form submitForm={e => submitForm(e)} formError={this.formError} />
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}