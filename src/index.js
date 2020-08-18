import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

// import configurations
 import fbConfig from './config/fbConfig';
 import  firebase from 'firebase/app';
 
 import {Provider,useSelector } from 'react-redux';

 import {createStore , applyMiddleware , compose} from 'redux';
 import rootReducer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';
import {
  
  getFirestore,
  reduxFirestore
} from "redux-firestore";
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from "react-redux-firebase";

// wait users to be loaded then render 
console.log(isLoaded);

function AuthIsLoaded({ children }) {
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <h1 className="text-white text-large text-center m-auto">PlZ, Wait for loading data </h1>;
  return children;
}





//

const store = createStore(
        rootReducer,
        compose(
          applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
          reduxFirestore(firebase, fbConfig),
          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )

);









const rrfProps = {
  firebase,
  config: {
      ...fbConfig
    } ,   
  dispatch: store.dispatch
};




ReactDOM.render(
  
  <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        {/* <BrowserRouter> */}
          <AuthIsLoaded>
        
               <App/>  { /* Rest of App Components */}
          
          </AuthIsLoaded>
        {/* </BrowserRouter> */}
      </ReactReduxFirebaseProvider>
    </Provider>
,
document.getElementById('root')
);


serviceWorker.unregister();
