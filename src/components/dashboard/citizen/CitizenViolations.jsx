import React from 'react';

import {connect} from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import Logout from './../../layout/Logout';
import firebase from 'firebase';
import {adminId} from './../../../store/variables';

class CitizenViolations  extends React.Component {

     
     constructor (props){
          super(props);
          this.handleChange=this.handleChange.bind(this);
          this.handleSubmit=this.handleSubmit.bind(this);
          this.state = {
            citizenMistakenId :'',
            citizenViolations:[]            
        }
     }
     

     
      getCitizenViolations(licenceId){
          console.log('getCitizenViolations');
          const citizenViolationsRef = firebase.database().ref('citizen_violations/'+licenceId);
          let citizenViolationsArray=[];
        
        
         
          citizenViolationsRef.on('value', (snapshot)=>{
                 if(snapshot.exists()){
                  let citizenViolationsKey = snapshot.key;
              
                  let citizenViolations = snapshot.val();
                  console.log(citizenViolationsKey);  
                  console.log(citizenViolations);  
 
                    citizenViolationsArray = Object.values(citizenViolations);
                    console.log(citizenViolations);
                    citizenViolationsArray.forEach((violation)=>{
                    console.log(violation.typeId);

                    const citizenViolationsDescriptionAndFineRef = firebase.database().ref('violations_species/'+violation.typeId);
                    citizenViolationsDescriptionAndFineRef.on('value',(snapshot)=>{
 
                     if(snapshot.exists()){
                       console.log(snapshot.val()); 
                       let {description,fine,id} = snapshot.val();
                      //  let vehicleViolationDescriptionAndFineArray=[description,fine];
                       console.log(description);
                        let updatedViolation={};
                        citizenViolationsArray.forEach(violation => {
                           if(violation.typeId===id){
                               updatedViolation ={...violation,description,fine}                    
                               console.log(updatedViolation);
                               
                           } 

                        });
                        citizenViolationsArray.push(updatedViolation);
                        
                        console.log(citizenViolationsArray);
                      this.setState({
                        citizenViolations:citizenViolationsArray
                      })
                     }  
                  });

                })
                    


                 console.log(citizenViolationsArray);

                  this.setState({
                    citizenMistakenId:citizenViolationsKey,
                    citizenViolations:citizenViolationsArray,
                    notFoundRecord:null
                  });

                }else{
                  console.log('There is such a licence number in the system');
                  this.setState({
                    citizenMistakenId:'',
                    citizenViolations:[],
                    notFoundRecord:'There is violations for this vehicle'
                  })
                }
                             
            } );
           
            console.log(citizenViolationsArray);


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
         this.getCitizenViolations(this.state.citizenMistakenId);
       
    }

     render(){
      console.log('Dashboard Component');
      const {auth} = this.props;
      const {citizenMistakenId , citizenViolations,notFoundRecord} = this.state;
      console.log(this.state);
      
      const filterCitizenViolations=citizenViolations.filter( violation=>Object.keys(violation).length >9); 
      console.log(citizenMistakenId);  
      console.log(filterCitizenViolations);  
      console.log(notFoundRecord);
      if(auth.uid !== adminId ){
           return <Redirect exact to="/signin"/>
      }
     //  console.log(this.props);
          return (
              
                <div className="row">
                    <div className="col-sm-2">

                    <div className="sidenav">

                         <NavLink  exact to="/addCitizen"> <i className="fas fa-user-plus"></i>  Add Citizen</NavLink>
                         <NavLink exact to="/citizenViolations"className="active" > Citizen Violations </NavLink>
                         <NavLink exact to="/addVehicle"> <i className="fas user-plus">  </i> Add Vehicle  </NavLink>
                         <NavLink exact to="/vehicleViolations">  Vehicle Violations </NavLink>
                         <NavLink exact to="/addOfficer"> Add Officer </NavLink>
                         <NavLink exact to="/officerHistory">Officer History  </NavLink>
                         <Logout />
                        
                    </div>
                    </div>
                    <div className="col-sm-9 offset-sm-1 p-4">
                  <h1 className="text-white">Search For Citizen Violations </h1>
                    <form role="form" onSubmit={this.handleSubmit}>
                        <div className="form-inline">
                        <div className="form-group">
                            <label  className="sr-only"></label>
                            <input 
                                type="text"
                                className="form-control mr-2" 
                                placeholder="licence Id #" 
                                name="citizenMistakenId"
                                id="citizenMistakenId"
                                onChange={this.handleChange}
                                value={this.state.citizenMistakenId}
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
          <h2 className="text-center text-purple p-3"> Violations of Licence id : { citizenMistakenId  }   </h2>

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
                
              {filterCitizenViolations.length > 0 && filterCitizenViolations.map(violation=>{
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


export default  connect(mapStateToProps) (CitizenViolations);