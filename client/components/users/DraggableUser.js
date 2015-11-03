import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';

import { User } from 'components/users';

const userSource = {
	beginDrag(props) {
		return {
			id: props.id
		};
	},
	endDrag(props, monitor) {
		const result = monitor.getDropResult();

		if (!result) {
			return props.revert();
		}

		props.onMove(props.id);
	}
};

const userTarget = {
	drop(props, monitor) {
		return { from: monitor.getItem().id, to: props.id };
	},
	hover(props, monitor) {
		const draggedId = monitor.getItem().id;
		props.onHover(draggedId, props.id);
	}
};

@DropTarget('user', userTarget, connect => ({
	connectDropTarget: connect.dropTarget()
}))
@DragSource('user', userSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
}))
class DraggableUser extends React.Component {
	render() {
		const { isDragging, connectDragSource, connectDropTarget } = this.props;
		return connectDragSource(connectDropTarget(
			<div className={isDragging ? 'draggable dragging' : 'draggable'}>
				<User {...this.props} />
			</div>
		));
	}
}

export default DraggableUser;
