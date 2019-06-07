import React from 'react';
import { MyAdvertisementList } from '.';
import { userService, advertisementService } from '../../_services';
import { Navbar } from '..';
import Notifications from '../Notifications';

class MyAdvertisements extends React.Component {

    constructor(props) { 
        super(props);
        this.state = {
            myAds: null,
            user: '',
        };   
    }

    componentDidMount()
    {
        userService.getUser()
            .then(res => res.json())
            .then(data => this.setState({user: data})); 
            
        advertisementService.getMyAdvertisement(this.props.location.state.users.userName)
            .then(res => res.json())
            .then(data => this.setState({myAds: data}));
    }

    render() {
 
    return (    
        <div>
            <div className="sticky-top">
                <Notifications/>
                <Navbar concreteUser={this.state.user}/>
            </div>
                <div className="row">
                    <div className="col-md-12 min-vh-100">
                        {this.state.myAds ? 
                        <MyAdvertisementList myAds={this.state.myAds} user={this.state.user} /> : 
                        console.log("Ładuję dane...") }
                    </div>
                </div>
        </div>
        );
    }
}

export { MyAdvertisements };