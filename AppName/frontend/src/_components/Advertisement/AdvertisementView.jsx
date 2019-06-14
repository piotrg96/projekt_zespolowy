import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar , Photos } from '../../_components';
import NumberFormat from 'react-number-format';
import { userService } from '../../_services';
import './Advertisement.css';
import FaStarO from 'react-icons/lib/fa/star-o';
import FaStar from 'react-icons/lib/fa/star';

class AdvertisementView extends React.Component {

    constructor(props) { 
        super(props);
        this.state = {
            user: '',
            favouriteResults: '',
            isnew: false,
            star: false,
        };      
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStarClick = this.handleStarClick.bind(this);
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

        userService.getUser()
            .then(res => res.json())
            .then(data => userService.isFavAd(data.userName, this.props.location.state.advId))
            .then(res => res.json())
            .then(data => this.setState({ star: data }));
    }
   

    handleSubmit(e)
    {
        e.preventDefault();
        fetch(`http://localhost:49396/api/FavoriteAds/addOrDelete?adId=${this.props.location.state.advId}&username=${this.state.user.userName}`)
        .then(res => res.json())
        .then(data => this.setState({favouriteResults: data}));
    }

    handleStarClick = () => {
        this.setState(prevState => ({
            star: !prevState.star,
        }));
    }


    render() {
    let users = this.state.user;
    let { advId, advUser, title , category, price, description, yardage, city, phone, photos } = this.props.location.state;
    
	return(
        <div>
            <div className="sticky-top">
                <Navbar concreteUser={users} isnew={this.state.isnew}/>
            </div>
            <div className="row border border-success rounded mx-1 my-5 Advert-background Advert-font">
                <div className="col-md-6">
                    <div className="h2 my-4 mx-3 rounded mb-5"><h3>{title}</h3></div>
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
                    <div className="text-center my-2">
                        <form onSubmit={this.handleSubmit}>
                            {this.state.star ? <FaStar size={32} color={'yellow'}/> : <FaStarO size={32} color={'yellow'}/>}
                            <button className="wiadomosc ml-3" type="submit" onClick={this.handleStarClick}>Ulubione</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-6">
                    <Photos key={0} photos={photos}/>  
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <Link to={{ pathname: '/sendMessage', state: { users: this.state.user.userName, advUser, } }} className="btn btn-primary btn-block mb-4"> Wyslij wiadomość!</Link>
                </div>
                <div className="col-md-6">
                    <Link to="/" className="btn btn-link btn-block mb-4 border border-primary">Powrót</Link>
                </div>
            </div>
          
        </div>
        );
    }
}

export { AdvertisementView };
