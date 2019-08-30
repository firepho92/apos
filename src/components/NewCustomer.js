import React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { ComboBox } from 'office-ui-fabric-react/lib/index';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import AppContext from '../context/AppContext';

const INITIAL_OPTIONS = [
  { key: 'Persona', text: 'Persona' },
  { key: 'Bar', text: 'Bar' },
  { key: 'Cafetería', text: 'Cafetería' },
  { key: 'Hotel', text: 'Hotel' },
  { key: 'Tienda', text: 'Tienda' },
  { key: 'Otro', text: 'Otro' },
];


class NewCustomer extends React.Component {
  constructor() {
    super();
    this.state = {
      options: [],
      initialDisplayValue: '',
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
      created: new Date(),
      updated: new Date(),
      qr: false,
      status: true
    }
  }

  _onOwnerChange = (e, owner) => {
    this.setState({
      owner
    })
  }

  _onCustomerNameChange = (e, customer_name) => {
    this.setState({
      customer_name
    })
  }

  _onPhoneChange = (e, phone) => {
    this.setState({
      phone
    })
  }

  _onStreetChange = (e, street) => {
    this.setState({
      street
    })
  }

  _onNumberChange = (e, number) => {
    this.setState({
      number
    })
  }

  _onPostalCodeChange = (e, postal_code) => {
    this.setState({
      postal_code
    })
  }

  _onDistrictChange = (e, district) => {
    this.setState({
      district
    })
  }

  _onCountyChange = (e, county) => {
    this.setState({
      county
    })
  }

  _onStateChange = (e, state) => {
    this.setState({
      state: state.text
    })
  }

  _onEmailChange = (e, email) => {
    this.setState({
      email
    })
  }

  _onRFCChange = (e, RFC) => {
    this.setState({
      RFC
    })
  }

  _onBusiness_nameChange = (e, business_name) => {
    this.setState({
      business_name
    })
  }

  _onNotesChange = (e, notes) => {
    this.setState({
      notes
    })
  }

  handleSubmit = (e, _showAlert, _setCustomers) => {
    e.preventDefault();
    axios.post('http://localhost:8000/customers', {...this.state})
    .then(response => {
      console.log(response)
      _showAlert('Creado correctamente', 'Notificación');
      _setCustomers();
      setTimeout(() => {this.props._setView(0)}, 500);
    })
    .catch(error => {
      _showAlert('Intenta de nuevo.', 'Error');
    });
  }

  _getOptions = (currentOptions) => {
    if (this.state.options.length > 0) {
      return this.state.options;
    }

    const options = [...INITIAL_OPTIONS];
    this.setState({
      options: options,
      selectedOptionKey: '',
      initialDisplayValue: undefined
    });
    return options;
  }

  _onChange = (event, option, index, value) => { //this is type change handler
    if(option === undefined){
      this.setState({
        type: value
      })  
    } else {
      this.setState({
        type: option.text
      })  
    }
  }


  render() {
    return (
      <AppContext.Consumer>
      	{context => (
      		<div className="Customers">
      		  <Paper style={{padding: 1.5 + 'em'}}>
              <form onSubmit={e => this.handleSubmit(e, context._showAlert, context._setCustomers)}>
                <TextField
                  label="Nombre del cliente o empresa"
                  value={this.state.customer_name}
                  onChange={this._onCustomerNameChange}
                  styles={{ fieldGroup: { width: 300 } }}
                  required
                />
                <TextField
                  label="Dueño (sí aplica)"
                  value={this.state.owner}
                  onChange={this._onOwnerChange}
                  styles={{ fieldGroup: { width: 300 } }}
                />
                <TextField
                  label="Teléfono"
                  value={this.state.phone}
                  onChange={this._onPhoneChange}
                  styles={{ fieldGroup: { width: 300 } }}
                  required
                />
                <TextField
                  label="Calle"
                  value={this.state.street}
                  onChange={this._onStreetChange}
                  styles={{ fieldGroup: { width: 300 } }}
                  required
                />
                <TextField
                  label="Número"
                  value={this.state.number}
                  onChange={this._onNumberChange}
                  styles={{ fieldGroup: { width: 300 } }}
                  required
                />
                <TextField
                  label="CP"
                  value={this.state.postal_code}
                  onChange={this._onPostalCodeChange}
                  styles={{ fieldGroup: { width: 300 } }}
                  required
                />
                <TextField
                  label="Colonia"
                  value={this.state.district}
                  onChange={this._onDistrictChange}
                  styles={{ fieldGroup: { width: 300 } }}
                  required
                />
                <TextField
                  label="Municipio"
                  value={this.state.county}
                  onChange={this._onCountyChange}
                  styles={{ fieldGroup: { width: 300 } }}
                  required
                />
                <Dropdown
                  label="Estado"
                  selectedKey={this.state.state ? this.state.state : undefined}
                  onChange={this._onStateChange}
                  placeholder="Selecciona un estado"
                  options={[
                    { key: 'Aguascalientes', text: 'Aguascalientes' },
                    { key: 'Baja California', text: 'Baja California' },
                    { key: 'Baja Caifornia Sur', text: 'Baja Caifornia Sur' },
                    { key: 'Campeche', text: 'Campeche' },
                    { key: 'Chiapas', text: 'Chiapas' },
                    { key: 'Chihuahua', text: 'Chihuahua' },
                    { key: 'Coahuila de Zaragoza', text: 'Coahuila de Zaragoza' },
                    { key: 'Colima', text: 'Colima' },
                    { key: 'Durango', text: 'Durango' },
                    { key: 'Estado de México', text: 'Estado de México' },
                    { key: 'Guanajuato', text: 'Guanajuato' },
                    { key: 'Guerrero', text: 'Guerrero' },
                    { key: 'Hidalgo', text: 'Hidalgo' },
                    { key: 'Jalisco', text: 'Jalisco' },
                    { key: 'Michoacán de Ocampo', text: 'Michoacán de Ocampo' },
                    { key: 'Morelos', text: 'Morelos' },
                    { key: 'Nayarit', text: 'Nayarit' },
                    { key: 'Nuevo León', text: 'Nuevo León' },
                    { key: 'Oaxaca', text: 'Oaxaca' },
                    { key: 'Puebla', text: 'Puebla' },
                    { key: 'Querétaro', text: 'Querétaro' },
                    { key: 'Quintana Roo', text: 'Quintana Roo' },
                    { key: 'San Luis Potosí', text: 'San Luis Potosí' },
                    { key: 'Sinaloa', text: 'Sinaloa' },
                    { key: 'Sonora', text: 'Sonora' },
                    { key: 'Tabasco', text: 'Tabasco' },
                    { key: 'Tamaulipas', text: 'Tamaulipas' },
                    { key: 'Tlaxcala', text: 'Tlaxcala' },
                    { key: 'Veracruz de Ignacio de la Llave', text: 'Veracruz de Ignacio de la Llave' },
                    { key: 'Yucatán', text: 'Yucatán' },
                    { key: 'Zacatecas', text: 'Zacatecas' },
                  ]}
                  styles={{ dropdown: { width: 300 } }}
                />
                <TextField
                  label="Email"
                  value={this.state.email}
                  onChange={this._onEmailChange}
                  styles={{ fieldGroup: { width: 300 } }}
                  type="email"
                  required
                />

                <TextField
                  label="RFC"
                  value={this.state.RFC}
                  onChange={this._onRFCChange}
                  styles={{fieldGroup: { width: 300 }}}
                />

                <TextField
                  label="Razón social"
                  value={this.state.business_name}
                  onChange={this._onBusiness_nameChange}
                  styles={{fieldGroup: { width: 300 }}}
                />              

                <ComboBox
                  selectedKey={this.state.type}
                  label="Tipo"
                  allowFreeform={true}
                  autoComplete="on"
                  options={this.state.options}
                  onChange={this._onChange}
                  onResolveOptions={this._getOptions}
                  text={this.state.initialDisplayValue}
                  required
                />

                <TextField
                  label="Notas"
                  value={this.state.notes}
                  onChange={this._onNotesChange}
                  styles={{ fieldGroup: { width: 300 } }}
                  multiline
                  resizable={false}
                  rows={4}
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

export default NewCustomer;
