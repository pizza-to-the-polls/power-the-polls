# [Power the Polls](https://powerthepolls.org)

This is a custom web component that allows our partners to embed the Power the Polls signup form on their own web sites and intranets. Contact info@powerthepolls.org to discuss any partnerships.

## America is facing a record shortage of poll workers

As coronavirus continues to impact Americans across the country, we are also seeing a staggering decrease in poll workers &mdash; which could mean closed polling places and **long delays for elections in 2020**.

**You can help** make sure we have a safe, fair, efficient election for all voters, and potentially get paid to do it!

Visit https://powerthepolls.org to sign-up and learn more.

## How to embed the form

### How to embed in HTML

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
      partner-id="your-ptp-partner-id"
      custom-form-field-label="Label for your own custom field here"
   />
</body>

</html>
```

### How to embed in React

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

```jsx
import "@ptp-us/power-the-polls-form";

// ...

<power-the-polls-form
   partner-id={partnerId}
   custom-form-field-label={customFieldLabel}
/>
```

> Note: in our testing with React, attribute names must be `kebab-case` and not `camelCase`
>
> To test in your environment, set `customFormFieldLabel` to a non-null value and if it doesn't show up in the form, you need to use `kebab-case`.

## How to customize the form

### How to customize: Attributes

#### partner-id

This will allow us to track the source of signups back to you.

```html
<power-the-polls-form
   partner-id="your-ptp-partner-id"
/>
```

#### custom-form-field-label

*Optional* label for an additional `<input type="text">` field on the form. If `null`, no additional field will be displayed.

```html
<power-the-polls-form
   custom-form-field-label="Union name"
/>
```

#### opt-user-out-of-chase

Power the Polls is following up by email to ensure users who sign-up continue on and fill out the poll worker application form in their local jurisdiction. If you do not want us to follow up with people who sign up using your embed of the PtP form, you can set this field to `true`.

```html
<power-the-polls-form
   opt-user-out-of-chase="true"
/>
```

### How to customize: Styles

The form will take on whatever styles you use on your site for standard elements like `<form>`, `<input>`, and `<select>`. It does add some basic styling, but you can override with your own CSS.

For further styling, you can use the `power-the-polls-form` element in CSS:

```css
power-the-polls-form form {

}
power-the-polls-form input {

}
power-the-polls-form select {

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

### How to customize: Events

You can listen for a `submitCompleted` or `submitError` event if desired in order to provide additional feedback to your users.

```javascript
const form = document.querySelector("power-the-polls-form");

form.addEventListener("submitCompleted", () => {
   console.log("Power the Polls form has been submitted");
});

form.addEventListener("submitError", () => {
   console.log("Power the Polls form has encountered an error")
});
```
