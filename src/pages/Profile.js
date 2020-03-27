
import * as actions from '../actions';
import {connect} from 'react-redux';
import requireAuth from '../components/requireAuth';
import Layout from '../components/Layout'
import { Grid } from "@material-ui/core";
import React from 'react';
import axios from 'axios';
import API from '../config';




function Profile({auth}) {

  const [user, setUser] = React.useState(async () => {
      try {
        const {access_token, id_token} = auth.payload;

        const res = await axios.post(`${API}/api/user/offers`, {access_token, id_token});
       // return res.data;
         setUser(res.data.body);
        
      } catch (error) {
          return null;
      }
  });
  

  return (
    
    
    <Layout>
        
        <h1>USERS OFFER</h1>
        <hr/>
        
        <Grid container component="main">
          {JSON.stringify(user)}
        </Grid>
    </Layout>
   
  );
}


export default connect(null, actions) (requireAuth(Profile));