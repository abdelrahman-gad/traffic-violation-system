const initState={
    authError:null
}
const authReducer = ( state= initState , action ) =>{
    switch(action.type){
        case 'SIGNUP_SUCCESS':
            console.log('sign up successfully');
            return {
                ...state,
                authError:null
            }
        case 'SIGNUP_ERROR':
            console.log('sign up error');
            return {
                ...state,
                authError:action.payload
            }   
        case 'SIGNOUT_SUCCESS':
            console.log('sign out successfully from reducers/authReducer.js');
            return {
                ...state,
                authError:null
            }
        case 'SIGNIN_SUCCESS':
            console.log('sign in success');  
            return{
                ...state,
                authError:null
            }  
        case 'SIGNIN_ERROR':
            console.log('sign in error');
            console.log(action.payload);
            return{
                ...state,
                authError:action.payload
            }   
        default:
            return {
                ...state,
                authError:null
            }    
    }

}
export  default authReducer ;


