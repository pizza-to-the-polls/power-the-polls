const metalsmith = require('metalsmith');
const collections = require('metalsmith-collections');
const msIf = require('metalsmith-if');
const browserSync = require('metalsmith-browser-sync');
const htmlMinifier = require("metalsmith-html-minifier");
const layouts = require('metalsmith-layouts');
const markdown = require('metalsmith-markdown');
const metadata = require('metalsmith-metadata');
const permalinks = require('metalsmith-permalinks');
const postcss = require('metalsmith-postcss');
const sass = require('metalsmith-sass');
const discoverPartials = require('metalsmith-discover-partials');
const moveUp = require('metalsmith-move-up');
const moveRemove = require('metalsmith-move-remove');
const siteMap = require('metalsmith-sitemap');
const hbtmd = require('metalsmith-hbt-md');
const dotenv = require('dotenv').config();
const env = require('metalsmith-env');

const handlebars = require('handlebars');
const helpers = require('./handlebars-helpers');

const shouldServe = process.env.SERVE === 'true';
const watch = process.env.WATCH === 'true';

let browserSyncOpts = {
  port: 8001,
  server: {
    baseDir: 'build'
  }
};

let minifierOpts = {
  minifierOptions: {
    removeComments: false,
    collapseWhitespace: true
  },
  pattern: "**/*.html",
}

if (watch) {
  browserSyncOpts.files = ['src/**/*', 'layouts/**/*', 'partials/**/*']
}

// Register helpers
// See ./handlebars-helpers.js for docs
handlebars.registerHelper(helpers);

metalsmith(__dirname)
  .source('../src')
  .destination('../build')
  .use(metadata({
    settings: 'data/data.json'
  }))
  .use(env())
  .use(sass({
    'outputStyle': 'compressed',
    'sourceComments': false,
    'outputDir': 'css/'
  }))
  .use(
    collections({
      states: {
        sortBy: 'title'
      },
      partners: {
        sortBy: 'title'
      },
      news: {
        sortBy: 'date'
      }
    })
  )
  .use(hbtmd(handlebars, {
    pattern: '**/*.md'
  }))
  .use(
    postcss({
      plugins: {
        'postcss-import': {},
        'postcss-nesting': {},
        'autoprefixer': {}
      }
    })
  )
  .ignore('**/modules/*.css')
  .use(discoverPartials({
    directory: '../partials',
    pattern: /\.hbs$/
  }))
  .use(hbtmd(handlebars, {
    pattern: ['**/*.md','js/main.js']
  }))
  .use(markdown())
  .use(
    layouts({
      default: 'default.hbs',
      pattern: ['**/*.html'],
      directory: '../layouts'
    })
  )
  .use(
    permalinks({
      relative: false
    })
  )
  .use(moveRemove({
    remove: ['data']
  }))
  .use(moveUp(['partners-collection/**']))
  .use(siteMap({
      hostname: "http://powerthepolls.com",
      omitIndex: true
    })
  )
  .use(htmlMinifier(minifierOpts))
  .use(
    msIf(
      shouldServe,
      browserSync(browserSyncOpts)
    )
  )
  .build(err => {
    if (err) {
      throw err;
    }
    else {
      console.log('✅ Built');
    }
  })
