import { advertisementService } from '../_services';
import { history } from '../_helpers';
import { notify } from '../_components/Notifications';

export const advertisementActions = {
    sendAdvertisement,
    advDelete,
    advUpdate,
    advertisementSearch
};

function advUpdate(update)
{
    advertisementService.advUpdate(update, update.id)
    .then(
        _update => {
            history.push('/');
            notify('Aktualizacja ogłoszenia zakończona sukcesem');
        },
        _error =>
        {
            notify('Aktualizacja ogłoszenia niepowiodła się');
        }
  );
}

function sendAdvertisement(adv) {
    advertisementService.sendAdvertisement(adv)
    .then(
        _adv => {
            //history.push('/');
            notify('Dodanie ogłoszenia zakończone sukcesem');
        },
        _error => {
           notify('Dodanie ogłoszenia niepowiodło się');
        }
    );
}

function advertisementSearch(sorting)
{
    advertisementService.advertisementSearch(sorting)
}

function advDelete(id) {
    advertisementService.advDelete(id);
    history.push('/');
}