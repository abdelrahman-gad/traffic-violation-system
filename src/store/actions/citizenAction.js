
// add Citizen is compound operation 
// signup + add citizen records in in citizen collections

export const addCitizen = (citizenData) =>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase = getFirebase();
        const firestore = getFirestore();
        console.log('addCitizen actions');
        console.log(citizenData);

         firebase.auth().createUserWithEmailAndPassword(
             citizenData.licenceNumber+'@citizen.com',
             citizenData.licenceNumber
         ).then( (resp) => {
           // const citizenId = getState().firebase.auth.uid;
            console.log('authenticated');
          ///  console.log('response '+ resp);
          const citizenRef = firebase.database().ref('citizen');
                     
          citizenRef.child(citizenData.licenceNumber).set({
                        ...citizenData,
                        email:citizenData.licenceNumber+'@citizen.com',
                        id:resp.user.uid
                    });
        
                    }).then(()=>{
                        
                            dispatch({type:'ADD_CITIZEN_SUCCESS'});
                    }).catch((err)=>{
                            dispatch({type:'ADD_CITIZEN_ERROR',err});//payload = error
                    });
             

    }
}