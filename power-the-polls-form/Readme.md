# Power the Polls

This is a custom web component that allows our partners to embed the Power the Polls signup form on their own web sites and intranets. Contact info@powerthepolls.org to discuss any partnerships.

## How to embed

### React

#### In your `index.tsx`

Add the following code to initialize the form and load any polyfills if necessary (this will ensure that all browsers from IE 11+ will work with the form).

```js
import { applyPolyfills, defineCustomElements } from "power-the-polls-form/dist/loader";

applyPolyfills().then(() => {
   defineCustomElements();
});
```

A complete example:

```js
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App.jsx";
import { applyPolyfills, defineCustomElements } from "power-the-polls-form/dist/loader";

applyPolyfills().then(() => {
   defineCustomElements();
});

ReactDOM.render(<App />, document.getElementById("root"));
```

#### In your JSX/HTML

> Note that in our testing attribute names msut be kebab-case and not camelCase

```html
<power-the-polls-form
  destination="http://optional-form-target-here"
  custom-form-field-label="Label for your own custom field here"
/>
```
