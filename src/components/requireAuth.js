import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
export default (ChildComponent) => {
    class ComposedComponent extends Component {

        componentDidMount () {
            
           
            this.shouldNavigateAway();
           // this.props.requestOffers(this.props.auth.payload);
            
            
        }

        
        componentDidUpdate () {
            
            this.shouldNavigateAway();
    
        }
        
        shouldNavigateAway () {

            if(!this.props.auth.isLoggedIn) {
                this.props.history.push('/login');
            }
           
           
        }

        render () {
            //console.log(this.props.auth);
            return <ChildComponent {...this.props} />
        }
    }
    function mapStateToProps(state) {
        return {
            
            beli:state.buy,
            offers:state.offers,
            auth:state.auth
        }
    }
    return connect(mapStateToProps, actions)(ComposedComponent);
}