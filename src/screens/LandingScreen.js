import React from 'react';
import AppContext from '../context/AppContext';
import logo from '../assets/logo.png';

class LandingScreen extends React.Component {

  render() {
    return (
      <AppContext.Consumer>
      	{context => (
      		<div className="LandingPage">
            <img src={logo} alt="" className="LandingPageImage"/>
      			<div></div>
		      </div>
      	)}
      </AppContext.Consumer>
    );
  }
  
}

export default LandingScreen;
