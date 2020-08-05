import { Component, h, Host } from "@stencil/core";

@Component( {
   tag: "page-redirector",
   shadow: false,
} )
export class PageRedirector {
   public render() {
      const hash = document.location.hash.replace("#", "");

      const [state, county, city] = hash.split("?")[0].split("-").map(el => unescape(el));

      return (<Host>
         <poll-worker-info city={city} county={county} state={state} />
      </Host>);
   }

}
