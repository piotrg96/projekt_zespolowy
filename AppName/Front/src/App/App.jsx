import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
<<<<<<< HEAD
import { Repass } from '../Forms';
import { Deluser } from '../Forms';
=======
import { Repass, UpdateOwner } from '../Forms';
>>>>>>> edc4cc3fd7e5eb020aee187065a6252b02880aa9

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((_location, _action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
<<<<<<< HEAD
                                <Route path="/repass" component={Repass} />      
                                <Route path="/delete" component={Deluser} />   
=======
                                <Route path="/repass" component={Repass} />     
                                <Route path="/updateOwner" component={UpdateOwner} />          
>>>>>>> edc4cc3fd7e5eb020aee187065a6252b02880aa9
                             </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 