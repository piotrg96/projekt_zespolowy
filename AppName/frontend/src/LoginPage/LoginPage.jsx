import React from 'react';
import { Link } from 'react-router-dom';
import { userActions } from '../_actions';
import Notifications from '../_components/Notifications';
import './LoginPage.css';
class LoginPage extends React.Component {
    constructor(props)
    {
        super(props);
        userActions.logout();
        this.state= {
           userName: '',
           password: '',
           submitted: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { userName, password } = this.state;
        if (userName && password) 
        {
            userActions.login(userName, password);
        }
    }
    
    render(){
        const { userName, password, submitted } = this.state;
        return (
            <div className="container min-vh-100">
                <div className="sticky-top">
                    <Notifications />
                </div>
                <div className="col-md-6 col-md-offset-3 m-auto pt-5 Login-Page-login-box">
                    <h1>Logowanie</h1>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group Login-Page-show' + (submitted && !userName ? ' has-error' : '')}>
                        <i className="fa fa-user"></i>
                            <input type="text" className="form-control" name="userName" autoComplete="user-name" placeholder="Login" value={userName} onChange={this.handleChange} />
                            {
                               submitted && !userName &&
                                <div className="text-danger">Pole jest wymagane</div>
                            }
                        </div>
                        <div className={'form-group Login-Page-show' + (submitted && !password ? ' has-error' : '')}>
                        <i className="fa fa-lock"></i>
                            <input type="password" className="form-control" name="password" autoComplete="new-password" placeholder="Hasło" value={password} onChange={this.handleChange} />
                            {
                                submitted && !password &&
                                <div className="text-danger">Pole jest wymagane</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="Login-Page-button btn-primary">Zaloguj</button>
                           <Link to="/register" className="btn Login-Page-button Login-Page-bgbutton ">Rejestracja</Link>
                      
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export { LoginPage };