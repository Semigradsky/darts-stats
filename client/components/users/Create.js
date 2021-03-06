import React from 'react';
import Formsy from 'formsy-react';
import { Input, Row } from 'formsy-react-components';

import { UsersActions } from 'actions';
import Loading from 'components/Loading';
import { logError } from 'utils/log';
import alert from 'utils/alert';

const CreateUser = React.createClass({
	getInitialState() {
		return { dataSaved: true };
	},

	async onSubmit(data) {
		this.setState({ dataSaved: false });

		try {
			const { id } = await UsersActions.create(data);
			await UsersActions.doLatest(id);
			this.close();
		} catch (err) {
			this.setState({ dataSaved: true });
			alert('User not created. Something wrong.');
			logError(err);
		}
	},

	close() {
		this.props.close();
	},

	render() {
		return (
			<Formsy.Form onValidSubmit={this.onSubmit} className="form-horizontal form">
				<Input type="text" name="name" label="Name" required />
				<Row layout="horizontal">
					<Loading progress={!this.state.dataSaved}>
						<input className="btn btn-default" onClick={this.close} type="button" value="Cancel" />
						<span> </span>
						<input className="btn btn-primary" formNoValidate={true} type="submit" value="Create" />
					</Loading>
				</Row>
			</Formsy.Form>
		);
	}

});

export default CreateUser;
