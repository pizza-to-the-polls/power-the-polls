import { Component, h, Host, Prop, State } from "@stencil/core";
import { MultiPolygon } from "geojson";

import { JurisdictionInfo } from "../../data/States";
import { allNullOrEmpty, isNullOrEmpty, PtpFormData, PtpLink } from "../../util";
import { fetchJurisdictionGeoJson, fetchJurisdictionInfo } from "../../util/WorkElections";

import EmailApplicationForm from "./EmailApplicationForm";

const CompleteApplicationButton = ( j: JurisdictionInfo ) => {
   return j?.application && j?.application !== "" && (
      <a
         class="poll-worker-action cta"
         href={j.application}
         target="_blank"
      >Complete your application</a>
   );
};

/**
 * Component to render work elections jurisdiction data.
 */
@Component( {
   tag: "ptp-info-jurisdiction",
   styleUrl: "ptp-info-jurisdiction.scss",
   shadow: false,
} )
export class JurisdictionInfoComponent {

   /**
     * ID of jurisdiction for Work Elections
     */
   @Prop() public jurisdictionId?: string | number;

   /**
    * Props possibly passed in from the form
    */
   @Prop() public addtl?: PtpFormData;

   @State() private jurisdiction?: JurisdictionInfo;
   @State() private jurisdictionShape?: MultiPolygon;
   @State() private formData: PtpFormData = {};
   @State() private mailToFormComplete: boolean;

   constructor() {
      this.mailToFormComplete = false;
   }

   public componentWillLoad() {
      this.formData = this.addtl || {};
      if( this.jurisdictionId ) {
         fetchJurisdictionInfo( this.jurisdictionId ).then( x => this.jurisdiction = x );
         fetchJurisdictionGeoJson( this.jurisdictionId ).then( x => this.jurisdictionShape = x );
      }
   }

   public render() {
      const j = this.jurisdiction;

      if( j == null ) {
         return ( <Host>
            <slot />
            <ui-loading-spinner />
         </Host> );
      }

      if( !j.name ) {
         return ( <Host>
            <h3>Uh oh!</h3>
            <p>
               Unfortunately we're not able to retrieve jurisdiction{" "}
               <strong>#{this.jurisdictionId}</strong>{" "}
               at this time
            </p>
            <p>
               Please contact <a href={`mailto:info@powerthepolls.org?subject=Error%20with%20jurisdiction%20${this.jurisdictionId}`}>info@powerthepolls.org</a>{" "}
               and let us know the zip code you've entered.
            </p>
         </Host> );
      }

      return ( <Host>

         <div style={{ display: "flex", alignItems: "start", flexDirection: "column" }}>
            <ui-geojson-to-svg
               geoJson={this.jurisdictionShape}
               height={180}
               width={250}
            />
         </div>

         <h2>{j.name}, {j.state.alpha}</h2>
         {j.jurisdiction_link_text && j.jurisdiction_link &&
            ( <p>
               {j.jurisdiction_link_text}
               {" "}
               <PtpLink path={`/jurisdiction/${j.jurisdiction_link.id}`} >click here</PtpLink>.
            </p> )}

         <CompleteApplicationButton {...j} />

         {!this.mailToFormComplete &&
            <EmailApplicationForm jurisdiction={j} data={this.formData} onComplete={() => this.mailToFormComplete = true} />
         }

         <slot />

         <section>
            <h4>Hours and Compensation</h4>
            {!allNullOrEmpty( j?.hours_start, j?.hours_end, j?.compensation, j?.full_day_req )
               ? (
                  <ul>
                     {j.hours_start && ( <li><strong>Start Time: </strong>{j.hours_start}</li> )}
                     {j.hours_end && ( <li><strong>End Time: </strong>{j.hours_end}</li> )}
                     {j.compensation && ( <li><strong>Compensation: </strong>{j.compensation}</li> )}
                     {j.full_day_req === "Y" ? <li>You must work the full day</li> : null}
                     {j.full_day_req === "N" && ( <li>Part-day poll worker shifts are available.</li> )}
                     {j.full_day_req.length > 1 && ( <li>{j.full_day_req}</li> )}
                  </ul>
               ) : <p>Please contact your local election official for more information</p>}
         </section>

         {!isNullOrEmpty( j.registration_status )
            ? (
               <section>
                  <h4>Voter Registration Requirements</h4>
                  <ul>
                     <li>{j.registration_status === "S"
                        ? `You can be registered to vote anywhere in the state to work on Election Day in ${j.name}.`
                        : j.registration_status === "J"
                           ? `You must be registered to vote in ${j.name} to work on Election Day`
                           : j.registration_status}</li>
                  </ul>
               </section>
            ) : null}

         <section>
            <h4>Work Requirements</h4>
            {!allNullOrEmpty( j?.minimum_age, j?.training, j?.complete_training, j?.training_note )
               ? (
                  <ul>
                     {j.minimum_age && ( <li><strong>Minimum Age: </strong>{j.minimum_age}</li> )}
                     {j.training === "Y" && ( <li>You must attend a training session.</li> )}
                     {j.training.length > 1 && ( <li>{j.training}</li> )}
                     {j.complete_training === "Y" && ( <li>You must work the full day.</li> )}
                     {j.complete_training === "N" && ( <li>Part-day poll worker shifts are available.</li> )}
                     {j.complete_training.length > 1 && ( <li>{j.complete_training}</li> )}
                     {j.training_note && ( <li><strong>Training Details: </strong>{j.training_note}</li> )}
                  </ul>
               ) : <p>Please contact your local election official for more information</p>}
         </section>

         {!allNullOrEmpty( j?.further_notes, j?.trusted_notes )
            ? (
               <section>
                  <h4>Further Notes</h4>
                  <p>{j.further_notes}</p>
                  {j.trusted_notes && ( // "trusted"
                     <div>
                        <iframe
                           sandbox="allow-popups"
                           width="100%"
                           height="100%"
                           frameBorder="0"
                           srcDoc={
                              // hacky way to add styles to the iframe
                              '<head><link href="/build/app.css" rel="stylesheet"></head><body>' +
                              j.trusted_notes.replace( /\<a/g, "<a target=\"_blank\"" ) +
                              "</body>"
                           } />
                     </div>
                  )}
               </section>
            ) : null}

         {!allNullOrEmpty( j?.telephone, j?.email, j?.office_address )
            ? (
               <section>
                  <h4>Contact Information</h4>
                  {j?.telephone &&
                     <p><strong>Phone: </strong><a href={`tel:${j.telephone}`}>{j.telephone}</a></p>}
                  {j?.email &&
                     <p><strong>Email: </strong><a href={`mailto:${j.email}`}>{j.email}</a></p>}
                  {j?.office_address &&
                     <p><strong>Office Address: </strong><a target="_blank" href={`https://www.google.com/maps/search/${encodeURIComponent( j?.office_address )}`}>{j?.office_address}</a></p>}
               </section>
            ) : null}

         {j.website && ( <a
            class="poll-worker-action"
            href={j.website}
            target="_blank"
         >Poll Worker Information</a> )}
         {j.student_website && ( <a
            class="poll-worker-action"
            href={j.student_website}
            target="_blank"
         >Student Poll Worker Information</a> )}
         {j?.application !== "" && <CompleteApplicationButton {...j} />}

      </Host> );
   }
}
