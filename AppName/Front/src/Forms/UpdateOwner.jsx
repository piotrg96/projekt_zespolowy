import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

const emailRegex = RegExp(/^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i);
const nameReg = RegExp(/^[A-Z][a-zA-Z]{2,}$/);

class UpdateOwner extends React.Component {
    
   
    constructor(props)
    {
       
        super(props);
        this.state = {

            user:
            {
                firstName: '',
                lastName: '',
                email: '',
            },
            
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
    }

    componentDidMount()
    {
        this.props.dispatch(userActions.getAll());
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

         if (nameReg.test(user.firstName) && nameReg.test(user.lastName)
             && emailRegex.test(user.email)) 
            {
                dispatch(userActions.update(user));
            }
    }

    render() {
        const users = this.props.users.items || {}
        const {user,submitted} = this.state;
       
        return (
            <div className="container">
                <div className="col-md-6 col-md-offset-3 m-auto pt-5">               
                    <h2>Update User Panel</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !nameReg.test(user.firstName) ? ' has-error' : '')}>
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} placeholder={users.firstName}/>
                            {submitted && !user.firstName &&
                                <div className="text-danger">First Name is required</div>
                            }
                            {submitted && !nameReg.test(user.firstName) && user.firstName &&
                                <div className="text-danger">Without special characters and numbers</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !nameReg.test(user.lastName) ? ' has-error' : '')}>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange}  placeholder={users.lastName} />
                            {submitted && !user.lastName &&
                                <div className="text-danger">Last Name is required</div>
                            }
                            {submitted && !nameReg.test(user.lastName) && user.lastName &&
                                <div className="text-danger">Without special characters and numbers</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !(emailRegex.test(user.email)) ? ' has-error' : '')}>
                            <label htmlFor="email">Email</label>
                            <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange}  placeholder={users.email}/>
                            {submitted && !user.email &&
                                <div className="text-danger">Email is required</div>
                            }
                            {submitted && !(emailRegex.test(user.email)) && user.email &&
                                <div className="text-danger">Provided email is not valid</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Update</button>
                            <Link to="/" className="btn btn-link">Cancel</Link>
                        </div>
                    </form>
                </div>
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

const connectedUpdateOwner = connect(mapStateToProps)(UpdateOwner);
export { connectedUpdateOwner as UpdateOwner };