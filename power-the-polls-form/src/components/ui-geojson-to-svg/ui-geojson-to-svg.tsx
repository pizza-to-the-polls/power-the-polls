import { Component, h, Host, Prop, State, Watch } from "@stencil/core";
import { GeoJSON, MultiPolygon, Polygon } from "geojson";

import { isNullOrEmpty } from "../../util";

import explode from "./explode";
import GeoJsonRenderer from "./GeoJsonRenderer";
import mercator from "./mercator";
import { BoundsRectangle, Options, Size } from "./types";

@Component( {
   tag: "ui-geojson-to-svg",
   styleUrl: "ui-geojson-to-svg.scss",
   shadow: false,
} )
export class UiGeojsonToSvg {

   @Prop() public geoJson?: GeoJSON;
   @Prop() public options?: Options;

   @Prop() public width: number;
   @Prop() public height: number;

   @State() private renderer!: GeoJsonRenderer;
   /**
    * `geoJson` after running through a mercator projection and converting to a single Polygon
    */
   @State() private projectedGeoJson?: Polygon;

   constructor() {
      this.width = 200;
      this.height = 200;
      if( this.geoJson == null ) {
         this.renderer = new GeoJsonRenderer( this.options );
      } else {
         this.updateProjectedGeoJson();
         this.resetRenderer();
      }
   }

   public render() {
      try {
         let json = this.projectedGeoJson;
         return json && <Host
            innerHTML={`<svg xmlns="http://www.w3.org/2000/svg" width="${this.width}" height="${this.height}">
            ${this.renderer.convert( json, this.options ).join( "\n" )}
         </svg>`}
         />;
      } catch( e ) {
         console.error( e );
         return null;
      }
   }

   @Watch( "geoJson" )
   public geoJsonChanged() {
      this.updateProjectedGeoJson();
      this.resetRenderer();
   }

   @Watch( "width" )
   public widthChanged() {
      this.resetRenderer();
   }

   @Watch( "height" )
   public heightChanged() {
      this.resetRenderer();
   }

   @Watch( "options" )
   public optionsChanged() {
      this.resetRenderer();
   }

   /**
    * Create a new renderer if any relevant properties have changed
    */
   private resetRenderer() {
      let data = this.projectedGeoJson;
      if( data != null ) {
         const bounds = this.getBoundingBox( data );
         const scale = this.calculateScale( bounds, { width: this.width, height: this.height } );
         this.renderer = new GeoJsonRenderer( {
            ...this.options,
            bounds: { yMax: bounds.yMax, xMax: bounds.xMax, yMin: bounds.yMin, xMin: bounds.xMin },
            scale: scale,
         } );
      }
   }

   /**
    * When we load the data, scale the points to account for the mercator projection. Also trim out the excess since we know it will always just be a single Polygon
    */
   private updateProjectedGeoJson() {
      const json = this.geoJson;
      if( !isNullOrEmpty( json ) ) {
         try {
            const data = explode( json as MultiPolygon )[0];
            const coords = data.coordinates[0];
            for( let x = 0; x < coords.length; x++ ) {
               const long = coords[x][0];
               const lat = coords[x][1];
               let pt = mercator( long, lat );
               coords[x] = [pt.x, pt.y];
            }
            this.projectedGeoJson = data;
         } catch( e ) {
            console.log( {
               status: "ERROR",
               data: json,
               error: e,
            } );
         }
      }
   }

   /**
    * Center a bounding box over the geoJSON data
    */
   private getBoundingBox( data: Polygon ) {
      let bounds = { xMin: Number.MAX_VALUE, xMax: Number.MIN_SAFE_INTEGER, yMin: Number.MAX_VALUE, yMax: Number.MIN_SAFE_INTEGER };
      const coords = data.coordinates[0];
      for( let x = 0; x < coords.length; x++ ) {
         const long = coords[x][0];
         const lat = coords[x][1];
         bounds.xMin = bounds.xMin < long ? bounds.xMin : long;
         bounds.xMax = bounds.xMax > long ? bounds.xMax : long;
         bounds.yMin = bounds.yMin < lat ? bounds.yMin : lat;
         bounds.yMax = bounds.yMax > lat ? bounds.yMax : lat;
      }
      return bounds;
   }

   /**
    * Determine scale to apply to the rendered image to fit it in the desired space
    */
   private calculateScale( bounds: BoundsRectangle, viewportSize: Size, fitTo?: "width" | "height" | "larger" | "smaller" ): number {
      let xScale = viewportSize.width / Math.abs( bounds.xMax - bounds.xMin );
      let yScale = viewportSize.height / Math.abs( bounds.yMax - bounds.yMin );
      if( fitTo ) {
         return fitTo === "width" ? xScale : fitTo === "height" ? yScale : fitTo === "larger" ? Math.max( xScale, xScale ) : Math.min( xScale, yScale );
      }
      return Math.min( xScale, yScale );
   }

}

