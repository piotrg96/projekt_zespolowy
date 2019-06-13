import React from 'react';
import { MyAdvertisementList } from '.';
import { userService, advertisementService } from '../../_services';
import { Navbar } from '..';
import Notifications from '../Notifications';

class MyAdvertisements extends React.Component {

    constructor(props) { 
        super(props);
        this.state = {
            myAds: [],
            user: '',
            isnew: false,
        };   
    }

    componentDidMount()
    {
        userService.getUser()
            .then(res => res.json())
            .then(data => this.setState({user: data})); 
            
        advertisementService.getMyAdvertisement(this.props.location.state.users.userName)
            .then(res => res.json())
            .then(data => this.setState({ myAds: data }));

        
            userService.getUser()
                    .then(res => res.json())
                    .then(data => userService.isNewMessage(data.userName))
                    .then(res => res.json())
                    .then(data => this.setState({ isnew: data }))
                ;

        
    }

    render() {
 
    return (    
        <div>
            <div className="sticky-top">
                <Notifications/>
                <Navbar concreteUser={this.state.user} isnew={this.state.isnew}/>
            </div>
                <div className="row">
                    <div className="col-md-12 min-vh-100">
                        {this.state.myAds.length ? 
                        <MyAdvertisementList myAds={this.state.myAds} user={this.state.user} /> : 
                        <div className="emptymessage h3 col-md-12 py-5 text-center">Nie dodałeś żadnych ogłoszeń</div> }
                    </div>
                </div>
        </div>
        );
    }
}

export { MyAdvertisements };