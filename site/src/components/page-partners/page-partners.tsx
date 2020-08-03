import { Component, h, Host, Prop } from "@stencil/core";

@Component( {
   tag: "page-partners",
   styleUrl: "page-partners.scss",
   shadow: false,
} )
export class PagePartners {

   /**
    * List of all the partner logos to display
    */
   @Prop() public partners?: { logo: string, name: string, founding: boolean }[];

   public render() {
      const partners = this.partners || [];
      return ( <Host>
         <h1>Power the Polls Partners</h1>
         <p>
            Power the Polls is uniting nonprofits and businesses to help recruit and support these workers by:
         </p>
         <ul>
            <li>Educating potential voters about the opportunity to work Election Day polling places.</li>
            <li>Creating efficient and effective programming that ensures poll workers sign up and then show up when they’re needed.</li>
            <li>Activating businesses to give their workers Election Day off so they can serve.</li>
            <li>Providing PPE to ensure worker safety on Election Day (through corporate partners)</li>
         </ul>
         <p>
            Over the coming weeks, Power the Polls will recruit poll workers while simultaneously activating business to get involved.
         </p>
         <p>
            If you’d like to become a campaign partner, please reach out to: <a href="mailto:partnerships@powerthepolls.org">partnerships@powerthepolls.org</a>.
         </p>

         <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
         <blockquote class="twitter-tweet">
            <p lang="en" dir="ltr">
               America is facing a nationwide poll worker shortage, but you can
               help by going to <a href="https://t.co/70gHiVzDaT">https://t.co/70gHiVzDaT</a>
               <a href="https://t.co/qBJbcmVpVp">pic.twitter.com/qBJbcmVpVp</a>
            </p>&mdash; The Daily Show (@TheDailyShow)
            <a href="https://twitter.com/TheDailyShow/status/1283099189568626690?ref_src=twsrc%5Etfw">July 14, 2020</a>
         </blockquote>

         <h3-bar>Founding Partners</h3-bar>
         <p>
            Power the Polls is a collaboration between nonprofit organizations and businesses:
         </p>
         <div class="partner-logos">
            {partners.map( partner => (
               partner.founding && partner.logo && ( <img
                  src={`assets/images/partners/${partner.logo}`}
                  title={partner.name}
               /> )
            ) )}
         </div>

         <h3-bar>Partners</h3-bar>
         <div class="partner-logos">
            {partners.map( partner => (
               !partner.founding && partner.logo && ( <img
                  src={`assets/images/partners/${partner.logo}`}
                  title={partner.name}
               /> )
            ) )}
         </div>
      </Host> );
   }
}