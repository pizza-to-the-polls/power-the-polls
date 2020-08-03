import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";
import dotenvPlugin from "rollup-plugin-dotenv";

// see: https://stenciljs.com/docs/config

export const config: Config = {
   globalStyle: "styles/main.scss",
   globalScript: "src/app-init.ts",
   taskQueue: "async",
   srcDir: "src", // "src" is the default; just here for clarity
   plugins: [
      sass( {
         // scss files in components will automatically have these imported
         injectGlobalPaths: [
            "styles/include/variables.scss",
         ],
      } ),
      dotenvPlugin(),
   ],
   outputTargets: [
      {
         type: "www",
         dir: "../dist/www", // default output dir is ./www
         copy: [
            // copy public dir to output as-is
            // (src is relative to the root srcDir, dest is relative to this output's dir)
            { src: "../public", dest: "." },
         ],
         baseUrl: "https://www.powerthepolls.org/",
         serviceWorker: false,
      },
      {
         // Generates readme files in each component dir. Nice for GitHub.
         type: "docs-readme",
         footer: "", // supports markdown
      },
   ],
};
