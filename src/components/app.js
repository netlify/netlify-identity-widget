import { h, Component } from 'preact';
import { connect } from 'mobx-preact';
import Modal from './modal';
import SiteURLForm from './forms/siteurl';
import LogoutForm from './forms/logout';
import UserForm from './forms/user';
import Message from './forms/message';

const pagesWithHeader = {login: true, signup: true};
const pages = {
  login: {
		login:  true,
    button: 'Log In',
    button_saving: 'Logging in',
    email: true,
    password: true,
		link: 'amnesia',
		link_text: 'Forgot password?'
  },
  signup: {
		signup: true,
    button: 'Sign Up',
    button_saving: 'Signing Up',
    name: true,
    email: true,
    password: true
  },
  amnesia: {
    title: 'Recover password',
    button: 'Send recovery email',
    button_saving: 'Sending recovery email',
    email: true,
		link: 'login',
		link_text: 'Never mind'
  },
	recovery: {
		title: 'Recover password',
    button: 'Update password',
    button_saving: 'Updating password',
    password: true,
		link: 'login',
		link_text: 'Never mind'
	},
	user: {
		title: 'Logged in'
	}
}


@connect(['store'])
class App extends Component {

	handleClose = () => this.props.store.closeModal()
	handlePage = (page) => this.props.store.openModal(page)
	handleLogout = () => this.props.store.logout()
	handleSiteURL = (url) => this.props.store.setSiteURL(url)
	handleUser = ({name, email, password}) => {
		const {store} = this.props;

		switch (store.modal.page) {
			case "login":
				store.login(email, password);
				break;
			case "signup":
				store.signup(name, email, password);
				break;
			case "amnesia":
				store.requestPasswordRecovery(email);
				break;
			case "recovery":
				store.updatePassword(password);
				break;
		}
	}

	renderBody() {
		const {store} = this.props;

		if (!store.gotrue) { return <SiteURLForm onSiteURL={this.handleSiteURL}/>; }
		if (!store.settings) { return <div>Loading...</div>; }
		if (store.user) { return <LogoutForm user={store.user} saving={store.saving} onLogout={this.handleLogout} />; }
		if (store.modal.page === 'signup' && store.settings.disable_signup) {
			return <Message type="signup_disabled"/>;
		}

		return <UserForm page={pages[store.modal.page] || {}} message={store.message} saving={store.saving} onSubmit={this.handleUser} />;
	}

	render() {
		const {store} = this.props;
		const showHeader = pagesWithHeader[store.modal.page];
		const showSignup = store.settings && !store.settings.disable_signup;
		const page = pages[store.modal.page] || {};

		return (
			<div>
			  <Modal
					page={page}
					error={store.error}
					showHeader={showHeader}
					showSignup={showSignup}
					onPage={this.handlePage}
					onClose={this.handleClose}
				>
					{this.renderBody()}
					{!store.user && page.link && <button onclick={() => this.handlePage(page.link)} className="btnLink forgotPasswordLink">
					  {page.link_text}
					</button>}
				</Modal>
			</div>
		);
	}
}

export default App;
