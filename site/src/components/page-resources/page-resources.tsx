import { FunctionalComponent } from "@ptp-us/power-the-polls-form/types/stencil-public-runtime";
import { Component, Fragment, h, Host } from "@stencil/core";

import { ResourceVideos } from "../../data";
import { VideoInfo } from "../../data/types";

const Video: FunctionalComponent<{ video: VideoInfo }> = ( { video } ) => {
   return video.url == null
      ? (
         <div class="placeholder">
            <div class="box"></div>
            <div class="text">Coming Soon</div>
         </div>
      ) : (
         <video controls>
            <source
               src={video.url}
               type={video.mimeType || "video/mp4"}
            />
            Sorry, your browser doesn't support embedded videos.
         </video>
      );
};

@Component( {
   tag: "page-resources",
   styleUrl: "page-resources.scss",
   shadow: false,
} )
export class PageResources {

   public render() {
      return (
         <Host>
            <h1>Resources</h1>
            <h2>You’ve signed up to be a poll worker! Now it’s time to do some homework so you’re ready to serve!</h2>
            <hr />
            <p>
               <strong>Being a poll worker is an important job -- and we’re so grateful you stepped up! And preparing to fulfill your duties is critical.</strong>
            </p>
            <p>
               That’s why we’ve partnered with All Voting Is Local and the International Well Building Institute to put together this series of short videos to help you get ready.
            </p>
            {ResourceVideos.map( group => (
               group.videos.length === 1 ?
                  <Fragment>
                     <Video video={group.videos[0]} />
                  </Fragment>
                  :
                  <Fragment>
                     {group.category &&
                        <ui-h3-bar>{group.category}</ui-h3-bar>
                     }
                     <div class="videos-container">
                        {group.videos.map( video => (
                           <div>
                              <Video video={video} />
                              <p>{video.name}</p>
                           </div>
                        ) )}
                     </div>
                  </Fragment>
            ) )}
            <ui-h3-bar>Additional Resources</ui-h3-bar>
            <p>
               You can also visit <a href="https://www.trainthepolls.com" target="_blank">www.trainthepolls.com</a> to find additional resources, including some state-specific one-pagers and other guides.
            </p>
         </Host>
      );
   }

}
