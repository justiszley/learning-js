// разбор решения из учебника

// переменные вынесены наружу, значения им присваиваются там и тогда, 
// когда это надо сделать, и доступны они из любой функции компонента.
// обработчики вызывают соответствующие функции

function Slider(options) {
	const elem = options.elem;
	const thumb = elem.querySelector('.thumb');
	const slider = elem.querySelector('.stripe');

	let sliderCoords, thumbCoords, shiftX, shiftY;

	elem.ondragstart = function() {
		return false;
	}

	elem.onmousedown = function(event) {
		if (event.target.closest('.thumb')) {
			startDrag(event.clientX, event.clientY);
			return false;
		}
	}

	function startDrag(startClientX, startClientY) {
		thumbCoords = thumb.getBoundingClientRect();
		shiftX = startClientX - thumbCoords.left;
		shiftY = startClientY - thumbCoords.top;

		sliderCoords = slider.getBoundingClientRect();

		document.addEventListener('mousemove', onDocumentMouseMove);
		document.addEventListener('mouseup', onDocumentMouseUp)
	}

	function moveTo(clientX) {
		let newleft = clientX - sliderCoords.left - shiftX;

		if (newleft < 0)
			newleft = 0;
		else if (newleft > slider.offsetWidth - thumb.offsetWidth)
			newleft = slider.offsetWidth - thumb.offsetWidth;

		thumb.style.left = newleft + 'px';
	}

	function onDocumentMouseMove(event) {
		moveTo(event.clientX);
	}

	function onDocumentMouseUp(event) {
		endDrag();
	}

	endDrag = function() {
		document.removeEventListener('mousemove', onDocumentMouseMove);
		document.removeEventListener('mouseup', onDocumentMouseUp)
	}
}

const slider = new Slider({
	'elem': document.getElementById('slider')
})