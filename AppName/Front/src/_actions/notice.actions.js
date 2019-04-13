import { noticeConstants } from '../_constants';
import { noticeService } from '../_services';

export const noticeActions = {
    getAllNotice,
};

function getAllNotice() {
    return dispatch => {
        dispatch(request());
        noticeService.getAllNotice()
            .then(
                notices => dispatch(success(notices)),
                error => dispatch(failure(error.toString()))
            ) 
    };

    function request() { return { type: noticeConstants.GETALLNOTICE_REQUEST} }
    function success(notices) { return { type: noticeConstants.GETALLNOTICE_SUCCESS, notices } }
    function failure(error) { return { type: noticeConstants.GETALLNOTICE_FAILURE, error } } 
}
