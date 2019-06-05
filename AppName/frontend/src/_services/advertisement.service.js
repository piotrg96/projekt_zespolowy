import { authHeader } from '../_helpers';
import { userService } from './../_services';
import axios from 'axios';

export const advertisementService = {
    sendAdvertisement,
    advDelete,
    advUpdate,
    advertisementSearch,
    getCategory,
    getCity,
    getProvince,
    getMyAdvertisement,
    getAdvertisement
};

function advDelete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };
    return fetch(`http://localhost:49396/api/AdvertisementModels/${id}`, requestOptions).then(handleResponse);
}

function advUpdate(update, id) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(update),
    };
    return fetch(`http://localhost:49396/api/AdvertisementModels/${id}`, requestOptions).then(handleResponsee);
}

function sendAdvertisement(adv) {
    return axios.post(`http://localhost:49396/api/AdvertisementModels/Uploader`, adv);
}

function advertisementSearch() {
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader(),  'Content-Type' : 'application/json'},
    }
    return fetch(`http://localhost:49396/api/AdvertisementModels/sort`, requestOptions).then(handleResponse);
}

function getCategory() {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`http://localhost:49396/api/CategoryModels`, requestOptions);
}

function getCity() {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`http://localhost:49396/api/CityModels`, requestOptions);
}

function getProvince() {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`http://localhost:49396/api/ProvinceModels`, requestOptions);
}

function getMyAdvertisement(userName) {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`http://localhost:49396/api/AdvertisementModels/myAds?username=${userName}`, requestOptions);
}

function getAdvertisement() {
    const requestOptions = {
        method: 'GET'
    };
    return fetch(`http://localhost:49396/api/AdvertisementModels`, requestOptions);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (data.succeeded === false) 
        {
            if (response.status === 401) 
            {
                userService.logout();
                window.location.reload();
            }
            const error = data.errors.map((error) => error.description);
            return Promise.reject(error);
        }
        return data;
    });
}

function handleResponsee(response) {
    return response.text().then(text => {
        const data = text;
        if (!response.ok) 
        {
            if (response.status === 401) 
            {
                userService.logout();
                window.location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}