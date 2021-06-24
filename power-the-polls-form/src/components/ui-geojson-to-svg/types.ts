import {
   LineString,
   MultiLineString,
   MultiPoint,
   MultiPolygon,
   Point,
   Polygon,
} from "geojson";

export type BoundsRectangle = {
   xMin: number;
   xMax: number;
   yMin: number;
   yMax: number;
};

export type Size = { width: number; height: number };

export type Coordinate = [number, number];

export type Point2D = { x: number; y: number };

export type DrawableGeometry =
   | Point
   | MultiPoint
   | LineString
   | MultiLineString
   | Polygon
   | MultiPolygon;

export type Options = {
   bounds?: BoundsRectangle;
   scale: number;
   attributes?: any[] | { [key: string]: string };
   pointAsCircle?: boolean;
   output?: "svg" | "paths";
   explode?: boolean;
   pointRadius?: number;
};
