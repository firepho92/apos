import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import axios from 'axios';

export default class NewDeposit extends Component {
  constructor() {
    super();
    this.state = {
      customer: undefined,
      opacity: 0,
      paymentType: undefined,
      amount: 0
    }
  }

  componentDidMount() {
    this._fadeIn();
  }

  _fadeIn = () => {
    let fi = setInterval(() => {
      this.setState({
        opacity: this.state.opacity + 0.1
      })
    }, 30);
    setTimeout(() => {
      this.setState({
        opacity: 1
      });
      clearInterval(fi);
    }, 300);
  }

  _getCustomers = () => {
    let customers = this.props.customers.map(customer => (
      {key: customer.customer_id, text: customer.customer_name}
    ));
    return customers;
  }

  _onCustomerChange = (e, customer) => {
    this.setState({
      customer: customer.key
    });
  }

  _onPaymentTypeChange = (e, paymentType) => {
    this.setState({
      paymentType: paymentType.key
    })
  }

  _onAmountChange = (e, amount) => {
    this.setState({
      amount: amount
    })
  }

  _handleSubmit = () => {
    axios.post('http://localhost:8000/deposits', {deposit_date: new Date(), payment_type: this.state.paymentType, customer: this.state.customer, ammount: this.state.amount})
    .then(response => {
      this.props._showAlert('Agregado correctamente', 'Notificación');
      this.setState({
        customer: undefined,
        paymentType: undefined,
        amount: 0
      });
      console.log(response);
    })
    .catch(error => {
      console.error(error);
    });
  }

  render() {
    return (
      <div style={styles.newDeposit}>
        <Paper style={{...styles.panel, opacity: this.state.opacity}}>
          <Dropdown label="Cliente" selectedKey={this.state.customer ? this.state.customer : undefined} onChange={this._onCustomerChange} placeholder="Selecciona..." options={this._getCustomers()} styles={{ dropdown: { width: 300 } }}/>
          <Dropdown label="Tipo de pago" selectedKey={this.state.paymentType ? this.state.paymentType : undefined} onChange={this._onPaymentTypeChange} placeholder="Selecciona..." options={[{key: 0, text: 'Efectivo'}, {key: 1, text: 'Depósito'}]} styles={{ dropdown: { width: 300 } }}/>
          <TextField label="Cantidad" value={this.state.amount} onChange={this._onAmountChange} styles={{ fieldGroup: { width: 300 } }} type="number" autoComplete="off" required/>
          <PrimaryButton onClick={this._handleSubmit} style={{marginTop: '2em'}} disabled={false} text="Agregar" type="submit" allowDisabledFocus={true}/>
        </Paper>
      </div>
    );
  }
}

const styles = {
  newDeposit: {
    display: 'flex',
    justifyContent: 'center',
    padding: 1.5 + 'em'
  },
  panel: {
    display: 'flex',
    flexDirection: 'column',
    width: 19 + 'em',
    padding: 1 + 'em'
  }
}