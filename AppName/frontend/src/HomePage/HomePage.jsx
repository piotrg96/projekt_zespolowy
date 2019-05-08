import React from 'react';
import { Redirect } from 'react-router-dom';
import { userService } from '../_services';
import { Navbar, Search, AdvetisementList } from '../_components';
import Notifications from '../_components/Notifications';
import { error } from 'util';


const data = [{
    "category": null,
    "categoryId": 1,
    "categoryName": "Mieszkania",
    "city": null,
    "cityId": 708,
    "cityName": "Iława",
    "creationDate": "2019-04-30T13:16:13.6913745",
    "description": "Piekne mieszkanie idealne dla młodej pary. Zapraszam do oględzin.",
    "id": 71,
    "phoneNumber": "519603947",
    "price": 111,
    "province": null,
    "provinceId": 28,
    "provinceName": "Warmińsko-Mazurskie",
    "title": "Sprzedam kawalerkę blisko kortowa",
    "username": "asdasd",
    "yardage": 22,
    "paths": [
        { "path":"https://avatars1.githubusercontent.com/u/2241504?s=400&v=4", "advertisementId":"1"},
        { "path":"https://avatars2.githubusercontent.com/u/8230?v=4", "advertisementId":"2"},
        { "path":"https://avatars0.githubusercontent.com/u/83324?v=4", "advertisementId":"3"},]
},
{
    "category": null,
    "categoryId": 1,
    "categoryName": "Mieszkania",
    "city": null,
    "cityId": 708,
    "cityName": "Iława",
    "creationDate": "2019-04-30T13:16:13.6913745",
    "description": "Duży metraż, dobra lokalizacja, tanio!!!",
    "id": 71,
    "phoneNumber": "519603947",
    "price": 111,
    "province": null,
    "provinceId": 28,
    "provinceName": "Warmińsko-Mazurskie",
    "title": "Piękny dom w centrum Olsztyna",
    "username": "asdasd",
    "yardage": 22,
    "paths": [
        { "path":"https://avatars1.githubusercontent.com/u/1324021?s=400&v=4", "advertisementId":"1"},
        { "path":"https://avatars0.githubusercontent.com/u/83338?v=4", "advertisementId":"3"},]
},
{
    "category": null,
    "categoryId": 1,
    "categoryName": "Mieszkania",
    "city": null,
    "cityId": 708,
    "cityName": "Iława",
    "creationDate": "2019-04-30T13:16:13.6913745",
    "description": "Idealna lokalizacja dla fanów dobrych imprez i odpowiedniego relaksu!",
    "id": 71,
    "phoneNumber": "519603947",
    "price": 111,
    "province": null,
    "provinceId": 28,
    "provinceName": "Warmińsko-Mazurskie",
    "title": "Domek letniskowy na Dajtkach",
    "username": "asdasd",
    "yardage": 22,
    "paths": [
        { "path":"https://avatars0.githubusercontent.com/u/527795?s=400&v=4", "advertisementId":"1"},
        { "path":"https://avatars0.githubusercontent.com/u/1840401?s=400&v=4", "advertisementId":"2"},
        { "path":"https://avatars0.githubusercontent.com/u/583785?v=4", "advertisementId":"3"},
        { "path":"https://avatars1.githubusercontent.com/u/25982890?s=400&v=4", "advertisementId":"2"},]
} ];


class HomePage extends React.Component {

    constructor(props)
    { 
        super(props);
        this.state = {
            notices: data,
            user: '',
        };   
    }

    componentDidMount()
    {
        // fetch(`http://localhost:49396/api/AdvertisementModels`)
        //     .then(res => res.json())
        //     .then(data => this.setState({notices: data}));
           
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
                        <AdvetisementList 
                            notices={this.state.notices} 
                        />
                    </div>
                </div>
        </div>
    );
    }
}

export { HomePage };