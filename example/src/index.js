import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import netlifyIdentity from 'netlify-identity-widget';

netlifyIdentity.init({
  logo: false
})

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
