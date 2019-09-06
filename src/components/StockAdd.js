import React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import AppContext from '../context/AppContext';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { ComboBox } from 'office-ui-fabric-react/lib/index';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import axios from 'axios';

class StockAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: null,
      product: null,
      ammount: '',
      selling_price: '0',
      cost_price: '0',
      IVA: 0,
      cash: 0,
      movementType: null,
      sale_type: 0,
      description: '',
      options: [{key: 1, text: 'Merma'}, {key:2, text: 'Prueba de control'}, {key: 3, text: 'Cortesía'}, {key: 4, text: 'Venta'}, {key:5, text: 'Consumo personal'}],
      customers: [],
      products: [],
      initialDisplayValue: '',
      textFields: {
        customer: false,
        product: false,
        ammount: false,
        price: false,
        IVA: false,
        cash: false,
        sale_type: false,
        description: false,
      }
    }
  }

  componentDidMount() {
    this._getCustomers();
    this._getProducts();
  }

  _onCustomerChange = (customer) => {
    this.setState({
      customer
    });
  }

  _onProductChange = (product) => {
    this.setState({
      product
    });
  }

  _onAmmountChange = (e, ammount) => {
    this.setState({
      ammount
    });
  }

  _onPriceChange = (e, price) => {
    this.setState({
      selling_price: price
    });
  }

  _onIVAChange = (e, IVA) => {
    this.setState({
      IVA: IVA.key
    });
  }

  _onCashChange = (e, cash) => {
    this.setState({
      cash: cash.key
    });
  }

  _onSaleTypeChange = (e, sale_type) => {
    this.setState({
      sale_type: sale_type.key
    });
  }

  _onDescriptionChange = (e, description) => {
    this.setState({
      description
    });
  }

  _getCustomers = () => {
    if(this.state.customers.length > 0) {
      return this.state.customers;
    }
    let customers = this.props.customers.map(customer => (
      {key: customer.customer_id, text: customer.customer_name}
    ));
    this.setState({
      customers
    });
  }

  _onCustomersChange = (event, option, index, value) => { //this is type change handler
    if(this.state.customer === undefined){
      this.setState({
        customer: value
      })  
    } else {
      this.setState({
        customer: option.key
      })  
    }
  }

  _getProducts = () => {
    if(this.state.products.length > 0) {
      return this.state.products;
    }
    let products = this.props.products.map(product => (
      {key: product.product_id, text: product.product_name + ' ' + product.category_name, cost_price: product.cost_price, selling_price: product.selling_price}
    ));
    this.setState({
      products
    });
  }

  _onProductsChange = (event, option, index, value) => { //this is type change handler
    if(this.state.product === undefined){
      this.setState({
        product: value
      });
    } else {
      this.setState({
        product: option.key,
        selling_price: option.selling_price,
        cost_price: option.cost_price
      });
    }
  }

  componentDidCatch(error) {
    console.log(error);
  }

  render() {
    return (
      <AppContext.Consumer>
      	{context => (
      		<div className="ProductsControl">
            <div className="ProductsControlPanel">
              <AddMovementPanel
                person={context.state.user.personal_id}
                customer={this.state.customer} _onCustomerChange={this._onCustomerChange}
                product={this.state.product} _onProductChange={this._onProductChange}
                ammount={this.state.ammount} _onAmmountChange={this._onAmmountChange}
                selling_price={this.state.selling_price} _onPriceChange={this._onPriceChange}
                cost_price={this.state.cost_price}
                cash={this.state.cash} _onCashChange={this._onCashChange}
                IVA={this.state.IVA} _onIVAChange={this._onIVAChange}
                movementType={this.state.movementType} _onMovementTypeChange={this._onMovementTypeChange}
                sale_type={this.state.sale_type} _onSaleTypeChange={this._onSaleTypeChange}
                description={this.state.description} _onDescriptionChange={this._onDescriptionChange}
                options={this.state.options}
                textFields={this.state.textFields}
                initialDisplayValue={this.state.initialDisplayValue}
                customers={this.state.customers} _getCustomers={this._getCustomers} _onCustomersChange={this._onCustomersChange}
                products={this.state.products} _getProducts={this._getProducts} _onProductsChange={this._onProductsChange}
                _showAlert={this.props._showAlert}
              />
            </div>
          </div>
      	)}
      </AppContext.Consumer>
    );
  }
  
}

function AddMovementPanel(props) {
  const [expanded, setExpanded] = React.useState(false);

  const _getTotal = () => {
    if(props.IVA === 1)
     return String(props.ammount * props.selling_price + (props.ammount * props.selling_price * 0.16));
    return String(props.ammount * props.selling_price);
  }

  const _handleSubmit = async () => {
    console.log(props.sale_type + ' ' + props.movementType);
    axios.post('http://192.168.1.125:8000/payments', {ammount: 0, date: new Date(), description: props.description, product: props.product, quantity: props.quantity, price: props.price})
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
    if (props.sale_type === 0 && props.movementType === 4) {
      axios.post('http://192.168.1.125:8000/deposits', {deposit_date: new Date(), payment_type: 0, customer: props.customer, ammount: _getTotal()})
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
    }
    axios.post('http://localhost:8000/sales', {movement_date: new Date(), customer: props.customer, person: props.person, product: props.product, ammount: props.ammount, selling_price: props.selling_price, cost_price: props.cost_price, IVA: props.IVA, cash:props.cash, movementType: props.movementType, sale_type: props.sale_type, description: props.description})
    .then(response => {
      console.log(response);
      props._onCustomerChange(null);
      props._onProductChange(null);
      props._onAmmountChange(null, '');
      props._onDescriptionChange(null, '');
      props._showAlert('Agregado con éxito.', 'Éxito: ')
    })
    .catch(error => {
      console.log(error);
    });
    var product = await axios.put('http://localhost:8000/products/stock', {product: props.product, ammount: props.ammount});
    console.log(product);
  }

  return (
    <AppContext.Consumer>
      {context => (
        <Paper>
          <div style={{display: 'flex', flexDirection: 'column', margin: 2 + 'em'}}>
            <ComboBox selectedKey={props.product} label="Producto" allowFreeform={true} autoComplete="on" options={props.products} onChange={props._onProductsChange} onResolveOptions={props._getProducts} text={props.initialDisplayValue} required/>
            <TextField label="Unidades" value={props.ammount} onChange={props._onAmmountChange} styles={{ fieldGroup: { width: 300 } }} autoComplete="off" type="number"/>
            <TextField label="Precio" value={props.selling_price} onChange={props._onPriceChange} styles={{fieldGroup: {width: 300} }} autoComplete="off" type="number"/>
            {props.textFields.description ? <TextField label="Descripción" value={props.description} onChange={props._onDescriptionChange} styles={{ fieldGroup: { width: 300 } }}/> : null}
            {props.textFields.IVA ? <TextField label="Total: " value={_getTotal()} onChange={props._onDescriptionChange} styles={{ fieldGroup: { width: 300 } }} readOnly={true}/> : null}
            <PrimaryButton onClick={() => _handleSubmit()} style={{marginTop: '2em'}} disabled={false} text="Agregar" type="submit" allowDisabledFocus={true}/>
          </div>
        </Paper>
      )}
    </AppContext.Consumer>
  );
}

export default StockAdd;

//