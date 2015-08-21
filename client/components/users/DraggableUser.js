import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';

import User from 'components/users/User';

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

		props.onMove(result.from, result.to);
	}
};

const userTarget = {
	drop(props, monitor) {
		return { from: monitor.getItem().id, to: props.id };
	}
};

@DropTarget('user', userTarget, connect => ({
	connectDropTarget: connect.dropTarget()
}))
@DragSource('user', userSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
}))
class DraggableUser {
	render() {
		const { isDragging, connectDragSource, connectDropTarget } = this.props;
		return connectDragSource(connectDropTarget(
			<div style={{ opacity: isDragging ? 0 : 1 }}>
				<User {...this.props} />
			</div>
		));
	}
}

export default DraggableUser;
