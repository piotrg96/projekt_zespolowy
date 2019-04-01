import React from 'react';
import { Link } from 'react-router-dom';
import { connect, Router, Route } from 'react-redux';
import { userActions } from '../_actions';
import { FaUserAlt } from 'react-icons/fa';



class HomePage extends React.Component {
  
        constructor(props)
        {
            super(props);
            this.props.dispatch(userActions.getAll());
    
        }

      




    render() {
        const {user} = this.props;
        return (
            <div className="col-sm-8 col-sm-offset-2">
                Użytkownik: 
                <Link to="/repass"><FaUserAlt/></Link>
                
          
            
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