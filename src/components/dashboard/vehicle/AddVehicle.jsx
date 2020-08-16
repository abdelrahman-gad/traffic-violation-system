

import React from 'react';

import {connect} from 'react-redux';

import {  Redirect ,NavLink } from 'react-router-dom';
import  { addVehicle } from '../../../store/actions/vehicleActions';

import { auth } from 'firebase';
import Logout from './../../layout/Logout';


const nameAndAddressRegex = RegExp(
   /\S+\s+\S+\s+\S+/
); 
const phoneRegex = RegExp(
   /(201)[0-9]{9}/
 );


class AddVehicle  extends React.Component {

   
   state={
    color:'',
    ownerId:'',
    type:'',
    taxEndDate:'',
    vehicleID:'' ,
    yearOfExamination:'',
    yearOfManufacture:'',
      formErrors:{
        color:'',
        ownerId:'',
        type:'',
        taxEndDate:'',
        vehicleID:'' ,
        yearOfExamination:'',
        yearOfManufacture:''
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
              
               type,
               ownerId,
               vehicleID,
               color,
               taxEndDate,
               yearOfExamination,
               yearOfManufacture
              }= this.state;
             let VehicleData = { 
                type,
                ownerId,
                vehicleID,
                color,
                taxEndDate,
                yearOfExamination,
                yearOfManufacture
              };
             this.props.addVehicle(VehicleData);
         }
      

         this.setState({
            type:'',
            ownerId:'',
            color:'',
            vehicleID:'',
            taxEndDate:'',
            yearOfExamination:'',
            yearOfManufacture:''                         
         });
        }

        
      handleChange = (e) =>{
         e.preventDefault();
         let { name , value} = e.target; //input name 
         
         let formErrors = this.state.formErrors;

       // add regex validains


         //  put the conditions in switch case

         switch(name){
            case 'type':
             
               formErrors.type = value.length <1 ? "Please select Vehicle type": "";
               break;
          
          case 'vehicleID':
                  formErrors.vehicleID=value.length < 5 ? "5 characters at least  requird for vehicle Id ":""    
                   break;

          case 'ownerId':
                    formErrors.ownerId=value.length < 6 ? "6 characters at least  requird for owner Id ":""    
                   break;          
          case 'yearOfExamination':
                    formErrors.yearOfExamination=value.length < 1 ? "Please , select Year of Examination":""    
                     break;          
          
          case 'yearOfManufacture':
               formErrors.yearOfManufacture=value.length < 1 ? "Please , select year of manufacture ": "" ;   
               break;
         
         case 'color':
              formErrors.color =value.length < 1 ? "Please, select color":"" ;   
              break;
          case 'taxEndDate':
                formErrors.taxEndDate =value.length < 1 ? "Please, select tax end date":"" ;   
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
           type,
           color,
           taxEndDate,
           ownerId,
           vehicleID,
           yearOfExamination,
           yearOfManufacture
          
          }= this.state;
        const enabled =
            type.length > 0 &&
            color.length > 0 &&
            vehicleID.length >0 &&
            ownerId.length > 0 &&
            yearOfExamination.length > 0 &&
            yearOfManufacture.length > 0 &&
            taxEndDate.length > 0 ;
            

            if(!auth.uid){
               return (<Redirect exact to="/signin/"  />);
            }else{ 

          return (
              
                <div className="row">
                    <div className="col-sm-2">

                    <div className="sidenav">

                         <NavLink  exact to="/addCitizen" > <i className="fas fa-user-plus"></i>  Add Citizen</NavLink>
                         <NavLink exact to="/citizenViolations" > Citizen Violations </NavLink>
                         <NavLink exact to="/addVehicle" className="active"> <i className="fas user-plus">  </i> Add Vehicle  </NavLink>
                         <NavLink exact to="/VehicleViolations">  Vehicle Violations </NavLink>
                         <NavLink exact to="/addOfficer" > Add Officer </NavLink>
                         <NavLink exact to="/officerHistory">Officer History  </NavLink>
                         <Logout />

                         </div>
                    </div>
                    <div className="col-sm-9 offset-sm-1 p-4">
             
                         <h1 className="text-white">Add Police Officer </h1>
                         <form action="dashboard.html" className="form" onSubmit={this.handleSubmit}>
                           
                           
                          
                            
                            <div className="form-group row">
                               <label className="col-sm-3 col-form-label ">Type</label>
                               <div className="col-sm-9">
                                 <select 
                                   id="type" 
                                   name="type" 
                                   className="form-control"
                                   value={this.state.type}
                                   onChange={this.handleChange}

                                   >
                                    <option value="">--Please choose an option--</option> 
                                    <option value="car">car</option>
                                    <option value="truck">truck</option>
                                    <option value="bus">bus</option>
                                    
                                 </select>
                                 {formErrors.type.length > 0 &&
                                          ( <p className="text-danger"> {formErrors.type} </p> )
                                      }
                               </div>
                            </div>
                            <div className="form-group row">
                               <label className="col-sm-3 col-form-label ">Vehicle Id</label>
                               <div className="col-sm-9">
                                   <input
                                    type="text" 
                                    className="form-control border" 
                                    id="vehicleID"
                                    name="vehicleID"
                                    placeholder=""
                                    value={this.state.vehicleID}
                                    onChange={this.handleChange}
                                    />
                                     {formErrors.vehicleID.length > 0 &&
                                          ( <p className="text-danger"> {formErrors.vehicleID} </p> )
                                      }
                               </div>
                            </div>
                            <div className="form-group row">
                               <label className="col-sm-3 col-form-label ">Owner Id</label>
                               <div className="col-sm-9">
                                   <input
                                    type="text" 
                                    className="form-control border" 
                                    id="ownerId"
                                    name="ownerId"
                                    placeholder=""
                                    value={this.state.ownerId}
                                    onChange={this.handleChange}
                                    />
                                     {formErrors.ownerId.length > 0 &&
                                          ( <p className="text-danger"> {formErrors.ownerId} </p> )
                                      }
                               </div>
                            </div>
                            <div className="form-group row">
                              <label  className="col-sm-3 col-form-label">Tax End Data</label>
                              <div className="col-sm-9">
                              <input 
                                type="date"  
                                className="form-control border" 
                                name="taxEndDate" 
                                id="taxEndDate" 
                                placeholder=""
                                onChange={this.handleChange}
                                value={this.state.taxEndDate}
                                 />
                                  {formErrors.taxEndDate.length > 0 &&
                                          ( <p className="text-danger"> {formErrors.taxEndDate} </p> )
                                      }
                            </div>
                           </div>
                            <div className="form-group row">
                               <label className="col-sm-3 col-form-label ">Color</label>
                               <div className="col-sm-9">
                                
                                 <select
                                   name="color" 
                                   id="color"
                                   onChange={this.handleChange}
                                   value={this.state.color}
                                   >
                                       <option value="">--Please choose an option--</option>
                                       <option value="red">red</option>
                                       <option value="black">black</option>
                                       <option value="white">white</option>
                                       <option value="green">green</option>
                                       <option value="blue">blue</option>
                                       <option value="yellow">yellow</option>
                                       <option value="silver">silver</option>

                                 </select>
                                 {formErrors.color.length > 0 &&
                                          ( <p className="text-danger"> {formErrors.color} </p> )
                                      }
                               </div>
                            </div>
                            <div className="form-group row">
                               <label className="col-sm-3 col-form-label ">year of examination</label>
                               <div className="col-sm-9">
                                
                                 <select
                                   name="yearOfExamination" 
                                   id="yearOfExamination"
                                   onChange={this.handleChange}
                                   value={this.state.yearOfExamination}
                                   >
                                       <option value="">--Please choose an option--</option>
                                        <option value="2020">2020</option>
                                        <option value="2019">2019</option>
                                        <option value="2018">2018</option>
                                        <option value="2017">2017</option>
                                        <option value="2016">2016</option>
                                        <option value="2015">2015</option>
                                        <option value="2014">2014</option>
                                        <option value="2013">2013</option>
                                        <option value="2012">2012</option>
                                        <option value="2011">2011</option>
                                        <option value="2010">2010</option>
                                        <option value="2009">2009</option>
                                        <option value="2008">2008</option>
                                        <option value="2007">2007</option>
                                        <option value="2006">2006</option>
                                        <option value="2005">2005</option>
                                        <option value="2004">2004</option>
                                        <option value="2003">2003</option>
                                        <option value="2002">2002</option>
                                        <option value="2001">2001</option>
                                        <option value="2000">2000</option>
                                        <option value="1999">1999</option>
                                        <option value="1998">1998</option>
                                        <option value="1997">1997</option>
                                        <option value="1996">1996</option>
                                        <option value="1995">1995</option>
                                        <option value="1994">1994</option>
                                        <option value="1993">1993</option>
                                        <option value="1992">1992</option>
                                        <option value="1991">1991</option>
                                        <option value="1990">1990</option>
                                        <option value="1989">1989</option>
                                        <option value="1988">1988</option>
                                        <option value="1987">1987</option>
                                        <option value="1986">1986</option>
                                        <option value="1985">1985</option>
                                        <option value="1984">1984</option>
                                        <option value="1983">1983</option>
                                        <option value="1982">1982</option>
                                        <option value="1981">1981</option>
                                        <option value="1980">1980</option>
                                        <option value="1979">1979</option>
                                        <option value="1978">1978</option>
                                        <option value="1977">1977</option>
                                        <option value="1976">1976</option>
                                        <option value="1975">1975</option>
                                        <option value="1974">1974</option>
                                        <option value="1973">1973</option>
                                        <option value="1972">1972</option>
                                        <option value="1971">1971</option>
                                        <option value="1970">1970</option>
                                        <option value="1969">1969</option>
                                        <option value="1968">1968</option>
                                        <option value="1967">1967</option>
                                        <option value="1966">1966</option>
                                        <option value="1965">1965</option>
                                        <option value="1964">1964</option>
                                        <option value="1963">1963</option>
                                        <option value="1962">1962</option>
                                        <option value="1961">1961</option>
                                        <option value="1960">1960</option>
                                        <option value="1959">1959</option>
                                        <option value="1958">1958</option>
                                        <option value="1957">1957</option>
                                        <option value="1956">1956</option>
                                        <option value="1955">1955</option>
                                        <option value="1954">1954</option>
                                        <option value="1953">1953</option>
                                        <option value="1952">1952</option>
                                        <option value="1951">1951</option>
                                        <option value="1950">1950</option>                                      
                                 </select>
                                 {formErrors.yearOfExamination.length > 0 &&
                                          ( <p className="text-danger"> {formErrors.yearOfExamination} </p> )
                                      }
                               </div>
                            </div>
                            <div className="form-group row">
                               <label className="col-sm-3 col-form-label ">year of Manufacture</label>
                               <div className="col-sm-9">
                                
                                 <select
                                   name="yearOfManufacture" 
                                   id="yearOfManufacture"
                                   onChange={this.handleChange}
                                   value={this.state.yearOfManufacture}
                                   >
                                       <option value="">--Please choose an option--</option>
                                        <option value="2020">2020</option>
                                        <option value="2019">2019</option>
                                        <option value="2018">2018</option>
                                        <option value="2017">2017</option>
                                        <option value="2016">2016</option>
                                        <option value="2015">2015</option>
                                        <option value="2014">2014</option>
                                        <option value="2013">2013</option>
                                        <option value="2012">2012</option>
                                        <option value="2011">2011</option>
                                        <option value="2010">2010</option>
                                        <option value="2009">2009</option>
                                        <option value="2008">2008</option>
                                        <option value="2007">2007</option>
                                        <option value="2006">2006</option>
                                        <option value="2005">2005</option>
                                        <option value="2004">2004</option>
                                        <option value="2003">2003</option>
                                        <option value="2002">2002</option>
                                        <option value="2001">2001</option>
                                        <option value="2000">2000</option>
                                        <option value="1999">1999</option>
                                        <option value="1998">1998</option>
                                        <option value="1997">1997</option>
                                        <option value="1996">1996</option>
                                        <option value="1995">1995</option>
                                        <option value="1994">1994</option>
                                        <option value="1993">1993</option>
                                        <option value="1992">1992</option>
                                        <option value="1991">1991</option>
                                        <option value="1990">1990</option>
                                        <option value="1989">1989</option>
                                        <option value="1988">1988</option>
                                        <option value="1987">1987</option>
                                        <option value="1986">1986</option>
                                        <option value="1985">1985</option>
                                        <option value="1984">1984</option>
                                        <option value="1983">1983</option>
                                        <option value="1982">1982</option>
                                        <option value="1981">1981</option>
                                        <option value="1980">1980</option>
                                        <option value="1979">1979</option>
                                        <option value="1978">1978</option>
                                        <option value="1977">1977</option>
                                        <option value="1976">1976</option>
                                        <option value="1975">1975</option>
                                        <option value="1974">1974</option>
                                        <option value="1973">1973</option>
                                        <option value="1972">1972</option>
                                        <option value="1971">1971</option>
                                        <option value="1970">1970</option>
                                        <option value="1969">1969</option>
                                        <option value="1968">1968</option>
                                        <option value="1967">1967</option>
                                        <option value="1966">1966</option>
                                        <option value="1965">1965</option>
                                        <option value="1964">1964</option>
                                        <option value="1963">1963</option>
                                        <option value="1962">1962</option>
                                        <option value="1961">1961</option>
                                        <option value="1960">1960</option>
                                        <option value="1959">1959</option>
                                        <option value="1958">1958</option>
                                        <option value="1957">1957</option>
                                        <option value="1956">1956</option>
                                        <option value="1955">1955</option>
                                        <option value="1954">1954</option>
                                        <option value="1953">1953</option>
                                        <option value="1952">1952</option>
                                        <option value="1951">1951</option>
                                        <option value="1950">1950</option>                                      
                                 </select>
                                 {formErrors.yearOfManufacture.length > 0 &&
                                          ( <p className="text-danger"> {formErrors.yearOfManufacture} </p> )
                                      }
                               </div>
                            </div>
                                                       
                            
                        

                     <button type="submit" className="btn btn-admin btn-block" disabled={!enabled} > <i className="fas fa-plus"></i> Add Citizen</button> 
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
   console.log('from mapDispatchTo props in AddVehicle Component');
   return {
      addVehicle :(vehicleData)=>dispatch(addVehicle(vehicleData))
  }
}

export default  connect(mapStateToProps,mapDispatchToProps) (AddVehicle);