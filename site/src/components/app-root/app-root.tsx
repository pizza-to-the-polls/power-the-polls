import { Component, h } from "@stencil/core";

@Component( {
   tag: "app-root",
   styleUrl: "app-root.scss",
   shadow: false,
} )
export class AppRoot {

   public render() {

      const tweet = encodeURIComponent( `🗳️ Join me and make sure our election runs smoothly!
🚨 Prevent voting location closures and long lines at the polls.
▶️ https://www.powerthepolls.org
#PowerThePolls`);
      const url = encodeURIComponent( "https://www.powerthepolls.org/" );
      const social = [
         {
            name: "Twitter",
            cta: "Tweet",
            image: "icon-tw.png",
            url: "https://twitter.com/intent/tweet?text=" + tweet,
            analytics: "twitter-share",
         },
         {
            name: "Instagram",
            cta: "Instagram",
            image: "icon-ig.png",
            url: "https://www.instagram.com/p/CCEOfBrjtwg/",
            analytics: "instagram-share",
         },
         {
            name: "Facebook",
            cta: "Share",
            image: "icon-fb.png",
            url: "https://www.facebook.com/share.php?u=" + url,
            analytics: "facebook-share",
         },
      ];

      return (
         <div class="container">
            <aside class="sidebar">
               <div class="container">
                  <h1>
                     <stencil-route-link url="/">
                        <img
                           class="logo"
                           alt="Power the Polls"
                           src="assets/images/logo-blue.svg"
                        />
                     </stencil-route-link>
                  </h1>
                  <nav>
                     <ul>
                        <li>
                           <stencil-route-link url="/signup">Sign Up</stencil-route-link>
                        </li>
                        <li>
                           <stencil-route-link url="/about">About</stencil-route-link>
                        </li>
                        <li>
                           <stencil-route-link url="/faq">FAQ</stencil-route-link>
                        </li>
                        <li>
                           <stencil-route-link url="/partners">Partners</stencil-route-link>
                        </li>
                        <li>
                           <stencil-route-link url="/contact">Contact</stencil-route-link>
                        </li>
                     </ul>
                  </nav>
                  {social.map( service => (
                     <div class="social">
                        <img
                           alt={service.name}
                           src={`assets/images/social/${service.image}`}
                           width="41"
                           height="41"
                        />
                        <a
                           href={service.url}
                           title={service.cta}
                           target="_blank"
                           rel="noopener noreferrer"
                        >
                           {/*onclick="window.open(this.href, 'share','left=20,top=20,width=550,height=250,toolbar=1,resizable=0'); gtag('event', 'instagram-share', {'event_category' : 'social_share','event_label' : ''}); return false;"*/}
                           <span>{service.cta}</span>
                        </a>
                     </div>
                  ) )}
               </div>
            </aside>

            <main>
               <div class="container">
                  <stencil-router>
                     <stencil-route-switch scrollTopOffset={0}>
                        <stencil-route
                           url="/about"
                           component="page-about"
                        />
                        <stencil-route
                           url="/contact"
                           component="page-contact"
                        />
                        <stencil-route
                           url="/faq"
                           component="page-faq"
                        />
                        <stencil-route
                           url="/partners"
                           component="page-partners"
                        />
                        <stencil-route
                           url="/privacy"
                           component="page-privacy"
                        />
                        <stencil-route
                           component="page-form"
                        />
                     </stencil-route-switch>
                  </stencil-router>

                  <footer class="footer u_article">
                     <p>This work is licensed under a Creative Commons Attribution 4.0 International License.</p>
                     <p>Powered by Work Elections.</p>
                     <p>
                        <a
                           href="https://www.workelections.com/"
                           target="_blank"
                           rel="noopener"
                        >
                           <img
                              src="assets/images/partners/work-elections.png"
                              class="footer__logo"
                              alt="Work Elections"
                              width="100"
                           />
                        </a>
                     </p>
                  </footer>
               </div>
            </main>
         </div>
      );
   }
}
