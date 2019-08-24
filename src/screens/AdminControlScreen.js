import React from 'react';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import Management from '../components/Management';
import Incoming from '../components/Incoming';
import Outgoing from '../components/Outgoing';
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

class AdminControlScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      view: 0
    }
  }

  _setView = (view) => {
    this.setState({
      view
    });
  }

  getItems = () => {
    return [
      {
        key: 'general',
        name: 'General',
        cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
        iconProps: {
          iconName: 'Financial'
        },
        ariaLabel: 'General',
        onClick: () => this._setView(0)
      },
      {
        key: 'ingresos',
        name: 'Ingresos',
        cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
        iconProps: {
          iconName: 'SortDown'
        },
        ariaLabel: 'Ingresos',
        onClick: () => this._setView(0)
      },
      {
        key: 'egresos',
        name: 'Egresos',
        cacheKey: 'myCacheKey', // changing this key will invalidate this items cache
        iconProps: {
          iconName: 'SortUp'
        },
        ariaLabel: 'Egresos',
        onClick: () => this._setView(0)
      }
    ];
  }

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <div className="AdminControl">
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
            { this.state.view === 0 ? <Management/> : null }
            { this.state.view === 1 ? <Incoming/> : null }
            { this.state.view === 2 ? <Outgoing/> : null }
          </div>
        )}
      </AppContext.Consumer>
    );
  }

}

export default AdminControlScreen;