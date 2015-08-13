import React from 'react';
import Modal from 'react-modal';

import './modal.less';

const appElement = document.getElementsByTagName('body')[0];
Modal.setAppElement(appElement);

const CustomModal = React.createClass({
	closeModal(e) {
		e && e.preventDefault();
		this.props.onClose && this.props.onClose();
	},

	render() {
		const child = React.Children.map(
			this.props.children,
			(el) => React.cloneElement(el, { close: this.closeModal })
		);

		return (
			<Modal
				{...this.props}
				isOpen={true}
				onRequestClose={this.closeModal}
			>
				{child}
			</Modal>
		);
	}
});

export default CustomModal;
