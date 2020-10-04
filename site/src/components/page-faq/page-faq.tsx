import { Component, h, Host, Prop, State } from "@stencil/core";

@Component( {
   tag: "page-faq",
   styleUrl: "page-faq.scss",
   shadow: false,
} )
export class PageFaq {

   /**
    * A list of entries to display in the FAQ
    * see: FaqData.ts
    * see: app-root.tsx
    */
   @Prop() public data?: {sectionTitle: string,  questions: { question: string, answer: () => string }[]}[];

   /**
    * The page's title
    */
   @Prop() public page_title?: string;

   @State() private isModalOpen: boolean = false;
   @State() private openQuesionSection: string = '';

   constructor() {
      this.handleSectionClick = this.handleSectionClick.bind(this);
      this.openQuesionSection = '';
   }

  public handleSectionClick(sectionTitle: string) {
   if(this.openQuesionSection === sectionTitle){
      this.openQuesionSection = '';
   }else{
      this.openQuesionSection = sectionTitle;
   }
  }

   public render() {
      const data = this.data || [];
      const isModalOpen = this.isModalOpen;

      return (
      <Host>
         <h1>{ this.page_title || "" }</h1>
            <p>
            <stencil-route-link url="/faq-contact">English</stencil-route-link>
            {" / "}
            <stencil-route-link url="/faq-es">Español</stencil-route-link>
         </p>
         <p>
            Due to the high volume of emails we receive,
            we recommend taking a look at our FAQ before to see if the answer to your question is there!
            If you have questions specific to your local area,
            contact your local election administrators by entering your zip at <a href="https://www.powerthepolls.org/search">https://www.powerthepolls.org/search</a>
         </p>
         {data.map(({sectionTitle, questions}) => (
            <question-section sectionTitle={sectionTitle} questions={questions} isSectionOpen={this.openQuesionSection === sectionTitle} handleSectionClick={this.handleSectionClick} />
         ) )}
         <hr />
         <h3>Still can’t find the answer to your question?</h3>
         <p>
            Although we can’t guarantee a response to every email due to volume, selecting the appropriate category will help make sure the right person receives your inquiry.
            <br />
            For press inquiries, please contact <a href="mailto:press@powerthepolls.org">press@powerthepolls.org</a>.
         </p>
         <button class="cta" onClick={() => this.handleOpen()}>contact us</button>
         <contact-modal isOpen={isModalOpen} onClose={() => this.handleOnClose()} />
      </Host>
      );
   }

   private handleOnClose() {
     this.isModalOpen = false;
   }

    private handleOpen() {
       this.isModalOpen = true;
    }

}
