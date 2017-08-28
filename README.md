# Netlify Identity

A component used to authenticte with Netlify's GoTrue API.


## Usage

```js
const NetlifyIdentity from 'netlify-identity'

var new loginModal = new NetlifyIdentity({
  APIUrl: 'https://auth.netlify.com'
})

// or

var new loginModal = new NetlifyIdentity(window.goTrueInstance) //or something

loginModal.goTrue // an internal goTrue-js instance reference with full API access

loginModal.open() // open the modal

loginModal.on('signup', fn) // listen for importaint events to read from the goTrue state
loginModal.on('login', fn)
loginModal.on('logout', fn)
loginModal.on('error', fn) // Handle modal consumer level errors

loginModal.close() // Close the modal

```
