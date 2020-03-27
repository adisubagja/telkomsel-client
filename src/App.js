import React, { Component } from 'react';
import Home from './pages/Home';
import * as actions from './actions';
import {connect} from 'react-redux';
import Modal from './components/Modal'
import { BrowserRouter, Route , Switch} from 'react-router-dom';
import Login from './pages/Login';
import Tembak from './pages/Tembak';
import Profile from './pages/Profile';


class App extends Component {
   
    
    render () {
        
        return (
           
            <BrowserRouter> 
           
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/tembak" exact component={Tembak}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/profile" exact component={Profile}/>
             </Switch>
          
             <Modal open={this.props.beli.open} handleClose={this.props.handleClose} data={this.props.beli.payload}></Modal>
         </BrowserRouter>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        beli:state.buy,
        auth:state.auth
    }
}

export default connect(mapStateToProps, actions)(App);
