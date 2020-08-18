
// add Officer is compound operation 
// signup + add officer records in in officer collections

export const addVehicle = (vehicleData) =>{
    return (dispatch,getState,{getFirebase,getFirestore})=>{
        const firebase = getFirebase();
        const firestore = getFirestore();
        console.log('addVehicle actions');
        console.log(vehicleData);

          const vehicleRef = firebase.database().ref('vehicle');
          const citizenVehicleRef=firebase.database().ref('citizen_vehicles');
          
          vehicleRef.child(vehicleData.vehicleID).set(vehicleData);
                           
          citizenVehicleRef.child(vehicleData.ownerId)
                           .child('vehicles')
                           .push(vehicleData.vehicleID).then(()=>{                     
                                       dispatch({type:'ADD_VEHICLE_SUCCESS'});
                                }).catch((err)=>{
                                        dispatch({type:'ADD_VEHICLE_ERROR',err});//payload = error
                                });;

      }
}






