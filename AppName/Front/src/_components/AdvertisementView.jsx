import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar } from './../_components';

class AdvertisementView extends React.Component {

    render() {
    
    let users = this.props.users.items || {}
    const { title , category, price, description, yardage, city, phone } = this.props.location.state;

    return (
        <div>
            <Navbar concreteUser={users}/>
            <div className="row my-5 px-3">
                <div className="col-md-6 border border-success rounded">
                    <div className="h2 my-4 mx-3 rounded mb-5">{title}</div>
                    <div className="row">
                        <div className="col-md-6 h5 mx-3">Katerogia: {category}</div>
                        <div className="col-md-6 h5 mx-3">Metraż: {yardage} metrów</div>
                    </div>
                    <div className="h5 col-md-12 ">Lokalizacja: {city} </div>
                    <div className="h5 col-md-12 my-5">Opis: {description} </div> 
                    <div className="row">
                        <div className="col-md-6 h5 mx-3">Cena: {price} zl</div>
                        <div className="col-md-6 h5 mx-3">Telefon: {phone}</div>
                    </div>
                </div>
                <div className="col-md-6 border border-success rounded">
                    <img className="img-fluid w-100 h-auto p-3" src="https://avatars0.githubusercontent.com/u/699438?v=4" />
                </div>
            </div>

            <Link to="/" className="btn btn-primary btn-block py-1 mb-3">Powrót</Link>
        </div>
    );}
}

function mapStateToProps(state) {
    const { users, AdvertisementView} = state;
    return {
        users,
        AdvertisementView
    };
}

const connectedAdvertisementView = connect(mapStateToProps)(AdvertisementView);
export { connectedAdvertisementView as AdvertisementView };
