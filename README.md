# Power the Polls - deploy me!

This site uses [metalsmith](http://www.metalsmith.io/) to build a static website.

## Developing Locally

1. Download or clone this repository, and open it in your terminal
2. Run `yarn` to install dependencies
3. Make a copy of `dot_env` and rename it `.env`
4. Run `yarn start` to start a server locally and watch changes to files

## Deploying

Commits to the `master` branch trigger automatic deploys in [Netlify](https://netlify.com). These are generally available 20-40 seconds after the commit is made. To run a deploy, Netlfiy pulls the latest version of `master`, runs the command `yarn build`, and then serves the resulting static site that has been generated in the directory `/build`.

When setting up a deployment in Netlify, you must add an [environment variable](https://docs.netlify.com/configure-builds/environment-variables/) for SmartyStreets: `SMARTY_STREETS_KEY`. Be sure to use a production API key, which can be found in SmartyStreet's [account management](https://account.smartystreets.com/#keys).

### Deploying somewhere else

The site can easily be connected into other build tools by replicating the process described in the Deploying section, or by adding a `release` command to `package.json` that builds the site and then uses `scp` to put the latest version in place.

## What are we using Metalsmith to do?

We're using Metalsmith as a lightweight CMS. It can let us expand the site in the future easily. More importantly, in the short term it gets us some nice things:

* Markdown
* CSS prefixing / Sass processing
* HTML partials & templates
* Local development server
* Creating collections (blog posts, news articles, etc)
* Sitemaps

It can also do (but currently isn't doing) things like...

* Asset Fingerprinting (for more predictable caching)
* Pagination
* Testing & linting

## Other dependencies

This project currently has two external dependencies: [ActionKit](https://ptp.actionkit.com/admin/) which is used to provide the marketing and chase functionality and [SmartyStreets](https://account.smartystreets.com/), which is used for address autocomplete and data augmentation. Both of these pieces could be replaced with similar products with minimal disruption.

## Useful documentation

* [Metalsmith](https://metalsmith.io/)
* [Handlebars](https://handlebarsjs.com/guide/)

## Where are things located?

* [Templates (aka 'layouts')](/layouts): Various page wrappers. Specified by adding `layout: example.hbs` to the page's [YAML frontmatter](https://middlemanapp.com/basics/frontmatter/).
* [Partials](/partials): Reusable, nestable snippets of code. Added with the following syntax: `{{> partial-name }}`. Variables can be set when a partial is called (e.g., `{{> nav location='footer' }}`), but also inherit variables from the context in which they're called.
* [Source content](/src)
* [Built site](/build)
* [Global data](/src/data/data.json): Data that's used sitewide, or on multiple pages, e.g. `{{ settings.site_url }}`
* [Build script](/scripts/build.js)
* [Handlbars helpers](/scripts/handlebars-helpers.js): Used to add logic and functionality to handlebars. Currently, we're using one to URL encode the precomposed tweet to build the twitter link `{{ urlEncode 'precomposed tweet goes here' }}`
