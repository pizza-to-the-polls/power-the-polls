import * as fs from "fs";
import * as path from "path";

import { States } from "../../power-the-polls-form/src/data";
const fetch = require( "node-fetch" );

/**
 * Google sheet with all full jurisdictions that is santized from sensitive info
 */
const SHEET_URL = "https://spreadsheets.google.com/feeds/list/1q_iCZWZFPUQm1DKjbaAftRddbNi6EhI4KECdOa4_uVI/";

const getSheet = async (worksheet: string): Promise<Array<{ title: string; content: string }>> => {
  const resp = await fetch(`${SHEET_URL}${worksheet}/public/basic?alt=json`);
  const { feed } = await resp.json();
  const entry: Array<{ content: { $t: string }; title: { $t: string } }> = (feed || {}).entry;

  return entry.map(el => ({ content: el.content.$t, title: el.title.$t }));
};

/** Take state name and replace with Abbreviation. Find output is object pairs WA -> Washington */
const normalizeStates = () => {

  const abbrevationToNameArr = Object.entries(States).map(([key, value]) => [value.name, key]);
  const abbrevationToNameObj: {[key: string]: string} = {};
  abbrevationToNameArr.forEach(data => {
    if(!!data[0] && !!data[1]) {
      abbrevationToNameObj[data[0]] = data[1];
    }
  });

  return abbrevationToNameObj;
};

const getJurisdictionsByState = async () => {
  // Key value pairs of State names to Abbreviations
  const nameToAbb = normalizeStates();
  // Array of objects {state: "AZ", jurisdiction: "something"}
  const all = (await getSheet("1")).map(el => ({state: nameToAbb[el.title], jurisdiction: el.content.split(": ")[1]}));

  const keyByState: ({[key: string]: string[]}) = {};
  all.forEach(item =>  {
    if(!!!keyByState[item.state]) {
      // if not included in map, add to list with first state in array
      keyByState[item.state]  = [item.jurisdiction];
    } else {
      // add jurisdiction to existing array
      keyByState[item.state].push(item.jurisdiction);
    }
  });

  // { MT : [Fallon], MA: [Westwood]}
  return keyByState;
};

const run = async() => {
  const jurisdictions = await getJurisdictionsByState();
  const toBeWritten = {data: jurisdictions};
  const file = path.resolve(__dirname, "../../power-the-polls-form/src/data/full-jurisdictions.json");
  fs.writeFile(file, JSON.stringify(toBeWritten), (err)  => {
    if (err) {
      console.log(err);
      throw err;
    }
  });
};

run();
