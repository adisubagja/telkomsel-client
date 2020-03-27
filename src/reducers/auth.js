import { REQUEST_MAGIC_LINK, AUTH_LOGIN} from '../actions/types';

const initialState = { isLoading: false, payload:null, isLoggedIn: false};

export default function (state=initialState, action) {
    switch(action.type) {
        case `${REQUEST_MAGIC_LINK}_START`:
            return {...state, isLoading:true}
        case `${REQUEST_MAGIC_LINK}_SUCCESS`:
            return {...state, payload:action.payload, isLoading:false}
        case `${AUTH_LOGIN}_START`:
            return {...state, isLoading:true}
        case `${AUTH_LOGIN}_SUCCESS`:
                return {...state, payload:action.payload, isLoading:false, isLoggedIn:true}
        case `${AUTH_LOGIN}_ERROR`:
            return {...state, payload:action.payload, isLoading:false}
        default:
            return state
    }
}