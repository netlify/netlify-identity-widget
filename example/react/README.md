This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and uses [Netlify Identity](https://www.netlify.com/docs/identity/) for authentication.

This shows an example of how to use the `netlify-identity-widget` with React.

The source code is at https://github.com/netlify/netlify-identity-widget/tree/master/example

and it is deployed at: https://netlify-identity-widget-react-example.netlify.com

For more info on the `netlify-identity-widget`, [find the repo here.](https://github.com/netlify/netlify-identity-widget/)


---

Note: if you are developing with netlify-identity-widget locally you will be prompted for a deployed Netlify Identity site (as we mention in [the Localhost section of the main README](https://github.com/netlify/netlify-identity-widget#localhost)). Sometimes this causes issues with email verification or confirmation and you may need to reset the site. to clear the locally stored Netlify Identity site you previously entered, execute `localStorage.removeItem('netlifySiteURL');` in your window.
