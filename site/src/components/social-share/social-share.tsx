import { Component, h, Host, Prop } from "@stencil/core";

import { SocialInfo } from "../../data/types";
import analytics from "../../util/Analytics";

@Component( {
   tag: "social-share",
   styleUrl: "social-share.scss",
   shadow: false,
} )
/**
 * Simple button and image used for social network buttons
 */
export class SocialShare implements Partial<SocialInfo> {

   /**
    * The full name of the social network. Used as the link title text.
    */
   @Prop() public name?: string;

   /**
    * The displayed call-to-action text
    */
   @Prop() public cta?: string;

   /**
    * Image to use from `assets/images/social/*`
    */
   @Prop() public image?: string;

   /**
    * href for anchor (will open in a new window)
    */
   @Prop() public url?: string;

   /**
    * Key to send for analytics when user selects this social share
    */
   @Prop() public eventKey?: string;

   public render() {
      return ( <Host>
         <a
            href={this.url}
            title={`Share on ${this.name}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => !!this.eventKey ? null : analytics.socialShare( this.eventKey )}
         >
            <img
               alt={this.name}
               src={`/assets/images/social/${this.image}`}
               width="41"
               height="41"
            />
            <span>{this.cta}</span>
         </a>
      </Host> );
   }
}
