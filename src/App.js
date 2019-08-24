import React from 'react';
import { initializeIcons } from '@uifabric/icons';
import ContextProvider from './context/ContextProvider';
import AppWrapper from './components/AppWrapper';
import './App.css';

initializeIcons();

function App() {
  return (
    <ContextProvider>
    	<AppWrapper />
    </ContextProvider>
  );
}

export default App;
