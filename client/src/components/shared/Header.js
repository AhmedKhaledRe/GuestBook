import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends React.Component {

  constructor() {
    super();

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.logout();
    this.props.history.push('/messeges');
  }

  renderAuthButtons(isAuth) {
    if (isAuth) {
      return <a className='nav-item nav-link clickable' onClick={this.handleLogout}>Logout</a>
    }

    return (
        <React.Fragment>
          <Link className='nav-item nav-link' to='/login'>Login <span className='sr-only'>(current)</span></Link>
          <Link className='nav-item nav-link' to='/register'>Register</Link>
        </React.Fragment>
      )
  }

  renderOwnerSection(isAuth) {
    if (isAuth) {
      return (
        <div className="nav-item dropdown">
          <a className="nav-link nav-item dropdown-toggle clickable" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Messeges
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <Link className="dropdown-item" to="/messeges/new">Create New Messege</Link>
            <Link className="dropdown-item" to="/messeges/manage">Manage My Messeges</Link>
          </div>
        </div>
      )
    }
  }

  render() {
    const {username, isAuth} = this.props.auth;


    return (
      <nav className='navbar navbar-dark navbar-expand-lg'>
        <div className='container'>
          <Link className='navbar-brand' to='/messeges'>Ahmed's GuestBook
            <img src={process.env.PUBLIC_URL + '/img/react-logo.svg'} alt=""/>
          </Link>
          <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
            <div className='navbar-nav ml-auto'>
              { isAuth &&
                <a className='nav-item nav-link'>{username}</a>
              }
              {this.renderOwnerSection(isAuth)}
              {this.renderAuthButtons(isAuth)}
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default withRouter(connect(mapStateToProps)(Header));
