import React from 'react';
import { Link } from 'react-router-dom';
import { userActions } from '../_actions';
import { validationConstants } from '../_constants';
import Notifications from '../_components/Notifications';

class RegisterPage extends React.Component {

    constructor(props)
    {
        super(props);
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                repeatPassword: '',
                userName: '',
            },
            submitted: false,
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
                [name]: value,
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (
            validationConstants.nameValidation.test(user.firstName) && 
            validationConstants.nameValidation.test(user.lastName) && 
            validationConstants.userNameValidation.test(user.userName) && 
            validationConstants.emailValidation.test(user.email) && 
            user.password.length > 5 && 
            user.password === user.repeatPassword
        ) userActions.register(user); 
    }
    
    render() {
        const { user, submitted } = this.state;
        return (
            <div className="container">
                <Notifications />
                <div className="col-md-6 col-md-offset-3 m-auto pt-5">
                    <h2>Rejestracja</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !validationConstants.nameValidation.test(user.firstName) ? ' has-error ' : '')}>
                            <label htmlFor="firstName">Imię</label>
                            <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
                            {
                                submitted && !user.firstName &&
                                <div className="text-danger">Pole jest wymagane</div>
                            }
                            {
                                submitted && !validationConstants.nameValidation.test(user.firstName) && user.firstName &&
                                <div className="text-danger">Pole bez znaków specjalnych i cyfr</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !validationConstants.nameValidation.test(user.lastName) ? ' has-error' : '')}>
                            <label htmlFor="lastName">Nazwisko</label>
                            <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
                            {
                                submitted && !user.lastName &&
                                <div className="text-danger">Pole jest wymagane</div>
                            }
                            {
                                submitted && !validationConstants.nameValidation.test(user.lastName) && user.lastName &&
                                <div className="text-danger">Pole bez znaków specjalnych i cyfr</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !validationConstants.userNameValidation.test(user.userName) ? ' has-error' : '')}>
                            <label htmlFor="userName">Login</label>
                            <input type="text" className="form-control" name="userName" value={user.userName} onChange={this.handleChange} />
                            {
                                submitted && !user.userName &&
                                <div className="text-danger">Pole jest wymagane</div>
                            }
                            {
                                submitted && !validationConstants.userNameValidation.test(user.userName) && user.userName &&
                                <div className="text-danger">Pole bez znaków specjalnych</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !(validationConstants.emailValidation.test(user.email)) ? ' has-error' : '')}>
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" name="email" autoComplete="new-email" value={user.email} onChange={this.handleChange} />
                            {
                                submitted && !user.email &&
                                <div className="text-danger">Pole jest wymagane</div>
                            }
                            {
                                submitted && !(validationConstants.emailValidation.test(user.email)) && user.email &&
                                <div className="text-danger">Niepoprawny adres email</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !(user.password.length > 5) ? ' has-error' : '')}>
                            <label htmlFor="password">Hasło</label>
                            <input type="password" className="form-control" autoComplete="new-password" name="password" value={user.password} onChange={this.handleChange} />
                            {
                                submitted && !user.password &&
                                <div className="text-danger">Pole jest wymagane</div>
                            }
                            {
                                submitted && !(user.password.length > 5) && user.password &&
                                <div className="text-danger">Pole musi zawierać minimum 6 znaków</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && (!(user.password === user.repeatPassword) || !(user.repeatPassword)) ? ' has-error' : '')}>
                            <label htmlFor="repeatPassword">Powtórz hasło</label>
                            <input type="password" className="form-control" name="repeatPassword" autoComplete="new-password" value={user.repeatPassword} onChange={this.handleChange} />
                            {
                                submitted && !user.repeatPassword &&
                                <div className="text-danger">Pole jest wymagane</div>
                            }
                            {
                                submitted && !(user.password === user.repeatPassword) && user.repeatPassword &&
                                <div className="text-danger">Hasla muszą być takie same</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Zarejestruj</button>
                            <Link to="/login" className="btn btn-link">Anuluj</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export { RegisterPage };