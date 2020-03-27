
import requireAuth from '../components/requireAuth';
import Layout from '../components/Layout'
import { Grid, Button, TextField, CircularProgress } from "@material-ui/core";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: 200,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
  },
}));



function Tembak({auth, beli, tembak}) {
    
    //console.log(buy);
   
    const [offerGroup, setOfferGroup] = React.useState('');
    const [offerId, setOfferId] = React.useState('');
   
    const handleChangeOfferGroup = event => {
        setOfferGroup(event.target.value);
        
    };
    const handleChangeOfferId = event => {
     
        setOfferId(event.target.value);
    };

   const  handleSubmit = (e) => {

       e.preventDefault();
        if(!offerId.length || !offerGroup.length) {
            console.log('err');
            return
        }
       tembak(offerGroup,offerId, auth.payload);
      
       
    }

   
  const classes = useStyles();
  return (
    
    
    <Layout>
        
        <h1>CUSTOM OFFER</h1>
        <hr/>
        
        <Grid container component="main">
         {beli.isLoading?(<CircularProgress style={{
                position: 'absolute',
                top: '30%',
                left: '50%',
                marginTop: -12,
                marginLeft: -12,
       
           }} />):''}
         
         <form onSubmit={handleSubmit} className={classes.form} noValidate autoComplete="off">
             <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                onChange ={handleChangeOfferGroup}
                label="OFFER GROUP"
                placeholder="ML2_BP_22"
              
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                placeholder="00001231"
                label="OFFER ID"
                onChange = {handleChangeOfferId}
            />
            <Button type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={beli.isLoading?true:false}
              >
                  BUY
              </Button>
            </form>
        </Grid>
    </Layout>
   
  );
}

export default (requireAuth(Tembak));