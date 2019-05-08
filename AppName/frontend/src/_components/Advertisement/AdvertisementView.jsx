import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar , Photos } from '../../_components';
import NumberFormat from 'react-number-format';
import { userService } from '../../_services';

class AdvertisementView extends React.Component {

    constructor(props)
    { 
        super(props);
        this.state = {
            user: '',
        };  
        
    }

    componentDidMount()
    {      
            userService.getUser()
                .then(res => res.json())
                .then(data => this.setState({user: data}))
      
    }

    render() {
    
    let users = this.state.user;
    const { title , category, price, description, yardage, city, phone, photos } = this.props.location.state;

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
                        <div className="col-md-6 h5 mx-3">Cena: {<NumberFormat value={price} displayType={'text'} thousandSeparator={','} suffix={'zł'} />} </div>
                        <div className="col-md-6 h5 mx-3">Telefon: {<NumberFormat value={phone} displayType={'text'} thousandSeparator={'-'} />}</div>
                    </div>
                </div>
                <div className="col-md-6 border border-success rounded">
                    <Photos key={0} photos={photos}/>  
                </div>
            </div>
            <Link to="/" className="btn btn-primary btn-block py-1 mb-3">Powrót</Link>
        </div>
    );}
}

export { AdvertisementView };
