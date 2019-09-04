import React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import AppContext from '../context/AppContext';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import axios from 'axios';
var QRCode = require('qrcode.react');

class Customer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			movements: [],
			deposits: [],
			edit: false,
			customer_id: '',
			owner: '',
			customer_name: '',
			phone: '',
			street: '',
			number: '',
			postal_code: 0,
			district: '',
			county: '',
			state: '',
			email: '',
			RFC: '',
			business_name: '',
			latitude: 0,
			longitude: 0,
			type: '',
			notes: '',
			created: '',
			updated: '',
			qr: 0,
			status: 0,
			balance: 0
		}
	}

	componentDidMount() {
		this.setState({
			customer_id: this.props.customer.customer_id,
			owner: this.props.customer.owner,
			customer_name: this.props.customer.customer_name,
			phone: this.props.customer.phone,
			street: this.props.customer.street,
			number: this.props.customer.number,
			postal_code: this.props.customer.postal_code,
			district: this.props.customer.district,
			county: this.props.customer.county,
			state: this.props.customer.state,
			email: this.props.customer.email,
			RFC: this.props.customer.RFC,
			business_name: this.props.customer.business_name,
			latitude: this.props.customer.latitude,
			longitude: this.props.customer.longitude,
			type: this.props.customer.type,
			notes: this.props.customer.notes,
			created: this.props.customer.created,
			updated: new Date(),
			qr: this.props.customer.qr,
			status: this.props.customer.status
		});
		this._setMovements();
		this._setDeposits();
	}

	_setMovements = () => {
		axios.get('http://localhost:8000/sales?customer=' + this.props.customer.customer_id)
		.then(response => {
			this.setState({
				movements: response.data
			});
		})
		.catch(error => {
			console.log(error);
		});
	}

	_setDeposits = () => {
		axios.get('http://localhost:8000/deposits?customer=' + this.props.customer.customer_id)
		.then(response => {
			this.setState({
				deposits: response.data
			});
		})
		.catch(error => {
			console.log(error);
		});
	}

	_handleBalance = () => {
		let sales = this.state.movements.reduce((accum, movement) => accum + (movement.selling_price * movement.ammount), 0);
		let deposits = this.state.deposits.reduce((accum, deposit) => accum + deposit.ammount, 0);
		console.log(sales + ' - ' + deposits);
		return sales - deposits
	}

	_handleClick = () => {
		this.setState({
			edit: !this.state.edit
		})
	}

	_onPhoneChange = (e) => {
		this.setState({
			phone: e.target.value
		});
	}

	_onStreetChange = (e) => {
		this.setState({
			street: e.target.value
		});
	}

	_onNumberChange = (e) => {
		this.setState({
			number: e.target.value
		});
	}

	_onPostalCodeChange = (e) => {
		this.setState({
			postal_code: e.target.value
		});
	}

	_onDistrictChange = (e) => {
		this.setState({
			district: e.target.value
		});
	}

	_onCountyChange = (e) => {
		this.setState({
			county: e.target.value
		});
	}

	_onStateChange = (e) => {
		this.setState({
			state: e.target.value
		});
	}

	_onEmailChange = (e) => {
		this.setState({
			email: e.target.value
		});
	}

	_onRFCChange = (e) => {
		this.setState({
			RFC: e.target.value
		});
	}

	_onBusinessChange = (e) => {
		this.setState({
			business_name: e.target.value
		})
	}

	_onNotesChange = (e) => {
		this.setState({
			notes: e.target.value
		});
	}

	_onQRChange = (_setCustomers, _showAlert) => {
		axios.put('http://localhost:8000/customers', 
			{
				customer_id: this.state.customer_id,
				owner: this.state.owner,
				customer_name: this.state.customer_name,
				phone: this.state.phone,
				street: this.state.street,
				number: this.state.number,
				postal_code: this.state.postal_code,
				district: this.state.district,
				county: this.state.county,
				state: this.state.state,
				email: this.state.email,
				RFC: this.state.RFC,
				business_name: this.state.business_name,
				latitude: this.state.latitude,
				longitude: this.state.longitude,
				type: this.state.type,
				notes: this.state.notes,
				created: this.state.created,
				updated: this.state.updated,
				qr: this.state.qr === 0 ? 1 : 0,
				status: this.state.status
		})
		.then(response => {
			_setCustomers();
			_showAlert('Cliente actualizado correctamente.', 'Éxito.');
		})
		.catch(error => {
			_showAlert('No se puede conectar con el servidor.', 'Error.')
		});
		/*
		if(this.state.qr === 0){
			this.setState({
				qr: 1
			});
		} else {
			this.setState({
				qr: 0
			})
		}*/
	}

	_onStatusChange = (_setCustomers, _showAlert) => {
		axios.put('http://localhost:8000/customers', 
			{
				customer_id: this.state.customer_id,
				owner: this.state.owner,
				customer_name: this.state.customer_name,
				phone: this.state.phone,
				street: this.state.street,
				number: this.state.number,
				postal_code: this.state.postal_code,
				district: this.state.district,
				county: this.state.county,
				state: this.state.state,
				email: this.state.email,
				RFC: this.state.RFC,
				business_name: this.state.business_name,
				latitude: this.state.latitude,
				longitude: this.state.longitude,
				type: this.state.type,
				notes: this.state.notes,
				created: this.state.created,
				updated: this.state.updated,
				qr: this.state.qr,
				status: this.state.status === 0 ? 1 : 0
			})
		.then(response => {
			_setCustomers();
			_showAlert('Cliente actualizado correctamente.', 'Éxito.');
		})
		.catch(error => {
			_showAlert('No se puede conectar con el servidor.', 'Error.')
		});
	}

	_onSubmit = (_setCustomers, _showAlert) => {
		axios.put('http://localhost:8000/customers', 
			{
				customer_id: this.state.customer_id,
				owner: this.state.owner,
				customer_name: this.state.customer_name,
				phone: this.state.phone,
				street: this.state.street,
				number: this.state.number,
				postal_code: this.state.postal_code,
				district: this.state.district,
				county: this.state.county,
				state: this.state.state,
				email: this.state.email,
				RFC: this.state.RFC,
				business_name: this.state.business_name,
				latitude: this.state.latitude,
				longitude: this.state.longitude,
				type: this.state.type,
				notes: this.state.notes,
				created: this.state.created,
				updated: this.state.updated,
				qr: this.state.qr,
				status: this.state.status
			})
		.then(response => {
			_setCustomers();
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
					<div style={{display: 'flex', flex: 1, flexGrow: 1, flexDirection: 'column'}}>
						<div className="CustomerWrapper" >
							<div className="Customer">
								{this.state.qr === 1 ? <QRCode value={this.props.customer.customer_id.toString()} /> : null}
								<div className="CustomerName">
									{this.props.customer.customer_name}
									&nbsp;<Icon iconName="EditContact" className={this.state.edit ? 'EditActive' : 'EditInactive'} onClick={this._handleClick}/>
									{this.state.edit ? <Icon iconName="Save" className="EditActive" onClick={() => this._onSubmit(context._setCustomers, context._showAlert)}/> : null }
								</div>
								<div className="CardDescriptionField">
									{this.props.customer.owner}
								</div>
								<hr style={{width: 80 + '%'}}/>
								<div className="CustomerInformation">
									<div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}><div>Tel:&nbsp;</div><input type="text" onChange={(e) => this._onPhoneChange(e)} className="CustomerTextInput" style={this.state.edit ? {cursor: 'text'} : {cursor: 'default'}} value={this.state.phone} readOnly={this.state.edit ? false : true} /></div>
									<div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}><div>Calle:&nbsp;</div><input type="text" onChange={(e) => this._onStreetChange(e)} className="CustomerTextInput" style={this.state.edit ? {cursor: 'text'} : {cursor: 'default'}} value={this.state.street} readOnly={this.state.edit ? false : true} /></div>
									<div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}><div>No.:&nbsp;</div><input type="text" onChange={(e) => this._onNumberChange(e)} className="CustomerTextInput" style={this.state.edit ? {cursor: 'text'} : {cursor: 'default'}} value={this.state.number} readOnly={this.state.edit ? false : true} /></div>
									<div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}><div>CP:&nbsp;</div><input type="text" onChange={(e) => this._onPostalCodeChange(e)} className="CustomerTextInput" style={this.state.edit ? {cursor: 'text'} : {cursor: 'default'}} value={this.state.postal_code} readOnly={this.state.edit ? false : true} /></div>
									<div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}><div>Colonia:&nbsp;</div><input type="text" onChange={(e) => this._onDistrictChange(e)} className="CustomerTextInput" style={this.state.edit ? {cursor: 'text'} : {cursor: 'default'}} value={this.state.district} readOnly={this.state.edit ? false : true} /></div>
									<div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}><div>Ciudad:&nbsp;</div><input type="text" onChange={(e) => this._onCountyChange(e)} className="CustomerTextInput" style={this.state.edit ? {cursor: 'text'} : {cursor: 'default'}} value={this.state.county} readOnly={this.state.edit ? false : true} /></div>
									<div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}><div>Estado:&nbsp;</div><input type="text" onChange={(e) => this._onStateChange(e)} className="CustomerTextInput" style={this.state.edit ? {cursor: 'text'} : {cursor: 'default'}} value={this.state.state} readOnly={this.state.edit ? false : true} /></div>
									<div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}><div>Email:&nbsp;</div><input type="text" onChange={(e) => this._onEmailChange(e)} className="CustomerTextInput" style={this.state.edit ? {cursor: 'text'} : {cursor: 'default'}} value={this.state.email} readOnly={this.state.edit ? false : true} /></div>
									<div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}><div>Tipo de negocio:&nbsp;</div><div>{this.props.customer.type}</div></div>
									<div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}><div>RFC:&nbsp;</div>{this.state.RFC.length > 0 ? <input type="text" onChange={(e) => this._onRFCChange(e)} className="CustomerTextInput" style={this.state.edit ? {cursor: 'text'} : {cursor: 'default'}} value={this.state.RFC} readOnly={this.state.edit ? false : true} /> : null}</div>
									<div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}><div>Razón social:&nbsp;</div>{this.state.business_name.length > 0 ? <input type="text" onChange={(e) => this._onBusinessChange(e)} className="CustomerTextInput" style={this.state.edit ? {cursor: 'text'} : {cursor: 'default'}} value={this.state.business_name} readOnly={this.state.edit ? false : true} /> : null}</div>
									<div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}><div>Notas:&nbsp;</div>{this.state.notes.length > 0 ? <textarea type="text" onChange={(e) => this._onNotesChange(e)} className="CustomerTextInput" style={this.state.edit ? {cursor: 'text'} : {cursor: 'default'}} value={this.state.notes} readOnly={this.state.edit ? false : true} /> : null}</div>
									<div>
										<Toggle
											defaultChecked={this.props.customer.status === 1 ? true : false}
											label=""
											onText="Habilitado"
											offText="Deshabilitado"
											onChange={() => this._onStatusChange(context._setCustomers, context._showAlert)}
										/>
									</div>
									{this.state.qr === 0 ? <PrimaryButton data-automation-id="test" checked={false} text="Generar QR" onClick={() => this._onQRChange(context._setCustomers, context._showAlert)} allowDisabledFocus={true} /> : null}
								</div>
							</div>
							<CustomerStatistics movements={this.state.movements} balance={this._handleBalance}/>
						</div>
						<div className="CustomerWrapper" >
							{this.state.movements.length > 0 && this.state.deposits.length > 0 ? <CustomerDeposits deposits={this.state.deposits} balance={this._handleBalance}/> : null}
						</div>
					</div>
      		
      	)}
      </AppContext.Consumer>
    );
  }
}

class CustomerStatistics extends React.Component {

	render() {
		return(
				<Paper style={styles.customerMovements}>
					Saldo pendiente: ${this.props.balance()}
					<br/>
					<Table >
						<TableHead>
							<TableRow>
								<TableCell>Fecha</TableCell>
								<TableCell align="right">Producto&nbsp;</TableCell>
								<TableCell align="right">Precio de venta&nbsp;</TableCell>
								<TableCell align="right">IVA&nbsp;</TableCell>
								<TableCell align="right">Tipo de pago&nbsp;</TableCell>
								<TableCell align="right">Tipo de venta&nbsp;</TableCell>
								<TableCell align="right">Vendedor&nbsp;</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.props.movements.map(movement => (
								<TableRow hover key={movement.sale_id} onClick={() => console.log(movement.movement_id)} style={{cursor: 'pointer'}}>
									<TableCell component="th" scope="row">{moment(new Date(movement.sale_date)).format('DD/MM/YYYY')}</TableCell>
									<TableCell align="right">{movement.product_name}</TableCell>
									<TableCell align="right">${movement.selling_price}</TableCell>
									<TableCell align="right">{movement.IVA === 0 ? 'No' : 'Si'}</TableCell>
									<TableCell align="right">{movement.cash === 0 ? 'Efectivo' : 'Depósito'}</TableCell>
									<TableCell align="right">{movement.sale_type === 0 ? 'Contado' : 'Consignación'}</TableCell>
									<TableCell align="right">{movement.personal_name}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Paper>
		);
	}
}

class CustomerDeposits extends React.Component {

	render() {
		return(
				<Paper style={styles.customerMovements}>
					<br/>
					<Table >
						<TableHead>
							<TableRow>
								<TableCell>Fecha</TableCell>
								<TableCell align="right">Tipo de pago&nbsp;</TableCell>
								<TableCell align="right">Cliente&nbsp;</TableCell>
								<TableCell align="right">Monto&nbsp;</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{this.props.deposits.map(deposit => (
								<TableRow hover key={deposit.deposit_id} onClick={() => console.log(deposit.deposit_id)} style={{cursor: 'pointer'}}>
									<TableCell component="th" scope="row">{moment(new Date(deposit.deposit_date)).format('DD/MM/YYYY')}</TableCell>
									<TableCell align="right">{deposit.payment_type === 0 ? 'Efectivo' : 'Depósito'}</TableCell>
									<TableCell align="right">{deposit.customer_name}</TableCell>
									<TableCell align="right">{deposit.ammount}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Paper>
		);
	}
}

export default Customer;

const styles = {
	customerMovements: {
		display: 'flex',
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		padding: 1.5 + 'em',
		marginTop: 1.5 + 'em',
		marginRight: 1.5 + 'em',
		marginBottom: 1.5 + 'em',
		marginLeft: 1 + 'em',
		overflow: 'scroll',
		//maxWidth: 45 + 'em'
	},

}