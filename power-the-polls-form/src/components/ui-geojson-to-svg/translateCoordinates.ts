import { BoundsRectangle, Coordinate } from "./types";

const translateCoordinates = ( coordinates: Coordinate[], scale: number, bounds: BoundsRectangle ): Coordinate[] => {
   return coordinates.map( ( c ) => [( ( c[0] - bounds.xMin ) * scale ), ( ( bounds.yMax - c[1] ) * scale )] );
};
export default translateCoordinates;
