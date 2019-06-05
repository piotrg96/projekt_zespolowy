import { advertisementService } from '../_services';
import { history } from '../_helpers';
import { notify } from '../_components/Notifications';

export const advertisementActions = {
    advDelete,
    advUpdate,
    advertisementSearch,
    advertisementSend 
};

function advUpdate(update) {
    advertisementService.advUpdate(update, update.id)
    .then(
        _update => {
            history.push('/');
            notify('Aktualizacja ogłoszenia zakończona sukcesem');
        },
        _error => {
            notify('Aktualizacja ogłoszenia nie powiodła się');
        },
  );
}

function advertisementSend(advert) {
    advertisementService.sendAdvertisement(advert)
    .then(
        _update => {
            history.push('/');
            notify('Dodanie ogłoszenia zakończona sukcesem');
        },
        _error => {
            notify('Dodanie ogłoszenia nie powiodło się');
        },
  );
}

function advertisementSearch(sorting) {
    advertisementService.advertisementSearch(sorting);
}

function advDelete(id) {
    advertisementService.advDelete(id);
    history.push('/');
}