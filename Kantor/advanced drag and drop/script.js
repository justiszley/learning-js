'use strict;';

document.addEventListener('mousedown', onMouseDown);
document.addEventListener('mousemove', onMouseMove);
document.onmousemove = function () {
	return false;
};
document.addEventListener('mouseup', onMouseUp);
const basket = document.querySelector('.block_basket');
basket.onclick = function () {
	window.location.reload();
};

let dragObject = {};

function onMouseDown (event) {
	if (event.which !== 1) return;
	
	const elem = event.target.closest('.draggable');
	if (!elem) return;

	dragObject.elem = elem;
	dragObject.downX = event.pageX;
	dragObject.downY = event.pageY;
}

function onMouseMove (event) {
	if (!dragObject.elem) return;
	
	if (!dragObject.avatar) { // перенос не начат
		const moveX = event.pageX - dragObject.downX;
		const moveY = event.pageY - dragObject.downY;
		if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) return;

		dragObject.avatar = createAvatar();
		if (!dragObject.avatar) {
			dragObject = {};
			return;
		}

		const coords = getCoords(dragObject.avatar);
		dragObject.shiftX = dragObject.downX - coords.left;
		dragObject.shiftY = dragObject.downY - coords.top;

		startDrag(event);
	}

	dragObject.avatar.style.left = event.pageX - dragObject.shiftX + 'px';
	dragObject.avatar.style.top = event.pageY - dragObject.shiftY + 'px';
}

function createAvatar () {
	const avatar = dragObject.elem;
	const styles = getComputedStyle(avatar);
	const old = {
		parent: avatar.parentNode,
		nextSibling: avatar.nextSibling,
		position: styles.position || '',
		left: styles.left || '',
		top: styles.top || '',
		zIndex: styles.zIndex || '',
	};

	avatar.rollback = function () {
		old.parent.insertBefore(avatar, old.nextSibling);
		avatar.style.position = old.position;
		avatar.style.left = old.left;
		avatar.style.top = old.top;
		avatar.style.zIndex = old.zIndex;
	};

	return avatar;
}

function startDrag (event) {
	const avatar = dragObject.avatar;

	document.body.appendChild(avatar);
	avatar.style.zIndex = 9999;
	avatar.style.position = 'absolute';
}

function getCoords (elem) {
	const coords = elem.getBoundingClientRect();
	return {
		'top': pageYOffset + coords.top,
		'left': pageXOffset + coords.left,
	};
}

function onMouseUp (event) {
	if (dragObject.avatar) finishDrag(event);

	dragObject = {};
}

function finishDrag (event) {
	const dropX = event.clientX;
	const dropY = event.clientY;
	const dropElem = findDroppable(dropX, dropY);

	if (dropElem) {
		dragObject.avatar.hidden = true;
	}
	else {
		dragObject.avatar.rollback();
	}
}

function findDroppable (dropX, dropY) {
	dragObject.avatar.hidden = true;
	const elem = document.elementFromPoint(dropX, dropY);
	dragObject.avatar.hidden = false;

	return elem.closest('.droppable');
}