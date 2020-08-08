import replace from "@rollup/plugin-replace";
import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";
declare var process: any;

export const config: Config = {
   namespace: "power-the-polls-form",
   taskQueue: "async",
   srcDir: "src", // "src" is the default; just here for clarity
   plugins: [
      replace( {
         exclude: "node_modules/**",
         values: {
            // replace SMARTY_STREETS_KEY with actual env vars present in the environment during build
            "SMARTY_STREETS_KEY": process.env.SMARTY_STREETS_KEY || "none",
         },
      } ),
      sass(),
   ],
   outputTargets: [
      {
         type: "dist",
      },
      {
         // single .js file to dist/custom-elements
         type: "dist-custom-elements-bundle",
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
