import React from 'react';
import LandingScreen from '../screens/LandingScreen';
import CustomersScreen from '../screens/CustomersScreen';
import ProductsScreen from '../screens/ProductsScreen';
import AdminControlScreen from '../screens/AdminControlScreen';
import MaterialAlert from './MaterialAlert';
import MainMenu from './MainMenu';
import AppContext from '../context/AppContext';
import './Main.css';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    }
  }

  _showMenu = () => {
    this.setState({
      open: true
    })
  }

  _hideMenu = () => {
    this.setState({
      open: false
    }) 
  }

  render() {
    return (
      <AppContext.Consumer>
      	{context => (
      		<div className="Main">
            <MaterialAlert/>
      			<div className="MenuButton">
              <ActionButton data-automation-id="test" iconProps={{ iconName: 'OpenPaneMirrored' }} allowDisabledFocus={true} checked={false} onClick={this._showMenu}> Menú</ActionButton>
      			</div>	
			      <MainMenu open={this.state.open} _hideMenu={this._hideMenu} _setView={context._setView}/>
            {context.state.view === 'Inicio' ? <LandingScreen/> : null}
            {context.state.view === 'Clientes' ? <CustomersScreen/> : null}
            {context.state.view === 'Productos' ? <ProductsScreen/> : null}
            {context.state.view === 'Control administrativo' ? <AdminControlScreen/> : null}
		      </div>
      	)}
      </AppContext.Consumer>
    );
  }
  
}

export default Main;
