import * as csv from "@fast-csv/parse";
import * as fs from "fs";
import * as path from "path";
import { stdout } from "process";
const fetch = require( "node-fetch" );

const authId = "PASTE_YOUR_TOKEN_SMARTYSTREETS_AUTH_ID_HERE_AND_DONT_COMMIT_IT";
const authToken = "PASTE_YOUR_TOKEN_SMARTYSTREETS_AUTH_TOKEN_HERE_AND_DONT_COMMIT_IT";

interface CsvRow {
   user_email: string;
   user_address: string;
   custom_field_county: string;
   custom_field_jurisdiction_id: string;
   skip_column_1: undefined;
}

const toQueryString = ( data: any ) => {
   return Object.keys( data ).map( key => encodeURIComponent( key ) + "=" + encodeURIComponent( data[key] + "" ) ).join( "&" );
};

/**
 * Try to ge tmore detailed street data given the user's selection
 */
function getCounty( address: string, id?: string ) {
   const url = "https://us-street.api.smartystreets.com/street-address?" + toQueryString( {
      "auth-token": authToken,
      "auth-id": authId,
      "street": address,
   } );
   // console.log( `Looking up county for user ${id}: ${url}` );
   return fetch( url, {
      method: "GET",
      headers: {},
   } )
      .then( response => {
         if( response.status === 200 ) {
            return response.json()
               .then( ( data: any[] ) => {
                  return data[0]?.metadata?.county_name || "";
               } )
               .catch( err => console.log( "smartystreets JSON parse error", err ) );
         } else {
            console.log( url );
            console.log( response.headers.raw() );
            response.body.pipe( stdout );
            throw new Error( response.statusText );
         }
      } );
}

const run = () => {
   const file = path.resolve( __dirname, "data1.csv" );
   const writeStream = fs.createWriteStream( path.resolve( __dirname, "output1.csv" ) );
   writeStream.write( "user_email,user_address,custom_field_county,custom_field_jurisdiction_id,skip_column_1\n" );
   const readStream = fs.createReadStream( file );
   console.log( file );
   let rows = 0;
   let missingCountyRows = 0;
   const csvStream = csv.parse( { headers: true } )
      .transform( ( row: CsvRow, cb ) => {
         const address = row.user_address.replace( ", United States", "" ).trim();
         let county = row.custom_field_county;
         if( county != null && county.indexOf( "," ) !== -1 ) {
            county = county.split( "," )[0];
         }
         if( county === "" && address !== "" ) {
            getCounty( address, row.user_email )
               .then( ( foundCounty: string ) => {
                  if( foundCounty == null || foundCounty === "" ) {
                     cb( null, row );
                  } else {
                     console.log( `Found county ${foundCounty} for user ${row.user_email}` );
                     cb( null, {
                        user_email: row.user_email,
                        user_address: row.user_address,
                        custom_field_county: foundCounty,
                        custom_field_jurisdiction_id: row.custom_field_jurisdiction_id,
                     } );
                  }
               } )
               .catch( e => console.log( e ) );
         } else if( county !== row.custom_field_county ) {
            cb( null, {
               user_email: row.user_email,
               user_address: row.user_address,
               custom_field_county: county,
               custom_field_jurisdiction_id: row.custom_field_jurisdiction_id,
            } );
         } else {
            return cb( null, row );
         }
      } )
      .on( "error", error => console.error( error ) )
      .on( "data", ( row: CsvRow ) => {
         rows += 1;
         if( row.custom_field_county === "" ) {
            missingCountyRows += 1;
         }
         writeStream.write( `${row.user_email},"${row.user_address}",${row.custom_field_county === "" ? "" : `"${row.custom_field_county}"`},${row.custom_field_jurisdiction_id},\n` );
      } )
      .on( "end", ( rowCount: number ) => console.log( `Parsed ${rowCount} rows. ${missingCountyRows} or ${Math.round( missingCountyRows / rows * 100 ) / 100} are missing a county.` ) );

   readStream.pipe( csvStream );
};

run();
