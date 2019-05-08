import React from 'react';
import { Redirect } from 'react-router-dom';
import { userService } from '../_services';
import { Navbar, Search, AdvetisementList } from '../_components';
import Notifications from '../_components/Notifications';
import { error } from 'util';

class HomePage extends React.Component {

    constructor(props)
    { 
        super(props);
        this.state = {
            notices: [{}],
            user: '',
        };   
    }

    componentDidMount()
    {
        fetch(`http://localhost:49396/api/AdvertisementModels`)
            .then(res => res.json())
            .then(data => this.setState({notices: data}));
           
        userService.getUser()
            .then(res => res.json())
            .then(data => this.setState({user: data})); 
    }

    render() {

    if(this.state.user === error){
        return(<Redirect to={'/login'}/>)
    }

    const users = this.state.user;
 
    return (    
        <div>
             <Navbar concreteUser={users}/>
             <Notifications/>
             <Search/>
                <div className="row">
                    <div className="col-md-12">
                        <AdvetisementList notices={this.state.notices}/>
                    </div>
                </div>
        </div>
    );
    }
}

export { HomePage };