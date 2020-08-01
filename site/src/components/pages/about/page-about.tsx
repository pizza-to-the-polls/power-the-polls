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

            <p>Power the Polls is a first-of-its-kind initiative to recruit poll workers to ensure a safe, fair election for all voters.</p>
            <p>This is a critical moment. America is in the midst of a nationwide poll worker shortage.</p>
            <p>Most poll workers are over the age of 60 and, in the era of uncertainty caused by the coronavirus, fewer are signing up for the job (<a target="_blank" rel="noopener" href="https://www.pewresearch.org/fact-tank/2020/04/06/older-people-account-for-large-shares-of-poll-workers-and-voters-in-u-s-general-elections/">source</a>).</p>
            <p>The consequences have already been felt in several recent primaries, where poll worker shortages led to long lines and voter disenfranchisement. For example, 95% of past poll workers in Anchorage, AK, declined to work the polls this year (<a href="https://www.theatlantic.com/ideas/archive/2020/06/looming-threat-voting-person/613552/" target="_blank" rel="noopener">source</a>) and the state of Kentucky consolidated in-person voting in each county to a single polling place during the primary due to poll worker recruitment concerns.</p>

            <h3>What Power the Polls is Doing</h3>
            <p>Power the Polls will be a part of the solution by addressing the need for healthy and diverse poll workers who can staff in-person voting locations during early voting and on Election Day.</p>
            <p>We aim to inspire upwards of 250,000 Americans to sign up as poll workers this year.</p>
            <p>Power the Polls is focusing on healthy candidates to ensure that those workers most susceptible to the coronavirus are given the space to take care of their health, while still keeping polling sites open and available for efficient in-person voting.</p>
            <p>We have fewer than 100 days to sign up poll workers who will:</p>
            <ul>
               <li>Prevent staffing shortages that would result in closure of polling places</li>
               <li>Ensure election technology functions properly and efficiently, minimizing lines and delays</li>
               <li>Help voters in their communities navigate issues when voting.</li>
            </ul>

            <h3>Providing Accurate Poll Worker Information</h3>
            <p>Power the Polls uses data on poll worker requirements researched and collected by the nonpartisan Fair Elections Center, creators of the unique <a href="https://www.workelections.com" target="_blank" rel="noopener">WorkElections.com</a> web portal. Information is available on poll worker compensation, hours, application links, and training and voter registration requirements for more than 4,000 jurisdictions in states across the country.</p>

         </Host>
      );
   }

}
