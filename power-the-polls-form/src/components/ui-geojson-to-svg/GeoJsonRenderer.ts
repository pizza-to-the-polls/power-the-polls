// Adapted from:
// https://github.com/gagan-bansal/geojson2svg
// https://github.com/geosquare/multigeojson

import {
   Feature,
   GeoJSON,
   GeoJsonProperties,
   GeoJsonTypes,
   Geometry,
} from "geojson";

import * as GeoJsonToPath from "./GeoJsonToPath";
import { DrawableGeometry, Options } from "./types";

class GeoJsonRenderer {

   constructor( private options: Options = { scale: 1 } ) {
      this.options.bounds = this.options.bounds || {
         xMin: -20037508.342789244,
         xMax: 20037508.342789244,
         yMin: -20037508.342789244,
         yMax: 20037508.342789244,
      };
      // console.log( "GeoJsonRenderer", "bounds", this.options.bounds, "scale", this.options.scale );
   }

   public convert( geojson: GeoJSON, options?: Options ) {
      let opt = { ...this.options, ...( options || {} ) };
      let results: string[] = [];
      switch( geojson.type ) {
         case "FeatureCollection":
            for( let x = 0; x < geojson.features.length; x++ ) {
               results = [...results, ...this.convertFeature( geojson.features[x], opt )];
            }
            break;

         case "Feature":
            results = this.convertFeature( geojson, opt );
            break;

         case "GeometryCollection":
            for( let x = 0; x < geojson.geometries.length; x++ ) {
               results = [...results, ...this.convertGeometry( geojson.geometries[x], opt )];
            }
            break;

         default:
            results = this.convertGeometry( geojson, opt );
            break;
      }
      return results;
   }

   private convertFeature<G extends Geometry = Geometry>( feature: Feature<G, GeoJsonProperties>, options?: Options ) {
      const featureGeometry = feature?.geometry;
      if( featureGeometry == null ) {
         return [];
      }
      let opt = { ...this.options, ...( options || {} ) };
      if( opt.attributes && opt.attributes instanceof Array ) {
         opt.attributes = opt.attributes.reduce( ( obj, attr ) => {
            if( typeof attr === "string" ) {
               let val;
               const key = attr.split( "." ).pop()!;
               try {
                  val = valueAt( feature, attr );
               } catch( e ) {
                  val = false;
               }
               if( val ) {
                  obj[key] = val;
               }
            } else if( typeof attr === "object" && attr.type && attr.property ) {
               if( attr.type === "dynamic" ) {
                  let val;
                  const key = attr.key ? attr.key : attr.property.split( "." ).pop();
                  try {
                     val = valueAt( feature, attr.property );
                  } catch( e ) {
                     val = false;
                  }
                  if( val ) {
                     obj[key] = val;
                  }
               } else if( attr.type === "static" && attr.value ) {
                  obj[attr.property] = attr.value;
               }
            }
            return obj;
         }, {} );
      } else {
         opt.attributes = opt.attributes || {};
      }

      let attrs = opt.attributes! as { [key: string]: string };
      const id = attrs.id || ( feature as any ).id || ( ( feature as any ).properties && ( feature as any ).properties.id ? ( feature as any ).properties.id : null );
      if( id ) {
         attrs.id = id;
      }
      opt.attributes = attrs;

      return this.convertGeometry( featureGeometry, opt );
   }

   private convertGeometry( geom: Geometry, options: Options ) {
      if( isDrawable( geom ) ) {
         const opt = { ...this.options, ...( options || {} ) };
         const output = opt.output || "svg";
         const paths = GeoJsonToPath[geom.type](
            geom as any/*FIXME*/,
            this.options.scale,
            this.options.bounds!,
            opt,
         );
         if( output === "svg" ) {
            const svgJsons = paths.map( function ( path ) {
               return pathToSvgJson( path, geom.type, opt.attributes, opt );
            } );
            const svgEles = svgJsons.map( function ( json ) {
               return jsonToSvgElement( json, geom.type, opt );
            } );
            return svgEles;
         } else {
            return paths;
         }
      }
      return [];
   }
}

function isDrawable( geom: Geometry ): geom is DrawableGeometry {
   return geom.type in GeoJsonToPath;
}

function pathToSvgJson( path: string, type: GeoJsonTypes, attributes: any, opt?: Options ) {
   let svg: any = {};
   let pointAsCircle = !!( opt && opt.pointAsCircle );
   if( ( type === "Point" || type === "MultiPoint" ) && pointAsCircle ) {
      svg.cx = path.split( "," )[0];
      svg.cy = path.split( "," )[1];
      svg.r = opt && opt.pointRadius ? opt.pointRadius : "1";
   } else {
      svg = { d: path };
      if( type === "Polygon" || type === "MultiPolygon" ) {
         svg["fill-rule"] = "evenodd";
      }
   }
   for( let key in attributes ) {
      if( attributes.hasOwnProperty( key ) ) {
         svg[key] = attributes[key];
      }
   }
   return svg;
}

function jsonToSvgElement( json: any, type: GeoJsonTypes, opt?: Options ) {
   let pointAsCircle = !!( opt && opt.pointAsCircle );
   let ele = ( type === "Point" || type === "MultiPoint" ) && pointAsCircle ? "<circle" : "<path";
   for( let key in json ) {
      if( json.hasOwnProperty( key ) ) {
         ele += " " + key + '="' + json[key] + '"';
      }
   }
   ele += "/>";
   return ele;
}

function valueAt( obj: any, path: string ) {
   return path.split( "." ).reduce( ( x, prop, i, arr ) => {
      if( x.hasOwnProperty( prop ) ) {
         return x[prop];
      } else {
         throw new Error( arr.slice( 0, i + 1 ).join( "." ) + " is not a valid property path" );
      }
   }, obj );
}

export default GeoJsonRenderer;
