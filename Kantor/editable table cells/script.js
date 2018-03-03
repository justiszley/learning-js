const table = document.getElementById('bagua-table');
table.addEventListener('click', onKlick);

let initialText = null;

function onKlick(event) {
	let target = event.target;
	let tagName = target.tagName;

	while (tagName !== 'TD') {
		if (target === this) return;
		target = target.parentElement;
		tagName = target.tagName;
	}


	const area = document.createElement('textarea');
	area.value = target.innerHTML;
	initialText = target.innerHTML;

	target.innerHTML = '';
	area.className = 'area';
	area.style.width = target.offsetWidth + 'px';
	area.style.height = target.offsetHeight + 'px';
	target.classList.add('choosenTd');

	target.appendChild(area);
	target.appendChild(createControls());

	area.focus();

	table.removeEventListener('click', onKlick);
}

function createControls() {
	const wrapper = document.createElement('div');
	wrapper.className = 'controls_wrapper'

	const okBtn = document.createElement('button');
	okBtn.className = 'control_ok'
	okBtn.innerHTML = 'OK';
	okBtn.addEventListener('click', okHandler);

	const cancelBtn = document.createElement('button');
	cancelBtn.className = 'control_ok';
	cancelBtn.innerHTML = '	CANCEL';
	cancelBtn.addEventListener('click', cancelHandler);

	wrapper.appendChild(okBtn);
	wrapper.appendChild(cancelBtn);

	return wrapper;
}

function okHandler(event) {
	const tdParent = event.target.closest('td');
	const area = tdParent.querySelector('textarea');
	const text = area.value;

	tdParent.innerHTML = text;
	tdParent.classList.remove('choosenTd');

	table.addEventListener('click', onKlick);
}

function cancelHandler(event) {
	const tdParent = event.target.closest('td');
	
	tdParent.innerHTML = initialText;
	tdParent.classList.remove('choosenTd');

	table.addEventListener('click', onKlick);
}