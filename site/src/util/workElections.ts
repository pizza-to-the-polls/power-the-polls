import { Jurisdictions } from "../data";

const workElectionsDomain = "https://workelections.powerthepolls.org";

/**
 * Return the URL of the Work Election's jurisdiction
 **/
export const findJurisdiction = (state: string, county: string, city: string): string | null => {
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
      ].find(type => stateData.jurisdictions[type]);

      if( found ) {
         return `${workElectionsDomain}/jurisdictions/${stateData.jurisdictions[found]}/`;
      }
   }

   return null;
};

/**
 * Return the URL of the Work Election's state
 **/
export const findState = (state: string): string | null => {
   const stateData = Jurisdictions[state];

   if( stateData ) {
      return `${workElectionsDomain}/states/${stateData.id}/`;
   }

   return null;
};
