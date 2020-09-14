import { newE2EPage } from "@stencil/core/testing";

describe( "ui-geojson-to-svg", () => {
   it( "renders", async () => {
      const page = await newE2EPage();
      await page.setContent( "<ui-geojson-to-svg></ui-geojson-to-svg>" );

      const element = await page.find( "ui-geojson-to-svg" );
      expect( element ).toHaveClass( "hydrated" );
   } );
} );
