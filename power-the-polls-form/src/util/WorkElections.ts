import { States } from "../data";
import { Jurisdiction, StateInfo } from "../data/States";

/**
 * Asynchronous function for returning data from WE
 */
const fetchFromWE = async ( path: string ) => {
   const data = await fetch( `https://workelections.powerthepolls.org${path}`, {
      method: "GET",
      mode: "cors",
   } );
   return await data.json();
};

export const fetchState = ( stateId: number ): Promise<StateInfo> => {
   return fetchFromWE( `/states/${stateId}/` );
};

export const fetchJurisdiction = ( jurisdictionId: number | string ): Promise<Jurisdiction> => {
   return fetchFromWE( `/jurisdictions/${jurisdictionId}/` );
};
export const fetchStateJurisdictionsList = ( stateId: number ): Promise<Jurisdiction[]> => {
   return fetchFromWE( `/jurisdictions/?summary=true&state_id=${stateId}` );
};

/**
 * Return the URL of the Work Election's jurisdiction
 **/
export const findJurisdictionId = ( state: string, county?: string, city?: string ): number | null => {
   const stateData = States[state];
   // stateData.partner
   if( stateData ) {
      const found = [
         `${city} charter township, ${county} County`,
         `${city} township, ${county} County`,
         `${city} town, ${county} County`,
         `${city} village, ${county} County`,
         `${city} city, ${county} County`,
         `${city} (City)`,
         `${city} City`,
         `${county} County`,
      ].find( type => stateData.jurisdictions[type] );

      if( found ) {
         return stateData.jurisdictions[found];
      }
   }
   return null;
};

/**
 * Return the URL of the Work Election's state
 **/
export const findStateId = ( state: string ): number | null => {
   const stateData = States[state];
   return stateData ? stateData.id : null;
};
