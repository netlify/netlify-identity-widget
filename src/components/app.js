import { h, Component } from 'preact';
import { connect } from 'mobx-preact';
import Modal from './modal';
import LoginForm from './forms/login';
import LogoutForm from './forms/logout';

const pagesWithHeader = {login: true, signup: true};

@connect(['modal', 'identity'])
class App extends Component {

	handleClose = () => this.props.modal.close()
	handlePage = (page) => this.props.modal.open(page)
	handleLogin = (email, password) => this.props.identity.login(email, password)
	handleLogout = () => this.props.identity.logout()

	renderBody() {
		const {identity, modal} = this.props;

		if (!identity.settings) { return <div>Loading...</div>; }

		if (identity.user) { return <LogoutForm user={identity.user} onLogout={this.handleLogout} />; }

		return <LoginForm error={identity.loginError} onLogin={this.handleLogin} />;
	}

	render() {
		const {identity, modal} = this.props;
		const showHeader = pagesWithHeader[modal.page];
		const showSignup = identity.signup_enabled;

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
