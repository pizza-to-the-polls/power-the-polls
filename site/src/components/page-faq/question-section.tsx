import { Component, h, Listen, Prop, State } from "@stencil/core";

import { Fragment } from "../../util";

/**
* Component to take groups of faq questions and display them property
* Also holds logic to toggle section open and closed
*/
@Component( {
    tag: "question-section",
    styleUrl: "page-faq.scss",
    shadow: false,
 })
export class QuestionSection {

    @Prop() public sectionTitle?: string;
    @Prop() public questions?: { question: string, answer: () => string }[];

    @State() private isOpen: boolean = false;

    @Listen("click", { capture: true })
    public handleClick() {
      this.isOpen = !this.isOpen;
    }

    public render() {
        const sectionTitle = this.sectionTitle || "";
        const questions = this.questions || [];
        const isOpen = this.isOpen;
        const handleClick = this.handleClick;

        return (
            <Fragment>
                 <hr />
                <h3 class="section-title">
                    { sectionTitle }
                    <button class="toggle" onClick={handleClick}>
                        <img
                            alt={`toggle ${isOpen ? "open" : "close"}`}
                            src={`/assets/images/${isOpen ? "icon_arrow-up.svg" : "icon_arrow-down.svg"}`}
                            width="25" />
                    </button>
                </h3>
                {isOpen && questions.map(({question, answer}) => (
                    <div>
                        <h4>{question}</h4>
                        <p>{answer()}</p>
                    </div>
                    ))
                }
            </Fragment>
        );
    }
}
