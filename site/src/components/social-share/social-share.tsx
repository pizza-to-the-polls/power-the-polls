import { Component, h, Host, Prop } from "@stencil/core";

declare const gtag: ( type: string, key: string, data: any ) => void;

@Component( {
   tag: "social-share",
   styleUrl: "social-share.scss",
   shadow: false,
} )
export class SocialShare {

   /**
    * The full name of the social network. Used as the link title text.
    */
   @Prop() public name?: string;

   /**
    * The displayed call-to-action text
    */
   @Prop() public cta?: string;

   /**
    * Image to use from assets/images/social/*
    */
   @Prop() public image?: string;

   /**
    * href for anchor (will open in a new window)
    */
   @Prop() public url?: string;

   /**
    * Key to send for analytics when user selects this social share
    */
   @Prop() public analytics?: string;

   public render() {
      return ( <Host>
         <a
            href={this.url}
            title={`Share on ${this.name}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => !!this.analytics ? null : gtag( "event", this.analytics || "", { "event_category": "social_share", "event_label": "" } )}
         >
            <img
               alt={this.name}
               src={`assets/images/social/${this.image}`}
               width="41"
               height="41"
            />
            <span>{this.cta}</span>
         </a>
      </Host> );
   }

}
