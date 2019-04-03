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
                    dispatch(alertActions.error(error.toString()));
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
                    dispatch(alertActions.success('Registration successful'));
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
                dispatch(alertActions.success('Password changed successfully'));
              },
              error =>
              {
                  dispatch(failure(error.toString()));
                  dispatch(alertActions.error(error.toString()));
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
                dispatch(alertActions.success('User update successfully'));
            },
            error =>
            {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
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
            //  .then(data => this.setState({
            //     user: data
            //   }))
            
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete() {
    return dispatch => {
        dispatch(request());

        userService.delete()
            .then(
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.DELETE_REQUEST } }
    function success() { return { type: userConstants.DELETE_SUCCESS } }
    function failure(error) { return { type: userConstants.DELETE_FAILURE, error } }
}