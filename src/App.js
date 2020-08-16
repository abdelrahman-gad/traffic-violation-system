import React from 'react';
import './styles/App.scss';
import SignIn from './components/auth/SignIn';
import SigninForm from './components/auth/SigninForm';


import AddCitizen from './components/dashboard/citizen/AddCitizen';
import { BrowserRouter , Switch , Route} from 'react-router-dom';

import Dashboard from './components/dashboard/Dashboard';
import AddOfficer from './components/dashboard/officer/AddOfficer';
import AddVehicle from './components/dashboard/vehicle/AddVehicle';



function App() {
  return (
    <BrowserRouter> 
      <div className="container">
        
         <Switch>
            <Route exact path='/signin' component={SignIn} />  
            <Route exact path='/' component={Dashboard}  />    
            <Route exact path='/addCitizen' component={AddCitizen}  />  
            <Route exact path='/addOfficer' component={AddOfficer}  />    
            <Route exact path='/addVehicle' component={AddVehicle}  />    

      
         </Switch>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
