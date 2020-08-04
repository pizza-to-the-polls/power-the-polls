import { Jurisdictions } from "../data";

const workElectionsDomain = "https://workelections.powerthepolls.org";

/**
 * Asynchronous function for returning data from WE
 */
export const fetchFromWE = async ( path: string ) => {
   const data = await fetch( `${workElectionsDomain}${path}`, {
      method: "GET",
      mode: "cors",
   } );
   return await data.json();
};

/**
 * Return the URL of the Work Election's jurisdiction
 **/
export const findJurisdiction = ( state: string, county?: string, city?: string ): number | null => {
   const stateData = Jurisdictions[state];

   if( stateData ) {
      const found = [
         `${city} charter township, ${county} County`,
         `${city} township, ${county} County`,
         `${city} town, ${county} County`,
         `${city} village, ${county} County`,
         `${city} city, ${county} County`,
         `${city} (City)`,
         `${county} County`,
      ].find( type => stateData.jurisdictions[type] );

      if( found ) { return stateData.jurisdictions[found]; }
   }

   return null;
};


/**
 * Return the URL of the Work Election's state
 **/
export const findState = ( state: string ): number | null => {
   const stateData = Jurisdictions[state];

   return stateData ? stateData.id : null;
};
