# Power the Polls

There are two projects in this repository:

1. `/site` which contains the website for powerthepolls.org
2. `/power-the-polls-form` which is an independent web component that contains the submission form for use in sharing with partners and generally spreading the signup as wide as possible.

## `/site`

### Developing Locally

1. Download or clone this repository, and open it in your terminal
2. Run `npm install` to install dependencies
3. Make a copy of `dot_env` and rename it `.env`
4. Run `npm run dev` or `npm start` to start a server locally and watch changes to files

Production build: `npm run build`

### Deploying

Commits to the `master` branch trigger automatic deploys in [Netlify](https://netlify.com). These are generally available 20-40 seconds after the commit is made.

> see: [Netlify settings](https://app.netlify.com/sites/powerthepolls/settings/deploys)

command: `cd site && npm install && npm run build`
publish directory: `/dist/www`

When setting up a deployment in Netlify, you must add an [environment variable](https://docs.netlify.com/configure-builds/environment-variables/) for SmartyStreets: `SMARTY_STREETS_KEY`. Be sure to use a production API key, which can be found in SmartyStreet's [account management](https://account.smartystreets.com/#keys).

#### Deploying somewhere else

The site can easily be connected into other build tools by running the command described in the Deploying section and copying `/dist/www` to a host or CDN.

### Dependencies

This project currently has two external dependencies: [ActionKit](https://ptp.actionkit.com/admin/) which is used to provide the marketing and chase functionality and [SmartyStreets](https://account.smartystreets.com/), which is used for address autocomplete and data augmentation. Both of these pieces could be replaced with similar products with minimal disruption.
