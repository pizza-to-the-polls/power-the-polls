import * as csv from "@fast-csv/parse";
import * as fs from "fs";
import * as path from "path";

import { findJurisdiction } from "../../power-the-polls-form/src/util/WorkElections";

interface CsvRow {
   user_id: string;
   state: string;
   city: string;
   county: string;
   jurisdiction_id: string;
}

const run = () => {
   const file = path.resolve( __dirname, "data2.csv" );
   const writeStream = fs.createWriteStream( path.resolve( __dirname, "output2.csv" ) );
   writeStream.write( "user_id,skip_column_user_state_region,skip_column_user_city,user_county,user_jurisdiction_id\n" );
   const readStream = fs.createReadStream( file );
   console.log( file );
   let rows = 0;
   let missingDataRows = 0;
   const csvStream = csv.parse( { headers: true } )
      .transform( ( row: CsvRow, cb ) => {
         let county = row.county;
         const j = row.jurisdiction_id;
         if( j === "" ) {
            return cb( null, {
               user_id: row.user_id,
               state: row.state,
               city: row.city,
               county: row.county,
               jurisdiction_id: findJurisdiction( row.state, county, row.city ) || "",
            } );
         } else {
            return cb( null, row );
         }
      } )
      .on( "error", error => console.error( error ) )
      .on( "data", ( row: CsvRow ) => {
         rows += 1;
         if( row.jurisdiction_id === "" ) {
            missingDataRows += 1;
         }
         writeStream.write( `${row.user_id},"${row.state}",${row.city},${row.county},${row.jurisdiction_id}\n` );
      } )
      .on( "end", ( rowCount: number ) => console.log( `Parsed ${rowCount} rows. ${missingDataRows} or ${Math.round( missingDataRows / rows * 100 ) / 100} are missing a jurisdiction.` ) );

   readStream.pipe( csvStream );
};

run();
