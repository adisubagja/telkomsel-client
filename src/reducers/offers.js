import {OFFERS_PACKAGE} from '../actions/types';

const initialState = { isLoading: false, payload:null, open:false};

export default function (state=initialState, action) {
    switch(action.type) {
        case `${OFFERS_PACKAGE}_START`:
            return {...state, isLoading:true}
        case `${OFFERS_PACKAGE}_SUCCESS`:
            return {...state, payload:action.payload, isLoading:false, open:true}
        case `${OFFERS_PACKAGE}_ERROR`:
            localStorage.removeItem('token');
            return {...state, isLoading:false}
        default:
            return state
    }
}