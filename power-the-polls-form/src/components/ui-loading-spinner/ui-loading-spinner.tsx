import { Component, h } from "@stencil/core";

@Component( {
   tag: "ui-loading-spinner",
   styleUrl: "ui-loading-spinner.scss",
   shadow: true,
} )
export class LoadingSpinner {
   public render() {
      return (
         <div class={{ "sk-cube-grid": true }}>
            {[...new Array( 9 ).keys()].map( x => <div class={`sk-cube sk-cube${x}`} part="cube"></div> )}
         </div>
      );
   }
}
