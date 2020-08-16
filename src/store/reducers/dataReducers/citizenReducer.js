const initialState = {
    addCitizenError:null
};

const citizenReducer = (state =initialState , action ) =>{

      switch(action.type){
          case 'ADD_CITIZEN_SUCCESS':
              console.log('ADD_CITIZEN_SUCCESS');
              return {
                  ...state
              }
          case  'ADD_CITIZEN_ERROR':
              return {
                  ...state,
                  addCitizenError:action.payload
              }    
          default :     
              return state;

      }


}




export default citizenReducer;