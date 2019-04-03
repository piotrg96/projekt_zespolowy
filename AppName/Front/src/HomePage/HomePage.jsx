import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';

class HomePage extends React.Component {

  
        constructor(props)
        {
            super(props);
            this.props.dispatch(userActions.getAll());
    
        }
        handleDeleteUser() {
            return () => this.props.dispatch(userActions.delete());
        }
      
        HandleLogout(){
            return () => this.props.dispatch(userActions.logout());
        }

    componentDidMount() 
    { 
        this.props.dispatch(userActions.getAll());
    }
    

    render() {
       //const imie = JSON.stringify(this.props.users.items);
       //console.log(imie["firstName"]);
  
        return (

            
           
            <div className="col-sm-12">

  

                <div className="row">
                    <div className="col-sm-4">
                        <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Update your data</h2>
                            <a href="#" className="btn btn-primary">Go somewhere</a>
                        </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Change your password</h2>
                            <a href="/repass" className="btn btn-primary">Change password</a>
                        </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Delete account</h2>
                            
                            <Link to="/login" className="btn btn-danger" onClick={this.handleDeleteUser()}> Delete </Link>
                            
                        </div>
                        </div>
                    </div>
                </div>
                {/*<div className="koles col-sm-8 col-sm-offset-2">
                Uzytkownik: <div>{}</div>
                <Link to="/repass"><FaUserAlt/></Link><br/>
                <Link to="/updateOwner">Uktualizacja danych</Link>

                
                <h3>All registered users:</h3> 
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
                } } 
               
                </div>
                */}
                <p>
                <Link to="/login" onClick={this.HandleLogout}>Sing Out</Link>
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