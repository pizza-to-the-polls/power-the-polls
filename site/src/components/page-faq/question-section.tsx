import { Component, h, Prop } from "@stencil/core";

import { Fragment } from "../../util";

/**
* Component to take groups of faq questions and display them property
* Also holds logic to toggle section open and closed
*/
@Component( {
    tag: "question-section",
    styleUrl: "question-section.scss",
    shadow: false,
 })
export class QuestionSection {

    @Prop() public sectionTitle?: string;
    @Prop() public questions?: { question: string, answer: () => string }[];
    @Prop() public isSectionOpen: boolean = false;
    @Prop() public handleSectionClick: (sectionTitle: string) => void = () => {};

    public render() {
        const sectionTitle = this.sectionTitle || "";
        const questions = this.questions || [];
        const isSectionOpen = this.isSectionOpen;

        return (
            <Fragment>
                <div>
                    <hr />
                    <header>
                        <a class="header-click-wrapper" onClick={() => this.handleSectionClick(sectionTitle)}>
                            <h2 class="section-title">
                                { sectionTitle }
                            </h2>
                            <div class="icon-wrapper">
                                <img
                                    class={isSectionOpen ? "open" : "close"}
                                    alt={`toggle ${isSectionOpen ? "open" : "close"}`}
                                    src="/assets/images/icon_arrow-up.svg"
                                    width="25" />
                            </div>
                        </a>
                    </header>
                    <section class={isSectionOpen ? 'open' : 'close'}>
                    {questions.map(({question, answer}) => (
                        <div class="subquestion">
                            <h4 class="subquestion-title">{question}</h4>
                            <p>{answer()}</p>
                        </div>
                        ))
                    }
                    </section>
                </div>
            </Fragment>
        );
    }
}
