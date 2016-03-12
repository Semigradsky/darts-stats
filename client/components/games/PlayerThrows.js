import React from 'react';
import ReactDOM from 'react-dom';

import keycode from 'keycode';
import classNames from 'classnames';

import './playerThrows.less';

const NUMBER_KEYS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const MOTION_KEYS = ['left', 'home', 'right', 'end', 'tab'];
const AVAILABLE_KEYS = [].concat(
	NUMBER_KEYS,
	MOTION_KEYS,
	'=',
	'space',
	'enter',
	'backspace',
	'delete',
	'esc'
);

const PlayerThrows = React.createClass({

	getInitialState() {
		return {
			editing: false
		};
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
			event.preventDefault();
			return;
		}

		if (keyName === '=' && !event.shiftKey) {
			event.preventDefault();
			return;
		}

		if (keyName === 'esc') {
			this.stopEditing();
			return;
		}

		if (keyName === 'enter') {
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
		const className = classNames({
			'player-throws': true,
			editing: this.state.editing
		});
		return (
			<div className={className}>
				<input ref="input" type="text"
					onKeyDown={this.onKeyDown}
					onBlur={this.stopEditing}
					onFocus={this.startEditing}
					defaultValue={this.props.throws}
				/>
				<div className="points"
					onClick={this.startEditing}
				>
					{this.props.value}
				</div>
			</div>
		);
	}

});

export default PlayerThrows;
