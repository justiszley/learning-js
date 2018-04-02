document.body.addEventListener('mousedown', onMouseDown);
document.body.ondragstart = function () {
	return false;
};

function onMouseDown (event) {
	event.preventDefault();
	const target = event.target;
	if (!target.classList.contains('draggable')) return;

	const coords = target.getBoundingClientRect();
	const shiftX = event.clientX - coords.left;
	const shiftY = event.clientY - coords.top;
	moveAt(event);

	target.style.position = 'fixed';

	window.onmousemove = function (event) {
		moveAt(event);
	};

	target.onmouseup = function () {
		target.style.top = parseInt(target.style.top) + pageYOffset + 'px';
		target.style.position = 'absolute';

		window.onmousemove = null;
		target.onmouseup = null;
	};

	function moveAt (event) {
		let top = event.clientY - shiftY;
		let left = event.clientX - shiftX;
		const rightEdge = document.documentElement.clientWidth - target.offsetWidth;
		const bottomEdge = document.documentElement.clientHeight - target.offsetHeight;

		if (left > rightEdge) {
			left = rightEdge;
		}
		else if (left < 0) {
			left = 0;
		}

		if (top > bottomEdge) {
			top = bottomEdge;
			window.scrollBy(0, 10);
		}
		else if (top < 0) {
			top = 0;
			window.scrollBy(0, -10);
		}

		target.style.top = top + 'px';
		target.style.left = left + 'px';
	}
}

