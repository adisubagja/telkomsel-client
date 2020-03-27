import authReducers from './auth';
import buyReducers from './buy';
import offersReducer from './offers';
import { combineReducers } from 'redux';

export default combineReducers({
    auth:authReducers,
    buy:buyReducers,
    offers:offersReducer
})