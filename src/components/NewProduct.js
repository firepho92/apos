import React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import AppContext from '../context/AppContext';

class NewProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      product_name: '',
      cost_price: '0',
      selling_price: '0',
      description: '',
      stock: '',
      status: true,
      categories: [],
      category: ''
    }
  }

  componentDidMount() {
    this._getCategories();
  }

  _getCategories = () => {
    axios.get('http://localhost:8000/categories')
    .then(response => {
      console.log(this._formatCategories(response.data));
      this.setState({
        categories: this._formatCategories(response.data)
      })
    })
    .catch(error => {
      console.log(error);
    });
  }

  _formatCategories = (rawCategories) => {
    let categories = rawCategories.map(category => (
      {key: category.category_id, text: category.category_name}
    ));
    return categories;
  }

  _onProductNameChange = (e, product_name) => {
    this.setState({
      product_name
    })
  }

  _onCostPriceChange = (e, cost_price) => {
    this.setState({
      cost_price
    })
  }

  _onSellingPriceChange = (e, selling_price) => {
    this.setState({
      selling_price
    })
  }

  _onDescriptionChange = (e, description) => {
    this.setState({
      description
    })
  }

  _onStockChange = (e, stock) => {
    this.setState({
      stock
    });
  }

  _onCategoryChange = (e, category) => {
    console.log(category)
    this.setState({
      category: category.key
    })
  }

  handleSubmit = (e, _showAlert) => {
    e.preventDefault();
    if(this.state.cost_price === '')
      this.setState({cost_price: 0})
    axios.post('http://localhost:8000/products', {...this.state})
    .then(response => {
      console.log(response)
      _showAlert('Creado correctamente', 'Notificación');
      this.props._setProducts();
      this.props._contextSetProducts();
      setTimeout(() => {this.props._setView(0)}, 500);
    })
    .catch(error => {
      _showAlert('Intenta de nuevo.', 'Error');
    });
  }

  render() {
    return (
      <AppContext.Consumer>
      	{context => (
      		<div className="Customers">
            <Paper style={{padding: 1.5 + 'em'}}>
              <form onSubmit={e => this.handleSubmit(e, context._showAlert)}>
                <TextField
                  label="Nombre del producto"
                  value={this.state.product_name}
                  onChange={this._onProductNameChange}
                  styles={{ fieldGroup: { width: 300 } }}
                  required
                  autoComplete="off"
                />
                <TextField
                  label="Costo de producción"
                  value={this.state.cost_price}
                  onChange={this._onCostPriceChange}
                  styles={{ fieldGroup: { width: 300 } }}
                />
                <TextField
                  label="Precio de venta sugerido"
                  value={this.state.selling_price}
                  onChange={this._onSellingPriceChange}
                  styles={{ fieldGroup: { width: 300 } }}
                  required
                />
                <TextField
                  label="Descripción"
                  value={this.state.description}
                  onChange={this._onDescriptionChange}
                  styles={{ fieldGroup: { width: 300 } }}
                  required
                />
                <TextField
                  label="Stock"
                  value={this.state.stock}
                  onChange={this._onStockChange}
                  styles={{ fieldGroup: { width: 300 } }}
                  required
                />
                <Dropdown
                  label="Categoría"
                  selectedKey={this.state.category ? this.state.category : undefined}
                  onChange={this._onCategoryChange}
                  placeholder="Selecciona categoría"
                  options={this.state.categories}
                  styles={{ dropdown: { width: 300 } }}
                />

                <PrimaryButton
                  style={{marginTop: '2em'}}
                  disabled={false}
                  text="Agregar"
                  type="submit"
                  allowDisabledFocus={true}
                />
              </form>
            </Paper>
      		  
		      </div>
      	)}
      </AppContext.Consumer>
    );
  }
  
}

export default NewProduct;
