import {combineReducers} from 'redux';
import authReducer from './authReducer';
import citizenReducer from './dataReducers/citizenReducer';
import officerReducer from './dataReducers/officerReducer';

import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';



const rootReducer = combineReducers({ 
          auth:authReducer,
          firestore:firestoreReducer,
          firebase:firebaseReducer,
          citizenReducer:citizenReducer,
          officerReducer:officerReducer
         
      });


export default rootReducer;
