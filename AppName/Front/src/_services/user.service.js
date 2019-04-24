import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    newpass,
    update,
    sendAdvertisement,
    delete: _delete
};

function login(userName, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password })
    };

    return fetch(`http://localhost:49396/api/ApplicationUser/Login`, requestOptions)
        .then(handleResponseLogin)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`http://localhost:49396/api/UserProfile`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`http://localhost:49396/api/UserProfile/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`http://localhost:49396/api/ApplicationUser/Register`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`http://localhost:49396/api/UserProfile/Update`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete() {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`http://localhost:49396/api/UserProfile/Delete`, requestOptions).then(handleResponseDelete);
}

function newpass(pass)
{
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(pass)
    };
    return fetch(`http://localhost:49396/api/UserProfile/ChangePassword`, requestOptions).then(handleResponse);
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

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (data.succeeded == false) {
            if (response.status === 401) {
              // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            const error = data.errors.map((error) => error.description);
            return Promise.reject(error);
        }
        return data;
    });
}



function handleResponseLogin(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
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
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}