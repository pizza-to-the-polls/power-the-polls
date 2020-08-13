import replace from "@rollup/plugin-replace";
import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";
import dotenvPlugin from "rollup-plugin-dotenv";
declare var process: any;

// see: https://stenciljs.com/docs/config

export const config: Config = {
   globalStyle: "styles/main.scss",
   globalScript: "src/app-init.ts",
   taskQueue: "async",
   srcDir: "src", // "src" is the default; just here for clarity
   plugins: [
      dotenvPlugin(), // replace all process.env.* usage using the values from local .env files (.env.NODE_ENV, etc)
      replace( {
         exclude: "node_modules/**",
         values: {
            // replace SMARTY_STREETS_KEY with actual env vars present in the environment during build, else leave it as-is
            "process.env.SMARTY_STREETS_KEY": process.env.SMARTY_STREETS_KEY ? `"${process.env.SMARTY_STREETS_KEY}"` : "process.env.SMARTY_STREETS_KEY",
         },
      } ),
      sass( {
         // scss files will automatically have these added
         injectGlobalPaths: [
            "styles/include/variables.scss",
            "styles/include/mixins.scss",
         ],
      } ),
   ],
   outputTargets: [
      {
         type: "www",
         dir: "../dist/www", // default output dir is ./www
         copy: [
            // copy contents of ./public dir to output
            // (src is relative to the root srcDir, dest is relative to this output's dir)
            { src: "../public", dest: "." },
         ],
         baseUrl: "https://www.powerthepolls.org/",
      },
      {
         // Generates readme files in each component dir. Nice for GitHub.
         type: "docs-readme",
         footer: "", // supports markdown
      },
   ],
};
