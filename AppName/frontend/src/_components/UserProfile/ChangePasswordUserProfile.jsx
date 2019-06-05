import React from 'react';
import { Link } from 'react-router-dom';
import { userActions } from '../../_actions';
import Notifications from '../Notifications';

class ChangePasswordUserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password:
            {
                oldPassword: '',
                newPassword: '',
                repeatNewPassword: ''
            },
            submitted: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const{name, value} = e.target;
        const{password} = this.state;
        this.setState({
            password:{
                ...password,
                 [name]: value ,
            }
         });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({submitted: true});
        const{password} = this.state;
        if(password.newPassword === password.repeatNewPassword)
        {
           userActions.newPassword(password);
        }
    }

    render() {
        const { password, submitted } = this.state;
        return (
            <div className="container">
            <Notifications/>
                <div className="col-md-6 col-md-offset-3 m-auto pt-5">                
                    <h2>Zmiana Hasła</h2>
                    <form name="form" onSubmit={this.handleSubmit}>                
                        <div className={'form-group' + (submitted && !(password.oldPassword) ? ' has-error' : '')}>
                            <label htmlFor="oldPassword">Aktualne hasło: </label>
                            <input type="password" className="form-control" name="oldPassword" autoComplete="old-password" value={password.oldPassword} onChange={this.handleChange} />
                            {
                                submitted && !password.oldPassword &&
                                <div className="text-danger">Pole jest wymagane</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted &&!(password.newPassword) ? ' has-error' : '')}>
                            <label htmlFor="newPassword">Nowe hasło: </label>
                            <input type="password" className="form-control" name="newPassword" autoComplete="new-password" value={password.newPassword} onChange={this.handleChange} />
                            {
                                submitted && !password.newPassword &&
                                <div className="text-danger">Pole jest wymagane</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && (!(password.repeatNewPassword === password.newPassword) || !(password.repeatNewPassword)) ? ' has-error' : '')}>
                            <label htmlFor="repeatNewPassword">Powtórz nowe hasło:  </label>
                            <input type="password" className="form-control" name="repeatNewPassword" autoComplete="new-password" value={password.repeatNewPassword} onChange={this.handleChange} />
                            {
                                submitted && !password.repeatNewPassword &&
                                <div className="text-danger">Pole jest wymagane</div>
                            }
                            {
                                submitted && !(password.newPassword === password.repeatNewPassword) && password.repeatNewPassword &&
                                <div className="text-danger">Hasła muszą być takie same</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Zatwierdź</button>
                            <Link to="/" className="btn btn-link">Anuluj</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export { ChangePasswordUserProfile };