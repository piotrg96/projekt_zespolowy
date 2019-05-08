import React from 'react';
import { MyAdvertisementList } from '.';
import { userService } from '../../_services';
import { Navbar } from '..';
import Notifications from '../Notifications';

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
    "paths": [
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
    "paths": [
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
    "paths": [
        { "path":"https://avatars0.githubusercontent.com/u/110438?v=4", "advertisementId":"1"},
        { "path":"https://avatars2.githubusercontent.com/u/6220?v=4", "advertisementId":"2"},
        { "path":"https://avatars0.githubusercontent.com/u/8322438?v=4", "advertisementId":"3"},
        { "path":"https://avatars2.githubusercontent.com/u/620?v=4", "advertisementId":"2"},]
} ];

class MyAdvertisements extends React.Component {

    constructor(props)
    { 
        super(props);
        this.state = {
            myAds: data,
            user: '',
        };   
    }

    componentDidMount()
    {
        userService.getUser()
            .then(res => res.json())
            .then(data => this.setState({user: data})); 
            
        // fetch(`http://localhost:49396/api/AdvertisementModels/myAds?_username=${this.props.location.state.users.userName}`)
        //     .then(res => res.json())
        //     .then(data => this.setState({myAds: data}))

    }

    render() {
 
    return (    
        <div>
            <Notifications/>
            <Navbar concreteUser={this.state.user}/>
                <div className="row">
                    <div className="col-md-12">
                        <MyAdvertisementList 
                            myAds={this.state.myAds} 
                            user={this.state.user}
                        />
                    </div>
                </div>
        </div>
    );
    }
}

export { MyAdvertisements };