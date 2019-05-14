import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '..';
import { advertisementActions } from '../../_actions';
import Notifications from '../Notifications';
import axios from 'axios';
import { history } from '../../_helpers';
import {default as UUID} from "node-uuid";

const validation = RegExp(/^[0-9]*$/);

class MyAdvertisementCreate extends React.Component {

    constructor(props)
    {
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
                FrontId: ''
            },
            submitted:false,

            categories: [{}],
            cities: [{}],
            provinces: [{}],

            justFileServiceResponse: 'Click to upload!',
            formServiceResponse: 'Click to upload the form!',
            fields: {}
        };

        this.filesOnChange = this.filesOnChange.bind(this);
        this.fieldOnChange = this.fieldOnChange.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() 
    {
        const { adv } = this.state;
        this.setState({
            adv: {
                ...adv,
                FrontId: UUID.v4()
            }
        })
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

    }

    handleChange(e) 
    {
        const { name, value } = e.target;
        const { adv } = this.state;
        this.setState({
            adv: {
                ...adv,
                [name]: value
            }
        });
    }

    handleSubmit(e) 
    {
        e.preventDefault();
        this.setState({ submitted: true });
        const { adv } = this.state;
        advertisementActions.sendAdvertisement(adv);
        const idee = this.state.adv.FrontId;

        let state = this.state;
        
        if(state.files !== undefined)
        {
            for (var index = 0; index < state.files.length; index++) {
                var element = this.state.files[index];
                let form = new FormData();
                form.append('file', element, idee);
                axios.post(`http://localhost:49396/api/AdvertisementModels/PostImages`, form);
            }
        }
        history.push('/');
    }

    filesOnChange(sender) {
        let files = sender.target.files;
        let state = this.state;
    
        this.setState({
            ...state,
            files: files
        });
    }
    
    fieldOnChange(sender) {
        let fieldName = sender.target.name;
        let value = sender.target.value;
        let state = this.state;
    
        this.setState({
            ...state,
            fields: {...state.fields, [fieldName]: value}
        });
    }
    
    render() {
    
    const { users } = this.props.location.state;
    const { adv ,cities, provinces, categories, submitted } = this.state;
    adv.userName = users.userName;
    return (
        <div>
            {console.log(this.state.adv.FrontId)}
            <Notifications/>
            <Navbar concreteUser={users}/>
           
            <form name="form" onSubmit={this.handleSubmit}>
            <div className="row my-5 px-3">

                <div className={"col-md-12 border border-success rounded"}>

                    <div className={"h2 mt-2"  + (submitted && !(adv.title) ? ' has-error ' : '')}>
                        Tytuł
                        <input type="text" className="form-control" name="title" value={adv.title} onChange={this.handleChange}/>
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
                            Kategoria
                            <select className="form-control" name="categoryName" value={adv.categoryName} onChange={this.handleChange}>
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
                            Metraż
                            <input type="number" className="form-control" name="yardage" value={adv.yardage} onChange={this.handleChange}/>
                            {
                                submitted && !adv.yardage &&
                                <div className="text-danger h6">To pole jest wymagane</div>
                            }
                            {
                                (adv.yardage > 1000 || adv.yardage < 0) &&
                                <div className="text-danger h6">Możliwe wartości z przedziału 1 - 1.000</div>
                            }
                            {
                                !(adv.yardage > 1000 || adv.yardage < 0) && !validation.test(adv.yardage) && adv.yardage &&
                                <div className="text-danger h6">Podana wartość nie jest liczba</div>
                            }
                        </div>
                        
                    </div>

                    <div className="row">
                        <div className={"col-md-6 h5 my-3" + (submitted && !(adv.provinceName) ? 'has-error':'') }>
                        Województwo
                            <select  className="form-control" name="provinceName" value={adv.provinceName} onChange={this.handleChange}>
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
                            Miasto 
                            <select className="form-control" name="cityName" value={adv.cityName} onChange={this.handleChange}>
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
                        Opis: 
                        <textarea className="col-md-12 my-3 py-3" name="description" value={adv.description} onChange={this.handleChange} wrap="hard" maxLength="255" placeholder="maksymalnie 255 znaków"/>
                        {
                            adv.description.length > 254 &&
                            <div className="text-danger h6">Maksymalnie 255 znaków</div>
                        }
                    </div> 

                    <div className="row">
                        <div className={"col-md-6 h5 my-3"+(submitted && !(adv.price) ? ' has-error':'') }>
                            Cena 
                            <input  className="form-control" type="number" min="0" name="price" value={adv.price} onChange={this.handleChange}/>
                            {
                                submitted && !adv.price &&
                                <div className="text-danger h6">To pole jest wymagane</div>
                            }
                            {
                                (adv.price > 100000000 || adv.price < 0) &&
                                <div className="text-danger h6">Możliwe wartości z przedziału 1 - 100.000.000</div>
                            }
                            {
                                !(adv.price > 1000 || adv.price < 0) && !validation.test(adv.price) && adv.price &&
                                <div className="text-danger h6">Podana wartość nie jest liczba</div>
                            }
                        </div>
                        <div className={"col-md-6 h5 my-3" + (submitted && !(adv.phone) ? ' has-error ' : '') }>
                            Telefon
                            <input className="form-control" type="tel" name="phone" value={adv.phone} onChange={this.handleChange} pattern="[0-9]{9}"/>
                            {
                                submitted && !adv.phone &&
                                <div className="text-danger h6">To pole jest wymagane</div>
                            }
                        </div>
                    </div>

                    <div className="form-group mt-4">
                        <label htmlFor="exampleFormControlFile1">Dodaj zdjęcia:</label><br/>
                            <input type="file" id="case-one" onChange={this.filesOnChange} files="true" multiple/>
                    </div>
                </div>
            </div>

            <button  className="btn btn-primary btn-block py-1 mb-3">Utwórz</button>
            <Link to="/" className="btn btn-primary btn-block py-1 mb-3">Anuluj</Link>
            </form>
        </div>
    );}
}

export { MyAdvertisementCreate };