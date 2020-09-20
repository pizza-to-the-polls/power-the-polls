
export const submitToHelpScout = async ( data: Object)
   : Promise<true | {
      statusText: string;
      status: number;
      data?: any;
   }> => {
   const response = await fetch( "https" + "://hooks.zapier.com/hooks/catch/8459352/ow03eoe/", {
      method: "POST",
      body: JSON.stringify(data),
      mode: "no-cors",
      headers: {
         "Content-Type": "application/json",
      },
   } );

   if( response.status === 200 || response.status === 201
      || response.status === 0 /*we're currently making a simple no-cors request and can't get the status; presume success*/ ) {
      return true;
   } else {
      try {
         return { statusText: response.statusText, status: response.status, data: await response.json() };
      } catch {
         return { statusText: response.statusText, status: response.status };
      }
   }
};
