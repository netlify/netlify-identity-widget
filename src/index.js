// import 'promise-polyfill';
// import 'isomorphic-fetch';
import { h, render } from 'preact';
import { observe } from 'mobx';
import { Provider } from 'mobx-preact'
import GoTrue from 'gotrue-js';
import App from './components/app';
import identity from './state/identity';
import modal from './state/modal';
import Controls from './components/controls';
import modalCSS from './components/modal.css';

function setStyle(el, css) {
	let style = "";
	for (const key in css) {
		style += `${key}: ${css[key]}; `;
	}
	el.style = style;
}

let root;
let controls;
let iframe;
const iframeStyle = {
	position: "fixed",
	top: 0,
	left: 0,
	border: "none",
	width: "100%",
	height: "100%",
	overflow: "visible",
	background: "transparent",
	display: "none"
};

observe(modal, 'isOpen', () => {
	if (!identity.settings) { identity.loadSettings() }
  setStyle(iframe, {...iframeStyle, display: modal.isOpen ? 'block' : 'none'})	;
});

function init() {
	let APIUrl = 'https://netlify-identity.netlify.com/.netlify/identity';
	const controlEl = document.querySelector("div[data-netlify-identity]");
	if (controlEl) {
		controls = render(<Provider modal={modal}><Controls/></Provider>, controlEl, controls);
	}

	identity.init(new GoTrue({APIUrl}));

	iframe = document.createElement("iframe")
	iframe.id = "netlify-identity-widget";
	iframe.onload = () => {
		const styles = iframe.contentDocument.createElement("style");
		styles.innerHTML = modalCSS.toString();
		iframe.contentDocument.head.appendChild(styles);
		root = render(<Provider identity={identity} modal={modal}>
			<App />
		</Provider>, iframe.contentDocument.body, root);
	}
	setStyle(iframe, iframeStyle);
	iframe.src = "about:blank";
	document.body.appendChild(iframe);
}

// in development, set up HMR:
if (module.hot) {
	//require('preact/devtools');   // turn this on if you want to enable React DevTools!
	module.hot.accept('./components/app', () => requestAnimationFrame(init) );
}

init();
