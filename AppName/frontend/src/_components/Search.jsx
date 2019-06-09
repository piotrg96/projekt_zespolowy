import React from 'react';
import { advertisementService } from '../_services';
import FaAngleDoubleDown from 'react-icons/lib/fa/angle-double-down';
import FaAngleDoubleUp from 'react-icons/lib/fa/angle-double-up';
import './Search.css';
class Search extends React.Component {

    constructor(props) {
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
            arrow: true,
            submitted: false,
            cities: [{}],
            categories: [{}],
            provinces: [{}],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    componentDidMount() {
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
    
    handleChange(e) {
        const { name, value } = e.target;
        const { sorting } = this.state;
        this.setState({
            sorting: {
                ...sorting,
                [name]: value,
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch(`http://localhost:49396/api/Advertisements/sort?category=${this.state.sorting.category}&city=${this.state.sorting.city}&province=${this.state.sorting.province}&search=${this.state.sorting.search}&sort=${this.state.sorting.sort}&order=${this.state.sorting.order}&maxprice=${this.state.sorting.maxprice}&minprice=${this.state.sorting.minprice}&maxyar=${this.state.sorting.maxyar}&minyar=${this.state.sorting.minyar}`)
        .then(date => date.json())
        .then(res => this.props.onSubmit(res));
    }

    handleToggleClick = () => {
        console.log(this.state.arrow);
        this.setState(prevState => ({
            arrow: !prevState.arrow
        }));
    }

    render() {
        const {sorting, cities, categories, provinces } = this.state;
    
    return (    
        <div className="mt-4 py-1 rounded">
            <div className="px-3 py-4">
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="col-md-12 mb-3 py-2">
                            <input type="text" className="form-control" id="search" placeholder="Czego szukasz?" name="search" value={sorting.search} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="collapse" id="collapseExample">
                    <div className="form-row">
                        <div className="col-md-6 mb-3">
                            <select className="form-control" name="province" value={sorting.province} onChange={this.handleChange}>
                            <option>Województwo</option>
                            {
                               provinces.map((province,i) => (
                                   <option key={i} value={province.provinceName}>{province.provinceName}</option>
                               ))
                            }
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <select className="form-control" name="city" value={sorting.city} onChange={this.handleChange}>
                            <option>Miejscowość</option>
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
                           <select className="form-control" name="category" value={sorting.category} onChange={this.handleChange}>
                           <option>Kategoria</option>
                           {
                               categories.map((cat,i) => (
                                   <option key={i} value={cat.name}>{cat.name}</option>
                               ))
                           }
                           </select>
                        </div>
                        <div className="col-md-3 mb-3 py-2">
                            <input type="text" className="form-control" name="minprice"  placeholder="Cena od" value={sorting.minprice} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-3 mb-3 py-2">
                            <input type="text" className="form-control" name="maxprice"  placeholder="Cena do" value={sorting.maxprice} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-3 mb-3">
                            <input type="text" className="form-control" name="minyar" placeholder="Metraż od" value={sorting.minyar} onChange={this.handleChange}/>
                        </div>
                        <div className="col-md-3 mb-3">
                            <input type="text" className="form-control" name="maxyar" placeholder="Metraż do" value={sorting.maxyar} onChange={this.handleChange} />
                        </div>
                        <div className="col-md-6 mb-3 py-2">
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
                        </div>          </div>    
                    <input type="submit" className="searchbtn form-group btn" value="Wyszukaj" />
                    <a className="arrow btn btn-success col-md-12" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="multiCollapseExample1" onClick={this.handleToggleClick}>{this.state.arrow ? <FaAngleDoubleDown size={32} /> : <FaAngleDoubleUp size={32} />}</a>
                </form>
            </div>
        </div>
        );
    }
}

export { Search };