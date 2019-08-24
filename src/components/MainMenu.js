import React from 'react';
import posed from 'react-pose';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import AppContext from '../context/AppContext';
import './MainMenu.css';

const MainMenuWrapper = posed.div({
  hidden: { opacity: 0, zIndex: -1 },
  visible: {
    opacity: 1,
    zIndex: 100,
    transition: { opacity: { duration: 100 } }
  }
});

const MenuWrapper = posed.div({
  hidden: {
    x: -50,
    opacity: 0,
    transition: { 
      x: { ease: 'easeIn', duration: 100 },
      opacity: { ease: 'easeIn', duration: 50 }
    }
  },
  visible: { 
    x: 0,
    opacity: 1,
    transition: {
      x: { ease: 'easeOut', duration: 75, delay: 100 },
      opacity: { ease: 'easeOut', duration: 75, delay: 100 }
    }
  }
});

class MainMenu extends React.Component {
  state = {
    categories: ['Inicio', 'Clientes', 'Productos', 'Control administrativo', 'Logística'],
    selected: 'Inicio'
  }

  _handleCategorySelection = (selected) => {
    this.setState({
      selected
    });
    this.props._setView(selected);
  }

  render() {
    return (
      <AppContext.Consumer>
      	{context => (
      		<MainMenuWrapper onClick={this.props._hideMenu} className="MainMenuWrapper" pose={this.props.open === true ? 'visible' : 'hidden'}>
            <MenuWrapper className="MainMenu">
              <div>
                {'Bienvenido ' + context.state.user.personal_name.split(' ')[0]}
              </div>
              <div className="MenuItems">
                {this.state.categories.map((category, index) => <MenuItem key={index} _handleCategorySelection={this._handleCategorySelection} selected={this.state.selected} category={category}/>)}
              </div>
              <div>
                <ActionButton data-automation-id="test" iconProps={{ iconName: 'SignOut' }} allowDisabledFocus={true} checked={false} onClick={context._unsetUser}> Salir</ActionButton>
              </div>
            </MenuWrapper>
		      </MainMenuWrapper>
      	)}
      </AppContext.Consumer>
    );
  }
  
}


class MenuItem extends React.Component {
  state = {
    selected: false
  }
  componentDidMount() {
    if(this.props.selected === this.props.category){
      this.setState({
        selected: true
      })
    } else {
      this.setState({
        selected: false
      })
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.selected !== prevProps.selected){
      if(this.props.selected === this.props.category){
        this.setState({
          selected: true
        })
      } else {
        this.setState({
          selected: false
        })
      }
    }
  } 

  _handleClick = (e) => {
    e.preventDefault();
    this.props._handleCategorySelection(this.props.category);
  }

  render() {
    return (
      <button className={this.state.selected ? "MenuItemSelected" : "MenuItem"} ref="button" onClick={e => this._handleClick(e)}>{this.props.category}</button>
    );
  }
}

export default MainMenu;
