// Adapted from:
// https://github.com/gagan-bansal/geojson2svg
// https://github.com/geosquare/multigeojson

import {
   LineString as GJLineString,
   MultiLineString as GJMultiLineString,
   MultiPoint as GJMultiPoint,
   MultiPolygon as GJMultiPolygon,
   Point as GJPoint,
   Polygon as GJPolygon,
} from "geojson";

import explode from "./explode";
import translateCoordinates from "./translateCoordinates";
import { BoundsRectangle, Coordinate, Options } from "./types";

function convertCoordinatesToPathString( coords: Coordinate[], res: number, bounds: BoundsRectangle ) {
   return translateCoordinates( coords, res, bounds ).map( coord => coord[0] + "," + coord[1] ).join( " " );
}

export function Point( geom: GJPoint, res: number, bounds: BoundsRectangle, opt?: Options ): string[] {
   const r = opt && opt.pointRadius ? opt.pointRadius : 1;
   const pointAsCircle = !!( opt && opt.pointAsCircle );
   const coords = convertCoordinatesToPathString( [geom.coordinates as Coordinate], res, bounds );
   return pointAsCircle
      ? [coords]
      : [
         "M" + coords
         + " m" + -r + ",0" + " a" + r + "," + r + " 0 1,1 " + 2 * r + "," + 0
         + " a" + r + "," + r + " 0 1,1 " + -2 * r + "," + 0,
      ];
}

export function MultiPoint( geom: GJMultiPoint, res: number, bounds: BoundsRectangle, opt?: Options ): string[] {
   const exploded = !!( opt && opt.explode );
   const paths = explode( geom ).map( ( single ) => Point( single, res, bounds, opt )[0] );
   return !exploded ? [paths.join( " " )] : paths;
}

export function LineString( geom: GJLineString, res: number, bounds: BoundsRectangle, _?: any ): string[] {
   return ["M" + convertCoordinatesToPathString( geom.coordinates as Coordinate[], res, bounds )];
}

export function MultiLineString( geom: GJMultiLineString, res: number, bounds: BoundsRectangle, opt?: { explode?: boolean } ): string[] {
   const exploded = !!( opt && opt.explode );
   const paths = explode( geom ).map( ( single ) => LineString( single, res, bounds )[0] );
   return !exploded ? [paths.join( " " )] : paths;
}

export function Polygon( geom: GJPolygon, res: number, bounds: BoundsRectangle, _?: any ): string[] {
   let result = convertCoordinatesToPathString( geom.coordinates[0] as Coordinate[], res, bounds );
   if( geom.coordinates.length > 1 ) {
      let holes = geom.coordinates.slice( 1, geom.coordinates.length );
      if( holes ) {
         for( let i = 0; i < holes.length; i++ ) {
            result += " M" + convertCoordinatesToPathString( holes[i] as Coordinate[], res, bounds );
         }
      }
   }
   return ["M" + result + "Z"];
}

export function MultiPolygon( geom: GJMultiPolygon, res: number, bounds: BoundsRectangle, opt?: { explode?: boolean } ): string[] {
   let exploded = !!( opt && opt.explode );
   let paths = explode( geom ).map( ( single ) => {
      return Polygon( single, res, bounds )[0];
   } );
   return !exploded
      ? [paths.join( " " ).replace( /Z/g, "" ) + "Z"]
      : paths;
}
