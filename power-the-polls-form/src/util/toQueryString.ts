
const toQueryString = ( data: any ) => {
   return Object.keys( data ).map( key => encodeURIComponent( key ) + "=" + encodeURIComponent( data[key] + "" ) ).join( "&" );
};
export default toQueryString;
