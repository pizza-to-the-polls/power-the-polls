import { Component, h, Host } from "@stencil/core";

@Component( {
   tag: "page-about",
   shadow: false,
} )
export class PageAbout {

   public render() {
      return (
         <Host>
            <h1>About Us</h1>
            <p>
               Power the Polls is a first-of-its-kind initiative to recruit poll workers to ensure a safe, fair election for all voters.
            </p>
            <p>
               This is a critical moment. In 2020, America faced a nationwide poll worker shortage.
            </p>
            <p>
               Most poll workers are over the age of 60 and, in the era of uncertainty caused by the coronavirus, fewer are signing up
               for the job (<a target="_blank" rel="noopener" href="https://www.pewresearch.org/fact-tank/2020/04/06/older-people-account-for-large-shares-of-poll-workers-and-voters-in-u-s-general-elections/" title="Open source in a new window">source</a>).
            </p>
            <p>
               After poll worker shortages wreaked havoc on a number of primary elections in mid-2020, Power the Polls stepped in to
               inspire a new generation of poll workers to staff our elections. Over 700,000 people signed up to serve as the next
               generation of poll workers, and thanks to their outpouring of interests, local elections office were flooded with enough
               staff to help administer the highest-turnout election in over a century.
            </p>

            <h3>Providing Accurate Poll Worker Information</h3>
            <p>
               Power the Polls uses data on poll worker requirements researched and collected by the nonpartisan
               Fair Elections Center, creators of the unique <a href="https://www.workelections.com" target="_blank" rel="noopener" title="Open workelections.com in a new window">WorkElections.com</a>&nbsp;
               web portal. Information is available on poll worker compensation, hours, application links, and training
               and voter registration requirements for more than 4,000 jurisdictions in states across the country.
            </p>
         </Host>
      );
   }

}
