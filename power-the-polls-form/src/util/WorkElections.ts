import { MultiPolygon } from "geojson";

import { States } from "../data";
import { JurisdictionInfo, StateInfo } from "../data/States";

/**
 * Asynchronous function for returning data from WE
 */
const fetchFromWE = async (path: string) => {
   const data = await fetch(
      "https" + `://workelections.powerthepolls.org${path}`,
      {
         method: "GET",
         mode: "cors",
      }
   );
   return await data.json();
};

export const fetchStateInfo = (stateId: number): Promise<StateInfo> => {
   return fetchFromWE(`/states/${stateId}/`);
};

export const fetchJurisdictionInfo = (
   jurisdictionId: number | string
): Promise<JurisdictionInfo> => {
   return fetchFromWE(`/jurisdictions/${jurisdictionId}/`);
};
export const fetchStateJurisdictionsList = (
   stateId: number
): Promise<JurisdictionInfo[]> => {
   return fetchFromWE(`/jurisdictions/?summary=true&state_id=${stateId}`);
};
export const fetchJurisdictionGeoJson = (
   jurisdictionId: number | string
): Promise<MultiPolygon> => {
   return fetchFromWE(`/jurisdictions/${jurisdictionId}/geojson/`);
};

/**
 * Return the URL of the Work Election's jurisdiction
 **/
export const findJurisdictionId = (
   state: string,
   county?: string,
   city?: string
): number | null => {
   const stateData = States[state];
   if (stateData) {
      const found = [
         `${city} charter township, ${county} County`,
         `${city} township, ${county} County`,
         `${city} town, ${county} County`,
         `${city} village, ${county} County`,
         `${city} city, ${county} County`,
         `${city} (City)`,
         `${city} (Town)`,
         `${city} (Township)`,
         `${city} City`,
         `${city}, ${county} County`,
         `${city} (City), ${county} County`,
         `${city} (Town), ${county} County`,
         `${county} County`,
         `${county} Parish`,
         `${county} Plantation`,
         `${city}`,
         `${county}`,
      ].find((type) => stateData.jurisdictions[type]);

      if (found) {
         return stateData.jurisdictions[found];
      }
   }
   return null;
};

/**
 * Return the URL of the Work Election's state
 **/
export const findStateId = (state: string): number | null => {
   const stateData = States[state];
   return stateData ? stateData.id : null;
};
