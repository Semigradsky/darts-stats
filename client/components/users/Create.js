import React from 'react';
import Formsy from 'formsy-react';
import FRC from 'formsy-react-components';

import UserActions from 'components/users/Actions';
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
			const user = await UserActions.create(data);
			await UserActions.doLatest(user.id);
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
				<FRC.Input type="text" name="name" label="Name" required />
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
