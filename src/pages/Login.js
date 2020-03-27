import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as action from '../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#!">
        Arya Studios
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://cdn.idntimes.com/content-images/post/20190911/0-0d254764b565f997c60e894c3b4eab8d_600x400.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    height:'150px'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

 function SignInSide({handlePhone, handleMagicLink, handleSubmit, magicLinkSubmit, message, auth, isSubmited}) {

  const classes = useStyles();
 
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <div className={classes.avatar}>
           <img src="/logo.png" alt="null"></img>
          </div>
          <form onSubmit={(e)=>handleSubmit(e)}className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone number"
              name="phone"
              autoComplete="phone"
              autoFocus
              onChange = {(c)=>handlePhone(c)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <Button onClick={e=>magicLinkSubmit(e)}
                    variant="contained"
                    color="secondary"
                    >GET</Button>
                  </InputAdornment>
                ),
              }}
             

            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="magiclink"
              label="Magic Link"
              type="magiclink"
              id="magiclink"
              autoComplete="magiclink"
              onChange = {(c)=>handleMagicLink(c)}

              
              
            />
            {auth.isLoading ?<LinearProgress /> :''}
            <Grid container>
              <Grid item xs>
               {auth.payload && auth.payload.success?'Success':message}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled = {isSubmited}
            >
              Login
            </Button>
            {auth.payload && auth.payload.isAxiosError?<h4>Invalid Magic Link</h4>:''}
            <Box mt={5}>
              
              <Copyright />
              
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

class Login extends Component {

    state = {
        phone:'',
        magicLink:'',
        message:'https://my.telkomsel.com/app/login?code=tHvEkwnuuY',
        disabled: false
    }
    handleMagicLink = (event) => {
        this.setState({magicLink:event.target.value, disabled:false})
    }
    handlePhone = (event) => {
        this.setState({phone:event.target.value, disabled:false})

    }
    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.phone.length < 11 || !this.state.magicLink) {
            this.setState({message:'Value Belum Lengkap'});
            return;
        }
        this.setState({message:'', disabled:true});

        this.send();

        
    }
    
    send = ()=> {
      if(this.props.auth.payload && this.props.auth.payload.authId) {
       
        
        const authId = this.props.auth.payload.authId;
        try {
          const code = this.state.magicLink.split('code=')[1].trim();
          this.props.authLogin(authId, code, ()=> {
          this.props.history.push('/');
        });
        } catch (error) {
          this.setState({message:'Error'});
          //return
        }
        
        
      }
      
      
    }
    magicLinkSubmit = (event) => {

        event.preventDefault();
        
        if(this.state.phone.length < 11 ) {
            this.setState({message:'Number Telephone Invalid!!'});
            return;
        }
        this.props.requestMagicLink(this.state.phone);
        
        
    }
   
    render() {

      if(this.props.auth.isLoggedIn) {
        return <Redirect to='/' />
      }
      // console.log(this.props.auth)
        return <SignInSide 
            handleSubmit={this.handleSubmit}
            handlePhone = {this.handlePhone }
            handleMagicLink = {this.handleMagicLink }
            magicLinkSubmit = {this.magicLinkSubmit}
            message = {this.state.message}
            auth = {this.props.auth}
            isSubmited = {this.state.disabled}

        />
    }
}
const mapStateToProps = state => {
  return {
    auth:state.auth
  }
}
export default connect(mapStateToProps, action)(Login);