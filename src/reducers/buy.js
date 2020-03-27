import {BUY_PACKAGE} from '../actions/types';

const initialState = { isLoading: false, payload:null, open:false};

export default function (state=initialState, action) {
    switch(action.type) {
        case `${BUY_PACKAGE}_START`:
            return {...state, isLoading:true}
        case `${BUY_PACKAGE}_SUCCESS`:
            return {...state, payload:action.payload, isLoading:false, open:true}
        case `${BUY_PACKAGE}_ERROR`:
            localStorage.removeItem('token');
            return {...state, isLoading:false}
        case 'MODAL_CLOSE':
            return {...state, payload:action.payload, isLoading:false, open:false}
        default:
            return state
    }
}