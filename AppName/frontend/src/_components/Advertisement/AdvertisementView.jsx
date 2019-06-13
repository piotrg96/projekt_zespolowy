import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar , Photos } from '../../_components';
import NumberFormat from 'react-number-format';
import { userService } from '../../_services';
import './Advertisement.css';
import FaStarO from 'react-icons/lib/fa/star-o';

class AdvertisementView extends React.Component {

    constructor(props) { 
        super(props);
        this.state = {
            user: '',
            favouriteResults: '',
            isnew: false,
        };      
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount()
    {      
        userService.getUser()
            .then(res => res.json())
            .then(data => this.setState({ user: data }));

        userService.getUser()
                .then(res => res.json())
                .then(data => userService.isNewMessage(data.userName))
                .then(res => res.json())
                .then(data => this.setState({ isnew: data }))
            ;
    }
	
	handleSubmit(e)
    {
        e.preventDefault();
        fetch(`http://localhost:49396/api/FavoriteAds/addOrDelete?adId=${this.props.location.state.advId}&username=${this.props.location.state.advUser}`)
        .then(res => res.json())
        .then(data => this.setState({favouriteResults: data}));
    }


    render() {
    let users = this.state.user;
    let { advUser, title , category, price, description, yardage, city, phone, photos } = this.props.location.state;

	return(
        <div>
            <div className="sticky-top">
                <Navbar concreteUser={users} isnew={this.state.isnew}/>
            </div>
            <div className="row border border-success rounded mx-1 my-5 Advert-background">
                <div className="col-md-6">
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
                <div className="col-md-6">
                    <Photos key={0} photos={photos}/>  
                </div>
            </div>
			<form onSubmit={this.handleSubmit}>
            <div className="text-center mb-3"> 
            <button type="submit"><FaStarO  size={32}/></button>
            </div>
            </form>
            <Link to={{ pathname: '/sendMessage', state: { users: this.state.user.userName, advUser,}}} className="btn btn-primary btn-block py-1 mb-3">
                Wyslij wiadomość!
            </Link> 
            <Link to="/" className="btn btn-primary btn-block py-1 mb-3">Powrót</Link>
        </div>
        );
    }
}

export { AdvertisementView };
