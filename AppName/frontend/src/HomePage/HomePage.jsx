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
            notices: null,
            user: '',
        };   
    }

    componentDidMount()
    {
        fetch(`http://localhost:49396/api/AdvertisementModels`)
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
             <Navbar concreteUser={users}/>
             <Notifications/>
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