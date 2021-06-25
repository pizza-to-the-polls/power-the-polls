import { Component, h, Prop } from "@stencil/core";

@Component({
   tag: "ui-loading-spinner",
   styleUrl: "ui-loading-spinner.scss",
   shadow: true,
})
export class LoadingSpinner {
   @Prop() public small: boolean;

   constructor() {
      this.small = false;
   }

   public render() {
      return this.small ? (
         <div class="spinner"></div>
      ) : (
         <div class={{ "cube-grid": true }}>
            {[...new Array(9).keys()].map((x) => (
               <div class={`cube cube${x}`} part="cube"></div>
            ))}
         </div>
      );
   }
}
