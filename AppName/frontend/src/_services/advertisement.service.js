import { authHeader } from '../_helpers';

export const advertisementService = {
    sendAdvertisement,
    advDelete,
    advUpdate
};

function advDelete(id) {

    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return fetch(`http://localhost:49396/api/AdvertisementModels/${id}`, requestOptions).then(handleResponse);
}


function advUpdate(update, id) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(update)
    };

    return fetch(`http://localhost:49396/api/AdvertisementModels/${id}`, requestOptions).then(handleResponseDelete);
}

function sendAdvertisement(adv)
{
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(),'Content-Type': 'application/json'},
        body: JSON.stringify(adv)
    };
    return fetch(`http://localhost:49396/api/AdvertisementModels`, requestOptions).then(handleResponseDelete);
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);;
        if (data.succeeded === false) {
            if (response.status === 401) {
              // auto logout if 401 response returned from api
                logout();
                window.location.reload();
            }
            const error = data.errors.map((error) => error.description);
            return Promise.reject(error);
        }
        return data;
    });
}

function handleResponseDelete(response) {
    return response.text().then(text => {
        const data = text;
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}