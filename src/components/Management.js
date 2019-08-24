import React from 'react';
import AppContext from '../context/AppContext';

class Management extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }

  _calculateMovements = (data, year, month, day) => {
    let filtered_data = [];
    if(year === undefined) {
      filtered_data = data;
    } else {
      if(month === undefined) {
        filtered_data = data.filter(movement => new Date(movement.sale_date).getFullYear() === year);
      } else {
        if(day === undefined) {
          filtered_data = data.filter(movement => new Date(movement.sale_date).getFullYear() === year && (new Date(movement.sale_date).getMonth() + 1) === month);
        } else {
          filtered_data = data.filter(movement => new Date(movement.sale_date).getFullYear() === year && (new Date(movement.sale_date).getMonth() + 1) === month && new Date(movement.sale_date).getDate() === day);
        }
      }
    }
    let incoming = filtered_data.reduce((accum, movement) => accum + movement.selling_price * movement.ammount, 0);
    return incoming;
  }

  _outgoing = (data, year, month, day) => {
    
  }

  render() {
    return (
      <AppContext.Consumer>
        {context => (
          <div className="Management">
            <div className="IncomingOutgoingCards">
              <div style={{color: '#4CAF50', fontSize: 25}}>{this._calculateMovements(context.state.movements)}</div>
            </div>
            <div className="IncomingOutgoingCards">
            <div style={{color: '#FF5722', fontSize: 25}}>{this._calculateMovements(context.state.payments)}</div>
            </div>
          </div>
        )}
      </AppContext.Consumer>
    );
  }

}

export default Management;