import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

export const config: Config = {
   namespace: "power-the-polls",
   taskQueue: "async",
   srcDir: "src", // "src" is the default; just here for clarity
   plugins: [
      sass( {
         // scss files in components will automatically have these imported
         injectGlobalPaths: [
            "styles/variables.scss",
         ],
      } ),
   ],
   outputTargets: [
      {
         type: "dist",
         dir: "build",
      },
      {
         // single .js file to dist/custom-elements
         type: "dist-custom-elements-bundle",
         dir: "build",
      },
      {
         // Generates readme files in each component dir. Nice for GitHub.
         type: "docs-readme",
         footer: "", // supports markdown
      },
      {
         // web server for development to test the component
         type: "www",
         dir: "www",
         serviceWorker: null,
      },
   ],
};
