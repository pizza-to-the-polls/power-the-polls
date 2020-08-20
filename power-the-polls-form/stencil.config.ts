import replace from "@rollup/plugin-replace";
import { Config } from "@stencil/core";
import { sass } from "@stencil/sass";

declare var process: any;
declare var require: ( pkg: string ) => any;

require( "dotenv" ).config();
const key = process.env.SMARTY_STREETS_KEY || "none";
console.log( "process.env.SMARTY_STREETS_KEY: " + key );

export const config: Config = {
   namespace: "power-the-polls-form",
   taskQueue: "async",
   srcDir: "src", // "src" is the default; just here for clarity
   plugins: [
      replace( {
         exclude: "node_modules/**",
         values: { "SMARTY_STREETS_KEY": key },
      } ),
      sass(),
   ],
   outputTargets: [
      {
         type: "dist",
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
