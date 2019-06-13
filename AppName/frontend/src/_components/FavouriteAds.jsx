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
            isnew: false,
    };   
    }

    componentWillMount()
    {
        userService.getUser()
        .then(res => res.json())
        .then(data => this.setState({user: data}))
        .then(data => fetch(`http://localhost:49396/api/FavoriteAds/user?userName=${this.state.user.userName}`))
        .then(res => res.json())
            .then(data => this.setState({ notices: data }));

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
                {this.state.notices.length == 0 ? <div className="emptymessage h3 col-md-12 py-5 text-center">Brak ulubionych ogłoszeń</div> :
                    <div className="col-md-12 min-vh-100">
                        {this.state.notices ? 
                        <AdvetisementList notices={this.state.notices}/> : 
                        console.log("Ładuję dane...")}
                    </div>}
                </div>
        </div>
        );
    }
}

export { FavouriteAds };