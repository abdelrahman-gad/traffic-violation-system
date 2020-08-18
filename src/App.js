import React from 'react';
import './styles/App.scss';
import SignIn from './components/auth/SignIn';

import {Component} from 'react';
import AddCitizen from './components/dashboard/citizen/AddCitizen';
import { BrowserRouter , Switch , Route} from 'react-router-dom';

import Dashboard from './components/dashboard/Dashboard';
import AddOfficer from './components/dashboard/officer/AddOfficer';
import AddVehicle from './components/dashboard/vehicle/AddVehicle';
import OfficerHistory from './components/dashboard/officer/OfficerHistory';
import VehicleViolations from './components/dashboard/vehicle/VehicleViolations';
import CitizenViolations from './components/dashboard/citizen/CitizenViolations';
import NotFoundPage from './components/layout/NotFoundPage';


class App extends Component {
    
componentDidMount(){
   console.log('App componentDidMount');
}
componentDidUpdate(){
  console.log('App componeDidUpdate');
}

render(){ 

  return (
    <BrowserRouter> 
      <div className="container">
        
         <Switch>
            <Route exact path='/signin' component={SignIn} />  
            <Route exact path='/' component={Dashboard}  />    
            <Route exact path='/addCitizen' component={AddCitizen}  />  
            <Route exact path='/addOfficer' component={AddOfficer}  />    
            <Route exact path='/addVehicle' component={AddVehicle}  /> 
            <Route exact path="/vehicleViolations"  component={VehicleViolations}/>   
            <Route exact path="/citizenViolations"  component={CitizenViolations}/>   
            <Route exact path="/officerHistory"  component={OfficerHistory}/>   
            <Route exact path="*"  component={NotFoundPage}/>         
         </Switch>
      </div>
    </BrowserRouter>
    
   );
  }
}

export default App;
