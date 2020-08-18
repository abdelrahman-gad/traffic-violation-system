const initialState = {
    addVehicleError:null
};

const vehicleReducer = (state = initialState , action ) =>{

      switch(action.type){
          case 'ADD_VEHICLE_SUCCESS':
              console.log('ADD_VEHICLE_SUCCESS');
              return {
                  ...state
              }
          case  'ADD_VEHECLE_ERROR':
              return {
                  ...state,
                  addVehicleError:action.payload
              }    
          default :     
              return state;
      }

}




export default vehicleReducer;