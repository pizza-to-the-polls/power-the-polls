# Power the Polls

There are two projects in this repository:

1. `/power-the-polls-form` contains the main submission form as an independent web component. It is used by `/site` and intended for sharing with partners and generally spreading the signup as wide as possible.
2. `/site` contains the website for powerthepolls.org

## `/power-the-polls-form`

### Developing Locally

1. Run `npm install` to install dependencies
2. Run `npm run dev` to start a server locally and watch changes

To do a full build, run `npm run build`.

### Deploying

This is currently done manually

1. Bump the version in `./package.json`
2. Run `npm run release` to do a production build
3. Enter your 2-factor auth key when prompted in order to publish to NPM
4. Change `/site/package.json` to the latest version or use `npm update`

### Dependencies

#### APIs

> Both of these pieces could be replaced with similar products with minimal disruption.

1. [ActionKit](https://ptp.actionkit.com/admin/), which is used to provide the marketing and chase functionality
2. [SmartyStreets](https://account.smartystreets.com/), which is used for address autocomplete and data augmentation.

## `/site`

* `./public`  
  Files here are copied directly to the build output and will be available at `/*` in the deployed website.
* `./src`  
  Compiled TypeScript files comprising the app. Start at `./src/index.html` which just has a single `<app-root>` element, then look at the component in `./src/components/app-root` and go from there...
* `./styles`  
  Root SCSS for the entire app in addition to styles injected into every component. These app-wide styles should be kept to a minimum in favor of component styles.

### Developing Locally

1. Run `npm install` to install dependencies
2. Run `cp dot_env .env` to make a copy of `dot_env` and rename it `.env`
3. Run `npm run dev` to start a server locally and watch changes to files

#### Developing the site and form in tandem

1. In `/site`, remove the npm version and reference the local version with `npm uninstall @ptp-us/power-the-polls-form` and then `npm install ../power-the-polls-form`
2. In `page-forn.tsx` change the import from `import "@ptp-us/power-the-polls-form";` to `import "@ptp-us/power-the-polls-form/dist";`
3. Use `npm run dev:form` which will build the form and then `npm run dev`
   > NOTE: Watch doesn't work across the projects atm. So you'll still have to kill the process and re-run `npm run dev:form` if you change the form.
4. Make sure you don't commit this `package.json` or `page-form.tsx`

### Deploying

Run `npm run release` to do a production build. The contents of `/dist/www` can then be deployed to a host or CDN.

Currently, commits to the `master` branch and opened pull requests trigger automatic deploys in [Netlify](https://netlify.com) to the production site (`master`) or a custom subdomain (PRs).

#### Netlify Settings

[Environment variables](https://docs.netlify.com/configure-builds/environment-variables/) must have an entry for SmartyStreets: `SMARTY_STREETS_KEY` -- be sure to use a production API key, which can be found in SmartyStreet's [account management](https://account.smartystreets.com/#keys).

[Deploy settings](https://app.netlify.com/sites/powerthepolls/settings/deploys) should look like:  
command: `cd site && npm install && npm run release`  
publish directory: `/dist/www`
