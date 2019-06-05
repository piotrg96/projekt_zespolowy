import React from 'react';
import { Link } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import './Advertisement.css';

class Advertisement extends React.Component {

    render() {
    const notice = this.props;
    return (
        <div className="container">
            <div className="row Advert-background rounded Advert-border">
                <div className="col-md-4 Advert-maxheight">
                    <img className="img-fluid h-100 w-100 p-3"
                        src={ "http://localhost:49396/images/" + notice.advertisementImages[0].path }
                        alt={ "Nieprawidłowy format zdjęcia" }
                    />
                </div>
                <div className="col-md-8 d-inline-block p-1 my-3 mx-auto Advert-link">
                    <Link 
                        className="Advert-link"
                        to={{ pathname: '/advertisementView', 
                        state: { 
                            advUser: notice.username,
                            title: notice.title, 
                            category: notice.categoryName,
                            price: notice.price,
                            description: notice.description,
                            yardage: notice.yardage,
                            city: notice.cityName,
                            phone: notice.phoneNumber,
                            photos: notice.advertisementImages,
                        }}}
                    >
                    <div className="h1">{notice.title}</div></Link>
                    <div className="h3">Kategoria: {notice.categoryName}</div>
                    <div className="h3">Cena: {<NumberFormat value={notice.price} displayType={'text'} thousandSeparator={','} suffix={'zł'} />}</div>
                </div>
            </div>
        </div>
    );}
}

export { Advertisement };
