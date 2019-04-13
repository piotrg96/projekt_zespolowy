import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';


class Navbar extends React.Component {

    componentDidMount()
    {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser()
    {
        return () => this.props.dispatch(userActions.delete());
    }
      
    handleLogout()
    {
        return () => this.props.dispatch(userActions.logout());
    }

    render() {

 
    return (    
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <a className="navbar-brand" href="#">Consumer Aplication</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            User
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="/updateOwner">Update Profile</a>
                                <a className="dropdown-item" href="/repass">Change Password</a>
                                <Link 
                                    className="dropdown-item" 
                                    to="/login" 
                                    onClick={this.handleDeleteUser()}
                                > 
                                    Delete Profile
                                </Link>
                                <div className="dropdown-divider"></div>
                                <Link 
                                    className="dropdown-item" 
                                    to="/login" 
                                    onClick={this.handleLogout}
                                >
                                    Log Out
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item m-auto pl-2 text-light" >
                            <span>Welcome {this.props.concreteUser.firstName}</span>
                        </li>
                    </ul>
                </div>
            </nav>
    );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedNavbar = connect(mapStateToProps)(Navbar);
export { connectedNavbar as Navbar };