import { h, Component } from 'preact';
import { connect } from 'mobx-preact';
import Modal from './modal';
import Message from './message';
import SiteURLForm from './forms/siteurl';
import UserForm from './forms/user';

const pagesWithHeader = {login: true, signup: true};

@connect(['modal', 'identity'])
class App extends Component {

	handleClose = () => this.props.modal.close()
	handlePage = (page) => this.props.modal.open(page)
	handleLogout = () => this.props.identity.logout()
	handleSiteURL = (url) => this.props.identity.setSiteURL(url)
	handleUser = ({name, email, password}) => {
		const {identity, modal} = this.props;

		switch (modal.page) {
			case "login":
				identity.login(email, password);
				break;
			case "signup":
				identity.signup(name, email, password);
				break;
		}
	}

	renderBody() {
		const {identity, modal} = this.props;

		if (!identity.gotrue) { return <SiteURLForm onSiteURL={this.handleSiteURL}/>; }

		if (!identity.settings) { return <div>Loading...</div>; }

		if (identity.user) { return <LogoutForm user={identity.user} onLogout={this.handleLogout} />; }

		if (identity.message) { return <Message type={identity.message}/>; }

		return <UserForm page={modal.page} error={identity.loginError} onSubmit={this.handleUser} />;
	}

	render() {
		const {identity, modal} = this.props;
		const showHeader = pagesWithHeader[modal.page];
		const showSignup = !identity.disable_signup;

		return (
			<div>
			  <Modal
					page={modal.page}
					showHeader={showHeader}
					showSignup={showSignup}
					onPage={this.handlePage}
					onClose={this.handleClose}
				>
					{this.renderBody()}
				</Modal>
			</div>
		);
	}
}

export default App;
