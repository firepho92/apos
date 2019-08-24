import React from 'react';
import posed from 'react-pose';
import AppContext from '../context/AppContext';
import './MaterialAlert.css';

const AlertWrapper = posed.div({
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
});

class MaterialAlert extends React.Component {
	render() {
		return (
			<AppContext.Consumer>
				{context => (
					<AlertWrapper className="materialAlert" pose={context.state.alert.show === 1 ? 'visible' : 'hidden'}>
						<div className="materialAlertTitle">{context.state.alert.title}</div>
						<div className="materialAlertText">{context.state.alert.msg}</div>
					</AlertWrapper>
				)}
			</AppContext.Consumer>
  	);
	}
}

export default MaterialAlert;
