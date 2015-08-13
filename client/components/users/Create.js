import React from 'react';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

import UserActions from './Actions';
import Loading from 'components/Loading';

const CreateUser = React.createClass({
	getInitialState() {
		return { dataSaved: true };
	},

	onSubmit(data) {
		this.setState({ dataSaved: false });
		UserActions.create(data, () => {
			this.close();
		});
	},

	close() {
		this.props.close();
	},

	render() {
		return (
			<Formsy.Form onValidSubmit={this.onSubmit} className="form-horizontal form">
				<FRC.Input type="text" name="name" label="Name" />
				<FRC.Row layout="horizontal">
					<Loading progress={!this.state.dataSaved}>
						<input className="btn btn-default" onClick={this.close} type="button" value="Cancel" />
						<span> </span>
						<input className="btn btn-primary" formNoValidate={true} type="submit" value="Create" />
					</Loading>
				</FRC.Row>
			</Formsy.Form>
		);
	}

});

export default CreateUser;
