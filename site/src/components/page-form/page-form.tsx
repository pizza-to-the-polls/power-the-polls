import "@ptp-us/power-the-polls-form";
import {Component, Fragment, h, Host, Prop, State} from "@stencil/core";

import {PartnerList} from "../../data";
import analytics from "../../util/Analytics";

/**
 * The power-the-polls-form for the main site because there are a few additional bits of text and branding that
 * aren't part of power-the-polls-form
 */
@Component({
    tag: "page-form",
    styleUrl: "page-form.scss",
    shadow: false,
})
export class PageForm {
    /**
     * Optional partnerId/source parameter to use when submitting the form. If the partnerId exists
     * in `/data/PartnerList.ts` then additional partner data will be looked up.
     */
    @Prop() public partnerId?: string;

    @State() private formComplete: boolean;

    constructor() {
        this.formComplete = false;
    }

    public render() {
        const partnerId = this.partnerId;
        const partner = partnerId != null
            ? (PartnerList.filter(p => p.partnerId === partnerId) || [null])[0]
            : null;

        const formCompleted = () => {
            analytics.signup();
            this.formComplete = true;
        };

        const formError = (err: any) => {
            console.log("Error submitting data", err);
        };

        return (
            <Host class={{"complete": this.formComplete}}>
                {!this.formComplete ? (<Fragment>
                    <img
                        class={{
                            "main-logo": true,
                            "partner": partner?.logoAppearsOnLandingPage ?? false,
                        }}
                        alt="Power the Polls"
                        src="/assets/images/logo-icon-pink.png"
                    />
                    {partner?.logoAppearsOnLandingPage && (
                        <img
                            class={{
                                "partner-logo": true,
                                "dark": partner.logoIsDark ?? false,
                            }}
                            src={`/assets/images/partners/${partner.logo}`}
                            title={partner.name}
                        />
                    )}
                    <h1 class={{"partner": partner?.logoAppearsOnLandingPage ?? false}}>Help staff your local polling
                        place</h1>
                    <p>
                        In 2020, America faced a record shortage of poll workers due to the coronavirus, and over
                        700,000 people stepped up via Power the Polls to help meet that challenge. That was just the
                        beginning.
                    </p>
                    <p>
                        Our democracy depends on ordinary people who make sure every election runs smoothly and
                        everyone's vote is counted. You can make sure we have safe, fair, and efficient elections for
                        all. Step up and become a poll worker in your community this year.
                    </p>

                    <div class="incentive-container">
                        <p class="accent uppercase">Poll workers get:</p>
                        <div class="incentive-items">
                            <div>
                                <img src="/assets/images/icon_checkmark.svg" />
                                <h2>Training</h2>
                            </div>
                            <div>
                                <img src="/assets/images/icon_checkmark.svg" />
                                <h2>Paid*</h2>
                            </div>
                        </div>
                        <p class="accent">*Varies by location</p>
                    </div>
                    <hr />
                </Fragment>) : null}
                <power-the-polls-form
                    id="form"
                    partnerId={partnerId}
                    partnerName={partner?.name}
                    optUserOutOfChase={partner?.optUserOutOfChase || false}
                    customFormFieldLabel={partner?.customSignupFormField}
                    onSubmitCompleted={formCompleted}
                    onSubmitError={formError}
                />
            </Host>
        );
    }
}
