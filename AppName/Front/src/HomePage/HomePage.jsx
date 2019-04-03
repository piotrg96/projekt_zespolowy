import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';


class HomePage extends React.Component {

    componentDidMount()
    {
        this.props.dispatch(userActions.getAll());
    }

     handleDeleteUser()
    {
        return () => this.props.dispatch(userActions.delete());
    }
      
    handleLogout()
    {
        return () => this.props.dispatch(userActions.logout());
    }

    


    render() {

    let users = this.props.users.items || {}
 
    return (
                   

                    
           
            <div className="col-sm-12">

                <div className="row">
                    <div className="col-sm-4">
                        <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">User: {users.firstName} </h2>
                            <a href="/updateOwner" className="btn btn-primary">Update</a>
                           
                        </div> 
                        </div> 
                    </div>
                    <div className="col-sm-4">
                        <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">Change your password</h2>
                            <a href="/repass" className="btn btn-secondary">Change password</a>
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