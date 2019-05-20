import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '..';
import { advertisementActions } from '../../_actions';
import Notifications from '../Notifications';
import axios from 'axios';

const validation = RegExp(/^[0-9]*$/);

class MyAdvertisementCreate extends Component {
    constructor(props) {
        super(props);

        this.uploadForm = this.uploadForm.bind(this);
        this.filesOnChange = this.filesOnChange.bind(this);
        this.fieldOnChange = this.fieldOnChange.bind(this);

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

            justFileServiceResponse: 'Click to upload!',
            formServiceResponse: 'Click to upload the form!',
            fields: {}
        }
        
        this.uploadForm = this.uploadForm.bind(this);
        this.filesOnChange = this.filesOnChange.bind(this);
        this.fieldOnChange = this.fieldOnChange.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
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

    uploadForm(e) {
        e.preventDefault();
        let state = this.state;

        this.setState({
            ...state,
            formServiceResponse: 'Please wait'
        });

        if (!state.hasOwnProperty('files')) {
            this.setState({
                ...state,
                formServiceResponse: 'First select a file!'
            });
            return;
        }

        let form = new FormData();
        for (var index = 0; index < state.files.length; index++) {
            var element = state.files[index];
            form.append('file', element);
        }

        for (var key in state.fields) {
            if (state.fields.hasOwnProperty(key)) {
                var element1 = state.fields[key];
                form.append(key, element1);
            }
        }

        axios.post(`http://localhost:49396/api/AdvertisementModels/Uploader`, form)
            .then((result) => {
                let message = "Success!"
                if (!result.data.success) {
                    message = result.data.message;
                }
                this.setState({
                    ...state,
                    formServiceResponse: message
                });
            })
            .catch((ex) => {
                console.error(ex);
            });
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

    handleOnClick = () => {
        this.setState({ submitted: true})
    }

    render() {

        const { users } = this.props.location.state;
        const { adv ,cities, provinces, categories, submitted } = this.state;
        adv.userName = users.userName;

        return (
            <div>
                <Notifications/>
                <Navbar concreteUser={users}/>
                <form>
                    <h2>Form</h2>
                    <p><b>{this.state.formServiceResponse}</b></p>
                    <div>
                        <input name="title" type="text" placeholder="title" onChange={this.fieldOnChange} />
                    </div>
                    <div>
                        <input name="categoryName" type="text" placeholder="category name" onChange={this.fieldOnChange} />
                    </div>
                    <div>
                        <input name="cityName" type="text" placeholder="city name" onChange={this.fieldOnChange} />
                    </div>
                    <div>
                        <input name="provinceName" type="text" placeholder="province name" onChange={this.fieldOnChange} />
                    </div>
                    <div>
                        <input name="description" type="text" placeholder="description" onChange={this.fieldOnChange} />
                    </div>
                    <div>
                        <input name="price" type="text" placeholder="price" onChange={this.fieldOnChange} />
                    </div>
                    <div>
                        <input name="yardage" type="text" placeholder="yardage" onChange={this.fieldOnChange} />
                    </div>
                    <div>
                        <input name="phone" type="text" placeholder="phone" onChange={this.fieldOnChange} />
                    </div>
                    <div>
                        <input name="userName" type="text" placeholder="user name" onChange={this.fieldOnChange} />
                    </div>
                    <input type="file" onChange={this.filesOnChange} multiple/>
                    <br />
                    <button type="text" onClick={this.uploadForm}>Upload form </button>
                </form>
            </div>
        );
    }
}

export { MyAdvertisementCreate };
