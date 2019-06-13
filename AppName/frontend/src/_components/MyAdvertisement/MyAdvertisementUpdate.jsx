import React from 'react';
import { Link } from 'react-router-dom';
import { advertisementActions } from '../../_actions';
import { Navbar } from '..';
import Notifications from '../Notifications';
import { advertisementService } from '../../_services';
import { userService } from '../../_services';
import { validationConstants } from './../../_constants';
import './MyAdvertisement.css';

class MyAdvertisementUpdate extends React.Component {
    constructor(props)
    { 
        super(props);
        this.state = {
            update :
            {
                id: '',
                title: '',
                categoryName: '',
                price: '',
                description: '',
                yardage: '',
                cityName: '',
                provinceName: '',
                phone: '',
                userName: '',
                advertisementImages: ''
            },
            isnew: false,
            submitted: false,
            categories: [{}],
            cities: [{}],
            provinces: [{}],
        }; 
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.filterPhotos = this.filterPhotos.bind(this);
    }

    componentWillMount()
    {
        advertisementService.getCategory()
            .then(res => res.json())
            .then(data => this.setState({
                categories: data
            }));

        advertisementService.getCity()
            .then(res => res.json())
            .then(data => this.setState({
                cities: data
            }));

        advertisementService.getProvince()
            .then(res => res.json())
            .then(data => this.setState({
                provinces: data
            }));

        this.setState(prevState => ({
            update: {
                ...prevState.update,
                advertisementImages: this.props.location.state.advert.advertisementImages,
                id: this.props.location.state.advert.id,
            }
        }));

        userService.getUser()
                .then(res => res.json())
                .then(data => userService.isNewMessage(data.userName))
                .then(res => res.json())
                .then(data => this.setState({ isnew: data }))
            ;
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { update } = this.state;
        this.setState({
            update: {
                ...update,
                [name]: value,
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const { update } = this.state;
        advertisementActions.advUpdate(update, update.id);
    }

    filterPhotos(photo){

        this.setState( prevState => ({
            update: {
                ...prevState.update,
                advertisementImages: this.state.update.advertisementImages.filter(el => el.path !== photo)
            }
        }))
    };


    render() {
    const { update , submitted, cities, provinces, categories} = this.state;
    const { advert, users } = this.props.location.state;
    update.userName = users.userName;
    return(
        <div>
            <div className="sticky-top">
                <Notifications />
                <Navbar concreteUser={users} isnew={this.state.isnew}/>
            </div>
            <div className="row my-5 px-3">
                <div className="col-md-12 m-auto pt-3 px-4 border border-success rounded MyAdvert-background">               
                    <h2>Zaktualizuj Ogłoszenie</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'h2 mt-2' + (submitted && !(update.title) ? ' has-error' : '')}>
                            <label htmlFor="title"><h3>Tytuł:</h3> </label>
                            <input type="text" className="form-control" name="title" value={update.title} onChange={this.handleChange} placeholder={advert.title}/>
                            {
                                submitted && !update.title &&
                                <div className="text-danger h6">Pole jest wymagane</div>
                            }
                            {
                                update.title.length > 40 &&
                                <div className="text-danger h6">Maksymalnie 40 znaków</div>
                            }
                        </div>
                        <div className="row">
                            <div className={'col-md-6 h5 my-3' + (submitted && !(update.categoryName) ? ' has-error' : '')}>
                                <label htmlFor="categoryName"><h3>Kategoria:</h3> </label>
                                <select className="form-control" name="categoryName" value={update.categoryName} onChange={this.handleChange}>
                                <option></option>
                                {
                                    categories.map((category, i)=> (
                                        <option key={i} value={category.name}>{category.name}</option>  
                                    ))
                                }
                                </select>
                                {
                                    submitted && !update.categoryName &&
                                    <div className="text-danger h6">Pole jest wymagane</div>
                                }
                            </div>
                            <div className={"col-md-6 h5 my-3" + (submitted && !(update.yardage) ? ' has-error' : '')}>
                                <label htmlFor="yardage"><h3>Metraż:</h3> </label>
                                <input type="text" className="form-control" name="yardage" value={update.yardage} onChange={this.handleChange} placeholder={advert.yardage}/>
                                {
                                    submitted && !update.yardage &&
                                    <div className="text-danger h6">Pole jest wymagane</div>
                                }
                                {
                                    (update.yardage > 1000 || update.yardage < 0) &&
                                    <div className="text-danger h6">Możliwe wartości z przedziału 1 - 1.000</div>
                                }
                                {
                                    !(update.yardage > 1000 || update.yardage < 0) && !validationConstants.createAdvertisementValidation.test(update.yardage) && update.yardage &&
                                    <div className="text-danger h6">Podana wartość nie jest liczba</div>
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className={'col-md-6 h5 my-3' + (submitted && !(update.provinceName) ? ' has-error' : '')}>
                                <label htmlFor="provinceName"><h3>Województwo:</h3> </label>
                                <select className="form-control" name="provinceName" value={update.provinceName} onChange={this.handleChange} placeholder={advert.province}>
                                <option></option>
                                {
                                    provinces.map((province, i)=> (
                                        <option key={i} value={province.provinceName}>{province.provinceName}</option>  
                                    ))
                                }
                                </select>
                                {
                                    submitted && !update.provinceName &&
                                    <div className="text-danger h6">Pole jest wymagane</div>
                                }
                            </div>
                            <div className={'col-md-6 h5 my-3' + (submitted && !(update.cityName) ? ' has-error' : '')}>
                                <label htmlFor="cityName"><h3>Miasto:</h3> </label>
                                <select className="form-control" name="cityName" value={update.cityName} onChange={this.handleChange} placeholder={advert.city}>
                                <option></option>
                                {
                                    cities.map((city, i)=> (
                                        <option key={i} value={city.cityName}>{city.cityName}</option>  
                                    ))
                                }
                            </select>
                                {
                                    submitted && !update.cityName &&
                                    <div className="text-danger h6">Pole jest wymagane</div>
                                }
                            </div>
                        </div>                
                        <div className={'h5' + (submitted && !(update.description) ? ' has-error' : '')}>
                            <label htmlFor="description"><h3>Opis:</h3> </label>
                            <textarea className="col-md-12 my-3 py-3" name="description" value={update.description} onChange={this.handleChange} placeholder={advert.description} wrap="hard" maxLength="255"/>
                            {
                                submitted && !update.description &&
                                <div className="text-danger h6">Pole jest wymagane</div>
                            }
                        </div>
                        <div className="row">
                            <div className={'col-md-6 h5 my-3' + (submitted && !(update.price) ? ' has-error' : '')}>
                                <label htmlFor="price"><h3>Cena:</h3> </label>
                                <input type="text" className="form-control" name="price" value={update.price} onChange={this.handleChange} placeholder={advert.price}/>
                                {
                                    submitted && !update.price &&
                                    <div className="text-danger h6">Pole jest wymagane</div>
                                }

                                {
                                    (update.price > 100000000 || update.price < 0) &&
                                    <div className="text-danger h6">Możliwe wartości z przedziału 1 - 100.000.000</div>
                                }

                                {
                                    !(update.price > 1000 || update.price < 0) && !validationConstants.createAdvertisementValidation.test(update.price) && update.price &&
                                    <div className="text-danger h6">Podana wartość nie jest liczba</div>
                                }
                            </div>
                            <div className={'col-md-6 h5 my-3' + (submitted && !(update.phone) ? ' has-error' : '')}>
                                <label htmlFor="phone"><h3>Telefon:</h3> </label>
                                <input type="tel" className="form-control" name="phone" value={update.phone} onChange={this.handleChange} placeholder={advert.phone} pattern="[0-9]{9}"/>
                                {
                                    submitted && !update.phone &&
                                    <div className="text-danger h6">Pole jest wymagane</div>
                                }
                            </div>
                        </div>
                                    
                        <div className="row">
                            <div className={'col-md-12 h5 my-3'}>
                            <label htmlFor="photos"><h3>Zdjęcia:</h3> </label>
                            <div className="row">
                                {
                                    this.state.update.advertisementImages.map((fota, i) => 
                                    <div className="col-md-2 MyAdvert-maxheight-update">
                                        <img className="img-fluid pb-2 w-100 h-100" key={i} id={fota.path} src={("http://localhost:49396/images/" + fota.path)} alt={"avatar"} onClick={(id) => this.filterPhotos(id.target.id)}
                                    /></div>
                                )}
                                
                            </div>

                            </div>
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6">
                                    <button className="btn btn-primary btn-block mb-4">Aktualizuj</button>
                                </div>
                                <div className="col-md-6">
                                    <Link to="/" className="btn btn-link btn-block mb-4 border border-primary">Anuluj</Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}

export { MyAdvertisementUpdate };