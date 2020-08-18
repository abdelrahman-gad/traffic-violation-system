

import React from 'react';

import {connect} from 'react-redux';

import {  Redirect ,NavLink } from 'react-router-dom';
import  { addOfficer } from '../../../store/actions/officerActions';
import { auth } from 'firebase';
import Logout from './../../layout/Logout';
import {adminId,nameAndAddressRegex} from './../../../store/variables';


class AddOfficer  extends React.Component {

   
   state={
    name:'',
    degree:'',
    policeNumber:'',
    nationalId:'',
    workPlace:'' ,
      formErrors:{
        name:'',      
        degree:'',
        policeNumber:'',
        nationalId:'',
        workPlace:'' 
      }
   

   }
    constructor(props){
      super(props);
      this.handleChange= this.handleChange.bind(this);
      this.handleSubmit= this.handleSubmit.bind(this); 
    }
    formValid = ({formErrors,...rest}) =>{
      let valid = true;
         Object.values(formErrors).forEach(val=>{
            if(val.length > 0){ //this  means there is som error
               valid = false;
            }
         });

         // validate the form was filled out
         Object.values(rest).forEach(val => {
               val.length === 0 && (valid = false);
         });

      return valid;
    }

        handleSubmit(e){
         e.preventDefault();
           
         if(!this.formValid(this.state)){
            console.log(`--FORM SUBMITTING FORM ERROR--`);
         }else{
            console.log(`--FORM INPUTS VALID--`);
            const {            
               name,              
               policeNumber,
               workPlace,
               nationalId,
               degree
              }= this.state;
             let officerData = { 
                name,            
                policeNumber,
                workPlace,
                nationalId,
                degree
              };
             this.props.addOfficer(officerData);
         }
      

         this.setState({
            name:'',         
            degree:'',
            policeNumber:'',
            nationalId:'',
            workPlace:''                         
         });
        }

        
      handleChange = (e) =>{
         e.preventDefault();
         let { name , value} = e.target; //input name 
         
         let formErrors = this.state.formErrors;

// add regex validains


         //  put the conditions in switch case

         switch(name){
            case 'name':
             
               formErrors.name = nameAndAddressRegex.test(value)? "": "should enter three words name";
               break;
          
          case 'policeNumber':
                  formErrors.policeNumber=value.length < 6 ? "6 characters requird  Police Number at least":""    
                   break;
          case 'degree':
                    formErrors.degree=value.length < 1 ? "Please , select degree/rank of officer ":""    
                     break;          
          
          case 'nationalId':
                formErrors.nationalId = Number(value) && value.length===14 ? "": " national Id should be 14 numbers length " ;   
               break;
         
         case 'workPlace':
              formErrors.workPlace =value.length < 1 ? "Please, select work Place":"" ;   
              break;
                                                           
         default:
                break;
            }
         

            this.setState({formErrors,[name]:value});
            console.log(this.state);
         
        }
     render(){
        const {auth} = this.props;
        const {
           formErrors,
           name,       
           workPlace,
           nationalId,
           degree,
           policeNumber      
          }= this.state;
        const enabled =
            name.length > 0 &&          
            nationalId.length > 0 &&
            workPlace.length > 0 &&
            policeNumber.length > 0 &&
            degree.length > 0 ;
            
         
            if(auth.uid !== adminId){
               return (<Redirect exact to="/signin/"  />);
            }else{ 

          return (
              
                <div className="row">
                    <div className="col-sm-2">

                    <div className="sidenav">

                         <NavLink  exact to="/addCitizen" > <i className="fas fa-user-plus"></i>  Add Citizen</NavLink>
                         <NavLink exact to="/citizenViolations" > Citizen Violations </NavLink>
                         <NavLink exact to="/addVehicle"> <i className="fas user-plus">  </i> Add Vehicle  </NavLink>
                         <NavLink exact to="/VehicleViolations">  Vehicle Violations </NavLink>
                         <NavLink exact to="/addOfficer" className="active"> Add Officer </NavLink>
                         <NavLink exact to="/officerHistory">Officer History  </NavLink>
                         <Logout />

                         </div>
                    </div>
                    <div className="col-sm-9 offset-sm-1 p-4">
             
                         <h1 className="text-white">Add Police Officer </h1>
                         <form action="dashboard.html" className="form" onSubmit={this.handleSubmit}>
                           <div className="form-group row">
                               <label className="col-sm-3 col-form-label ">Name</label>
                               <div className="col-sm-9">
                                   <input
                                    type="text" 
                                    className="form-control border" 
                                    id="name"
                                    name="name"
                                    placeholder=""
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    />
                                     {formErrors.name.length > 0 &&
                                          ( <p className="text-danger"> {formErrors.name} </p> )
                                      }
                               </div>
                            </div>
                           
                          
                            <div className="form-group row">
                               <label className="col-sm-3 col-form-label ">Police Number</label>
                               <div className="col-sm-9">
                                   <input 
                                      type="text"  
                                      className="form-control border" 
                                      id="policeNumber" 
                                      name="policeNumber"
                                      placeholder=""
                                      value={this.state.policeNumber}
                                      onChange={this.handleChange}
                                    />
                                     {formErrors.policeNumber.length > 0 &&
                                          ( <p className="text-danger"> {formErrors.policeNumber} </p> )
                                      }
                               </div>
                            </div>
                            <div className="form-group row">
                               <label  className="col-sm-3 col-form-label ">Nationl Id</label>
                               <div className="col-sm-9">
                                   <input 
                                     type="text"
                                     className="form-control border"
                                     id="nationalId" 
                                     name='nationalId'
                                     placeholder=""
                                     value={this.state.nationalId}
                                     onChange={this.handleChange}

                                     />
                                      {formErrors.nationalId.length > 0 &&
                                          ( <p className="text-danger"> {formErrors.nationalId} </p> )
                                      }
                               </div>
                            </div>
                            <div className="form-group row">
                               <label className="col-sm-3 col-form-label ">Degree</label>
                               <div className="col-sm-9">
                                 <select 
                                   id="degree" 
                                   name="degree" 
                                   className="form-control"
                                   value={this.state.degree}
                                   onChange={this.handleChange}

                                   >
                                    <option value="">--Please choose an option--</option> 
                                    <option value="assistant">assistant</option>
                                    <option value="second-lieutenant"> Second Lieutenant</option>
                                    <option value="first-lieutenant"> First Lieutenant</option>
                                    <option value="captain">captain</option>
                                    <option value="major">major</option>
                                    <option value="colonel">colonel</option>
                                    <option value="bragedier">bragedier</option>
                                    
                                 </select>
                                 {formErrors.degree.length > 0 &&
                                          ( <p className="text-danger"> {formErrors.degree} </p> )
                                      }
                               </div>
                            </div>
                           
                            <div className="form-group row">
                               <label className="col-sm-3 col-form-label ">Work place</label>
                               <div className="col-sm-9">
                                
                                 <select
                                   name="workPlace" 
                                   id="workPlace"
                                   onChange={this.handleChange}
                                   value={this.state.workPlace}
                                   >
                                       <option value="">--Please choose an option--</option>
                                       <option value="General-Management"> General-Management </option>
                                       <option value="Hadaq-Elqoba-Management">Hadaq-Elqoba-Management</option>
                                       <option value="Maadi-Management">Maadi-Management</option>
                                       <option value="Elwilee-Management">Elwilee-Management</option>
                                       <option value="Eldarasa-Management">Eldarasa-Management</option>
                                       <option value="Elslam-City-Management">Elslam-City-Management</option>
                                       <option value="Eain-Elsaira-Management">Eain-Elsaira-Management</option>
                                       <option value="Shubra-Management">Shubra-Management</option>
                                       <option value="New-Cairo-Management">New-Cairo-Management</option>
                                       <option value="Elgamark-Management">Elgamark-Management</option>
                                       <option value="Nasr-City-Management">Nasr-City-Management</option>
                                       <option value="Attaba-Management">Attaba-Management</option>
                                       <option value="Nozha-Management">Nozha-Management</option>
                                       <option value="ŮAgooza-Management">ŮAgooza-Management</option>
                                       <option value="Doqai-Management">Doqai-Management</option>
                                       <option value="Elsaf-Management">Elsaf-Management</option>
                                       <option value="6ctober-Management">6ctober-Management</option>
                                       <option value="Boolaq-Management">Boolaq-Management</option>
                                       <option value="Nekla-Management">Nekla-Management</option>
                                       <option value="Feisal-Management">Feisal-Management</option>
                                       <option value="Mansoura-Management">Mansoura-Management</option>
                                       <option value="Elmanzala-Management">Elmanzala-Management</option>
                                 </select>
                                 {formErrors.workPlace.length > 0 &&
                                          ( <p className="text-danger"> {formErrors.workPlace} </p> )
                                      }
                               </div>
                            </div>

                                                       
                          
                        

                     <button type="submit" className="btn btn-admin btn-block" disabled={!enabled} > <i className="fas fa-plus"></i> Add Officer</button> 
                  </form>
                   
                                      
               </div>
            </div>
                  
            ); 
     
     
          }

        
            
     }

}

const mapStateToProps = (state) =>{
     return {
        auth:state.firebase.auth
     }
}
const mapDispatchToProps = (dispatch,ownProps)=>{
   console.log('from mapDispatchTo props in AddOfficer Component');
   return {
      addOfficer :(officerData)=>dispatch(addOfficer(officerData))
  }
}

export default  connect(mapStateToProps,mapDispatchToProps) (AddOfficer);