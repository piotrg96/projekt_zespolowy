import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '..';
import Notifications from '../Notifications';
import { validationConstants } from './../../_constants';
import { advertisementService } from '../../_services';
import { advertisementActions } from './../../_actions';
import './MyAdvertisement.css'; 

class MyAdvertisementCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            adv: {
                title: '',
                description: '',
                price: 0,
                yardage: 0,
                phone: '',
                cityName: '',
                provinceName: '',
                categoryName: '',
                userName: '',
            },
            submitted: false,
            categories: [{}],
            cities: [{}],
            provinces: [{}],
        }       
        this.uploadForm = this.uploadForm.bind(this);
        this.filesOnChange = this.filesOnChange.bind(this);
        this.fieldOnChange = this.fieldOnChange.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
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
    }

    uploadForm(e) {
        e.preventDefault();
        let state = this.state;
        let form = new FormData();
        if(state.files !== undefined)
        {
            for (var index = 0; index < state.files.length; index++) {
                var element = state.files[index];
                form.append('file', element);
            }
        }
        for (var key in state.adv) {
            if (state.adv.hasOwnProperty(key)) {
                var elements = state.adv[key];
                form.append(key, elements);
            }
        }
        advertisementActions.advertisementSend(form);      
    }

    filesOnChange(sender) {
        let files = sender.target.files;
        let state = this.state;

        this.setState({
            ...state,
            files: files,
        });
    }

    fieldOnChange(sender) {
        let fieldName = sender.target.name;
        let value = sender.target.value;
        let state = this.state;
        this.setState({
            ...state,
            adv: {...state.adv, [fieldName]: value}
        });
    }

    handleOnClick = () => {
        this.setState({ submitted: true});
    }

    render() {
        const { users } = this.props.location.state;
        const { adv ,cities, provinces, categories, submitted } = this.state;
        adv.userName = users.userName;
        return (
            <div>
                <div className="sticky-top">
                    <Notifications/>
                    <Navbar concreteUser={users}/>
                </div>
                <form name="form" onSubmit={this.uploadForm}>

                    <div className="row my-5 px-3">
                        <div className={"col-md-12 m-auto pt-3 px-4 rounded MyAdvert-background"}>
                            <div className={"h2 mt-2"  + (submitted && !(adv.title) ? ' has-error ' : '')}> 
                                <h3>Tytuł</h3>
                                <input 
                                    name="title" 
                                    type="text" 
                                    className="form-control" 
                                    value={adv.title} 
                                    onChange={this.fieldOnChange} 
                                />
                                {
                                    submitted && !adv.title &&
                                    <div className="text-danger h6">To pole jest wymagane</div>
                                }
                                {
                                    adv.title.length > 40 &&
                                    <div className="text-danger h6">Maksymalnie 40 znaków</div>
                                }
                            </div>
                            <div className="row">
                                <div className={"col-md-6 h5 my-3" + (submitted && !(adv.categoryName) ? ' has-error ' : '') }>
                                  <h3>Kategoria</h3>
                                    <select className="form-control" name="categoryName" value={adv.categoryName} onChange={this.fieldOnChange}>
                                        <option></option>
                                        {
                                            categories.map((cat,i) => (
                                                <option key={i} value={cat.name}>{cat.name}</option> 
                                            ))
                                        }
                                    </select>
                                        {
                                            submitted && !adv.categoryName &&
                                            <div className="text-danger h6">To pole jest wymagane</div>
                                        }
                                </div>
                                <div className={"col-md-6 h5 my-3" + (submitted && !(adv.yardage) ? ' has-error ' : '') }>
                                <h3>Metraż</h3>
                                    <input type="number" className="form-control" name="yardage" value={adv.yardage} onChange={this.fieldOnChange}/>
                                    {
                                        submitted && !adv.yardage &&
                                        <div className="text-danger h6">To pole jest wymagane</div>
                                    }
                                    {
                                        (adv.yardage > 1000 || adv.yardage < 0) &&
                                        <div className="text-danger h6">Możliwe wartości z przedziału 1 - 1.000</div>
                                    }
                                    {
                                        !(adv.yardage > 1000 || adv.yardage < 0) && !validationConstants.createAdvertisementValidation.test(adv.yardage) && adv.yardage &&
                                        <div className="text-danger h6">Podana wartość nie jest liczba</div>
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className={"col-md-6 h5 my-3" + (submitted && !(adv.provinceName) ? 'has-error':'') }>
                                <h3>Województwo</h3>
                                    <select  className="form-control" name="provinceName" value={adv.provinceName} onChange={this.fieldOnChange}>
                                        <option></option>
                                        {
                                            provinces.map((province, i) => (
                                                <option key={i} value={province.name}>{province.provinceName}</option>  
                                            ))
                                        }
                                    </select>
                                        {
                                            submitted && !adv.provinceName &&
                                            <div className="text-danger h6">To pole jest wymagane</div>
                                        }
                                </div>
                                <div className={"col-md-6 h5 my-3" + (submitted && !(adv.cityName) ? ' has-error ' : '') }>
                                <h3>Miasto</h3> 
                                    <select className="form-control" name="cityName" value={adv.cityName} onChange={this.fieldOnChange}>
                                        <option></option>
                                        {
                                            cities.map((city, i)=> (
                                                <option key={i} value={city.cityName}>{city.cityName}</option>  
                                            ))
                                        }
                                    </select>
                                        {
                                            submitted && !adv.cityName &&
                                            <div className="text-danger h6">To pole jest wymagane</div>
                                        }
                                </div>
                            </div>
                            <div className={"h5" + (submitted && !(adv.description) ? ' has-error ' : '') }>
                            <h3>Opis</h3> 
                                <textarea className="col-md-12 my-3 py-3" name="description" value={adv.description} onChange={this.fieldOnChange} wrap="hard" maxLength="255" placeholder="maksymalnie 255 znaków"/>
                                {
                                    adv.description.length > 254 &&
                                    <div className="text-danger h6">Maksymalnie 255 znaków</div>
                                }
                            </div> 
                            <div className="row">
                                <div className={"col-md-6 h5 my-3"+(submitted && !(adv.price) ? ' has-error':'') }>
                                <h3>Cena</h3>
                                    <input  className="form-control" type="number" min="0" name="price" value={adv.price}onChange={this.fieldOnChange}/>
                                    {
                                        submitted && !adv.price &&
                                        <div className="text-danger h6">To pole jest wymagane</div>
                                    }
                                    {
                                        (adv.price > 100000000 || adv.price < 0) &&
                                        <div className="text-danger h6">Możliwe wartości z przedziału 1 - 100.000.000</div>
                                    }
                                    {
                                        !(adv.price > 1000 || adv.price < 0) && !validationConstants.createAdvertisementValidation.test(adv.price) && adv.price &&
                                        <div className="text-danger h6">Podana wartość nie jest liczba</div>
                                    }
                                </div>
                                <div className={"col-md-6 h5 my-3" + (submitted && !(adv.phone) ? ' has-error ' : '') }>
                                <h3>Tytuł</h3>
                                    <input className="form-control" type="tel" name="phone" value={adv.phone} onChange={this.fieldOnChange} pattern="[0-9]{9}"/>
                                    {
                                        submitted && !adv.phone &&
                                        <div className="text-danger h6">To pole jest wymagane</div>
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                <h3>Kliknij, aby dodać zdjęcia</h3>
                                    <input class="col-md-12 MyAdvert-files" type="file" onChange={this.filesOnChange} multiple/>
                                     <p><b>{this.state.formServiceResponse}</b></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                            <div className="col-md-6">
                                <button className="btn btn-primary btn-block mb-4" type="text" onClick={this.handleOnClick}>Dodaj Ogłoszenie</button>
                            </div>
                            <div className="col-md-6">
                                <Link to="/" className="btn btn-link btn-block mb-4">Anuluj</Link>
                            </div>
                        </div>
                </form>
            </div>
        );
    }
}

export { MyAdvertisementCreate };
