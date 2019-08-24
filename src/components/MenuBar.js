//Eliminar si ya no es necesario
import React from 'react';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import AppContext from '../context/AppContext';

class MenuBar extends React.Component {
	state = {
		categories: ['Inicio', 'Clientes', 'Productos', 'Control administrativo'],
		selected: 'Inicio'
	}

  _handleCategorySelection = (selected) => {
  	this.setState({
  		selected
  	});
  	this.props._setView(selected);
  }

  _onDismiss = () => {
  	this.props._hideMenu()
  }

  render() {
    return (
      <AppContext.Consumer>
      	{context => (
      		<Panel
	          headerText={'Bienvenido ' + context.state.user.personal_name.split(' ')[0]}
	          isOpen={this.props.open}
	          type={PanelType.smallFixedNear}
	          isFooterAtBottom={true}
	          onDismiss={this._onDismiss}
	          isLightDismiss={true}
	          onRenderFooterContent={ () => <ActionButton data-automation-id="test" iconProps={{ iconName: 'SignOut' }} allowDisabledFocus={true} checked={false} onClick={context._unsetUser}> Salir</ActionButton>}
		      >
		      	<div className="MenuItems">
		      		{this.state.categories.map((category, index) => <MenuItem key={index} _handleCategorySelection={this._handleCategorySelection} selected={this.state.selected} category={category}/>)}
		      	</div>
	        </Panel>
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

export default MenuBar;
