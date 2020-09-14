import { newSpecPage } from "@stencil/core/testing";

import { UiGeojsonToSvg } from "../ui-geojson-to-svg";

describe( "ui-geojson-to-svg", () => {
   it( "renders", async () => {
      const page = await newSpecPage( {
         components: [UiGeojsonToSvg],
         html: `<ui-geojson-to-svg></ui-geojson-to-svg>`,
      } );
      expect( page.root ).toEqualHtml( `
      <ui-geojson-to-svg></ui-geojson-to-svg>
    `);
   } );
} );
