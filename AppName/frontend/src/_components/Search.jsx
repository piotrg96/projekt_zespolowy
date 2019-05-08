import React from 'react';
import { Link } from 'react-router-dom';
import { advertisementActions } from '../_actions';

class Search extends React.Component {

    constructor(props)
    {
        super(props);

        this.state = {
            
            sorting: {
            sort: '',
            order: '',
            city: '',
            province: '',
            category: '',
            search: '',
            minprice: '',
            maxprice: '',
            minyar: '',
            maxyar: '',
            },
            submitted: false,
            cities: [{}],
            categories: [{}],
            provinces: [{}]
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

    }

    
    handleChange(e) 
    {
        const { name, value } = e.target;
        const { sorting } = this.state;
        this.setState({
            sorting: {
                ...sorting,
                [name]: value
            }
        });
    }

    handleSubmit(e) 
    {
        e.preventDefault();
        const {sorting} = this.state;
        advertisementActions.advertisementSearch(sorting);
    }
    

    render() {
        const {sorting, cities, categories, provinces} = this.state;
 
    return (    
        <div className="bg-secondary mt-4 py-1 rounded">
            <div className="px-5 py-4">
                <h4>Wyszukaj ogłoszenie</h4>
                <form className="form" onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="col-md-12 mb-3">
                            <label htmlFor="search">Tytuł</label>
                            <input type="text" className="form-control" id="search" name="search" value={sorting.search} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-6 mb-3">
                           Województwo
                            <select className="form-control" name="province" value={sorting.province} onChange={this.handleChange}>
                            <option></option>
                            {
                               provinces.map((province,i) => (
                                   <option key={i} value={province.provinceName}>{province.provinceName}</option>
                               ))
                            }
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            Miasto
                            <select className="form-control" name="city" value={sorting.city} onChange={this.handleChange}>
                            <option></option>
                            {
                               cities.map((city,i) => (
                                   <option key={i} value={city.cityName}>{city.cityName}</option>
                               ))
                            }
                            </select>
                        </div>
                    </div>
                        <div className="form-row">
                        <div className="col-md-6 py-2">
                        Kategoria
                           <select className="form-control" name="category" value={sorting.category} onChange={this.handleChange}>
                           <option></option>
                           {
                               categories.map((cat,i) => (
                                   <option key={i} value={cat.name}>{cat.name}</option>
                               ))
                           }
                           </select>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="minprice">Cena od</label>
                            <input type="text" className="form-control" name="minprice"  placeholder="cena od" value={sorting.minprice} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="maxprice">Cena do</label>
                            <input type="text" className="form-control" name="maxprice"  placeholder="cena do" value={sorting.maxprice} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-3 mb-3">
                            <label htmlFor="minyar">Metraż od</label>
                            <input type="text" className="form-control" name="minyar" placeholder="metraż od" value={sorting.minyar} onChange={this.handleChange}/>
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="maxyar">Metraż do</label>
                            <input type="text" className="form-control" name="maxyar" placeholder="metraż do" value={sorting.maxyar} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-6 mb-3 mt-3 py-4">
                            <label htmlFor="sortBy" className="mr-2 text-light">Sortuj według:</label>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input inlineRadioOptions" 
                                type="radio" 
                                name="sort" 
                                id="price"
                                defaultChecked={sorting.sort === "price"}
                                value="price"
                                onChange={this.handleChange}
                                />
                                <label className="form-check-label">Cena</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input inlineRadioOptions" 
                                type="radio" 
                                name="sort" 
                                id="yardage"
                                defaultChecked={sorting.sort === "yardage"}
                                value="yardage"
                                onChange={this.handleChange}
                                />
                                <label className="form-check-label">Metraż</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input inlineRadioOptions"
                                type="radio"
                                name="sort"
                                id="date" 
                                defaultChecked={sorting.sort === "date"}
                                value="date"
                                onChange={this.handleChange}
                                />
                                <label className="form-check-label">Data</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input inlineRadioOptions" 
                                type="radio" 
                                name="order"
                                id="ascending"
                                defaultChecked={sorting.order === "ascending"}
                                value="ascending"
                                onChange={this.handleChange}
                                />
                                <label className="form-check-label">&uarr;</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input inlineRadioOptions" 
                                type="radio" 
                                name="order"
                                id="descending"
                                defaultChecked={sorting.order === "descending"}
                                value="descending"
                                onChange={this.handleChange}
                                />
                                <label className="form-check-label">&darr;</label>
                            </div>
                        </div>
                     </div>
                    <Link to="/" className="btn btn-primary" onClick={this.handleSubmit}>Wyszukaj</Link>
                </form>
            </div>
        </div>
    );
    }
}

export { Search };