
import React from 'react';
import { connect } from 'react-redux';
import { logOut } from '../../store/actions/authActions';

class Logout extends React.Component {

    constructor(props){
       super(props);
       this.handleLogout=this.handleLogout.bind(this); 
    }
    handleLogout(e){
        e.preventDefault();
        console.log('handle logout from component ');
        this.props.logOut();
    }
    render(){
        return (
        
       <div>
           <form className="logout-form"  onSubmit={this.handleLogout} >
             <button className="logout text-left"> <i className="fas fa-sign-out-alt"></i> Logout  </button>
          </form>
       </div>
  
      )
    }
}

const mapDipatchToProps=(dispatch , ownProps)=>{
    console.log('from mapDsispatchToProps Func');
    console.log(ownProps);
    return {
        logOut: () => dispatch(logOut())
    }

}

export default connect(null, mapDipatchToProps)(Logout)  ;