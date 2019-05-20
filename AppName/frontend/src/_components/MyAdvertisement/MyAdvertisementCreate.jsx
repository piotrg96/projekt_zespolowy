import React, { Component } from 'react';
import axios from 'axios';


class MyAdvertisementCreate extends Component {
    constructor(props) {
        super(props);

        this.uploadForm = this.uploadForm.bind(this);
        this.filesOnChange = this.filesOnChange.bind(this);
        this.fieldOnChange = this.fieldOnChange.bind(this);

        this.state = {
            justFileServiceResponse: 'Click to upload!',
            formServiceResponse: 'Click to upload the form!',
            fields: {}
        }
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

    render() {
        return (
            <div>
                <form>
                    <h2>Form</h2>
                    <p><b>{this.state.formServiceResponse}</b></p>
                    <div>
                        <input name="firstName" type="text" placeholder="First name" onChange={this.fieldOnChange} />
                    </div>
                    <div>
                        <input name="lastName" type="text" placeholder="Last name" onChange={this.fieldOnChange} />
                    </div>
                    <div>
                        <input name="phoneNumber" type="text" placeholder="Phone number" onChange={this.fieldOnChange} />
                    </div>
                    <input type="file" onChange={this.filesOnChange} />
                    <br />
                    <button type="text" onClick={this.uploadForm}>Upload form </button>
                </form>
            </div>
        );
    }
}

export { MyAdvertisementCreate };
