import React from 'react';
import { connect } from 'react-redux';
import {Redirect,NavLink} from 'react-router-dom';
import {signIn } from '../../store/actions/authActions';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formNotValid = ({formErrors,...rest}) =>{
  let valid = true;
  Object.values(formErrors).forEach(val=>{
    if(val.length > 0){ //this  means there is som error
       valid = false;
    }
  });

 // validate the form was filled out
 Object.values(rest).forEach(val => {
        val === null && (valid = false);
 });


  return valid;
}


class SignIn  extends React.Component{

  constructor(props){
      super(props);
      this.state={
        email:"",
        password:"",
       
        formErrors:{
          email:'',
          password:''
        }
      }
      this.handleSubmit=this.handleSubmit.bind(this);
      this.handleChange=this.handleChange.bind(this);
  }


 handleChange = (e) =>{
  e.preventDefault();
  let { name , value} = e.target; //input name 
  
  let formErrors = this.state.formErrors;
  //  put the conditions in switch case
  switch(name){
     case 'email':
        formErrors.email=
         emailRegex.test(value)  ? " " : "Invalid email address format";
         break;
     case 'password':
         formErrors.password= value.length < 6 ? "minimum 6 characters required ": "";
         break; 
     default:
        break;
  }

  this.setState({formErrors,[name]:value});
  console.log(this.state);

}
handleSubmit = (e) => {
     e.preventDefault();
     console.log('handleSubmit method');
    //  add validation rules before submitting values
    
    if(formNotValid(this.state)){ //if for
      
      console.log(`--FORM SUBMITTING FORM ERROR-- `);

    }else{ 
        console.log(`  VALID INPUTS  `);
            //end validation rules
            this.props.signIn(this.state);
    }
      
}
render(){
  console.log(this.props.auth);
  const {auth} =this.props;
  if(auth.uid){
    return (<Redirect exact to="/" />);
  } 
   const {formErrors ,email,password }  = this.state;
  
   const enabled =
          email.length > 0 &&
          password.length > 0;

  return (
    <div className="">
    
    <div className="row p-3">
       
        <div className="col-sm-9 mx-auto col-lg-6 offset-lg-0 mb-0">
          <form onSubmit={this.handleSubmit}>
            <h3 className="form-title text-center pb-3">
             Admin Login Page
            </h3>
            <div className="form-group">
                <input 
                   type="email"
                   className={formErrors.email.length > 0 ? "form-control border border-danger" : "form-control"}
                   aria-describedby="emailHelp"
                   placeholder="email"
                   id="email"
                   name="email"
                   onChange={this.handleChange}
                   noValidate
                 />
                 {formErrors.email.length > 0 &&
                   ( <p className="text-danger"> {formErrors.email} </p> )
                 }
              </div>

           <div className="form-group">
              <input
                 type="password"
                 className={formErrors.password.length > 0 ? "form-control border border-danger" : "form-control"}
                 placeholder="password"
                 id="password"
                 name="password"
                 onChange={this.handleChange}
                 
                 noValidate
             
                 />
                   {formErrors.password.length > 0 &&
                   ( <p className="text-danger"> {formErrors.password} </p> )
                 }
            </div>

            <button  className="btn btn-primary btn-block btn-admin"  disabled={!enabled}>Log In </button>
          </form>
      </div>
      
      </div>
      
</div>

  );
 
}

}

const mapDispatchToProps = (dispatch) =>{
  console.log('in map Dispatcher');
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}
const mapStateToProps = (state)=>{
  const auth = state.firebase.auth;
 
  return {
    authError:state.auth.authError,
    auth:auth
  }
}

export default connect( mapStateToProps , mapDispatchToProps) (SignIn);