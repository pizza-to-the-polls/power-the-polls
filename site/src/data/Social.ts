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
      url: "https://twitter.com/intent/tweet?text=" + encodeURIComponent( `
🗳️ Join me and make sure our election runs smoothly!
🚨 Prevent voting location closures and long lines at the polls.
▶️ https://www.powerthepolls.org
#PowerThePolls
`).trim(),
      analytics: "twitter-share",
   },
   {
      name: "Instagram",
      cta: "Instagram",
      image: "icon-ig.png",
      url: "https://www.instagram.com/powerthepolls/",
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
