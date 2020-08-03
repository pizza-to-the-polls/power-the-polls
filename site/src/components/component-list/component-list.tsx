import { Component, h, Host } from "@stencil/core";

import { Fragment } from "../../util/Fragment";

/**
 * List of all components in use in the app
 */
@Component( {
   tag: "component-list",
   styleUrl: "component-list.scss",
   shadow: false,
} )
export class ComponentList {

   public render() {
      const items = [
         { tag: "h1", example: <h1>Aliquam vel felis mauris</h1> },
         { tag: "h2", example: <h2>Aliquam vel felis mauris</h2> },
         { tag: "h3", example: <h3>Aliquam vel felis mauris</h3> },
         { tag: "h3-bar", example: <h3-bar>Aliquam vel felis mauris</h3-bar> },
         { tag: "h4", example: <h4>Aliquam vel felis mauris</h4> },
         { tag: "hr", example: <hr /> },
         { tag: "p", example: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a eros luctus, ultricies nisl in, semper justo. Praesent egestas ante non est semper suscipit.</p> },
         {
            tag: "social-share",
            example: <social-share image="icon-fb.png" name="SocialNetworkName" cta="Social Share" url="#" />,
         },
         // {tag: "AAAA", example: FOOOO},
      ];
      return ( <Host>
         <dl>
            {items.map( item => ( <Fragment>
               <dt>&lt;{item.tag}&gt;</dt>
               <dd> {item.example}</dd>
            </Fragment> ) )}
         </dl>
         <div style={{ clear: "both" }}></div>
      </Host> );
   }

}
