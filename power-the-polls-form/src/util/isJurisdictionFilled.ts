import { FullJurisdictionsInfo as FullJurisdictions, States } from "../data";

/**
 * Parses form and state data to find if the users jurisdiction still needs poll workers
 */
const isJurisdictionFilled = (
   state: string | null,
   jurisdictionId: string | null
) => {
   if (state == null || !(state in States)) {
      return [false, "Unknown"];
   }

   const {
      noPollWorkersNeeded,
      name,
      jurisdictions: stateJurisdictions,
   } = States[state];
   if (noPollWorkersNeeded === true) {
      return [true, name];
   }

   // no full jurisdictions for that state
   if (!(state in FullJurisdictions)) {
      return [false, name];
   }

   if (jurisdictionId != null && stateJurisdictions) {
      // find the matching jurisdiction name by its ID
      const jurisdictionName =
         Object.keys(stateJurisdictions).find(
            (key) => stateJurisdictions[key] + "" === jurisdictionId
         ) || "";
      return [
         // strip out any extraneous county name suffixes that aren't in the full jurisdiction name
         FullJurisdictions[state].includes(
            jurisdictionName
               .replace(/(County|\(Town\)|\(City\)|Parish|Plantation)$/, "")
               .trim()
         ),
         jurisdictionName,
      ];
   }

   return [false, name];
};

export default isJurisdictionFilled;
