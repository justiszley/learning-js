function showCover() {
	const coverDiv = document.createElement('div');
	coverDiv.id = 'cover-div';
	document.body.appendChild(coverDiv);
}

function hideCover() {
	document.body.removeChild(document.getElementById('cover-div'));
}

function showPrompt(text, callback) {
	showCover();
	const form = document.getElementById('prompt-form');
	const container = document.getElementById('prompt-form-container');
	document.getElementById('prompt-message').innerHTML = text;
	form.elements.text.value = '';

	function complete(value) {
		hideCover();
		container.style.display = 'none';
		document.onkeydown = null;
		callback(value);
	}

	form.onsubmit = function() {
		const value = form.elements.text.value;
		if (value == '') return false;

		complete(value);
	}

	form.elements.cancel.onclick = function() {
		complete(null);
	}

	document.onkeydown = function(event) {
		if (event.key === 'Escape') {
			complete(null);
		}
	}

	const firstElem = form.elements[0];
	const lastElem = form.elements[form.elements.length - 1];

	firstElem.onkeydown = function(event) {
		if (event.key === 'Tab' && event.shiftKey) {
			firstElem.focus();
			return false;
		}
	}

	lastElem.onkeydown = function(event) {
		if (event.key === 'Tab' && !event.shiftKey) {
			lastElem.focus();
			return false;
		}
	}

	container.style.display = 'block';
	form.elements.text.focus();
}

document.querySelector('.call_modal').onclick = function() {
	showPrompt('yos', function(value) {
		console.log(value);
		alert(value);
	})
};