import React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import Customers from '../components/Customers';
import NewCustomer from '../components/NewCustomer';
import Customer from '../components/Customer';
import NewDeposit from '../components/NewDeposit';
import AppContext from '../context/AppContext';

const customButton = (props) => {
  const buttonOnMouseClick = () => {
    props.onClick()
  }

  return (
    <CommandBarButton
      {...props}
      onClick={buttonOnMouseClick}
      styles={{
        ...props.styles,
        textContainer: { fontSize: 18 },
        icon: { color: '#0078d4' }
      }}
    />
  );
};

class CustomersScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 0,
      customer: null
    }
  }

  _setView = (view) => {
    this.setState({
      view
    })
  }

  _setCustomer = (customer) => {
    this.setState({
      customer
    })
  }

  getItems = () => {
    return [
      {
        key: 'clientes',
        name: 'Clientes',
        cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
        iconProps: {
          iconName: 'Group'
        },
        ariaLabel: 'Clientes',
        onClick: () => this._setView(0)
      },
      {
        key: 'nuevo',
        name: 'Nuevo',
        iconProps: {
          iconName: 'Add'
        },
        onClick: () => this._setView(1)
      },
      {
        key: 'pago',
        name: 'Agregar pago',
        iconProps: {
          iconName: 'Money'
        },
        onClick: () => this._setView(3)
      },
    ];
  };

    render() {
    return (
      <AppContext.Consumer>
      	{context => (
          <div className="CustomersScreen">
            <CommandBar
              overflowButtonProps={{
                ariaLabel: 'More commands',
                menuProps: {
                  items: [], // Items must be passed for typesafety, but commandBar will determine items rendered in overflow
                  isBeakVisible: true,
                  beakWidth: 20,
                  gapSpace: 10,
                  directionalHint: DirectionalHint.topCenter
                }
              }}
              buttonAs={customButton}
              items={this.getItems()}
              ariaLabel={'Use left and right arrow keys to navigate between commands'}
            />
            { this.state.view === 0 ? <Customers _setView={this._setView} _setCustomer={this._setCustomer}/> : null }
            { this.state.view === 1 ? <NewCustomer _setView={this._setView}/> : null }
            { this.state.view === 2 ? <Customer _setView={this._setView} customer={this.state.customer}/> : null }
            { this.state.view === 3 ? <NewDeposit customers={context.state.customers} products={context.state.products} _showAlert={context._showAlert}/> : null }
          </div>          
      	)}
      </AppContext.Consumer>
    );
  }
  
}

export default CustomersScreen;
