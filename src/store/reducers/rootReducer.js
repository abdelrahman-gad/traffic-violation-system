import {combineReducers} from 'redux';
import authReducer from './authReducer';
import citizenReducer from './dataReducers/citizenReducer';
import officerReducer from './dataReducers/officerReducer';
import vehicleReducer from './dataReducers/vehicleReducer';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';








const rootReducer = combineReducers({ 
          auth:authReducer,
          firebase:firebaseReducer,
          citizens:citizenReducer,
          officers:officerReducer,
          vehicles:vehicleReducer,
      

});


export default rootReducer;
