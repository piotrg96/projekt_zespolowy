import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';


class HomePage extends React.Component {

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

    let users = this.props.users.items || {}
 
    return (    
        <div className="col-sm-12">
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <a className="navbar-brand" href="#">Consumer Aplication</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item m-auto pr-2 text-light" >
                            <span>Welcome {users.firstName}</span>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            User
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" href="/updateOwner">Update Profile</a>
                                <a className="dropdown-item" href="/repass">Change Password</a>
                                <Link className="dropdown-item" to="/login" onClick={this.handleDeleteUser()}> Delete Profile</Link>
                                <div className="dropdown-divider"></div>
                                <Link className="dropdown-item" to="/login" onClick={this.HandleLogout}>Log Out</Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
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

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };