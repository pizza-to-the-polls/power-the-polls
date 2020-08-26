import { newE2EPage } from "@stencil/core/testing";

describe( "power-the-polls-form", () => {

   it( "renders", async () => {
      const page = await newE2EPage();
      await page.setContent( "<power-the-polls-form></power-the-polls-form>" );

      const element = await page.find( "power-the-polls-form" );
      expect( element ).toHaveClass( "hydrated" );
   } );

   it( "has a SmartyStreets API key", async () => {
      console.error = jest.fn();
      const page = await newE2EPage();
      await page.setContent( "<power-the-polls-form></power-the-polls-form>" );
      expect( console.error ).not.toHaveBeenCalled();
   } );

} );
