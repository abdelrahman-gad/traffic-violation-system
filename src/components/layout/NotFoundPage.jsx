import React  from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';


class Navbar extends React.Component {

    render(){
        
        return(
            <section className="container">         
              <h1 className="text-white ">  Sorry  , There isn't any page match this URL  (: </h1>
           </section>     
        );
    }
}





const mapStateToProps = (state) => {
     return{
         auth:state.firebase.auth 
     }
}

export default connect(mapStateToProps) (Navbar);