import { Component, h, Host } from "@stencil/core";

@Component( {
   tag: "impact-box",
   styleUrl: "impact-box.scss",
   shadow: false,
} )
export class ImpactBox {

   public render() {
      return ( <Host><slot /></Host> );
   }

}
