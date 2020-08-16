import React  from 'react';
import SigndInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';


class Navbar extends React.Component {

    render(){
        
        return(
            <section className="container">         
              <h1 className="text-danger">  Unfortionately , There isn't any page math this link </h1>
           </section>     
        );
    }
}





const mapStateToProps = (state) => {
     return{
         auth:state.firebase.auth ,
         profile:state.firebase.profile
     }
}

export default connect(mapStateToProps) (Navbar);