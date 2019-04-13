import { authHeader } from '../_helpers';

export const noticeService = {
    getAllNotice
};

function getAllNotice() {
    const requestOptions = {
        method: 'GET'
    };

    return fetch(`http://localhost:49396/api/AdvertisementModels`, requestOptions).then(handleResponse); 
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (data.succeeded == false) {
            if (response.status === 401) {
                location.reload(true);
            }
            const error = data.errors.map((error) => error.description);
            return Promise.reject(error);
        }
        return data;
    });
}

