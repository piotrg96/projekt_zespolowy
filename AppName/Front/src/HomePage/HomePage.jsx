import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { FaUserAlt } from 'react-icons/fa';

class HomePage extends React.Component {
<<<<<<< HEAD
  
        constructor(props)
        {
            super(props);
            this.props.dispatch(userActions.getAll());
    
        }
        handleDeleteUser() {
            return (e) => this.props.dispatch(userActions.delete());
        }
      


=======
>>>>>>> edc4cc3fd7e5eb020aee187065a6252b02880aa9

    componentDidMount() 
    { 
        this.props.dispatch(userActions.getAll());
    }
    

    render() {
       //const imie = JSON.stringify(this.props.users.items);
       //console.log(imie["firstName"]);
       console.log(this.props.users.items);
        return (
<<<<<<< HEAD
            <div className="col-sm-8 col-sm-offset-2">
                Użytkownik: {user.firstName}
                <Link to="/repass"><FaUserAlt /></Link>
                <span> - <a onClick={this.handleDeleteUser()}>Delete</a></span>

                
=======
            <div className="koles col-sm-8 col-sm-offset-2">
                Uzytkownik: <div>{}</div>
                <Link to="/repass"><FaUserAlt/></Link><br/>
                <Link to="/updateOwner">Uktualizacja danych</Link>
>>>>>>> edc4cc3fd7e5eb020aee187065a6252b02880aa9
                
                {/*<h3>All registered users:</h3> 
                <Link to="/login" className="btn btn-link">Cancel</Link>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul>
                        {users.items.map((user, _index) =>
                            <li key={user.id}>
                                {user.firstName + ' ' + user.lastName}
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                } } */}
                <p>
                    <Link to="/login">Logout</Link>
                </p>
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