import React from 'react';
import { Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { Navbar, Search, NoticeList} from './../_components/index';

const Data = [
    {
        "title": "Sprzedam kawalerke za grosze","description": "qweqweqweqweqweqwe","price": 1000,"yardage": 60,"phoneNumber": "123321123","creationDate":"2019-04-12T00:00:00","category": "Mieszkania","categoryId": 1,"categoryName": "mieszkanie","province": null,"provinceId": 2,"provinceName": "Dolnoslaskie","city": null,"cityId": 3,"cityName": "Bielawa","id": 1
    },
    {
        "title": "title2","description": "desc2zzzzzzzzzzzzzzzzzzzz","price": 500,"yardage": 30,"phoneNumber": "555777999","creationDate": "2019-03-20T00:00:00","category": "Domy","categoryId": 2,"categoryName": "pokoj","province": null,"provinceId": 6,"provinceName": "Lubelskie","city": null,"cityId": 188,"cityName": "Lublin","id": 5
    },
    {
        "title": "title3","description": "desc3alsjgjkahskjdghkjasd","price": 750,"yardage": 35,"phoneNumber": "456987654","creationDate": "2019-01-10T00:00:00","category": "Biura i Lokale ","categoryId": 2,"categoryName": "pokoj","province": null,"provinceId": 6,"provinceName": "Lubelskie","city": null,"cityId": 188,"cityName": "Lublin","id": 7
    }
]

class HomePage extends React.Component {

    state = {
        notices: Data,
    };

    componentDidMount()
    {
        this.props.dispatch(userActions.getAll());
    }

    render() {

    if(users === null){
         return(<Redirect to={'/login'}/>)
    }

    let users = this.props.users.items || {}
 
    return (    
        <div>
            <Navbar concreteUser={users}/>
            <Search/>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <NoticeList notices={this.state.notices}/>
                    </div>
                </div>
            </div>
        </div>
    );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };