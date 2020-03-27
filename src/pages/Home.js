import React , {Component} from 'react';
import requireAuth from '../components/requireAuth';
import Card from '../components/Card';
import { Grid, CircularProgress } from '@material-ui/core';
import Layout from '../components/Layout';

class Home extends Component {
    constructor(props) {
        super(props);
        if(props.auth.isLoggedIn) {
            props.requestOffers(props.auth.payload);
            
        }
    }

   
    renderList= (offers)=> {

        const test = [{
            name:'TEST OFFER ML2_BP_22',
            id:'ML2_BP_22'
        },
        {
            name:'TEST OFFER ML2_BP_52',
            id:'ML2_BP_52'
        }
    ]

        const ini = [...offers, ...test];
        return ini.map((off,i)=> {
            return (
                <Grid item sm={4} key={i}>

                    <Card 
                        {...off} nomor={i}
                        auth={this.props.auth}
                        buy={this.props.buy}
                    />
   
                 </Grid>
            )
        })

    }
    
    renderData = ()=> {

        if(this.props.offers) {
            const {isLoading, payload} = this.props.offers;

            if(isLoading || !payload) {
                return <div>Loading...</div>
            }
            
            const {offer} = payload.body;
    
            if(offer.length) {
               return ( 
                <Grid container spacing={3}>
                    {this.renderList(offer)}
                
                </Grid>
               )
            }

        }
       
    

    }

    renderLoading = () => {

           const style = {
                position: 'fixed',
                top: '50%',
                left: '50%',
                marginTop: -12,
                marginLeft: -12,

           }
            if(this.props.beli.isLoading) {
                return <CircularProgress style={style} />
            }
           
        
    }
    
    render() {
       
        return (
            <Layout>
                {this.renderLoading()}
                <h1>OFFERGROUP DEFAULT</h1>
                <hr/>
                 {this.renderData()}

              </Layout>
            
        )
    }
}



export default (requireAuth(Home));