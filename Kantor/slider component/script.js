//моё решение. Нужно поработать над архитектурой

function Slider(options) {
	const elem = options.elem;

	const thumb = elem.querySelector('.thumb');
	const slider = elem.querySelector('.stripe');

	thumb.onmousedown = function(event) {
		const thumbCoords = getCoords(thumb);
		const shiftX = event.pageX - thumbCoords.left;

		const sliderCoords = getCoords(slider);
		document.onmousemove = function(event) {
			let left = event.pageX - sliderCoords.left - shiftX;

			if (left < 0) 
				left = 0;
			else if (left > (slider.offsetWidth - thumb.offsetWidth)) 
				left = slider.offsetWidth - thumb.offsetWidth;

			thumb.style.left = left + 'px';
		}

		document.onmouseup = function() {
			document.onmousemove = document.onmouseup = null;
		}
	}
}

function getCoords(elem) {
	const coords = elem.getBoundingClientRect();
	return {
		'left': coords.left + pageXOffset,
		'top': coords.top + pageYOffset
	}
}

const slider = new Slider({
	elem: document.getElementById('slider')
})