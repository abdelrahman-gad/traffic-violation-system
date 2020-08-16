
// add Officer is compound operation 
// signup + add officer records in in officer collections

export const addOfficer = (officerData) =>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase = getFirebase();
        const firestore = getFirestore();
        console.log('addOfficers actions');
        console.log(officerData);

         firebase.auth().createUserWithEmailAndPassword(
             officerData.policeNumber+'@police.com',
             officerData.policeNumber
         ).then( (resp) => {
           // const citizenId = getState().firebase.auth.uid;
            console.log('authenticated');
          ///  console.log('response '+ resp);
          const officerRef = firebase.database().ref('officer');
                     
          officerRef.child(officerData.policeNumber).set({
                        ...officerData,
                        email:officerData.policeNumber+'@police.com',
                        id:resp.user.uid
                    });
        
                    }).then(()=>{
                        
                            dispatch({type:'ADD_OFFICER_SUCCESS'});
                    }).catch((err)=>{
                            dispatch({type:'ADD_OFFICER_ERROR',err});//payload = error
                    });
             

    }
}