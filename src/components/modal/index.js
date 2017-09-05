import {h, Component} from "preact";

export default class Modal extends Component {
  handleClose = (e) => {
    e.preventDefault();
    this.props.onClose();
  }

  blockEvent = (e) => {
    e.stopPropagation();
  }

  linkHandler = (page) => (e) => {
    e.preventDefault();
    this.props.onPage(page);
  }

  render() {
    const {page, showHeader, showSignup, children} = this.props;

    return (
      <div className="modalContainer" role="dialog" onClick={this.handleClose}>
        <div className="modalDialog" onClick={this.blockEvent}>
          <div className="modalContent">
            <button onclick={this.handleClose} className="btn btnClose">
              <span className="visuallyHidden">Close</span>
            </button>
						{showHeader && <div className="header">
            	{showSignup && <button
							  className={`btn btnHeader ${page === 'signup' ? 'active' : ''}`}
							  onclick={this.linkHandler('signup')}>Sign Up</button>}
          		<button
							  className={`btn btnHeader ${page === 'login' ? 'active' : ''}`}
								onclick={this.linkHandler('login')}>Log in</button>
        		</div>}
						{children}
          </div>
        </div>
        <a href="https://www.netlify.com" className="callOut">
          <span className="netlifyLogo"></span>
          Coded by Netlify
        </a>
      </div>
    )
  }
}
