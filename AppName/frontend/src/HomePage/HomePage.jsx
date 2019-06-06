import React from 'react';
import { Redirect } from 'react-router-dom';
import { userService, advertisementService } from '../_services';
import { Navbar, Search, AdvetisementList } from '../_components';
import Notifications from '../_components/Notifications';
import { error } from 'util';



class HomePage extends React.Component {

    constructor(props)
    { 
        super(props);
        this.state = {
            notices: null,
            user: '',
        };   
    }

    componentDidMount()
    {
        advertisementService.getAdvertisement()
            .then(res => res.json())
            .then(data => this.setState({ notices: data }));
           
        userService.getUser()
            .then(res => res.json())
            .then(data => this.setState({user: data})); 
    }

    sortData = (sortedData) => {
        this.setState({notices: sortedData})    
    };

    render() {

    if(this.state.user === error)
    {
        return(<Redirect to={'/login'}/>)
    }

    const users = this.state.user;
    return(  
        <div>
            <div className="sticky-top">
                <Notifications />
                <Navbar concreteUser={users}/>
             </div>
             <Search onSubmit={this.sortData}/>
                <div className="row">
                    <div className="col-md-12">
                        {this.state.notices ? 
                        <AdvetisementList notices={this.state.notices} /> : 
                        console.log("Ładuję dane...") }
                    </div>
                </div>
        </div>
        );
    }
}

export { HomePage };