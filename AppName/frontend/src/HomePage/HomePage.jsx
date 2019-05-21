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
    "description": "ddd",
    "id": 71,
    "phoneNumber": "519603947",
    "price": 111,
    "province": null,
    "provinceId": 28,
    "provinceName": "Warmińsko-Mazurskie",
    "title": "Sprzedam kawalerkę blisko kortowa",
    "username": "asdasd",
    "yardage": 22,
    "advertisementImages": [
        { "path":"https://avatars0.githubusercontent.com/u/438?v=4", "advertisementId":"1"},
        { "path":"https://avatars2.githubusercontent.com/u/820?v=4", "advertisementId":"2"},
        { "path":"https://avatars0.githubusercontent.com/u/8324?v=4", "advertisementId":"3"},]
},
{
    "category": null,
    "categoryId": 1,
    "categoryName": "Mieszkania",
    "city": null,
    "cityId": 708,
    "cityName": "Iława",
    "creationDate": "2019-04-30T13:16:13.6913745",
    "description": "dsfadsacsa",
    "id": 71,
    "phoneNumber": "519603947",
    "price": 111,
    "province": null,
    "provinceId": 28,
    "provinceName": "Warmińsko-Mazurskie",
    "title": "Oddam za grosze",
    "username": "asdasd",
    "yardage": 22,
    "advertisementImages": [
        { "path":"https://avatars0.githubusercontent.com/u/8120438?v=4", "advertisementId":"1"},
        { "path":"https://avatars0.githubusercontent.com/u/8338?v=4", "advertisementId":"3"},]
},
{
    "category": null,
    "categoryId": 1,
    "categoryName": "Mieszkania",
    "city": null,
    "cityId": 708,
    "cityName": "Iława",
    "creationDate": "2019-04-30T13:16:13.6913745",
    "description": "vreuivcaruvcuvedcu",
    "id": 71,
    "phoneNumber": "519603947",
    "price": 111,
    "province": null,
    "provinceId": 28,
    "provinceName": "Warmińsko-Mazurskie",
    "title": "chesz to mozesz brac",
    "username": "asdasd",
    "yardage": 22,
    "advertisementImages": [
        { "path":"https://avatars0.githubusercontent.com/u/110438?v=4", "advertisementId":"1"},
        { "path":"https://avatars2.githubusercontent.com/u/6220?v=4", "advertisementId":"2"},
        { "path":"https://avatars0.githubusercontent.com/u/8322438?v=4", "advertisementId":"3"},
        { "path":"https://avatars2.githubusercontent.com/u/620?v=4", "advertisementId":"2"},]
} ];


class HomePage extends React.Component {

    constructor(props)
    { 
        super(props);
        this.state = {
            notices: [{}],
            user: '',
        };   
    }

    componentWillMount()
    {
        fetch(`http://localhost:49396/api/AdvertisementModels`)
            .then(res => res.json())
            .then(data => this.setState({notices: data}))
           
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