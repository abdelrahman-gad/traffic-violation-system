import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Redirect,NavLink} from 'react-router-dom';
import {signIn } from '../../store/actions/authActions';
import { withFormik } from 'formik'
class SigninForm  extends React.Component{

  
 handleChange = (e) =>{
  e.preventDefault();
  this.setState({
    [e.target.id]:e.target.value
  })
}
handleSubmit = (e) => {
     e.preventDefault();
     console.log('handleSubmit method');
    //  add validation rules before submitting values
     this.props.signIn(this.state);
     
}
render(){
  console.log(this.props.auth);
  const {auth} =this.props;
  if(auth.uid){
    return (<Redirect exact to="/" />);
  } 

  console.log(this.props);
  const {
    values,
    touched,
    errors,
    dirty,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    isSubmitting
} = this.props;
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
                   className="form-control" 
                   aria-describedby="emailHelp"
                   placeholder="email"
                   id="email"
                   onChange={this.handleChange}
                   error={touched.userId && errors.userId}
                   value={values.userId}
                   onChange={handleChange}
                   onBlur={handleBlur}
                 />
                 {errors.name && touched.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

           <div className="form-group">
              <input
                 type="password"
                 className="form-control" 
                 placeholder="password"
                 id="password"
                 onChange={this.handleChange}
                 />
            </div>

            <button  className="btn btn-primary btn-block btn-admin">Log In </button>
          </form>
      </div>
      
      </div>
      
</div>

   );
 
  }

}

const Form = withFormik({
    validate(values) {
 
    },
    handleSubmit(values, {props, setSubmitting}) {
        console.log('handleSubmit method');
       //  add validation rules before submitting values
        this.props.signIn(this.state).then(()=>
           {setSubmitting(false)}
        );   
    }
 })(SigninForm);

// const mapDispatchToProps = (dispatch) =>{
//   console.log('in map Dispatcher');
//   return {
//     signIn: (creds) => dispatch(signIn(creds))
//   }
// }

const mapDispatchToProps = (dispatch) => bindActionCreators({
    signIn
  }, dispatch);

const mapStateToProps = (state)=>{
  const auth = state.firebase.auth;
 
  return {
    authError:state.auth.authError,
    auth:auth
  }
}

export default connect( mapStateToProps , mapDispatchToProps) (SigninForm);