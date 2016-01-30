import React from 'react';

const NUMBER_KEYS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const MOTION_KEYS = ['ArrowLeft', 'Home', 'ArrowRight', 'End', 'Tab'];
const AVAILABLE_KEYS = NUMBER_KEYS.concat(MOTION_KEYS, '+', 'Enter', 'Backspace', 'Delete');

const PlayerThrows = React.createClass({

	getInitialState() {
		return {
			points: null
		};
	},

	componentDidMount() {
		this.setState({
			points: this.props.throws ? +eval(this.props.throws) : null
		});
	},

	onKeyDown(event) {

		if (!AVAILABLE_KEYS.includes(event.key)) {
			return event.preventDefault();
		}

		if (event.key === 'Enter') {
			this.props.update(event.target.value);
		}

	},

	render() {
		return (
			<div>
				<span>{this.state.points}</span>
				<input type="text" onKeyDown={this.onKeyDown} defaultValue={this.props.throws} />
			</div>
		);
	}

});

export default PlayerThrows;
