import React from 'react';
import ReactDOM from 'react-dom';

import './playerThrows.less';

const NUMBER_KEYCODES = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
const MOTION_KEYCODES = [
	37 /* ArrowLeft */,
	36 /* Home */,
	39 /* ArrowRight */,
	35 /* End */,
	9  /* Tab */
];
const AVAILABLE_KEYCODES = [].concat(
	NUMBER_KEYCODES,
	MOTION_KEYCODES,
	187 /* + */,
	13  /* Enter */,
	8   /* Backspace */,
	46  /* Delete */,
	27  /* Escape */
);

const PlayerThrows = React.createClass({

	getInitialState() {
		return {
			points: null,
			editing: false
		};
	},

	componentDidMount() {
		this.setState({
			points: this.props.throws ? +eval(this.props.throws) : null
		});
	},

	componentDidUpdate() {
		if (this.state.editing) {
			const input = ReactDOM.findDOMNode(this.refs.input);
			input.value = this.props.throws;
			input.focus();
		}
	},

	onKeyDown(event) {
		if (!AVAILABLE_KEYCODES.includes(event.keyCode)) {
			return event.preventDefault();
		}

		if (event.keyCode === 27 /* Escape */) {
			return this.stopEditing();
		}

		if (event.keyCode === 13 /* Enter */) {
			this.props.update(event.target.value);
			this.stopEditing();
		}
	},

	startEditing() {
		this.setState({ editing: true });
	},

	stopEditing() {
		this.setState({ editing: false });
	},

	render() {
		return (
			<div className={(this.state.editing ? 'editing ' : '') + 'player-throws'}>
				<input ref="input" type="text"
					onKeyDown={this.onKeyDown}
					onBlur={this.stopEditing}
					onFocus={this.startEditing}
					defaultValue={this.props.throws}
				/>
				<div className="points"
					onClick={this.startEditing}
				>
					{this.state.points}
				</div>
			</div>
		);
	}

});

export default PlayerThrows;
