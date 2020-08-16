import React from 'react';

import {connect} from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import Logout from './../layout/Logout';
class Dashboard  extends React.Component {
     constructor (props){
          super(props);
     }
    

     render(){
      console.log('Dashboard Component');
      const {auth} = this.props;
      console.log(auth);
      if(!auth.uid){
           return <Redirect exact to="/signin"/>
      }
     //  console.log(this.props);
          return (
              
                <div className="row">
                    <div className="col-sm-2">

                    <div className="sidenav">

                         <NavLink  exact to="/addCitizen"> <i className="fas fa-user-plus"></i>  Add Citizen</NavLink>
                         <NavLink exact to="/citizenViolations" > Citizen Violations </NavLink>
                         <NavLink exact to="/addVehicle"> <i className="fas user-plus">  </i> Add Vehicle  </NavLink>
                         <NavLink exact to="/VehicleViolations">  Vehicle Violations </NavLink>
                         <NavLink exact to="/addOfficer"> Add Officer </NavLink>
                         <NavLink exact to="/officerHistory">Officer History  </NavLink>
                         <Logout />
                        
                    </div>
                    </div>
                    <div className="col-sm-9 offset-sm-1 p-4">
             
                         <h1 className="intro-title ">Traffic Violation System </h1>
                         <h2 className="text-white">Admin Dashboard Homepage </h2>
                         <h3 className="intro-subtitle">Egypt</h3>
                                                     
            </div>
         </div>
               
      ); 
     
            
     }

}

const mapStateToProps = (state) =>{
     return {
        auth:state.firebase.auth,
        profile:state.firebase.profile
     }
}

export default  connect(mapStateToProps) (Dashboard);