import React from 'react';
import { userService } from '../_services';
import { Navbar , AdvetisementList } from '../_components';
import Notifications from '../_components/Notifications';


class FavouriteAds extends React.Component {

    constructor(props) { 
        super(props);
        this.state = {
            notices: '',
            user: '',
        };   
    }

    componentWillMount()
    {
        userService.getUser()
        .then(res => res.json())
        .then(data => this.setState({user: data}))
        .then(data => fetch(`http://localhost:49396/api/favoriteAds/${this.state.user.userName}`))
        .then(res => res.json())
        .then(data => this.setState({notices: data}));
    }

    render() {
    return (    
        <div>
            <Notifications/>
            <Navbar concreteUser={this.state.user}/>
            <div className="row">
                    <div className="col-md-12">
                        {this.state.notices ? 
                        <AdvetisementList notices={this.state.notices}/> : 
                        console.log("Ładuję dane...") }
                    </div>
                </div>
        </div>
        );
    }
}

export { FavouriteAds };