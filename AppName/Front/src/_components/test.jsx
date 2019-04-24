import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar } from './../_components';
import { userActions } from '../_actions';

class AdvertisementCreate extends React.Component {

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
                userName: ''
            },
            submitted:false,

            categories: [{}],
            cities: [{}],
            provinces: [{}],
        
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount()
    {
        fetch(http://localhost:49396/api/CategoryModels)
        .then(res => res.json())
        .then(data => this.setState({
            categories: data
        })),

        fetch(http://localhost:49396/api/CityModels)
        .then(res => res.json())
        .then(data => this.setState({
            cities: data
        })),

        fetch(http://localhost:49396/api/ProvinceModels)
        .then(res => res.json())
        .then(data => this.setState({
            provinces: data
        }))

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
        const { dispatch } = this.props; 
     
    
         dispatch(userActions.sendAdvertisement(adv));
    }


    render() {
    
    const { users } = this.props.location.state;
    const { adv ,cities, provinces, categories, submitted } = this.state;
    adv.userName = users.userName;
    return (
        <div>
            <Navbar concreteUser={users}/>
           
            <form name="form" onSubmit={this.handleSubmit}>
            <div className="row my-5 px-3">

                <div className={"col-md-12 border border-success rounded"}>

                <div className={"h2 mt-2"  + (submitted && !(adv.title) ? ' has-error ' : '')}>
                Title
                    <input type="text" className="form-control" name="title" value={adv.title} onChange={this.handleChange}/>
                    {
                        submitted && !adv.title &&
                        <div className="text-danger">Title is required</div>
                    }
                </div>

                <div className="row">

                    <div className={"col-md-6 h5 my-3" + (submitted && !(adv.categoryName) ? ' has-error ' : '') }>
                        Category
                        <select className="form-control" name="categoryName" value={adv.category} onChange={this.handleChange}>
                            <option></option>
                            {
                                categories.map((cat,i) => (
                                    <option key={i} value={cat.name}>{cat.name}</option> 
                                ))
                            }
                        </select>
                    </div>

                    <div className={"col-md-6 h5 my-3" + (submitted && !(adv.yardage) ? ' has-error ' : '') }>
                    Yardage
                        <input type="number" className="form-control" name="yardage" min="1" max="1000" value={adv.yardage} onChange={this.handleChange}/>
                        {
                            submitted && !adv.yardage &&
                            <div className="text-danger">Yardage is required</div>
                        }
                    </div>
                    
                </div>

                <div className="row">
                    <div className={"col-md-6 h5 my-3" + (submitted && !(adv.provinceName) ? 'has-error':'') }>
                    Province:
                        <select  className="form-control" name="provinceName" value={adv.provinceName} onChange={this.handleChange}>
                            <option></option>
                            {
                                provinces.map((province, i) => (
                                    <option key={i} value={province.name}>{province.provinceName}</option>  
                                ))
                            }
                        </select>
                    </div>
                    <div className={"col-md-6 h5 my-3" + (submitted && !(adv.cityName) ? ' has-error ' : '') }>
                    City: 
                        <select className="form-control" name="cityName" value={adv.cityName} onChange={this.handleChange}>
                            <option></option>
                            {
                                cities.map((city, i)=> (
                                    <option key={i} value={city.cityName}>{city.cityName}</option>  
                                ))
                            }
                        </select>
                    </div>
                </div>
                
                <div className={"h5" + (submitted && !(adv.description) ? ' has-error ' : '') }>description: 
                    <textarea className="col-md-12 my-3 py-3" name="description" value={adv.description} onChange={this.handleChange} wrap="hard" maxLength="255" placeholder="max length 255 characterts"/>
                    {
                        submitted && !adv.description &&
                        <div className="text-danger">Description is required</div>
                    }
                </div> 

                <div className="row">
                    <div className={"col-md-6 h5 my-3"+(submitted && !(adv.price) ? 'has-error':'') }>
                        Price: 
                        <input  className="form-control" type="number" min="0" max="999999" name="price" value={adv.price} onChange={this.handleChange}/>
                        {
                            submitted && !adv.price &&
                            <div className="text-danger">Price is required</div>
                        }
                    </div>
                    <div className={"col-md-6 h5 my-3" + (submitted && !(adv.phone) ? ' has-error ' : '') }>
                        Phone:
                        <input className="form-control" type="tel" name="phone" value={adv.phone} onChange={this.handleChange} pattern="[0-9]{9}" required/>
                        {
                            submitted && !adv.phone &&
                            <div className="text-danger">Phone is required</div>
                        }
                    </div>
                </div>

                <div class="form-group mt-4">
                    <label htmlFor="exampleFormControlFile1">Dodaj zdjęcia:</label>
                    <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
                </div>
                </div>
                
                
            </div>
            <button className="btn btn-primary btn-block py-1 mb-3">Utwórz</button>
            <Link to="/" className="btn btn-primary btn-block py-1 mb-3">Anuluj</Link>
            </form>
        </div>
    );}
}

function mapStateToProps(state) {
    const { users, AdvertisementCreate} = state;
    return {
        users,
        AdvertisementCreate
    };
}

const connectedAdvertisementCreate = connect(mapStateToProps)(AdvertisementCreate);
export { connectedAdvertisementCreate as AdvertisementCreate };