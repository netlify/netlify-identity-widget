# Netlify Identity Widget

A component used to authenticate with Netlify's Identity service.
[Live demo](https://identity.netlify.com)

For a lower level library to the underlying `GoTrue` API, see
[gotrue-js](https://github.com/netlify/gotrue-js).

## What is Netlify Identity

Netlify’s Identity service is a plug-and-play microservice for handling site
functionalities like signups, logins, password recovery, user metadata, and
roles. You can use it from single page apps instead of rolling your own, and
integrate with any service that understands JSON Web Tokens (JWTs).

Learn more about this service from this
[blog post](https://www.netlify.com/blog/2017/09/07/introducing-built-in-identity-service-to-streamline-user-management/).

## Usage

Simply include the widget on your site, and things like invites, confirmation
codes, etc, will start working.

You can add controls for the widget with HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <title>A static website</title>

  <!-- include the widget -->
  <script type="text/javascript" src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <!-- Add a menu:
   Log in / Sign up - when the user is not logged in
   Username / Log out - when the user is logged in
  -->
  <div data-netlify-identity-menu></div>

  <!-- Add a simpler button:
    Simple button that will open the modal.
  -->
  <div data-netlify-identity-button>Login with Netlify Identity</div>
</body>
</html>
```

The widget will automatically attach itself to the window object as
`window.netlifyIdentity`.

You can use this global object like this:

```js
// open the modal
netlifyIdentity.open();

// Get the current user:
const user = netlifyIdentity.currentUser();

// Bind to events
netlifyIdentity.on("init", user => console.log(user));
netlifyIdentity.on("login", user => console.log(user));
netlifyIdentity.on("logout", () => console.log("Logged out"));
netlifyIdentity.on("error", err => console.error("Logged out"));
netlifyIdentity.on("open", () => console.log("Widget opened"));
netlifyIdentity.on("close", () => console.log("Widget closed"));

// Close the modal
netlifyIdentity.close();

// Logout the user
netlifyIdentity.logout();
```

#### A note on script tag versioning

The `v1` in the above URL is not pinned to the major version of the module API,
and will only reflect breaking changes in the markup API.

### Module API

Netlify Identity Widget also has a
[module api](https://www.npmjs.com/package/netlify-identity-widget):

```
yarn add netlify-identity-widget
```

Import or require as usual:

```js
const netlifyIdentity = require("netlify-identity-widget");

netlifyIdentity.init({
  container: "#netlify-modal" // defaults to document.body,
});

netlifyIdentity.open(); // open the modal
netlifyIdentity.open("login"); // open the modal to the login tab
netlifyIdentity.open("signup"); // open the modal to the signup tab

netlifyIdentity.on("init", user => console.log(user));
netlifyIdentity.on("login", login => console.log(user));
netlifyIdentity.on("logout", () => console.log("Logged out"));
netlifyIdentity.on("error", err => console.error("Logged out"));
netlifyIdentity.on("open", () => console.log("Widget opened"));
netlifyIdentity.on("close", () => console.log("Widget closed"));

// Close the modal
netlifyIdentity.close();

// Logout the user
netlifyIdentity.logout();

// Access the underlying gotrue instance.
// Note that doing things directly through gotrue brings a risk of getting out of
// sync between your state and the widgets state.
netlifyIdentity.gotrue;
```

#### `netlifyIdentity.init([opts])`

You can pass an optional `opts` object to configure the widget when using the
module api. Options include:

```js
{
  container: "#some-query-selector"; // container to attach to
  APIUrl: "https://www.example.com/.netlify/functions/identity"; // Absolute url to endpoint.  ONLY USE IN SPECIAL CASES!
}
```

Generally avoid setting the `APIUrl`. You should only set this when your app is
served from a domain that differs from where the identity endpoint is served.
This is common for Cordova or Electron apps where you host from localhost or a
file.

## Localhost

When using the widget on localhost, it will prompt for your Netlify SiteURL the
first time it is opened. Entering the siteURL populates the browser's
localStorage.

This allows the widget to know which instance of Netlify Identity it should
communicate with with zero configuration.

E.g. If your Netlify site is served from the `olddvdscreensaver.com` domain
name, enter the following when prompted by the widget when in development mode:

```
https://olddvdscreensaver.com
```

![](devmode.png)

## FAQ

* If you experience a 404 while testing the Netlify Identity Widget on a local
  environment, you can manually remove the netlifySiteURL from localStorage by
  doing the following in the console.

```js
localStorage.removeItem("netlifySiteURL");
```

* See the `example` for how to integrate this widget with a react app.
