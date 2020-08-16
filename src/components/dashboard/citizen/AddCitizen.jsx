

import React from 'react';

import {connect} from 'react-redux';

import {  Redirect ,NavLink } from 'react-router-dom';
import  { addCitizen } from '../../../store/actions/citizenAction';
import { auth } from 'firebase';
import Logout from './../../layout/Logout';


const nameAndAddressRegex = RegExp(
   /\S+\s+\S+\s+\S+/
); 
const phoneRegex = RegExp(
   /(201)[0-9]{9}/
 );


class AddCitizen  extends React.Component {

   
   state={
      name:'',
      phone:'',
      address:'',
      licenceNumber:'',
      job:'',
      licenceType:'',
      nationality:'',
      governorate:'',
      station:'',
      startDate:'',
      endDate:'',
      formErrors:{
         name:'',
         phone:'',
         address:'',
         licenceNumber:'',
         job:'',
         licenceType:'',
         nationality:'',
         governorate:'',
         station:'',
         startDate:'',
         endDate:''
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
               phone,
               address,
               job,
               nationality,
               station,
               startDate,
               endDate,
               governorate,
               licenceType,
               licenceNumber
              }= this.state;
             let citizenData = { 
                                 name,
                                 phone,
                                 address,
                                 job,
                                 nationality,
                                 station,
                                 startDate,
                                 endDate,
                                 governorate,
                                 licenceType,
                                 licenceNumber};
             this.props.addCitizen(citizenData);
         }
      

         this.setState({
            name:'',
            phone:'',
            address:'',
            licenceNumber:'',
            job:'',
            licenceType:'',
            nationality:'',
            governorate:'',
            station:'',
            startDate:'',
            endDate:''                  
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
             
               formErrors.name= nameAndAddressRegex.test(value)? "": "should enter three words name";
               break;
          case 'phone':
               
                formErrors.phone = phoneRegex.test(value) ? "" : "Invalid Phone Number format";
                break;

          case 'address':
             formErrors.address = nameAndAddressRegex.test(value) ? "":"Invalid address input"
             break;
          case 'nationality':
             formErrors.nationality= value.length < 1 ? "PLz select a nationality" : "";
              break;   
          case 'licenceNumber':
              formErrors.licenceNumber=value.length < 6 ? " 6 required characters at least for licence number ":""    
               break;
          case 'licenceType':
                  formErrors.licenceType=value.length < 1 ? " Please , select licene type ":""    
                   break;
          case 'job':
               formErrors.job=value.length < 3 ? "3 characters at least required for job ":""    
               break;
          case 'governorate':
               formErrors.governorate=value.length < 1 ? "PlZ Select Governorate ": "" ;   
               break;
         
         case 'station':
            formErrors.station=value.length < 1 ? "Please, select station":"" ;   
            break;
         case 'startDate':
               formErrors.startDate=value.length < 1 ? "PlZ, Select Start Date ":""  ;  
               break;   
         case 'endDate':
            formErrors.endDate=value.length < 1 ? "Please , select End Date  ":""    
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
           phone,
           address,
           job,
           nationality,
           station,
           startDate,
           endDate,
           governorate,
           licenceType,
           licenceNumber
          }= this.state;
        const enabled =
            name.length > 0 &&
            phone.length > 0 &&
            address.length > 0 &&
            licenceNumber.length > 0 &&
            licenceType.length > 0 &&
            job.length > 0 &&
            startDate.length > 0 &&
            endDate.length > 0 &&
            governorate.length > 0 &&
            station.length > 0 &&
            nationality.length > 0;

            if(!auth.uid){
               return (<Redirect exact to="/signin/"  />);
            }else{ 

          return (
              
                <div className="row">
                    <div className="col-sm-2">

                    <div className="sidenav">

                         <NavLink  exact to="/addCitizen" className="active"> <i className="fas fa-user-plus"></i>  Add Citizen</NavLink>
                         <NavLink exact to="/citizenViolations" > Citizen Violations </NavLink>
                         <NavLink exact to="/addVehicle"> <i className="fas user-plus">  </i> Add Vehicle  </NavLink>
                         <NavLink exact to="/VehicleViolations">  Vehicle Violations </NavLink>
                         <NavLink exact to="/addOfficer"> Add Officer </NavLink>
                         <NavLink exact to="/officerHistory">Officer History  </NavLink>
                         <Logout />
                         </div>
                    </div>
                    <div className="col-sm-9 offset-sm-1 p-4">
             
                         <h1 className="text-white">Add Citizen </h1>
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
                               <label  className="col-sm-3 col-form-label ">Phone</label>
                               <div className="col-sm-9">
                                   <input 
                                     type="phone"
                                     className="form-control border"
                                     id="phone" 
                                     name='phone'
                                     placeholder=""
                                     value={this.state.phone}
                                     onChange={this.handleChange}

                                     />
                                      {formErrors.phone.length > 0 &&
                                          ( <p className="text-danger"> {formErrors.phone} </p> )
                                      }
                               </div>
                            </div>
                            <div className="form-group row">
                               <label className="col-sm-3 col-form-label ">Address</label>
                               <div className="col-sm-9">
                                   <input 
                                      type="text"   
                                      className="form-control border" 
                                      id="address" 
                                      name="address" 
                                      placeholder=""
                                      onChange={this.handleChange}
                                      value={this.state.address}
                                     />
                                     {formErrors.address.length > 0 &&
                                          ( <p className="text-danger"> {formErrors.address} </p> )
                                      }
                               </div>
                            </div>
                            
                            <div className="form-group row">
                               <label className="col-sm-3 col-form-label ">Nationality</label>
                               <div className="col-sm-9">
                                 <select 
                                   id="nationality" 
                                   name="nationality" 
                                   className="form-control"
                                   onChange={this.handleChange}
                                   value={this.state.nationality}
                                   >
                                       <option value="">--Please choose an option--</option>
                                       <option value="Afganistan">Afghanistan</option>
                                       <option value="Albania">Albania</option>
                                       <option value="Algeria">Algeria</option>
                                       <option value="American Samoa">American Samoa</option>
                                       <option value="Andorra">Andorra</option>
                                       <option value="Angola">Angola</option>
                                       <option value="Anguilla">Anguilla</option>
                                       <option value="Antigua & Barbuda">Antigua & Barbuda</option>
                                       <option value="Argentina">Argentina</option>
                                       <option value="Armenia">Armenia</option>
                                       <option value="Aruba">Aruba</option>
                                       <option value="Australia">Australia</option>
                                       <option value="Austria">Austria</option>
                                       <option value="Azerbaijan">Azerbaijan</option>
                                       <option value="Bahamas">Bahamas</option>
                                       <option value="Bahrain">Bahrain</option>
                                       <option value="Bangladesh">Bangladesh</option>
                                       <option value="Barbados">Barbados</option>
                                       <option value="Belarus">Belarus</option>
                                       <option value="Belgium">Belgium</option>
                                       <option value="Belize">Belize</option>
                                       <option value="Benin">Benin</option>
                                       <option value="Bermuda">Bermuda</option>
                                       <option value="Bhutan">Bhutan</option>
                                       <option value="Bolivia">Bolivia</option>
                                       <option value="Bonaire">Bonaire</option>
                                       <option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>
                                       <option value="Botswana">Botswana</option>
                                       <option value="Brazil">Brazil</option>
                                       <option value="British Indian Ocean Ter">British Indian Ocean Ter</option>
                                       <option value="Brunei">Brunei</option>
                                       <option value="Bulgaria">Bulgaria</option>
                                       <option value="Burkina Faso">Burkina Faso</option>
                                       <option value="Burundi">Burundi</option>
                                       <option value="Cambodia">Cambodia</option>
                                       <option value="Cameroon">Cameroon</option>
                                       <option value="Canada">Canada</option>
                                       <option value="Canary Islands">Canary Islands</option>
                                       <option value="Cape Verde">Cape Verde</option>
                                       <option value="Cayman Islands">Cayman Islands</option>
                                       <option value="Central African Republic">Central African Republic</option>
                                       <option value="Chad">Chad</option>
                                       <option value="Channel Islands">Channel Islands</option>
                                       <option value="Chile">Chile</option>
                                       <option value="China">China</option>
                                       <option value="Christmas Island">Christmas Island</option>
                                       <option value="Cocos Island">Cocos Island</option>
                                       <option value="Colombia">Colombia</option>
                                       <option value="Comoros">Comoros</option>
                                       <option value="Congo">Congo</option>
                                       <option value="Cook Islands">Cook Islands</option>
                                       <option value="Costa Rica">Costa Rica</option>
                                       <option value="Cote DIvoire">Cote DIvoire</option>
                                       <option value="Croatia">Croatia</option>
                                       <option value="Cuba">Cuba</option>
                                       <option value="Curaco">Curacao</option>
                                       <option value="Cyprus">Cyprus</option>
                                       <option value="Czech Republic">Czech Republic</option>
                                       <option value="Denmark">Denmark</option>
                                       <option value="Djibouti">Djibouti</option>
                                       <option value="Dominica">Dominica</option>
                                       <option value="Dominican Republic">Dominican Republic</option>
                                       <option value="East Timor">East Timor</option>
                                       <option value="Ecuador">Ecuador</option>
                                       <option value="Egypt">Egypt</option>
                                       <option value="El Salvador">El Salvador</option>
                                       <option value="Equatorial Guinea">Equatorial Guinea</option>
                                       <option value="Eritrea">Eritrea</option>
                                       <option value="Estonia">Estonia</option>
                                       <option value="Ethiopia">Ethiopia</option>
                                       <option value="Falkland Islands">Falkland Islands</option>
                                       <option value="Faroe Islands">Faroe Islands</option>
                                       <option value="Fiji">Fiji</option>
                                       <option value="Finland">Finland</option>
                                       <option value="France">France</option>
                                       <option value="French Guiana">French Guiana</option>
                                       <option value="French Polynesia">French Polynesia</option>
                                       <option value="French Southern Ter">French Southern Ter</option>
                                       <option value="Gabon">Gabon</option>
                                       <option value="Gambia">Gambia</option>
                                       <option value="Georgia">Georgia</option>
                                       <option value="Germany">Germany</option>
                                       <option value="Ghana">Ghana</option>
                                       <option value="Gibraltar">Gibraltar</option>
                                       <option value="Great Britain">Great Britain</option>
                                       <option value="Greece">Greece</option>
                                       <option value="Greenland">Greenland</option>
                                       <option value="Grenada">Grenada</option>
                                       <option value="Guadeloupe">Guadeloupe</option>
                                       <option value="Guam">Guam</option>
                                       <option value="Guatemala">Guatemala</option>
                                       <option value="Guinea">Guinea</option>
                                       <option value="Guyana">Guyana</option>
                                       <option value="Haiti">Haiti</option>
                                       <option value="Hawaii">Hawaii</option>
                                       <option value="Honduras">Honduras</option>
                                       <option value="Hong Kong">Hong Kong</option>
                                       <option value="Hungary">Hungary</option>
                                       <option value="Iceland">Iceland</option>
                                       <option value="Indonesia">Indonesia</option>
                                       <option value="India">India</option>
                                       <option value="Iran">Iran</option>
                                       <option value="Iraq">Iraq</option>
                                       <option value="Ireland">Ireland</option>
                                       <option value="Isle of Man">Isle of Man</option>
                                       <option value="Israel">Israel</option>
                                       <option value="Italy">Italy</option>
                                       <option value="Jamaica">Jamaica</option>
                                       <option value="Japan">Japan</option>
                                       <option value="Jordan">Jordan</option>
                                       <option value="Kazakhstan">Kazakhstan</option>
                                       <option value="Kenya">Kenya</option>
                                       <option value="Kiribati">Kiribati</option>
                                       <option value="Korea North">Korea North</option>
                                       <option value="Korea Sout">Korea South</option>
                                       <option value="Kuwait">Kuwait</option>
                                       <option value="Kyrgyzstan">Kyrgyzstan</option>
                                       <option value="Laos">Laos</option>
                                       <option value="Latvia">Latvia</option>
                                       <option value="Lebanon">Lebanon</option>
                                       <option value="Lesotho">Lesotho</option>
                                       <option value="Liberia">Liberia</option>
                                       <option value="Libya">Libya</option>
                                       <option value="Liechtenstein">Liechtenstein</option>
                                       <option value="Lithuania">Lithuania</option>
                                       <option value="Luxembourg">Luxembourg</option>
                                       <option value="Macau">Macau</option>
                                       <option value="Macedonia">Macedonia</option>
                                       <option value="Madagascar">Madagascar</option>
                                       <option value="Malaysia">Malaysia</option>
                                       <option value="Malawi">Malawi</option>
                                       <option value="Maldives">Maldives</option>
                                       <option value="Mali">Mali</option>
                                       <option value="Malta">Malta</option>
                                       <option value="Marshall Islands">Marshall Islands</option>
                                       <option value="Martinique">Martinique</option>
                                       <option value="Mauritania">Mauritania</option>
                                       <option value="Mauritius">Mauritius</option>
                                       <option value="Mayotte">Mayotte</option>
                                       <option value="Mexico">Mexico</option>
                                       <option value="Midway Islands">Midway Islands</option>
                                       <option value="Moldova">Moldova</option>
                                       <option value="Monaco">Monaco</option>
                                       <option value="Mongolia">Mongolia</option>
                                       <option value="Montserrat">Montserrat</option>
                                       <option value="Morocco">Morocco</option>
                                       <option value="Mozambique">Mozambique</option>
                                       <option value="Myanmar">Myanmar</option>
                                       <option value="Nambia">Nambia</option>
                                       <option value="Nauru">Nauru</option>
                                       <option value="Nepal">Nepal</option>
                                       <option value="Netherland Antilles">Netherland Antilles</option>
                                       <option value="Netherlands">Netherlands (Holland, Europe)</option>
                                       <option value="Nevis">Nevis</option>
                                       <option value="New Caledonia">New Caledonia</option>
                                       <option value="New Zealand">New Zealand</option>
                                       <option value="Nicaragua">Nicaragua</option>
                                       <option value="Niger">Niger</option>
                                       <option value="Nigeria">Nigeria</option>
                                       <option value="Niue">Niue</option>
                                       <option value="Norfolk Island">Norfolk Island</option>
                                       <option value="Norway">Norway</option>
                                       <option value="Oman">Oman</option>
                                       <option value="Pakistan">Pakistan</option>
                                       <option value="Palau Island">Palau Island</option>
                                       <option value="Palestine">Palestine</option>
                                       <option value="Panama">Panama</option>
                                       <option value="Papua New Guinea">Papua New Guinea</option>
                                       <option value="Paraguay">Paraguay</option>
                                       <option value="Peru">Peru</option>
                                       <option value="Phillipines">Philippines</option>
                                       <option value="Pitcairn Island">Pitcairn Island</option>
                                       <option value="Poland">Poland</option>
                                       <option value="Portugal">Portugal</option>
                                       <option value="Puerto Rico">Puerto Rico</option>
                                       <option value="Qatar">Qatar</option>
                                       <option value="Republic of Montenegro">Republic of Montenegro</option>
                                       <option value="Republic of Serbia">Republic of Serbia</option>
                                       <option value="Reunion">Reunion</option>
                                       <option value="Romania">Romania</option>
                                       <option value="Russia">Russia</option>
                                       <option value="Rwanda">Rwanda</option>
                                       <option value="St Barthelemy">St Barthelemy</option>
                                       <option value="St Eustatius">St Eustatius</option>
                                       <option value="St Helena">St Helena</option>
                                       <option value="St Kitts-Nevis">St Kitts-Nevis</option>
                                       <option value="St Lucia">St Lucia</option>
                                       <option value="St Maarten">St Maarten</option>
                                       <option value="St Pierre & Miquelon">St Pierre & Miquelon</option>
                                       <option value="St Vincent & Grenadines">St Vincent & Grenadines</option>
                                       <option value="Saipan">Saipan</option>
                                       <option value="Samoa">Samoa</option>
                                       <option value="Samoa American">Samoa American</option>
                                       <option value="San Marino">San Marino</option>
                                       <option value="Sao Tome & Principe">Sao Tome & Principe</option>
                                       <option value="Saudi Arabia">Saudi Arabia</option>
                                       <option value="Senegal">Senegal</option>
                                       <option value="Seychelles">Seychelles</option>
                                       <option value="Sierra Leone">Sierra Leone</option>
                                       <option value="Singapore">Singapore</option>
                                       <option value="Slovakia">Slovakia</option>
                                       <option value="Slovenia">Slovenia</option>
                                       <option value="Solomon Islands">Solomon Islands</option>
                                       <option value="Somalia">Somalia</option>
                                       <option value="South Africa">South Africa</option>
                                       <option value="Spain">Spain</option>
                                       <option value="Sri Lanka">Sri Lanka</option>
                                       <option value="Sudan">Sudan</option>
                                       <option value="Suriname">Suriname</option>
                                       <option value="Swaziland">Swaziland</option>
                                       <option value="Sweden">Sweden</option>
                                       <option value="Switzerland">Switzerland</option>
                                       <option value="Syria">Syria</option>
                                       <option value="Tahiti">Tahiti</option>
                                       <option value="Taiwan">Taiwan</option>
                                       <option value="Tajikistan">Tajikistan</option>
                                       <option value="Tanzania">Tanzania</option>
                                       <option value="Thailand">Thailand</option>
                                       <option value="Togo">Togo</option>
                                       <option value="Tokelau">Tokelau</option>
                                       <option value="Tonga">Tonga</option>
                                       <option value="Trinidad & Tobago">Trinidad & Tobago</option>
                                       <option value="Tunisia">Tunisia</option>
                                       <option value="Turkey">Turkey</option>
                                       <option value="Turkmenistan">Turkmenistan</option>
                                       <option value="Turks & Caicos Is">Turks & Caicos Is</option>
                                       <option value="Tuvalu">Tuvalu</option>
                                       <option value="Uganda">Uganda</option>
                                       <option value="United Kingdom">United Kingdom</option>
                                       <option value="Ukraine">Ukraine</option>
                                       <option value="United Arab Erimates">United Arab Emirates</option>
                                       <option value="United States of America">United States of America</option>
                                       <option value="Uraguay">Uruguay</option>
                                       <option value="Uzbekistan">Uzbekistan</option>
                                       <option value="Vanuatu">Vanuatu</option>
                                       <option value="Vatican City State">Vatican City State</option>
                                       <option value="Venezuela">Venezuela</option>
                                       <option value="Vietnam">Vietnam</option>
                                       <option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>
                                       <option value="Virgin Islands (USA)">Virgin Islands (USA)</option>
                                       <option value="Wake Island">Wake Island</option>
                                       <option value="Wallis & Futana Is">Wallis & Futana Is</option>
                                       <option value="Yemen">Yemen</option>
                                       <option value="Zaire">Zaire</option>
                                       <option value="Zambia">Zambia</option>
                                       <option value="Zimbabwe">Zimbabwe</option> 
                                 </select>
                                 {formErrors.nationality.length > 0 &&
                                          ( <p className="text-danger"> {formErrors.nationality} </p> )
                                      }
                               </div>
                            </div>   
                            <div className="form-group row">
                               <label className="col-sm-3 col-form-label ">Licence Number</label>
                               <div className="col-sm-9">
                                   <input 
                                      type="text"  
                                      className="form-control border" 
                                      id="licenceNumber" 
                                      name="licenceNumber"
                                      placeholder=""
                                      value={this.state.licenceNumber}
                                      onChange={this.handleChange}
                                    />
                                     {formErrors.licenceNumber.length > 0 &&
                                          ( <p className="text-danger"> {formErrors.licenceNumber} </p> )
                                      }
                               </div>
                            </div>
                            <div className="form-group row">
                               <label className="col-sm-3 col-form-label ">Job</label>
                               <div className="col-sm-9">
                                   <input 
                                       type="text"  
                                       className="form-control border" 
                                       id="job" 
                                       name="job"
                                       placeholder=""
                                       value={this.state.job}
                                       onChange={this.handleChange}

                                    />
                                     {formErrors.job.length > 0 &&
                                          ( <p className="text-danger"> {formErrors.job} </p> )
                                      }
                               </div>
                            </div>
                            <div className="form-group row">
                               <label className="col-sm-3 col-form-label ">Licence Type</label>
                               <div className="col-sm-9">
                                 <select 
                                   id="licenceType" 
                                   name="licenceType" 
                                   className="form-control"
                                   value={this.state.licenceType}
                                   onChange={this.handleChange}

                                   >
                                    <option value="">--Please choose an option--</option> 
                                    <option value="first degree">First degree</option>
                                    <option value="second degree">second degree</option>
                                    <option value="third degree">third degree</option>
                                 </select>
                                 {formErrors.licenceType.length > 0 &&
                                          ( <p className="text-danger"> {formErrors.licenceType} </p> )
                                      }
                               </div>
                            </div>
                            <div className="form-group row">
                               <label className="col-sm-3 col-form-label ">Governorate</label>
                               <div className="col-sm-9">
                                <select 
                                  name="governorate" 
                                  id="governorate" 
                                  className="form-control"
                                  onChange={this.handleChange}
                                  value={this.state.governorate}
                                  >
                                    <option value="">--Please choose an option--</option>
                                    <option value="Alexandria">Alexandria</option>
                                    <option value="Aswan">Aswan</option>
                                    <option value="Asyut">Asyut</option>
                                    <option value="Beheira">Beheira</option>
                                    <option value="Beni-Suef">Beni Suef</option>
                                    <option value="Cairo">Cairo</option>
                                    <option value="Dakahlia">Dakahlia</option>
                                    <option value="Damietta">Damietta</option>
                                    <option value="Faiyum">Faiyum</option>
                                    <option value="Gharbia">Gharbia</option>
                                    <option value="Giza">Giza</option>
                                    <option value="Ismailia">Ismailia</option>
                                    <option value="Kafr-El-Sheikh">Kafr El Sheikh</option>
                                    <option value="Luxor">Luxor</option>
                                    <option value="Matruh">Matruh</option>
                                    <option value="Minya">Minya</option>
                                    <option value="Monufia">Monufia</option>
                                    <option value="New-Valley">New Valley</option>
                                    <option value="North-Sinai">North Sinai</option>
                                    <option value="Port-Said">Port Said</option>
                                    <option value="Qalyubia">Qalyubia</option>
                                    <option value="Qena">Qena</option>
                                    <option value="Red-Sea">Red Sea</option>
                                    <option value="Sharqia">Sharqia</option>
                                    <option value="Sohag">Sohag</option>
                                    <option value="South-Sinai">South Sinai</option>
                                    <option value="Suez">Suez</option>
                                </select>    
                                {formErrors.governorate.length > 0 &&
                                          ( <p className="text-danger"> {formErrors.governorate} </p> )
                                      }                        
                               </div>
                            </div>
                            <div className="form-group row">
                               <label className="col-sm-3 col-form-label ">Traffic Mangement</label>
                               <div className="col-sm-9">
                                
                                 <select
                                   name="station" 
                                   id="station"
                                   onChange={this.handleChange}
                                   value={this.state.station}
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
                                 {formErrors.station.length > 0 &&
                                          ( <p className="text-danger"> {formErrors.station} </p> )
                                      }
                               </div>
                            </div>
                                                       
                            <div className="form-group row">
                              <label  className="col-sm-3 col-form-label">Start Date</label>
                              <div className="col-sm-9">
                              <input 
                                type="date"  
                                className="form-control border" 
                                name="startDate" 
                                id="startDate" 
                                placeholder=""
                                onChange={this.handleChange}
                                value={this.state.startDate}
                                 />
                                  {formErrors.startDate.length > 0 &&
                                          ( <p className="text-danger"> {formErrors.startDate} </p> )
                                      }
                            </div>
                           </div>
                           <div className="form-group row">
                                 <label  className="col-sm-3 col-form-label">End Date</label>
                                 <div className="col-sm-9">
                                 <input 
                                    type="date"   
                                    className="form-control border" 
                                    name="endDate" 
                                    id="endDate" 
                                    placeholder=""
                                    onChange={this.handleChange}
                                    value={this.state.endDate}
                                 />
                                 {formErrors.endDate.length > 0 &&
                                          ( <p className="text-danger"> {formErrors.endDate} </p> )
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
   console.log('from mapDispatchTo props')
   return {
      addCitizen :(citizenData)=>dispatch(addCitizen(citizenData))
  }
}

export default  connect(mapStateToProps,mapDispatchToProps) (AddCitizen);