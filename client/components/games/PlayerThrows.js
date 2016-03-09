import React from 'react';
import ReactDOM from 'react-dom';

import keycode from 'keycode';

import './playerThrows.less';

const NUMBER_KEYS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const MOTION_KEYS = ['left', 'home', 'right', 'end', 'tab'];
const AVAILABLE_KEYS = [].concat(
	NUMBER_KEYS,
	MOTION_KEYS,
	'=',
	'enter',
	'backspace',
	'delete',
	'escape'
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
		const keyName = keycode(event);

		if (!AVAILABLE_KEYS.includes(keyName)) {
			return event.preventDefault();
		}

		if (keyName === '=' && !event.shiftKey) {
			return event.preventDefault();
		}

		if (keyName === 'esc') {
			return this.stopEditing();
		}

		if (keyName === 'enter') {
			let value = event.target.value;
			value = value.replace(/\+\++/g, '+');
			value = value.replace(/^\++/, '');
			value = value.replace(/\++$/, '');
			this.props.update(value);
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
