/**
 * This is the tweet that will be filled in when the user selects the Tiwtter share option
 */
export const tweet = encodeURIComponent( `
🗳️ Join me and make sure our election runs smoothly!
🚨 Prevent voting location closures and long lines at the polls.
▶️ https://www.powerthepolls.org
#PowerThePolls
`).trim();

/**
 * Social share links for the left nav
 * see: social-share.tsx
 * see: app-root.tsx
 */
const data = [
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
      url: "https://www.facebook.com/share.php?u=" + encodeURIComponent( "https://www.powerthepolls.org/" ),
      analytics: "facebook-share",
   },
];
export default data;
