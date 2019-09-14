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

class ProductsControl extends React.Component {
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

  _onMovementTypeChange = (movementType) => {
    this.setState({
      movementType: movementType.key
    });
    switch (movementType.key) {
      case 1:
        this.setState({
          textFields: {
            customer: false,
            product: true,
            ammount: true,
            price: false,
            IVA: false,
            cash: false,
            description: true
          }
        });
        break;
      case 2:
        this.setState({
          textFields: {
            customer: false,
            product: true,
            ammount: true,
            price: false,
            IVA: false,
            cash: false,
            description: true
          }
        });
        break;
      case 3:
        this.setState({
          textFields: {
            customer: true,
            product: true,
            ammount: true,
            price: false,
            IVA: false,
            cash: false,
            description: true
          }
        });
        break;
      case 4:
        this.setState({
          textFields: {
            customer: true,
            product: true,
            ammount: true,
            price: true,
            IVA: true,
            cash: true,
            description: true
          }
        });
        break;
      case 5:
        this.setState({
          textFields: {
            customer: false,
            product: true,
            ammount: true,
            IVA: false,
            cash: false,
            description: true
          }
        });
        break;
      default:
        break;
    }
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
                description={this.state.description} _onDescriptionChange={this._onDescriptionChange}
                options={this.state.options}
                textFields={this.state.textFields}
                initialDisplayValue={this.state.initialDisplayValue}
                customers={this.state.customers} _getCustomers={this._getCustomers} _onCustomersChange={this._onCustomersChange}
                products={this.state.products} _getProducts={this._getProducts} _onProductsChange={this._onProductsChange}
                _showAlert={this.props._showAlert}
              />
            </div>
            <ProductsControlHistory/>
          </div>
      	)}
      </AppContext.Consumer>
    );
  }
  
}

function AddMovementPanel(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleMovementTypeChange = (event, option) => {
    props._onMovementTypeChange(option);
    setExpanded(false);
    setTimeout(() => setExpanded('panel1'), 500);
  }

  const _getTotal = () => {
    if(props.IVA === 1)
     return String(props.ammount * props.selling_price + (props.ammount * props.selling_price * 0.16));
    return String(props.ammount * props.selling_price);
  }

  const _handleSubmit = async () => {
    axios.post('http://177.246.228.199:8000/sales', {movement_date: new Date(), customer: props.customer, person: props.person, product: props.product, ammount: props.ammount, selling_price: props.selling_price, cost_price: props.cost_price, IVA: props.IVA, cash:props.cash, movementType: props.movementType, description: props.description})
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
        <ExpansionPanel expanded={expanded === 'panel1'} style={{height: 24 + 'em', overflowY: 'scroll'}}>
          <ExpansionPanelSummary
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Dropdown
              label="Tipo de movimiento"
              selectedKey={props.movementType ? props.movementType : undefined}
              onChange={handleMovementTypeChange}
              placeholder="Selecciona movimiento"
              options={props.options}
              styles={{ dropdown: { width: 300 } }}
            />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              {props.textFields.customer ? <ComboBox selectedKey={props.customer} label="Cliente" allowFreeform={true} autoComplete="on" options={props.customers} onChange={props._onCustomersChange} onResolveOptions={props._getCustomers} text={props.initialDisplayValue} required/> : null}
              {props.textFields.product ? <ComboBox selectedKey={props.product} label="Producto" allowFreeform={true} autoComplete="on" options={props.products} onChange={props._onProductsChange} onResolveOptions={props._getProducts} text={props.initialDisplayValue} required/> : null}
              {props.textFields.ammount ? <TextField label="Unidades" value={props.ammount} onChange={props._onAmmountChange} styles={{ fieldGroup: { width: 300 } }} autoComplete="off" type="number"/> : null}
              {props.textFields.price ? <TextField label="Precio" value={props.selling_price} onChange={props._onPriceChange} styles={{fieldGroup: {width: 300} }} autoComplete="off" type="number"/> : null}
              {props.textFields.IVA ? <Dropdown label="IVA" selectedKey={props.IVA ? props.IVA : undefined} onChange={props._onIVAChange} placeholder="Selecciona..." options={[{ key: 0, text: 'Sin IVA' }, { key: 1, text: 'Con IVA' },]} styles={{ dropdown: { width: 300 } }} required/> : null}
              {props.textFields.description ? <TextField label="Descripción" value={props.description} onChange={props._onDescriptionChange} styles={{ fieldGroup: { width: 300 } }}/> : null}
              {props.textFields.IVA ? <TextField label="Total: " value={_getTotal()} onChange={props._onDescriptionChange} styles={{ fieldGroup: { width: 300 } }} readOnly={true}/> : null}
              <PrimaryButton onClick={() => _handleSubmit()} style={{marginTop: '2em'}} disabled={false} text="Agregar" type="submit" allowDisabledFocus={true}/>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )}
    </AppContext.Consumer>
  );
}

class ProductsControlHistory extends React.Component {
  constructor() {
    super();
    this.state = {
      tableAnimation: 0,
      tableDisplay: 'block',
      movementType: null,
      movements: [],
      fields: {
        customer: false,
        product: false,
        ammount: false,
        price: false,
        IVA: false,
        cash: false,
        description: false,
      }
    }
  }

  _animateTableAppear = () => {
    let animation = setInterval(() => {
      this.setState({
        tableAnimation: this.state.tableAnimation + 0.1
      });
    }, 10);
    setTimeout(() => {
      this.setState({
        tableAnimation: 1
      });
      clearInterval(animation);
    }, 500);
  }

  _animateTableDisappear = () => {
    let animation = setInterval(() => {
      this.setState({
        tableAnimation: this.state.tableAnimation - 0.1
      });
    }, 10);
    setTimeout(() => {
      this.setState({
        tableAnimation: 0
      });
      clearInterval(animation);
    }, 500);
  }

  _onMovementTypeChange = (e, movementType, _setMovements) => {
    this.setState({
      movementType: movementType.key
    });
    this._animateTableDisappear();
    setTimeout(() => {
      this._animateTableAppear();
    }, 500);
    
    switch (movementType.key) {
      case 1:
        _setMovements(movementType.key);
        this.setState({
          fields: {
            customer: false,
            product: true,
            ammount: true,
            price: false,
            IVA: false,
            cash: false,
            description: true
          }
        });
        break;
      case 2:
        _setMovements(movementType.key);
        this.setState({
          fields: {
            customer: false,
            product: true,
            ammount: true,
            price: false,
            IVA: false,
            cash: false,
            description: true
          }
        });
        break;
      case 3:
        _setMovements(movementType.key);
        this.setState({
          fields: {
            customer: true,
            product: true,
            ammount: true,
            price: false,
            IVA: false,
            cash: false,
            description: true
          }
        });
        break;
      case 4:
        _setMovements(movementType.key);
        this.setState({
          fields: {
            customer: true,
            product: true,
            ammount: true,
            price: true,
            IVA: true,
            cash: true,
            description: true
          }
        });
        break;
      case 5:
        _setMovements(movementType.key);
        this.setState({
          fields: {
            customer: false,
            product: true,
            ammount: true,
            IVA: false,
            cash: false,
            description: true
          }
        });
        break;
    
      default:
        break;
    }
  }

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <div className="ProductsControlPanel">
            <Paper style={{padding: 1 + 'em', width: 40 + 'em', height: 24 + 'em'}} >
              <Dropdown label="" selectedKey={this.state.movementType ? this.state.movementType : undefined} onChange={(e, movementType) => this._onMovementTypeChange(e, movementType, context._setMovements)} placeholder="Selecciona..." options={[{key: 1, text: 'Merma'}, {key:2, text: 'Prueba de control'}, {key: 3, text: 'Cortesía'}, {key: 4, text: 'Venta'}, {key:5, text: 'Consumo personal'}]} styles={{ dropdown: { width: 300 } }}/>
              <div style={{overflowX: 'scroll', height: 22.5 + 'em'}}>
                <Table className="ProductsControlTable" style={{opacity: this.state.tableAnimation, display: this.state.tableDisplay}}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Producto</TableCell>
                      <TableCell align="right">Fecha&nbsp;</TableCell>
                      {this.state.fields.customer ? <TableCell align="right">Cliente&nbsp;</TableCell> : null}
                      {this.state.fields.price ? <TableCell align="right">Precio de venta&nbsp;</TableCell> : null}
                      <TableCell align="right">Cantidad&nbsp;</TableCell>
                      {this.state.fields.IVA ? <TableCell align="right">IVA&nbsp;</TableCell> : null}
                      <TableCell align="right">Descripción&nbsp;</TableCell>
                      <TableCell align="right">Personal&nbsp;</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {context.state.movements.map(movement => (
                      <TableRow hover key={movement.sale_id} onClick={() => console.log(movement)} style={{cursor: 'pointer'}}>
                        <TableCell component="th" scope="row">{movement.product_name}</TableCell>
                        <TableCell component="th" scope="row">{moment(new Date(movement.sale_date)).format('DD/MM/YYYY')}</TableCell>
                        {this.state.fields.customer ? <TableCell align="right">{movement.customer_name}</TableCell> : null}
                        {this.state.fields.price ? <TableCell align="right">${movement.selling_price}</TableCell> : null}
                        <TableCell align="right">{movement.ammount}</TableCell>
                        {this.state.fields.IVA ? <TableCell align="right">{movement.IVA === 0 ? 'No' : 'Si'}</TableCell> : null}
                        <TableCell align="right">{movement.description}</TableCell>
                        <TableCell align="right">{movement.personal_name}</TableCell>
                      </TableRow>
                  ))}
                  </TableBody>
                </Table>
              </div>
            </Paper>
          </div>
        )}
      </AppContext.Consumer>
    );
  }
}

export default ProductsControl;

//