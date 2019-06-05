import { userService } from '../_services';
import { history } from '../_helpers';
import { notify } from '../_components/Notifications';

export const userActions = {
    login,
    logout,
    register,
    newPassword,
    updateUser,
    getUser,
    delete: _delete,
    userMessage,
};

function login(userName, password) {
    userService.login(userName, password)
        .then(
            _user => {
                history.push('/');
                notify('Zalogowano do systemu!');
            },
            error => {
                notify(error);
            },
        );
}

function logout() {
    userService.logout();
}

function register(user) {
    userService.register(user)
        .then(
            _user => {
                history.push('/login');
                notify('Rejestracja przebiegła pomyślnie!');
            },
            error => {
                notify(error.toString());
            },
        );
}

function newPassword(pass)
{
    userService.newPassword(pass)
    .then(
        _pass => {
            history.push('/');
            notify('Zmiana hasła zakończona sukcesem');
        },
        _error =>
        {
            notify('Zmiana hasła niepowiodła się');
        },
  );
}

function updateUser(user)
{
    userService.updateUser(user)
    .then(
        _user => {
            history.push('/');
            notify('Aktualizacja profilu zakończona sukcesem');
        },
        error => {
            notify(error);
        },
    );
}

function userMessage(sendMessage) {
    userService.userMessage(sendMessage)
    .then(
        _message => {
            history.push('/');
            notify('Wiadomość została wysłana');
        },
        error => {
            notify(error);
        },
    );
}


function getUser() {
    userService.getUser();
}

function _delete() {
    userService.delete();
}


