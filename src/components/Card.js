import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import { red } from '@material-ui/core/colors';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import API from '../config';
import { TextField, FormControl, InputLabel, Select, MenuItem, Button} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function CardName({id, auth, nomor,name, buy}) {
  
  
  const [offer, setOffer] = React.useState( async () => {
    try {
      const {access_token, id_token} = auth.payload;
      const {data} = await axios.post(`${API}/api/offers/filtered-offers/v4?filteredBy=${id === null ?'featured':id}`, {headers: {access_token, id_token}});
    
      setOffer({lists:data.body.data.offer, signtrans:data.headers.signtrans});

    } catch (error) {
      setOffer({list:[], signtrans:''})
    }

  });

    
  const renderMenu=  () =>{
    try {
      
      const listers = offer.lists;

      return listers.map((o,i)=> {
        return (
          <MenuItem value={o.id} key={i}> {`${o.name}[${o.bonus?o.bonus[0].quota:''}]Rp.${o.price}`.replace(' ','')} </MenuItem> 
        )
      })
    } catch (error) {
      
    } 
  }

  const [pkgid, setPkgid] = React.useState('')
  const handleChange = e => {
    setPkgid(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault();
   // buy()
    buy(
      pkgid, offer.signtrans, auth.payload
    )
  }

  const classes = useStyles();
  return (
    <Card className={classes.root}>
     
      <form onSubmit={handleSubmit}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {nomor + 1}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={id}
      />
    
      <CardContent>
      <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">NAME</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pkgid}
              onChange={handleChange}
            >
              {
                 renderMenu()
              }
            
             
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField label="OFFERID" value={pkgid}  onChange={handleChange} />
          </FormControl>
        
      </CardContent>
      <CardActions disableSpacing>
        <Button
          className={clsx(classes.expand)}
          onClick={handleSubmit}
          variant="contained"
          color="secondary"
        >
          BUY
        </Button>
      </CardActions>
      </form>
    </Card>
  );
}

/*
class CardName extends Component {
  state = {
    offer:[],
    isLoading:true,
    pkgid:'',
    signtrans:'',
    beli:{isLoading:true, payload:null}
  }
  componentDidMount() {
   this.shouldUpdate();
  }

  handleChange = event => {
    this.setState({pkgid:event.target.value})
  }
  
  shouldUpdate = () => {
    const {access_token, id_token} = this.props.auth;
    axios.post(`${API}/api/offers/filtered-offers/v4?filteredBy=${this.props.id === null ?'featured':this.props.id}`, {headers: {access_token, id_token}}).then(response=>{
      const {offer} = response.data.body.data;
      const {signtrans} = response.data.headers;

      //console.log(signtrans)

      this.setState({offer:offer, signtrans:signtrans, isLoading:false})
   }).catch(e=> {
     this.setState({isLoading:false})
   })
   // c

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.buy(this.state.pkgid, this.state.signtrans, this.props.auth);

  }
  render () {
    return <RecipeReviewCard 
      {...this.props} 
      isLoading={this.state.isLoading} 
      offer={this.state.offer}
      handleChange = {this.handleChange}
      handleSubmit = {this.handleSubmit}
      pkgid = {this.state.pkgid}
      beli = {this.state.beli}
      />
    
  }

  <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {nomor + 1}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={id}
      />
      <CardContent>
       {
       isLoading?'Loading..':
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">NAME</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pkgid}
              onChange={(e)=>{handleChange(e)}}
            >
              {offer.map((o,i)=>
              <MenuItem 
                  value={o.id} 
                  key={i}>{}
              </MenuItem> )}  
             
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField label="OFFERID" value={pkgid}  onChange={(e)=>{handleChange(e)}} />
          </FormControl>
        </div>
      }
      </CardContent>
      <CardActions disableSpacing>
        <Button
          className={clsx(classes.expand)}
          onClick={(e)=> handleSubmit(e)}
          variant="contained"
          color="secondary"
        >
          BUY
        </Button>
      </CardActions>
      
      
}
*/
