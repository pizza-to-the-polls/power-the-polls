import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

// https://stenciljs.com/docs/config

export const config: Config = {
   globalStyle: "styles/app.scss",
   globalScript: "src/app.ts",
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
         type: "www",
         dir: "../dist/www", // default output dir is ./www
         copy: [
            // copy public dir to output as-is (path is relative to srcDir)
            { src: "../public", dest: "." },
         ],
         baseUrl: "https://www.powerthepolls.org/",
         serviceWorker: false,
      },
   ],
};
