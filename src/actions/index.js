import  { REQUEST_MAGIC_LINK, AUTH_LOGIN, BUY_PACKAGE, OFFERS_PACKAGE } from './types';

import axios from 'axios';
import API from '../config';


const createAction = (type, actionProps) => {
    return {
      type,
      ...actionProps
    };
  };
  
const createAsyncActionCreator = (
    actionType,
    asyncRequestFn,
    cb
  ) => {
    return dispatch => {
      dispatch(createAction(`${actionType}_START`), {payload:null});
      return asyncRequestFn
        .then(response => {
            dispatch(createAction(`${actionType}_SUCCESS`,  {payload:response.data} ))
            
            cb(response.data)
        })
        .catch(e=> dispatch(createAction(`${actionType}_ERROR`, { payload: e })))
        
    };
  };


export function requestMagicLink(phone) {
    const fetch = axios.get(`${API}/magic-link?msisdn=${phone}`)
    return createAsyncActionCreator(REQUEST_MAGIC_LINK,fetch, ()=>{})
}

export const authLogin= (authId, code, cb)  => {
    const fetch = axios.post(`${API}/app/login`, {authId:authId, code:code})
    return createAsyncActionCreator(AUTH_LOGIN,fetch, function (res) {
      //dispatch(requestOffers(res));
      localStorage.setItem('token', JSON.stringify(res));
      
        cb();
    });
}


export function buy(offerId, signtrans, authorization) {
  //const {access_token, id_token} = authorization;
  //debugger;
 // console.log({access_token, id_token, signtrans});
 // debugger;
  //const {access_token, id_token} = JSON.parse(localStorage.getItem('token'));
  const fetch = axios.post(`${API}/api/buy`, {...authorization, offerId, signtrans})
  return createAsyncActionCreator(BUY_PACKAGE,fetch ,()=>{})
}

export const tembak  = (offerGroup, offerId, auth) => dispatch=> {
  const {access_token, id_token} = auth;
   // const {access_token, id_token} = JSON.parse(localStorage.getItem('token'));
    axios.post(`${API}/api/offers/filtered-offers/v4?filteredBy=${offerGroup}`, {headers: {access_token, id_token}}).then(response => {
      try {
        const {signtrans} = response.data.headers;
       // console.log("ASUUUUUUUUUUU", signtrans)
        dispatch(buy(offerId, signtrans, auth))
        
      } catch (error) {
        dispatch(buy(offerId, '', auth))
      }
    
      
    })
    
    
}

export const  requestOffers = (auth)  => {
  
  const {access_token, id_token} = auth;
 // console.log("OFFER", (access_token));
 /// debugger;
  const fetch = axios.post(`${API}/api/offers/v1`, {access_token:access_token, id_token:id_token});
  return createAsyncActionCreator(OFFERS_PACKAGE,fetch ,()=>{})
}
export function handleClose() {
  return {
    type:'MODAL_CLOSE',
  }
}