import { Component, h, Prop } from "@stencil/core";

@Component( {
   tag: "loading-spinner",
   styleUrl: "loading-spinner.scss",
   shadow: true,
} )
export class LoadingSpinner {

   @Prop() public dark: boolean = false;

   public render() {
      return (
         <div class={{ "sk-cube-grid": true, "dark": this.dark }}>
            {[...new Array( 9 ).keys()].map( x => <div class={`sk-cube sk-cube${x}`}></div> )}
         </div>
      );
   }

}
