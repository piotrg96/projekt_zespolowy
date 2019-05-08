import React from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from '../_helpers';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import 
{ 
    PrivateRoute, 
    UpdateUserProfile, 
    ChangePasswordUserProfile, 
    AdvertisementView,
    MyAdvertisementCreate, 
    MyAdvertisements,
    MyAdvertisementUpdate,
    SendMessage,
    MyMessagess,
} from '../_components';

class App extends React.Component {
    constructor(props) {
        super(props);
        history.listen((_location, _action) => {});
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage}/>
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/repass" component={ChangePasswordUserProfile} />      
                                <Route exact path="/updateOwner" component={UpdateUserProfile} />
                                <Route path="/advertisementView" component={AdvertisementView} />          
                                <Route path="/advertisementCreate" component={MyAdvertisementCreate} />
                                <Route path="/myAds" component={MyAdvertisements} />  
                                <Route path="/myAdsUpdate" component={MyAdvertisementUpdate} />   
                                <Route path="/sendMessage" component={SendMessage}/>
                                <Route path="/myMessage" component={MyMessagess}/>
                            </div>
                        </Router>
                    </div>
                </div>
            </div>
        );
    }
}

export { App }; 