// NOTE: IF you get an error like...
//     [ ERROR ]  Rollup: Missing Export: ./src/data/PartnerList.ts:1:7
//     'default' is not exported by ./src/data/PartnerList.json, imported by ./src/data/PartnerList.ts
// ...there is probably a syntax error in PartnerList.json, e.g., a trailing comma on the last entry of an object
import partners from "./PartnerList.json";
import { Partner } from "./types";

/**
 * If a partner is not in this list, they can only have their partner ID added as the source using the `source` querystring parameter
 * (e.g.: `https://powerthepolls.org?source=foobar-baz`)
 * See `Partner` type for more info
 */
const data: Partner[] = partners;
export default data;
