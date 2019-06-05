import React from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { advertisementActions } from '../../_actions';
import './MyAdvertisement.css';

class MyAdvertisement extends React.Component {
    
    handleDeleteAdv = () =>
    {
        advertisementActions.advDelete(this.props.id);
    }

    render() {   
    const myAd = this.props;
    return (
        <div className="col-md-12">
           <div className="mb-3 Advert-background row rounded MyAdvert-border">
                <div className="col-md-4 MyAdvert-maxheight">
                   <img className="img-fluid h-100 w-100 p-3" 
                        src={ "http://localhost:49396/images/" + myAd.advertisementImages[0].path }
                        alt={ "Nieprawidłowy format zdjęcia" }
                    />
                </div>
                <div className="col-md-8 d-inline-block p-1 my-3 mx-auto Advert-link">
                    <div className="h1">{myAd.title}</div>
                    <div className="h3">Kategoria: {myAd.categoryName}</div>
                    <div className="h3">Cena: {<NumberFormat value={myAd.price} displayType={'text'} thousandSeparator={','} suffix={'zł'} />} </div>
                    <Link 
                        to={{ pathname: '/advertisementView', 
                        state: { 
                            id: myAd.id,
                            title: myAd.title, 
                            category: myAd.categoryName,
                            price: myAd.price,
                            description: myAd.description,
                            yardage: myAd.yardage,
                            city: myAd.cityName,
                            phone: myAd.phoneNumber,
                            photos: myAd.advertisementImages,
                        }}}
                    ><button className="btn btn-primary py-1 mt-5 mb-2 w-25 mx-3">Podgląd</button></Link>
                    <Link 
                        to={{ pathname: '/myAdsUpdate' , state: { 
                            users: myAd.ktos,
                            id: myAd.id,
                            title: myAd.title, 
                            category: myAd.categoryName,
                            price: myAd.price,
                            description: myAd.description,
                            yardage: myAd.yardage,
                            city: myAd.cityName,
                            province: myAd.province,
                            phone: myAd.phoneNumber,
                        }}}
                    >
                    <button className="btn btn-success py-1 mt-5 mb-2 w-25 mx-3">Aktualizuj</button></Link>
                    <button className="btn btn-danger py-1 mt-5 mb-2 w-25 mx-3" onClick={(myAd) => this.handleDeleteAdv(myAd)}>Usuń</button>   
                </div>
            </div>
        </div>
        );
    }
}

export { MyAdvertisement };
