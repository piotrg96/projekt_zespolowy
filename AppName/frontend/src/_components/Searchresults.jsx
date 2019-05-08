import React from 'react';
import { Redirect } from 'react-router-dom';
import { userService } from '../_services';
import { Navbar, Search } from '../_components';
import Notifications from '../_components/Notifications';
import { error } from 'util';

class Searchresults extends React.Component {

    constructor(props)
    { 
        super(props);
        this.state = {
            sortowane: [{}],
            user: '',
        };   
    }

    componentDidMount()
    {
        fetch(`http://localhost:49396/api/AdvertisementModels`)
            .then(res => res.json())
            .then(data => this.setState({sortowane: data}));
           
        userService.getUser()
            .then(res => res.json())
            .then(data => this.setState({user: data})); 
    }

    render() {
        console.log(this.state.sortowane);
    if(this.state.user === error){
        return(<Redirect to={'/login'}/>)
    }

    const users = this.state.user;
    const {sortowane} = this.state
    return (    
        <div>
             <Navbar concreteUser={users}/>
             <Notifications/>
             <Search/>
                <div className="row">
                    <div className="col-md-12">
                        {
                            sortowane.map((item,i ) => (
                                <div key={i}>{item.price}</div>
                            ))
                        }
                    </div>
                </div>
        </div>
    );
    }
}

export { Searchresults };