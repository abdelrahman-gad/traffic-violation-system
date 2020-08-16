import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import {logOut} from '../../store/actions/authActions';
import {Redirect} from 'react-router-dom';

class  SigndInLinks extends Component  {
      
  constructor(props){
    super(props);
    this.handleLogout= this.handleLogout.bind(this);
  }

  handleLogout(e) {

          e.preventDefault();
          console.log(this.props);
          this.props.logOut();
         // return <Redirect exact to="/"  />      
          

  }
  componentDidUpdate(){
    console.log('component has updated');
  }  

 render(){
  const {profile} =  this.props;
  return (
            
    <ul>
        <li>
          <NavLink exact to="/dashboard"> Dashboard </NavLink>
        </li>
        <li>
          <NavLink  exact to="/posts">Posts</NavLink>
        </li>
        <li>
          <NavLink exact to="/notitfcations"> Notifications </NavLink>
        </li>

        <form  onSubmit={this.handleLogout} >
            <button className="logout-btn"> Logout  </button>
        </form>
          
      </ul>
    );

 }

}


const mapDispatchToProps = (dispatch,ownProps) => {
  
  // ownProps
  console.log(ownProps);
  return {
    logOut: () => dispatch(logOut())
  }

}

export default  connect (null , mapDispatchToProps) (SigndInLinks);



