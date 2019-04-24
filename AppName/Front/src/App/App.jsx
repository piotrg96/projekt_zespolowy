import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import 
{ 
    PrivateRoute, 
    UpdateOwner, 
    Repass, 
    Deluser, 
    AdvertisementView,
    AdvertisementCreate,
    MyAds,
    MyAdsUpdate
} from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';


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
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
    
                            {alert.message &&
                                <div className={`alert ${alert.type}`}>{alert.message}</div>
                            }
                            <Router history={history}>
                                <div>
                                    <PrivateRoute exact path="/" component={HomePage}/>
                                    <Route path="/login" component={LoginPage} />
                                    <Route path="/register" component={RegisterPage} />
                                    <Route path="/repass" component={Repass} />      
                                    <Route path="/delete" component={Deluser} />   
                                    <Route exact path="/updateOwner" component={UpdateOwner} />
                                    <Route path="/advertisementView" component={AdvertisementView} />          
                                    <Route path="/advertisementCreate" component={AdvertisementCreate} />
                                    <Route path="/myAds" component={MyAds} />  
                                    <Route path="/myAdsUpdate" component={MyAdsUpdate} />   
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