import React from 'react';

import {connect} from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import Logout from './../../layout/Logout';
import firebase from 'firebase';
import { adminId } from '../../../store/variables';
class OfficerHistory  extends React.Component{
     
     constructor (props){
          super(props);
          this.handleChange=this.handleChange.bind(this);
          this.handleSubmit=this.handleSubmit.bind(this);
          this.state = {
            officerId :'',
            date:'' ,
            officerHistory:[]           
        }
     }
     

     
      getOfficerHistory(officerId,date){
          console.log('get Officer History',officerId,date);
          

          this.setState({
               date:date,
               officerId:officerId
          });
          console.log(this.state);
          const officerHistoryRef = firebase.database().ref('officers_history/'+this.state.officerId+'/'+this.state.date.split("-").reverse().join("-"));
          let officerHistoryArray=[];
        
        
         
          officerHistoryRef.on('value', (snapshot)=>{
                 console.log(snapshot.val());
                 if(snapshot.exists()){
                  let officerHistoryKey = snapshot.key;
              
                  let officerHistory = snapshot.val();
                  console.log(officerHistoryKey);  
                  console.log(officerHistory);  
 
                   officerHistoryArray = Object.values(officerHistory);
                   console.log(officerHistory);
                   officerHistoryArray.forEach((violation)=>{
                    console.log(violation.typeId);

                    const officerHistoryViolationsDescriptionAndFineRef = firebase.database().ref('violations_species/'+violation.typeId);
                    officerHistoryViolationsDescriptionAndFineRef.on('value',(snapshot)=>{
 
                     if(snapshot.exists()){
                       console.log(snapshot.val()); 
                       let {description,fine,id} = snapshot.val();
                      //  let vehicleViolationDescriptionAndFineArray=[description,fine];
                       console.log(description);
                        let updatedViolation={};
                        officerHistoryArray.forEach(violation => {
                           if(violation.typeId===id){
                               updatedViolation ={...violation,description,fine}                    
                               console.log(updatedViolation);
                               
                           } 

                        });
                        officerHistoryArray.push(updatedViolation);
                        
                        console.log(officerHistoryArray);
                         this.setState({
                             officerHistory:officerHistoryArray
                         });
                     }  
                  });

                })
                    


                 console.log(officerHistoryArray);
                 console.log(officerHistoryKey);

                  this.setState({
                    officerId:officerId,
                    officerHistory:officerHistoryArray,
                    notFoundRecord:null,

                  });
                 
                }else{
                  console.log('There is such no such a licence number');
                  this.setState({
                    officerId :'',
                    date:'' ,
                    officerHistory:[],
                    notFoundRecord:'There is violations for this vehicle'
                  })
                }
                             
            } );
           
            console.log(officerHistoryArray);


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
          console.log(this.state.date);
          
          console.log('correct date format');
          console.log(this.state.date);
          this.getOfficerHistory(this.state.officerId,this.state.date);
       
    }

     render(){
      console.log('Dashboard Component');
      const {auth} = this.props;
      const {officerId , officerHistory,notFoundRecord} = this.state;
      console.log(this.state);
      
      const filterOfficerHistory=officerHistory.filter( violation=>Object.keys(violation).length >9); 
      console.log(officerId);  
      console.log(filterOfficerHistory);  
      console.log(notFoundRecord);
      if(auth.uid !==adminId ){
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
                         <NavLink exact to="/vehicleViolations" >  Vehicle Violations </NavLink>
                         <NavLink exact to="/addOfficer"> Add Officer </NavLink>
                         <NavLink exact to="/officerHistory" className="active">Officer History  </NavLink>
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
                                placeholder="Officer Id #" 
                                name="officerId"
                                id="officerId"
                                onChange={this.handleChange}
                                value={this.state.officerId}
                            />
                       </div>
                       <div className="form-group">
                            <label  className="sr-only"></label>
                            <input 
                                type="date"
                                className="form-control mr-2" 
                                placeholder="dd-mm-yy"
                                name="date"
                                id="date"
                                onChange={this.handleChange}
                                value={this.state.date}
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
          <h2 className="text-center text-purple p-3"> Violations taken by Officer with Id : { officerId  }   </h2>

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
                
              {filterOfficerHistory.length > 0 && filterOfficerHistory.map(violation=>{
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
                    notFoundRecord !== null &&  <h2 className="text-purple p-3"> Please, enter a valid officer Id and date </h2>
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


export default  connect(mapStateToProps) (OfficerHistory);