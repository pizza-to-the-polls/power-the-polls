import { Config } from "@stencil/core";

export const config: Config = {
   namespace: "ptp-form",
   taskQueue: "async",
   srcDir: "src", // "src" is the default; just here for clarity
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
         // web server for development
         type: "www",
         serviceWorker: null,
      },
   ],
};
