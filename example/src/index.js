import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import netlifyIdentity from 'netlify-identity-widget';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link,
//   Redirect,
//   withRouter
// } from 'react-router-dom';

window.netlifyIdentity = netlifyIdentity;
// You must run this once before trying to interact with the widget
netlifyIdentity.init();

// class AppWithAuth extends React.Component {
//   state = {
//     user: null
//   };
//   componentDidMount() {
//     netlifyIdentity.on('login', user => this.setState({ user }));
//   }
//   render() {
//     // // Get the current user:
//     // const user = netlifyIdentity.currentUser();
//     // you can also just use the user from the setState above

//     return (
//       <Router>
//         <App />
//       </Router>
//     );
//   }
// }

// ReactDOM.render(<AppWithAuth />, document.getElementById('root'));
ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
