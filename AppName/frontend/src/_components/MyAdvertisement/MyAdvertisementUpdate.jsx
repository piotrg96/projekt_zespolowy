import React from 'react';
import { Link } from 'react-router-dom';
import { advertisementActions } from '../../_actions';
import { Navbar } from '..';
import Notifications from '../Notifications';

const validation = RegExp(/^[0-9]*$/);

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
            },
        submitted: false,
        categories: [{}],
        cities: [{}],
        provinces: [{}],
        }; 

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount()
    {
        fetch(`http://localhost:49396/api/CategoryModels`)
        .then(res => res.json())
        .then(data => this.setState({
            categories: data
        }));

        fetch(`http://localhost:49396/api/CityModels`)
        .then(res => res.json())
        .then(data => this.setState({
            cities: data
        }));

        fetch(`http://localhost:49396/api/ProvinceModels`)
        .then(res => res.json())
        .then(data => this.setState({
            provinces: data
        }));

        this.setState(prevState => ({
            update: {
                ...prevState.update,
                id: this.props.location.state.id
            }
        }))
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { update } = this.state;
        this.setState({
            update: {
                ...update,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { update } = this.state;
        
        advertisementActions.advUpdate(update, update.id);
    }

    render() {
    const { update , submitted, cities, provinces, categories} = this.state;
    const { users, title, price, description, yardage, city, province, phone } = this.props.location.state;

    update.userName = users.userName;
    return(
        <div>
            <Notifications />
            <Navbar concreteUser={users}/>
            <div className="row my-5 px-3">
                <div className="col-md-12 m-auto py-5 px-5 border border-success rounded">               
                    <h2>Zaktualizuj Ogłoszenie</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'h2 mt-2' + (submitted && !(update.title) ? ' has-error' : '')}>
                            <label htmlFor="title">Tytuł: </label>
                            <input type="text" className="form-control" name="title" value={update.title} onChange={this.handleChange} placeholder={title}/>
                            {
                            submitted && !update.title &&
                            <div className="text-danger h6">To pole jest wymagane</div>
                            }
                            {
                            update.title.length > 40 &&
                            <div className="text-danger h6">Maksymalnie 40 znaków</div>
                            }
                        </div>
                        <div className="row">
                            <div className={'col-md-6 h5 my-3' + (submitted && !(update.categoryName) ? ' has-error' : '')}>
                                <label htmlFor="categoryName">Category: </label>
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
                                    <div className="text-danger">Pole jest wymagane</div>
                                }
                            </div>
                            <div className={"col-md-6 h5 my-3" + (submitted && !(update.yardage) ? ' has-error' : '')}>
                                <label htmlFor="yardage">Metraż: </label>
                                <input type="text" className="form-control" name="yardage" value={update.yardage} onChange={this.handleChange} placeholder={yardage}/>
                                {
                                submitted && !update.yardage &&
                                <div className="text-danger h6">To pole jest wymagane</div>
                                }
                                {
                                (update.yardage > 1000 || update.yardage < 0) &&
                                <div className="text-danger h6">Możliwe wartości z przedziału 1 - 1.000</div>
                                }
                                {
                                !(update.yardage > 1000 || update.yardage < 0) && !validation.test(update.yardage) && update.yardage &&
                                <div className="text-danger h6">Podana wartość nie jest liczba</div>
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className={'col-md-6 h5 my-3' + (submitted && !(update.provinceName) ? ' has-error' : '')}>
                                <label htmlFor="provinceName">Województwo: </label>
                                <select className="form-control" name="provinceName" value={update.provinceName} onChange={this.handleChange} placeholder={province}>
                                <option></option>
                                {
                                    provinces.map((province, i)=> (
                                        <option key={i} value={province.provinceName}>{province.provinceName}</option>  
                                    ))
                                }
                                </select>
                                {
                                    submitted && !update.provinceName &&
                                    <div className="text-danger">Pole jest wymagane</div>
                                }
                            </div>
                            <div className={'col-md-6 h5 my-3' + (submitted && !(update.cityName) ? ' has-error' : '')}>
                                <label htmlFor="cityName">Miasto: </label>
                                <select className="form-control" name="cityName" value={update.cityName} onChange={this.handleChange} placeholder={city}>
                                <option></option>
                                {
                                    cities.map((city, i)=> (
                                        <option key={i} value={city.cityName}>{city.cityName}</option>  
                                    ))
                                }
                            </select>
                                {
                                    submitted && !update.cityName &&
                                    <div className="text-danger">Pole jest wymagane</div>
                                }
                            </div>
                        </div>                
                        <div className={'h5' + (submitted && !(update.description) ? ' has-error' : '')}>
                            <label htmlFor="description">Opis: </label>
                            <textarea className="col-md-12 my-3 py-3" name="description" value={update.description} onChange={this.handleChange} placeholder={description} wrap="hard" maxLength="255"/>
                            {
                                submitted && !update.description &&
                                <div className="text-danger">Pole jest wymagane</div>
                            }
                        </div>
                        <div className="row">
                            <div className={'col-md-6 h5 my-3' + (submitted && !(update.price) ? ' has-error' : '')}>
                                <label htmlFor="price">Cena: </label>
                                <input type="text" className="form-control" name="price" value={update.price} onChange={this.handleChange} placeholder={price}/>
                                {
                                submitted && !update.price &&
                                <div className="text-danger h6">To pole jest wymagane</div>
                                }

                                {
                                (update.price > 100000000 || update.price < 0) &&
                                <div className="text-danger h6">Możliwe wartości z przedziału 1 - 100.000.000</div>
                                }

                                {
                                !(update.price > 1000 || update.price < 0) && !validation.test(update.price) && update.price &&
                                <div className="text-danger h6">Podana wartość nie jest liczba</div>
                                }

                            </div>
                            <div className={'col-md-6 h5 my-3' + (submitted && !(update.phone) ? ' has-error' : '')}>
                                <label htmlFor="phone">Telefon: </label>
                                <input type="tel" className="form-control" name="phone" value={update.phone} onChange={this.handleChange} placeholder={phone} pattern="[0-9]{9}"/>
                                {
                                    submitted && !update.phone &&
                                    <div className="text-danger">Pole jest wymagane</div>
                                }
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Aktualizuj</button>
                            <Link to="/" className="btn btn-link">Anuluj</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
    }
}

export { MyAdvertisementUpdate };