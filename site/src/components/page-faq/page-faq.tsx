import { Component, h, Host, Prop } from "@stencil/core";

import { Fragment } from "../../util/Fragment";

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
   @Prop() public data?: { question: string, answer: string }[];

   public render() {
      const data = this.data || [];
      return ( <Host>
         <h1>Frequently Asked Questions about Poll Working</h1>
         {data.map( ( item, index ) => (
            <Fragment>
               <div class="number">0{index + 1}</div>
               <h3>{item.question}</h3>
               <hr />
               <p>{item.answer}</p>
            </Fragment>
         ) )}
      </Host> );
   }

}
