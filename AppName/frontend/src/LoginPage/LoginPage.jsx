import React from 'react';
import { Link } from 'react-router-dom';
import { userActions } from '../_actions';
import Notifications from '../_components/Notifications';

class LoginPage extends React.Component {

    constructor(props)
    {
        super(props);
        userActions.logout();

        this.state= {
           userName: '',
           password: '',
           submitted: false
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
        if (userName && password) {
            userActions.login(userName, password);
        }
    }
    
    render(){
        const { userName, password, submitted } = this.state;
        return (
            <div className="container">
                <Notifications />
                <div className="col-md-6 col-md-offset-3 m-auto pt-5">
                    <h2>Logowanie</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !userName ? ' has-error' : '')}>
                            <label htmlFor="userName">Login: </label>
                            <input type="text" className="form-control" name="userName" autoComplete="user-name" value={userName} onChange={this.handleChange} />
                            {submitted && !userName &&
                                <div className="text-danger">Pole jest wymagane</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                            <label htmlFor="password">Hasło: </label>
                            <input type="password" className="form-control" name="password" autoComplete="new-password" value={password} onChange={this.handleChange} />
                            {submitted && !password &&
                                <div className="text-danger">Pole jest wyamgane</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Zaloguj</button>
                            <Link to="/register" className="btn btn-link">Rejestracja</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export { LoginPage };