import { Component, h, Host } from "@stencil/core";

@Component( {
   tag: "page-partners",
   styleUrl: "page-partners.scss",
   shadow: false,
} )
export class PagePartners {

   public render() {
      const partners = [
         { logo: "acs.png", name: "ACS" },
         { logo: "alliance-for-youth-organizing.png", name: "" },
         { logo: "american-promise.png", name: "American Promise" },
         { logo: "boys-and-girls-clubs.png", name: "" },
         { logo: "campus-compact.png", name: "" },
         { logo: "civi-georgia.png", name: "" },
         { logo: "civic-alliance.png", name: "" },
         { logo: "comedy-central.png", name: "" },
         { logo: "every-vote-counts.png", name: "" },
         { logo: "fair-elections-center.png", name: "" },
         { logo: "levi-strauss.png", name: "" },
         { logo: "mtv.png", name: "MTV" },
         { logo: "nrdn.png", name: "" },
         { logo: "patagonia.png", name: "" },
         { logo: "pizza-to-the-polls.png", name: "" },
         { logo: "public-wise.png", name: "" },
         { logo: "slsv.png", name: "" },
         { logo: "the-skimm.png", name: "" },
         { logo: "time-to-vote.png", name: "" },
         { logo: "uber.png", name: "Uber" },
         { logo: "unitedway.png", name: "United Way" },
         { logo: "wecanvote.png", name: "" },
         { logo: "when-we-all-vote.png", name: "" },
         { logo: "work-elections.png", name: "" },
      ];
      return ( <Host>
         <h1>Power the Polls Partners</h1>
         <p>
            Power the Polls is uniting nonprofits and businesses to help recruit and support these workers by:
         </p>
         <ul>
            <li>Educating potential voters about the opportunity to work Election Day polling places.</li>
            <li>Creating efficient and effective programming that ensures poll workers sign up and then show up when they’re needed.</li>
            <li>Activating businesses to give their workers Election Day off so they can serve.</li>
            <li>Providing PPE to ensure worker safety on Election Day (through corporate partners).</li>
            <li>Rewarding poll workers for their service by providing virtual gifts (merchandise, gift cards, etc.) from Power the Polls business partners.</li>
         </ul>
         <p>
            Over the coming weeks, Power the Polls will recruit poll workers while simultaneously activating business to get involved.
         </p>
         <p>
            If you’d like to become a campaign partner, please reach out to: <a href="mailto:partnerships@powerthepolls.org">partnerships@powerthepolls.org</a>.
         </p>

         <hr />
         <h3>Founding Partners</h3>
         <p>
            Power the Polls is a collaboration between nonprofit organizations and businesses:
         </p>
         <div class="partner-logos">
            {partners.map( partner => (
               <img
                  src={`assets/images/partners/${partner.logo}`}
                  title={partner.name}
               />
            ) )}
         </div>
      </Host> );
   }
}
