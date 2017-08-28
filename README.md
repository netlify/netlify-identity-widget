# Netlify Identity

A component used to authenticte with Netlify's GoTrue API.


## Usage

```js
import NetlifyIdentity from 'netlify-identity'

const new loginModal = new NetlifyIdentity({ // create gotrue instance
  APIUrl: 'https://auth.netlify.com'
})

// or

const new loginModal = new NetlifyIdentity(window.goTrueInstance) //consume an existing one

loginModal.mount({ css: true }, document.body) // this could be automatic on creation, but auto body mounting is smelly

loginModal.goTrue // an internal goTrue-js instance reference with full API access

loginModal.open() // open the modal

loginModal.on('signup', fn) // listen for importaint events to read from the goTrue state
loginModal.on('login', fn)
loginModal.on('logout', fn)
loginModal.on('error', fn) // Handle modal consumer level errors

loginModal.close() // Close the modal
```

Alternative:

```html

<!DOCTYPE html>
<html>
<head>
  <title>Foo</title>
  <script src="https://www.netlify.com/netlify-identity.js"></script>
</head>
<body>
  <div>
    <div data-netlify-identity>We take over this div and put buttons when loading</div>
  </div>
</body>
</html>
```
