import React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import Paper from '@material-ui/core/Paper';
import AppContext from '../context/AppContext';
import axios from 'axios';

class Outgoing extends React.Component {
  constructor() {
    super();
    this.state = {
      ammount: '',
      description: ''
    }
  }
  
  _onAmountChange = (e, ammount) => {
    this.setState({
      ammount
    });
  }

  _onDescriptionChange = (e, description) => {
    this.setState({
      description
    });
  }

  _handleSubmit = () => {
    axios.post('http://localhost:8000/payments', {ammount: this.state.ammount, date: new Date(), description: this.state.description})
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <Paper style={{...styles.panel, opacity: this.state.opacity}}>
            <TextField label="Cantidad" value={this.state.amount} onChange={this._onAmountChange} styles={{ fieldGroup: { width: 300 } }} type="number" autoComplete="off" required/>
            <TextField label="Descripción" value={this.state.description} onChange={this._onDescriptionChange} styles={{ fieldGroup: { width: 300 } }} autoComplete="off" required/>
            <PrimaryButton onClick={this._handleSubmit} style={{marginTop: '2em'}} disabled={false} text="Agregar" type="submit" allowDisabledFocus={true}/>
          </Paper>
        )}
      </AppContext.Consumer>
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

export default Outgoing;