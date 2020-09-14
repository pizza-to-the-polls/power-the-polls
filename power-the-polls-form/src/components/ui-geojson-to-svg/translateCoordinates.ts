import { BoundsRectangle, Coordinate } from "./types";

const translateCoordinates = ( coords: Coordinate[], res: number, bounds: BoundsRectangle ): Coordinate[] => {
   // return coords.map( ( coord ) => [( ( coord[0] - bounds.x ) / res ), ( ( bounds.y - coord[1] ) / res )] );
   return coords.map( ( coord ) => [( ( coord[0] - bounds.xMin ) * res ), ( ( bounds.yMax - coord[1] ) * res )] );
};
export default translateCoordinates;
