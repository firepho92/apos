import React from 'react';
import AppContext from '../context/AppContext';
import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import pink from '@material-ui/core/colors/pink';
import deepPurple from '@material-ui/core/colors/deepPurple';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import orange from '@material-ui/core/colors/orange';
import deepOrange from '@material-ui/core/colors/green';
import brown from '@material-ui/core/colors/brown';
import grey from '@material-ui/core/colors/grey';
import blueGrey from '@material-ui/core/colors/blueGrey';
import './Customers.css';

const colors = [
  purple,
  red,
  pink,
  deepPurple,
  indigo,
  blue,
  cyan,
  teal,
  green,
  amber,
  orange,
  deepOrange,
  brown,
  grey,
  blueGrey
]

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 0
    }
  }

  componentDidMount() {
    this._handleFadeIn();
  }

  _handleFadeIn = () => {
    setTimeout(() => {
      let fadeIn = setInterval(() => {
        this.setState({
          opacity: this.state.opacity + 0.03
        });
        if(this.state.opacity >= 1)
          clearInterval(fadeIn);
      }, 1);
    }, this.props.i * 100) //aquí se marca el delay de entrada
  }

  render() {
    return (
      <div onClick={() => this.props._handleClick(this.props.customer)} className="Card" i={this.props.i} style={{opacity: this.state.opacity}}>
        <div className="CardMedia">
          <div className="InitialsAvatar" style={{backgroundColor: this.props.customer.color, color: '#fff'}}>
            {this.props._getInitials(this.props.customer.customer_name)}
          </div>
        </div>
        <div className="CardContent">
          <div className="CardDescriptionField">Cliente</div>
          <div>{this.props.customer.customer_name}</div>
          <div className="CardDescriptionField">Número</div>
          <div>{this.props.customer.phone}</div>
        </div>
      </div>
    );
  }
}

class Customers extends React.Component {
  //se debe agregar la tabla que muestre a todos los usuarios
  _handleClick = (customer) => {
    this.props._setView(2);
    this.props._setCustomer(customer);
  }

  _getInitials = (customer_name) => {
    let splitted = customer_name.split(' ');
    let initials = '';
    if(splitted.length > 1)
      initials = splitted[0][0] + splitted[1][0]
    else
      initials = splitted[0][0]
    return initials;
  }

  _getColor = () => {
    let color = Math.floor(Math.random() * 15);
    color = colors[color];
    return color;
  }

  render() {
    return (
      <AppContext.Consumer>
      	{context => (
          <div className="Customers">
            {context.state.customers.map((customer, i) => (
              <Card key={i} index={i} _setView={this.props._setView} _setCustomer={this.props._setCustomer} customer={customer} _getInitials={this._getInitials} _getColor={this._getColor}_handleClick={this._handleClick} i={i} />
            ))}
          </div>
      	)}
      </AppContext.Consumer>
    );
  }
}

export default Customers;
