import { StateCode } from "./SmartyStreets";

export declare namespace ZipGeocoding {
   interface Result {
      zip: string;
      cities: Set<string>;
      counties: Set<string>;
      states: Map<StateCode, string>;
   }

   interface Error {
      error: string;
   }
}
