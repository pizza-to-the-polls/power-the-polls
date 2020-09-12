import partners from "./PartnerList.json";
import { Partner } from "./types";

/**
 * If a partner is not in this list, they can only have their partner ID added as the source using the `source` querystring parameter
 * (e.g.: `https://powerthepolls.org?source=foobar-baz`)
 * See `Partner` type for more info
 */
const data: Partner[] = partners;
export default data;
