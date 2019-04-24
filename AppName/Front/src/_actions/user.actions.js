import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    newpass,
    update,
    getAll,
    sendAdvertisement,
    delete: _delete
};

function login(userName, password) {
    return dispatch => {
        dispatch(request({ userName }));

        userService.login(userName, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error('Nieprawidłowy login lub hasło'));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                _user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Rejestracja zakończona sukcesem'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function newpass(pass)
{
    return dispatch => {
        dispatch(request(pass));
    
    userService.newpass(pass)
        .then(
              pass => {
                dispatch(success(pass)),
                dispatch(alertActions.success('Zmiana hasła zakończona sukcesem'));
              },
              error =>
              {
                dispatch(alertActions.error('Zmiana hasła niepowiodła się'));
              }
        );
    }
    function request(pass) { return { type: userConstants.PASSCHANGE_REQUEST, pass } }
    function success(pass) { return { type: userConstants.PASSCHANGE_SUCCESS, pass } }
    function failure(error) { return { type: userConstants.PASSCHANGE_FAILURE, error } }
}

function update(user)
{
    return dispatch => {
        dispatch(request(user));
    
    userService.update(user)
        .then(
            user => 
            {
                dispatch(success(user)),
                dispatch(alertActions.success('Aktualizacja profilu zakończona sukcesem'));
            },
            error =>
            {
                dispatch(alertActions.error('Aktualizacja profilu niepowiodła się'));
            }
        );
    }
    function request(user) { return { type: userConstants.UPDATE_REQUEST, user } }
    function success(user) { return { type: userConstants.UPDATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());
        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString())) 
            )
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function sendAdvertisement(adv) {
    return dispatch => {
        dispatch(request(adv));
        userService.sendAdvertisement(adv)
            .then(
                _adv => {
                    dispatch(alertActions.success('Dodanie ogłoszenia zakończone sukcesem'));
                },
                error => {
                    dispatch(alertActions.error('Dodanie ogłoszenia niepowiodło się'));
                }
            );
    };
    function request(adv) { return { type: userConstants.ADVERTISEMENT_REQUEST, adv } }
    function success(adv) { return { type: userConstants.ADVERTISEMENT_SUCCESS, adv } }
    function failure(error) { return { type: userConstants.ADVERTISEMENT_FAILURE, error } }
}


function _delete() {
    return dispatch => {
        dispatch(request());

        userService.delete();
    };

    function request() { return { type: userConstants.DELETE_REQUEST } }
}

