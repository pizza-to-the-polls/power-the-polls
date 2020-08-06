# Power the Polls

There are two projects in this repository:

1. `/site` contains the website for powerthepolls.org
2. `/power-the-polls-form` will eventually contain the main submission form as an independent web component. It will be used by `/site` and intended for sharing with partners and generally spreading the signup as wide as possible.

## `/site`

* `/public`  
  Files here are copied directly to the build output and will be available at `/*` in the deployed website.
* `/src`  
  Compiled TypeScript files comprising the app. Start at `./src/index.html` which just has a single `<app-root>` element, then look at the component in `./src/components/app-root` and go from there...
* `/styles`  
  Root SCSS for the entire app in addition to styles injected into every component. These app-wide styles should be kept to a minimum in favor of component styles.

### Developing Locally

1. Run `npm install` to install dependencies
2. Run `cp dot_env .env` to make a copy of `dot_env` and rename it `.env`
3. Run `npm run dev` to start a server locally and watch changes to files

### Deploying

Run `npm run build` to do a production build. The contents of `/dist/www` can then be deployed to a host or CDN.

Currently, commits to the `master` branch and opened pull requests trigger automatic deploys in [Netlify](https://netlify.com) to the production site (`master`) or a custom subdomain (PRs).

#### Netlify Settings

[Environment variables](https://docs.netlify.com/configure-builds/environment-variables/) must have an entry for SmartyStreets: `SMARTY_STREETS_KEY` -- be sure to use a production API key, which can be found in SmartyStreet's [account management](https://account.smartystreets.com/#keys).

[Deploy settings](https://app.netlify.com/sites/powerthepolls/settings/deploys) should look like:  
command: `cd site && npm install && npm run build`  
publish directory: `/dist/www`

### Dependencies

#### APIs

> Both of these pieces could be replaced with similar products with minimal disruption.

1. [ActionKit](https://ptp.actionkit.com/admin/), which is used to provide the marketing and chase functionality
2. [SmartyStreets](https://account.smartystreets.com/), which is used for address autocomplete and data augmentation.

## `/power-the-polls-form`

TBD
