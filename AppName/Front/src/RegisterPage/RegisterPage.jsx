import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

const emailRegex = RegExp(/^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i);
const nameReg = RegExp(/^[A-Z][a-zA-Z]{2,}$/);
const userNameReg = RegExp(/^[a-zA-Z1-9]{3,}$/);

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                repeatPassword: '',
                userName: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;

        if (nameReg.test(user.firstName) && nameReg.test(user.lastName) && userNameReg.test(user.userName) 
            && emailRegex.test(user.email) && user.password.length > 5 && user.password === user.repeatPassword) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="container">
                <div className="col-md-6 col-md-offset-3 m-auto pt-5">
                    <h2>Register</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !nameReg.test(user.firstName) ? ' has-error ' : '')}>
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                            {submitted && !user.firstName &&
                                <div className="text-danger">First Name is required</div>
                            }
                            {submitted && !nameReg.test(user.firstName) && user.firstName &&
                                <div className="text-danger">Without special characters and numbers</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !nameReg.test(user.lastName) ? ' has-error' : '')}>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
                            {submitted && !user.lastName &&
                                <div className="text-danger">Last Name is required</div>
                            }
                            {submitted && !nameReg.test(user.lastName) && user.lastName &&
                                <div className="text-danger">Without special characters and numbers</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !userNameReg.test(user.userName) ? ' has-error' : '')}>
                            <label htmlFor="userName">User Name</label>
                            <input type="text" className="form-control" name="userName" value={user.userName} onChange={this.handleChange} />
                            {submitted && !user.userName &&
                                <div className="text-danger">User name is required</div>
                            }
                            {submitted && !userNameReg.test(user.userName) && user.userName &&
                                <div className="text-danger">Without special characters</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !(emailRegex.test(user.email)) ? ' has-error' : '')}>
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
                            {submitted && !user.email &&
                                <div className="text-danger">Email is required</div>
                            }
                            {submitted && !(emailRegex.test(user.email)) && user.email &&
                                <div className="text-danger">Email address provided is not valid</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !(user.password.length > 5) ? ' has-error' : '')}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
                            {submitted && !user.password &&
                                <div className="text-danger">Password is required</div>
                            }
                            {submitted && !(user.password.length > 5) && user.password &&
                                <div className="text-danger">Password needs at least 6 characters</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && (!(user.password === user.repeatPassword) || !(user.repeatPassword)) ? ' has-error' : '')}>
                            <label htmlFor="repeatPassword">Repeat Password</label>
                            <input type="password" className="form-control" name="repeatPassword" value={user.repeatPassword} onChange={this.handleChange} />
                            {submitted && !user.repeatPassword &&
                                <div className="text-danger">Repeat Password is required</div>
                            }
                            {submitted && !(user.password === user.repeatPassword) && user.repeatPassword &&
                                <div className="text-danger">Passwords must be the same</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Register</button>
                            {registering && 
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                            <Link to="/login" className="btn btn-link">Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { registering } = state.registration;
    return {
        registering
    };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };