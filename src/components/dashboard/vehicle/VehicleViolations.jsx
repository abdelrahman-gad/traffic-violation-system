import React from 'react';

import {connect} from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import Logout from './../../layout/Logout';
import firebase from 'firebase';
import { adminId } from '../../../store/variables';
class VehicleViolations  extends React.Component {

     
     constructor (props){
          super(props);
          this.handleChange=this.handleChange.bind(this);
          this.handleSubmit=this.handleSubmit.bind(this);
          this.state = {
            vehicleMistakenId :'',
            vehicleViolations:[]            
        }
     }
     

     
      getVehicleViolations(vehicleId){
          console.log('getVehicleViolations');
          const vehicleViolationsRef = firebase.database().ref('vehicle_violations/'+vehicleId);
          let vehicleViolationsArray=[];
        
        
         
          vehicleViolationsRef.on('value', (snapshot)=>{
                 console.log();
                 if(snapshot.exists()){
                  let vehicleViolationsKey = snapshot.key;
              
                  let vehicleViolations = snapshot.val();
                  console.log(vehicleViolationsKey);  
                  console.log(vehicleViolations);  
 
                   vehicleViolationsArray = Object.values(vehicleViolations);
                   console.log(vehicleViolations);
                   vehicleViolationsArray.forEach((violation)=>{
                    console.log(violation.typeId);

                    const vehicleViolationsDescriptionRef = firebase.database().ref('violations_species/'+violation.typeId);
                    vehicleViolationsDescriptionRef.on('value',(snapshot)=>{
 
                     if(snapshot.exists()){
                       console.log(snapshot.val()); 
                       let {description,fine,id} = snapshot.val();
                      //  let vehicleViolationDescriptionAndFineArray=[description,fine];
                       console.log(description);
                        let updatedViolation={};
                        vehicleViolationsArray.forEach(violation => {
                           if(violation.typeId===id){
                               updatedViolation ={...violation,description,fine}                    
                               console.log(updatedViolation);
                               
                           } 

                        });
                        vehicleViolationsArray.push(updatedViolation);
                        
                        console.log(vehicleViolationsArray);
                      this.setState({
                        vehicleViolationsArray:vehicleViolationsArray
                      })
                     }  
                  });

                })
                    


                 console.log(vehicleViolationsArray);

                  this.setState({
                    vehicleMistakenId:vehicleViolationsKey,
                    vehicleViolations:vehicleViolationsArray,
                    notFoundRecord:null
                  });

                }else{
                  console.log('There is such a licence number in the system');
                  this.setState({
                    vehicleMistakenId:'',
                    vehicleViolations:[],
                    notFoundRecord:'There is violations for this vehicle'
                  })
                }
                             
            } );
           
            console.log(vehicleViolationsArray);


      }
     handleChange(e){
         console.log('input Changing');
            this.setState({
                [e.target.id]:e.target.value
            });
     }

     handleSubmit(e){
         e.preventDefault(e);
         console.log('Form Submitting');
         this.getVehicleViolations(this.state.vehicleMistakenId);
       
    }

     render(){
      console.log('Dashboard Component');
      const {auth} = this.props;
      const {vehicleMistakenId , vehicleViolations,notFoundRecord} = this.state;
      console.log(this.state);
      
      const filterVehicleViolations=vehicleViolations.filter( violation=>Object.keys(violation).length >9); 
      console.log(vehicleMistakenId);  
      console.log(filterVehicleViolations);  
      console.log(notFoundRecord);
      if(auth.uid!==adminId){
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
                         <NavLink exact to="/vehicleViolations" className="active">  Vehicle Violations </NavLink>
                         <NavLink exact to="/addOfficer"> Add Officer </NavLink>
                         <NavLink exact to="/officerHistory">Officer History  </NavLink>
                         <Logout />
                        
                    </div>
                    </div>
                    <div className="col-sm-9 offset-sm-1 p-4">
                  <h1 className="text-white">Search For Vehicles  Violations</h1>
                    <form role="form" onSubmit={this.handleSubmit}>
                        <div className="form-inline">
                        <div className="form-group">
                            <label  className="sr-only"></label>
                            <input 
                                type="text"
                                className="form-control mr-2" 
                                placeholder="Vehicle Number #" 
                                name="vehicleMistakenId"
                                id="vehicleMistakenId"
                                onChange={this.handleChange}
                                value={this.state.vehicleMistakenId}
                            />
                   </div>
                 <div className="form-group">
                    <button className="btn btn-admin btn-search pull-right">
                      <div className="fas fa-search mr-2"></div>
                      Search
                    </button>
                  </div>
                </div>
              </form>
             
            
          <div className="row bg-white my-4 rounded-lg">
          <h2 className="text-center text-purple p-3"> Violations for Vehicle number : { vehicleMistakenId  }   </h2>

            <table className="table">
              <thead>
                <tr>         
                  <th scope="col"> Description </th>
                  <th scope="col"> Fine </th>
                  <th scope="col"> Address</th>
                  <th scope="col">Date</th>
                  <th scope="col"> Time </th>
                  <th scope="col">State of Pay</th>
                </tr>
              </thead>
              <tbody>
                
              {filterVehicleViolations.length > 0 && filterVehicleViolations.map(violation=>{
                return (
                  <tr key={violation.id}>                 
                    <td>   {violation.description} </td>     
                    <td>   {violation.fine} </td>
                    <td>   {violation.address} </td>
                    <td>   {violation.date} </td>
                    <td>   {violation.time} </td>
                    <td>   {violation.stateOfPay} </td>

                  </tr>
                );
              })}

               </tbody>
                
            </table>
                 { 
                    notFoundRecord !== null &&  <h2 className="text-purple p-3"> Please , Enter a valide Vehicle Id </h2>
                }
          </div> 
        </div>   
    </div>
               
      ); 
     
            
     }

}

const mapStateToProps = (state) =>{
     return {
        auth:state.firebase.auth
     }
}


export default  connect(mapStateToProps) (VehicleViolations);