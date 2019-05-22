import React from 'react';
import { Redirect } from 'react-router-dom';
import { userService } from '../_services';
import { Navbar, Search, AdvertisementList1 } from '../_components';
import Notifications from '../_components/Notifications';
import { error } from 'util';


class SearchResults extends React.Component {

    constructor(props)
    { 
        super(props);
        this.state = {
            user: '',
            sort: [{}],
            sorting: [{}]
        };   
    }

    componentDidMount()
    {      
        fetch(`http://localhost:49396/api/AdvertisementModels/sort?category=${this.state.sort.category}&city=${this.state.sort.city}&province=${this.state.sort.province}&search=${this.state.sort.search}&sort=${this.state.sort.sort}&order=${this.state.sort.order}&maxprice=${this.state.sort.maxprice}&minprice=${this.state.sort.minprice}&maxyar=${this.state.sort.maxyar}&minyar=${this.state.sort.minyar}`)
        .then(data => data.json())
        .then(res => this.setState({ sorting : res}))

        userService.getUser()
            .then(res => res.json())
            .then(data => this.setState({user: data}));
    }

    render() {

    if(this.state.user === error){
        return(<Redirect to={'/login'}/>)
    }

    const {sorted} = this.props.location.state;  
    const users = this.state.user;
    this.state.sort = sorted

    return (    
        <div>
             <Navbar concreteUser={users}/>
             <Notifications/>
             <Search/>
                <div className="row">
                    <div className="col-md-12">
                    <AdvertisementList1 notices={this.state.sorting}/>
                    </div>
                </div>
        </div>
    );
    }
    
}

export { SearchResults };