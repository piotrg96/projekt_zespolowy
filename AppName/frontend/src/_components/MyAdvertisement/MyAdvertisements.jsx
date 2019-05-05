import React from 'react';
import { MyAdvertisementList } from '.';
import { userService } from '../../_services';
import { Navbar } from '..';
import Notifications from '../Notifications';

class MyAdvertisements extends React.Component {

    constructor(props)
    { 
        super(props);
        this.state = {
            myAds: [{}],
            user: '',
        };   
    }

    componentDidMount()
    {
        userService.getUser()
            .then(res => res.json())
            .then(data => this.setState({user: data})); 
            
        fetch(`http://localhost:49396/api/AdvertisementModels/myAds?_username=${this.props.location.state.users.userName}`)
            .then(res => res.json())
            .then(data => this.setState({myAds: data}))

    }

    render() {

    //const { users } = this.props.location.state;
 
    return (    
        <div>
            <Notifications/>
            <Navbar concreteUser={this.state.user}/>
                <div className="row">
                    <div className="col-md-12">
                        <MyAdvertisementList myAds={this.state.myAds} ktos={this.state.user}/>
                    </div>
                </div>
        </div>
    );
    }
}

export { MyAdvertisements };