import { Component, h, Prop, State } from "@stencil/core";

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

    @State() private isOpen: boolean = false;

    constructor() {
        this.handleClick = this.handleClick.bind(this);
        this.isOpen = false;
     }

    public handleClick() {
      this.isOpen = !this.isOpen;
    }

    public render() {
        const sectionTitle = this.sectionTitle || "";
        const questions = this.questions || [];
        const isOpen = this.isOpen;

        return (
            <Fragment>
                <div>
                    <hr />
                    <header>
                        <a class="header-click-wrapper"onClick={this.handleClick}>
                            <h2 class="section-title">
                                { sectionTitle }
                            </h2>
                            <div class="icon-wrapper">
                                <img
                                    alt={`toggle ${isOpen ? "open" : "close"}`}
                                    src={`/assets/images/${isOpen ? "icon_arrow-up.svg" : "icon_arrow-down.svg"}`}
                                    width="25" />
                            </div>
                        </a>
                    </header>
                    <section>
                    {isOpen && questions.map(({question, answer}) => (
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
