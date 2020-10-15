// NOTE: IF you get an error like...
//     [ ERROR ]  Rollup: Missing Export: ./src/data/PartnerList.ts:1:7
//     'default' is not exported by ./src/data/PartnerList.json, imported by ./src/data/PartnerList.ts
// ...there is probably a syntax error in PartnerList.json, e.g., a trailing comma on the last entry of an object
import partners from "./PartnerList.json";
import { Partner } from "./types";

/**
 * See `Partner` type for more info. See the `page-partners-table` component for the editor.
 */
const data: Partner[] = partners;
export default data;
