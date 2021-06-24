import { Point2D } from "./types";

const radius = 6378137;
const max = 85.0511287798;
const radians = Math.PI / 180;

const mercator = (longitude: number, latitude: number) => {
   const point: Point2D = {
      x: radius * longitude * radians,
      y: Math.max(Math.min(max, latitude), -max) * radians,
   };
   point.y = radius * Math.log(Math.tan(Math.PI / 4 + point.y / 2));

   return point;
};
export default mercator;
