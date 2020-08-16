const initialState = {
    addOfficerError:null
};

const citizenReducer = (state =initialState , action ) =>{

      switch(action.type){
          case 'ADD_OFFICER_SUCCESS':
              console.log('ADD_OFFICER_SUCCESS');
              return {
                  ...state
              }
          case  'ADD_OFFICER_ERROR':
              return {
                  ...state,
                  addOfficerError:action.payload
              }    
          default :     
              return state;

      }


}




export default citizenReducer;