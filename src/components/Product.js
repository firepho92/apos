import React from 'react';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';
import AppContext from '../context/AppContext';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

class Product extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			year: 2019,
			data: [],
			edit: false,
			product_id: '',
			product_name: '',
      cost_price: '',
      selling_price: '',
      description: '',
      stock: '',
      category_name: '',
			status: 0
		}
	}

	componentDidMount() {
		this.setState({
      product_id: this.props.product.product_id,
      product_name: this.props.product_name,
      cost_price: this.props.product.cost_price,
      selling_price: this.props.product.selling_price,
      description: this.props.product.description,
      stock: this.props.product.stock,
      category_name: this.props.product.category_name,
      status: this.props.product.status
		});
		this._setData();
	}

	_setData = () => {
		let january = this.props.sales.filter(sale => 0 === new Date(sale.sale_date).getMonth()).reduce((accum, sale) => {return (sale.ammount) + accum}, 0);
		let february = this.props.sales.filter(sale => 1 === new Date(sale.sale_date).getMonth()).reduce((accum, sale) => {return (sale.ammount) + accum}, 0);
		let march = this.props.sales.filter(sale => 2 === new Date(sale.sale_date).getMonth()).reduce((accum, sale) => {return (sale.ammount) + accum}, 0);
		let april = this.props.sales.filter(sale => 3 === new Date(sale.sale_date).getMonth()).reduce((accum, sale) => {return (sale.ammount) + accum}, 0);
		let may = this.props.sales.filter(sale => 4 === new Date(sale.sale_date).getMonth()).reduce((accum, sale) => {return (sale.ammount) + accum}, 0);
		let june = this.props.sales.filter(sale => 5 === new Date(sale.sale_date).getMonth()).reduce((accum, sale) => {return (sale.ammount) + accum}, 0);
		let july = this.props.sales.filter(sale => 6 === new Date(sale.sale_date).getMonth()).reduce((accum, sale) => {return (sale.ammount) + accum}, 0);
		let august = this.props.sales.filter(sale => 7 === new Date(sale.sale_date).getMonth()).reduce((accum, sale) => {return (sale.ammount) + accum}, 0);
		let september = this.props.sales.filter(sale => 8 === new Date(sale.sale_date).getMonth()).reduce((accum, sale) => {return (sale.ammount) + accum}, 0);
		let october = this.props.sales.filter(sale => 9 === new Date(sale.sale_date).getMonth()).reduce((accum, sale) => {return (sale.ammount) + accum}, 0);
		let november = this.props.sales.filter(sale => 10 === new Date(sale.sale_date).getMonth()).reduce((accum, sale) => {return (sale.ammount) + accum}, 0);
		let december = this.props.sales.filter(sale => 11 === new Date(sale.sale_date).getMonth()).reduce((accum, sale) => {return (sale.ammount) + accum}, 0); 
		let data = [
			{month: 'enero', cantidad: january},
			{month: 'febrero', cantidad: february},
			{month: 'marzo', cantidad: march},
			{month: 'abril', cantidad: april},
			{month: 'mayo', cantidad: may},
			{month: 'junio', cantidad: june},
			{month: 'julio', cantidad: july},
			{month: 'agosto', cantidad: august},
			{month: 'septiembre', cantidad: september},
			{month: 'octubre', cantidad: october},
			{month: 'noviembre', cantidad: november},
			{month: 'diciembre', cantidad: december},
		]
		this.setState({
			data
		});
	}
  //controla editar Producto
	_handleClick = () => {
		this.setState({
			edit: !this.state.edit
		})
	}

	_onCostPriceChange = (e, a) => {
		console.log(e.target.value + ' ' + a)
		this.setState({
			cost_price: e.target.value
		});
	}

	_onSellingPriceChange = (e) => {
		this.setState({
			selling_price: e.target.value
		});
	}

	_onDescriptionChange = (e) => {
		this.setState({
			description: e.target.value
		});
	}

	_onStockChange = (e) => {
		this.setState({
			stock: e.target.value
		});
	}

	_onCategoryChange = (e) => {
		this.setState({
			category: e.target.value
		});
	}

	_onStatusChange = (_setCustomers, _showAlert) => {
		/*if(this.state.status === 0){
			this.setState({
				status: 1
			}, this._onSubmit(_setCustomers, _showAlert));
		} else {
			this.setState({
				status: 0
			}, this._onSubmit(_setCustomers, _showAlert));
    }*/
    axios.put('http://177.246.228.199:8000/products', 
			{
				product_id: this.state.product_id,
				cost_price: this.state.cost_price,
				selling_price: this.state.selling_price,
				description: this.state.description,
				stock: this.state.stock,
				category: this.state.category,
				status: this.state.status === 0 ? 1 : 0
			})
		.then(response => {
			this.props._setProducts();
			_showAlert('Cliente actualizado correctamente.', 'Éxito.');
		})
		.catch(error => {
			_showAlert('No se puede conectar con el servidor.', 'Error.')
		});
	}

	_onSubmit = (_showAlert) => {
		axios.put('http://177.246.228.199:8000/products', 
			{
				product_id: this.state.product_id,
        cost_price: this.state.cost_price,
        selling_price: this.state.selling_price,
        description: this.state.description,
        stock: this.state.stock,
        category: this.state.category,
				status: this.state.status
			})
		.then(response => {
			this.props._setProducts();
			_showAlert('Cliente actualizado correctamente.', 'Éxito.');
		})
		.catch(error => {
			_showAlert('No se puede conectar con el servidor.', 'Error.')
		});
	}

  render() {
    return (
      <AppContext.Consumer>
      	{context => (
      		<div className="CustomerWrapper">
      			<div className="Customer">
							<div className="ProductName">
								{this.props.product.product_name}
								&nbsp;<Icon iconName="CodeEdit" className={this.state.edit ? 'EditActive' : 'EditInactive'} onClick={this._handleClick}/>
								{this.state.edit ? <Icon iconName="Save" className="EditActive" onClick={() => this._onSubmit(context._setCustomers, context._showAlert)}/> : null }
							</div>
              <hr style={{width: 80 + '%'}}/>
		      		<div className="ProductInformation">
		      			<div style={{display: 'flex', flexDirection: 'row'}}><div>Costo prod.:$</div><input type="text" onChange={(e) => this._onCostPriceChange(e)} className="CustomerTextInput" style={this.state.edit ? {cursor: 'text'} : {cursor: 'default'}} value={this.state.cost_price} readOnly={this.state.edit ? false : true} /></div>
		      			<div style={{display: 'flex', flexDirection: 'row'}}><div>Precio venta:$</div><input type="text" onChange={(e) => this._onSellingPriceChange(e)} className="CustomerTextInput" style={this.state.edit ? {cursor: 'text'} : {cursor: 'default'}} value={this.state.selling_price} readOnly={this.state.edit ? false : true} /></div>
			      		<div style={{display: 'flex', flexDirection: 'row'}}><div>Descripción:&nbsp;</div><input type="text" onChange={(e) => this._onDescriptionChange(e)} className="CustomerTextInput" style={this.state.edit ? {cursor: 'text'} : {cursor: 'default'}} value={this.state.description} readOnly={this.state.edit ? false : true} /></div>
			      		<div style={{display: 'flex', flexDirection: 'row'}}><div>Stock:&nbsp;</div><input type="text" onChange={(e) => this._onStockChange(e)} className="CustomerTextInput" style={this.state.edit ? {cursor: 'text'} : {cursor: 'default'}} value={this.state.stock} readOnly={this.state.edit ? false : true} /></div>
			      		<div style={{display: 'flex', flexDirection: 'row'}}><div>Categoría:&nbsp;</div><input type="text" onChange={(e) => this._onCategoryChange(e)} className="CustomerTextInput" style={this.state.edit ? {cursor: 'text'} : {cursor: 'default'}} value={this.state.category_name} readOnly={this.state.edit ? false : true} /></div>
                <br/>
			      		<div>
									<Toggle
					          defaultChecked={this.props.product.status === 1 ? true : false}
					          label=""
					          onText="Habilitado"
					          offText="Deshabilitado"
					          onChange={() => this._onStatusChange(context._setProducts, context._showAlert)}
					        />
			      		</div>
		      		</div>
	      		</div>
	      		<Paper style={{margin: 1.5 + 'em', padding: 1 + 'em'}}>
							{this.state.data.length > 0 ? <LineChart width={700} height={450} data={this.state.data} margin={{top: 5, right: 30, left: 20, bottom: 5,}}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" style={{fontSize: 14}}/><YAxis /><Tooltip /><Line type="monotone" dataKey="cantidad" stroke="#0078d4" activeDot={{ r: 8 }} /></LineChart> : null}
						</Paper>
      		</div>
      	)}
      </AppContext.Consumer>
    );
  }
  
}

export default Product;
