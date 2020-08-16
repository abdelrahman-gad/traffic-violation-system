export const signIn = (credentials) => {
    console.log('in actions')
    return (dispatch, getState, {getFirebase,getFirestore})=> {
      const firebase = getFirebase();
    
      firebase.auth().signInWithEmailAndPassword(credentials.email,credentials.password)
      .then(()=> dispatch({type:'SIGNIN_SUCCESS'}))
      .catch((err)=> 
         { 
            
            dispatch({type:'SIGNIN_ERROR',payload:err.message})
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
 


export const signUp = (newUser) =>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase = getFirebase();
        const firestore = getFirestore();
        console.log(newUser);
         firebase.auth().createUserWithEmailAndPassword(
             newUser.email,
             newUser.password
         ).then( (resp) => {
            resp.user.updateProfile({
                photoURL:'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
            });
            return firestore.collection('users')
            .doc(resp.user.uid)
            .set({
                handle:newUser.handle,
                imageUrl:'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
                email:newUser.email,
                createdAt:new Date(),
                userId:resp.user.uid
             })
           }).then(()=>{
               
                dispatch({type:'SIGNUP_SUCCESS'});
           }).catch((err)=>{
                dispatch({type:'SIGNUP_ERROR',err}); //payload = error
           });
             

    }
}