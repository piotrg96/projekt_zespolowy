import React from 'react';
import { Link } from 'react-router-dom';
import { userActions } from '../../_actions';
import { userService } from '../../_services';
import { validationConstants } from '../../_constants';
import Notifications from '../Notifications';

class UpdateUserProfile extends React.Component {
    
    constructor(props) { 
        super(props);
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                email: '',
            },  
            submitted: false,
            currentUsers: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        userService.getUser()
            .then(res => res.json())
            .then(data => this.setState({currentUsers: data}))
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

        if(
            validationConstants.nameValidation.test(user.firstName) && 
            validationConstants.nameValidation.test(user.lastName) && 
            validationConstants.emailValidation.test(user.email)
        ) userActions.updateUser(user);
    }

    render() {
        const currentUsers = this.state.currentUsers;
        const { user, submitted } = this.state;
        return (
            <div className="container">
                <Notifications />
                <div className="col-md-6 col-md-offset-3 m-auto pt-5 min-vh-100">               
                    <h2>Zaktualizuj Profil</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !validationConstants.nameValidation.test(user.firstName) ? ' has-error' : '')}>
                            <label htmlFor="firstName">Imię: </label>
                            <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} placeholder={currentUsers.firstName}/>
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
                            <label htmlFor="lastName">Nazwisko:</label>
                            <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange}  placeholder={currentUsers.lastName} />
                            {
                                submitted && !user.lastName &&
                                <div className="text-danger">Pole jest wymagane</div>
                            }
                            {
                                submitted && !validationConstants.nameValidation.test(user.lastName) && user.lastName &&
                                <div className="text-danger">Pole bez znaków specjalnych i cyfr</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !(validationConstants.emailValidation.test(user.email)) ? ' has-error' : '')}>
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange}  placeholder={currentUsers.email}/>
                            {
                                submitted && !user.email &&
                                <div className="text-danger">Pole jest wymagane</div>
                            }
                            {
                                submitted && !(validationConstants.emailValidation.test(user.email)) && user.email &&
                                <div className="text-danger">Niepoprawny adres email</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Aktualizuj</button>
                            <Link to="/" className="btn btn-link">Anuluj</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export { UpdateUserProfile };