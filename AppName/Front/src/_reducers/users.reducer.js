import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case userConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };

    case userConstants.PASSCHANGE_REQUEST:
    return{
      loading:true
    };
    case userConstants.PASSCHANGE_SUCCESS:
    return{
      items: action.password
    };
    case userConstants.PASSCHANGE_FAILURE:
    return {
      error: action.error
    };
    
    
    case userConstants.UPDATE_REQUEST:
      return {
        loading: true
      };
    case userConstants.UPDATE_SUCCESS:
      return {
        items: action.items
      };
    case userConstants.UPDATE_FAILURE:
      return { 
        error: action.error
      };

    case userConstants.DELETE_REQUEST:
      return {
      };
    case userConstants.DELETE_SUCCESS:
      return {
        loading: false
      };
    case userConstants.DELETE_FAILURE:
      return {};

    default:
      return state
  }
}