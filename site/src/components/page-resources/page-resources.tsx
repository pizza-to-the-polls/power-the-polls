import { FunctionalComponent } from "@ptp-us/power-the-polls-form/types/stencil-public-runtime";
import { Component, Fragment, h, Host, VNode } from "@stencil/core";

import { ResourceVideos } from "../../data";
import { VideoInfo } from "../../data/types";

const Video: FunctionalComponent<{ video: VideoInfo }> =
   ( { video } ) => video.url == null
      ? (
         <div class="placeholder">
            <div class="box"></div>
            <div class="text">Coming Soon</div>
         </div>
      ) : (
         <div>
            <video controls preload="metadata">
               <source
                  src={video.url + ( video.startFrom != null ? "#t=" + video.startFrom : "" )}
                  type={video.mimeType || "video/mp4"}
               />
               Sorry, your browser doesn't support embedded videos.
            </video>
            {video.additionalInfoLink &&
               <a href={video.additionalInfoLink.link} target="_blank">
                  {video.additionalInfoLink.text}
               </a>
            }
         </div>
      );


const AdditionalNote: FunctionalComponent<{ image: string, background?: boolean, title?: string }> =
   ( { image, background, title }, children: VNode[] ) => (
      <div class="additional-note">
         <img src={image} class={{ "background": background || false }} />
         <p>
            {title && <Fragment><strong>{title}</strong><br /></Fragment>}
            {children}
         </p>
      </div>
   );

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
               <strong>Being a poll worker is an important job &mdash; and we’re so grateful you stepped up! And preparing to fulfill your duties is critical.</strong>
            </p>
            <p>
               That’s why we’ve partnered with All Voting Is Local and the International Well Building Institute to put together this series of short videos to help you get ready.
            </p>
            {ResourceVideos.map( group => (
               group.category == null && group.videos.length === 1 ?
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
            <AdditionalNote
               image="/assets/images/pdf_10_questions.png"
               title="10 questions you may want to ask to help you prepare to be a poll worker"
            >
               As you’re heading into your official training with your local elections office, here are ten questions you may want to ask to help you prepare to be a poll worker.
               <br />
               <a href="https://allvotingislocal.org/wp-content/uploads/2020/10/20_CAA_AVL_10Questions.pdf" target="_blank">Download PDF</a>
            </AdditionalNote>
            <AdditionalNote
               image="/assets/images/pdf_implicit_bias.png"
               title="How our explicit and implicit biases may impact how we treat different individuals at the polls"
            >
               Check out this short guide to help you provide the same level of assistance and support to every voter.
               <br />
               <a href="https://allvotingislocal.org/wp-content/uploads/2020/10/20_CAA_AVL_ImplicitBias-1.pdf" target="_blank">Download PDF</a>
            </AdditionalNote>
            <AdditionalNote image="/assets/images/avil.svg" background>
               Visit <a href="http://www.trainthepolls.com" target="_blank">www.trainthepolls.com</a> to find additional resources, including some state-specific one-pagers and other guides.
            </AdditionalNote>
            <AdditionalNote image="/assets/images/fairelections.png" background>
               Our partners at the Fair Elections Center have put together <a href="https://www.fairelectionscenter.org/state-specific-resources" target="_blank">voting guides for every state</a>.
               Brush up on your local laws so you feel more confident about how to answer common voter questions on Election Day.
            </AdditionalNote>
         </Host>
      );
   }

}
