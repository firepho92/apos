import React, {Component} from 'react';
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
import axios from 'axios';

import AppContext from './AppContext';

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
];

class ContextProvider extends Component {
  constructor() {
    super();
    this.state = {
      user: {personal_name: 'Alexandro Aguilar', personal_id: 1},
      sales: [],
      deposits: [],
      movements: [],
      payments: [],
      products: [],
      customers: [],
      alert: {
        show: 0,
        title: '',
        msg: ''
      },
      view: 'Inicio'
    }
    this.server = 'http://localhost:8000';
  }

  componentDidMount() {
    this._setCustomers();
    this._setProducts();
    this._setSales();
    this._setMovements(4);
  }

  _getColor = () => {
    let color = Math.floor(Math.random() * 15);
    color = colors[color];
    return color;
  }

  _setView = (view) => {
    this.setState({
      view
    })
  }

  _setUser = (user) => {
    this.setState({
      user
    })
  }

  _unsetUser = () => {
    this.setState({
      user: null
    })
  }

  _setCustomers = () => {
    axios.get(this.server + '/customers')
    .then(response => {
      if(response.data.length > 0) {
        let customers = response.data.map(customer => (
          {...customer, color: this._getColor()[500]}
        ));
        this.setState({
          customers
        })
      }
    })
    .catch(error => {
      this._showAlert('No se pudo conectar con el servidor', 'Error');
    });
  }

  _setProducts = () => {
    axios.get(this.server + '/products')
    .then(response => {
      this.setState({
        products: response.data
      })
    })
    .catch(error => {
      console.log(error);
    });
  }

  _setMovements = (movementType) => {
    axios.get(this.server + '/sales?movementType=' + movementType)
    .then(response => {
      this.setState({
        movements: response.data
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  _setSales = () => {
    axios.get(this.server + '/sales?movementType=4')
    .then(response => {
      this.setState({
        sales: response.data
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  _setPayments = () => {
    axios.get(this.server + '/payments')
    .then(response => {
      this.setState({
        payments: response.data
      });
    })
    .catch(error => {
      console.log(error);
    })
  }

  _showAlert = (msg, title) => {
    this.setState({
      alert: {
        show: 1,
        title: title,
        msg: msg
      }
    });
    setTimeout(() => {
      this._hideAlert(msg, title)
    }, 4000)
  }

  _hideAlert = (msg, title) => {
    this.setState({
      alert: {
        show: 0,
        title: title,
        msg: msg
      }
    });
  }

  render() {
    return (
      <AppContext.Provider value={{
        server: this.server,
        state: this.state,
        _setCustomers: this._setCustomers,
        _setProducts: this._setProducts,
        _setMovements: this._setMovements,
        _showAlert: this._showAlert,
        _hideAlert: this._hideAlert,
        _setUser: this._setUser,
        _unsetUser: this._unsetUser,
        _setView: this._setView
      }}>
          {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default ContextProvider;