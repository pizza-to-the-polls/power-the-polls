# [Power the Polls](https://powerthepolls.org)

This is a custom web component that allows our partners to embed the Power the Polls signup form on their own web sites and intranets. Contact info@powerthepolls.org to discuss any partnerships.

## America is facing a record shortage of poll workers

As coronavirus continues to impact Americans across the country, we are also seeing a staggering decrease in poll workers &mdash; which could mean closed polling places and **long delays for elections in 2020**.

**You can help** make sure we have a safe, fair, efficient election for all voters, and potentially get paid to do it!

Visit https://powerthepolls.org to sign-up and learn more.

## How to embed the form

### HTML

Include the latest version:

```html
<script type="module" src="https://unpkg.com/@ptp-us/power-the-polls-form@latest/power-the-polls-form/power-the-polls-form.esm.js"></script>
<script nomodule src="https://unpkg.com/@ptp-us/power-the-polls-form@latest/power-the-polls-form/power-the-polls-form.js"></script>
```

Reference it like any other HTML element:

```html
<html>

<head>
   <script type="module"
      src="https://unpkg.com/@ptp-us/power-the-polls-form@latest/power-the-polls-form/power-the-polls-form.esm.js"></script>
   <script nomodule
      src="https://unpkg.com/@ptp-us/power-the-polls-form@latest/power-the-polls-form/power-the-polls-form.js"></script>
</head>

<body>
   <power-the-polls-form
      custom-form-field-label="Label for your own custom field here"
   />
</body>

</html>
```

### React

Add to your project:

```shell
npm install @ptp-us/power-the-polls-form
```

In your `index.jsx`, add the following code to initialize the form element:

```js
import { applyPolyfills, defineCustomElements } from "@ptp-us/power-the-polls-form/loader";

applyPolyfills().then(() => {
   defineCustomElements();
});

// ReactDOM.render( ... )
```

Include the form in your component:

> Note that in our testing attribute names must be `kebab-case` and not `camelCase`

```html
<power-the-polls-form
  destination="http://form-target-here"
  custom-form-field-label="Label for your own custom field here"
/>
```

## How to customize the form

### Styling

The form will take on whatever styles you use on your site for standard elements like `<form>` and `<input>`. It does add some basic styling, but you can override with your own CSS.

You can use the root `power-the-polls-form` element in CSS:

```css
power-the-polls-form form {

}
power-the-polls-form input {

}
power-the-polls-form label {

}
power-the-polls-form h3 {

}
power-the-polls-form h4 {

}
power-the-polls-form p {

}
```
