import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getUser,
    getById,
    newPassword,
    updateUser,
    delete: _delete,
    userMessage,
};

function login(userName, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, password }),
    };

    return fetch(`http://localhost:49396/api/ApplicationUser/Login`, requestOptions)
        .then(handleResponseLogin)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    localStorage.removeItem('user');
}

function getUser() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetch(`http://localhost:49396/api/UserProfile`, requestOptions);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetch(`http://localhost:49396/api/UserProfile/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    };
    return fetch(`http://localhost:49396/api/ApplicationUser/Register`, requestOptions).then(handleResponse);
}

function updateUser(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    };
    return fetch(`http://localhost:49396/api/UserProfile/Update`, requestOptions).then(handleResponse);
}

function _delete() {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
    };
    return fetch(`http://localhost:49396/api/UserProfile/Delete`, requestOptions).then(handleResponseDelete);
}

function newPassword(password)
{
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(password),
    };
    return fetch(`http://localhost:49396/api/UserProfile/ChangePassword`, requestOptions).then(handleResponse);
}

function userMessage(sendMessage) {
    const requestOptions = {
        method: 'POST',
        headers: {...authHeader(), 'Content-Type' : 'application/json' },
        body: JSON.stringify(sendMessage),
    }
    return fetch(`http://localhost:49396/api/MessageModels`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);;
        if (data.succeeded === false) 
        {
            if (response.status === 401) 
            {
                logout();
                window.location.reload();
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
        if (!response.ok) 
        {
            if (response.status === 401) 
            {
                logout();
                window.location.reload(true);
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
        if (!response.ok) 
        {
            if (response.status === 401) 
            {
                logout();
                window.location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}