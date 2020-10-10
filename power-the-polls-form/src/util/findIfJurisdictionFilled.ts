import { FullJurisdictionData, States } from "../data";
import FullJurisdictionsInfo  from "../data/full-jurisdictions.json";

import { PtpFormData } from "./types";


const UNWANTED_SUB_STRINGS  = ["County", "(Town)", "(City)", "Parish"];
/**
 * Our full poll jurisdiction data does not include County or Town in the name
 * But our state data does, we want to remove theses substrings so we can detect if the names are the same
 */
const removeAdditionalInfo = (jurisdictionName: string) => {
   let newString = "";
   UNWANTED_SUB_STRINGS.forEach(element => {
      let mutated = jurisdictionName.replace(element, "");
      if(mutated !== jurisdictionName) {
         newString = mutated;
      }
   });
   return newString.trim();
};

/**
 * Parses form and state data to find if the users jurisdiction still needs poll workers.
 * Looks at the formData to find the jurisdiction id,
 * which is then mapped and compared against the fullJusdiction names in the FullJurisdictions file
 * */
const findIfJurisdictionFilled = (formData: PtpFormData) => {

   const fullJurisdictionObj = FullJurisdictionsInfo as FullJurisdictionData;
   const FullJurisdictions = fullJurisdictionObj.data;

   if(!formData.state || !formData.jurisdictionId) {
      return false;
   }

   if(FullJurisdictions[formData.state] === undefined) { // no full jurisdictions for that state
      return false;
   }

   const stateInfo = States[formData.state];

   if(stateInfo.id === -1) { // state never needed any pollworkers
      return false;
   }

   let isJurisdictionFilled = false;

    if( stateInfo?.jurisdictions) {
         // find the users state jurisdictions from the state data
        const jurisdictions = stateInfo.jurisdictions;
        // create entries like <jurisdictionId: Jurisdiction Name>  without identifier (county, parish, ect)
        const mapped = new Map(Object.keys(jurisdictions).map((key) => [jurisdictions[key], removeAdditionalInfo(key)]));
        const stateJurisctionNameIdMap = [...mapped.entries()].reduce( ( obj, tuple ) => { obj[tuple[0]] = tuple[1]; return obj; }, ( {} as any ) );        // find jurisdiction name by id
        const formJurisdiction = stateJurisctionNameIdMap[formData.jurisdictionId];
        // check that form jurisdiction is included in the the full poll jurisdictions for that state
        isJurisdictionFilled = FullJurisdictions[formData.state].includes(formJurisdiction) || false;
    }

    return isJurisdictionFilled;
};


export default findIfJurisdictionFilled;
