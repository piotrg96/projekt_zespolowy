import React from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { advertisementActions } from '../../_actions';

class MyAdvertisement extends React.Component {
    
    handleDeleteAdv = () =>
    {
        advertisementActions.advDelete(this.props.id);
    }

    render() {
        
    const myAd = this.props;
    const ktos = this.props.ktos;

    return (
        <div className="col-md-12">
            <div className="mb-3 border border-success rounded row">
                <div className="col-md-4">
                   <img className="img-fluid h-auto w-100 p-3" src="https://avatars0.githubusercontent.com/u/699438?v=4" alt="avatar"/>
                </div>
                <div className="col-md-8 d-inline-block p-1 my-3 mx-auto">

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
                            phone: myAd.phoneNumber
                        }}}
                    ><button className="btn btn-primary py-1 mt-5 mb-2 w-25 mx-3">Podgląd</button></Link>

                    <Link 
                        to={{ pathname: '/myAdsUpdate' , state: { 
                            users: ktos,
                            id: myAd.id,
                            title: myAd.title, 
                            category: myAd.categoryName,
                            price: myAd.price,
                            description: myAd.description,
                            yardage: myAd.yardage,
                            city: myAd.cityName,
                            province: myAd.province,
                            phone: myAd.phoneNumber
                        }}}
                    ><button className="btn btn-success py-1 mt-5 mb-2 w-25 mx-3">Aktualizuj</button></Link>
                    
                        <button className="btn btn-danger py-1 mt-5 mb-2 w-25 mx-3" onClick={(myAd) => this.handleDeleteAdv(myAd)}>
                            Usuń
                        </button>
                       
                </div>
            </div>
        </div>
    );}
}

export { MyAdvertisement };
