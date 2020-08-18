export const signIn = (credentials) => {
    console.log('in actions')
    return (dispatch, getState, {getFirebase,getFirestore})=> {
      const firebase = getFirebase();
    
      firebase.auth().signInWithEmailAndPassword(credentials.email,credentials.password)
      .then(()=> dispatch({type:'SIGNIN_SUCCESS'}))
      .catch((err)=> 
         { 
            
            dispatch({type:'SIGNIN_ERROR',payload:err.message})
        }).then(()=>{
            console.log('retriev data and add it to the state');
        });
             
    }
}


export const  logOut = () =>{

    return (dispatch , getState , {getFirebase} )=>{
        const firebase = getFirebase();
        console.log('LogOut from store/authActions ');
        firebase.auth().signOut().then(() => {
          dispatch({ type: 'LOGOUT_SUCCESS' });
        });

    }
}
 


