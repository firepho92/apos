import React from 'react';
import AppContext from '../context/AppContext';
import Authentication from '../screens/Authentication';
import Main from './Main';

function AppWrapper() {
  return (
    <AppContext.Consumer>
    	{context => (
    		context.state.user === null ? <Authentication /> : <Main />
    	)}
    </AppContext.Consumer>
  );
}

export default AppWrapper;
