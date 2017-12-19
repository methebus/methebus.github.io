require('./stylesheets/index.scss');

var form = document.getElementById('reg-form'),
	submit_bttn = form.getElementsByClassName('form-submit')[0],
	progress_icon = form.getElementsByClassName('form-progress')[0],
	alert_block = form.getElementsByClassName('form-alert')[0],
	greeting_block = form.getElementsByClassName('form-info')[0],
	inputs = [],
	formData = {email: '', birthday: '', pass: '', repass: ''};

for(var i = 0, allInputs = form.getElementsByTagName('input'); i < allInputs.length; i++) {
	if(allInputs[i].type != 'submit')
		inputs.push(allInputs[i]);
}

form.onsubmit = function() {
	showMessage('');
	var bdDate = '', completed = 0;
	
	submit_bttn.setAttribute('disabled', true);
	
	for(var i = 0; i < inputs.length; i++) {
		if(inputs[i].name == 'birthday') {
			bdDate = Date.parse(inputs[i].value);
			if(isNaN(bdDate)) {
				showMessage('Please, write valid birthday date (dd.mm.yyyy)');
				break;
			} else {
				if(bdDate - new Date() > 0) {
					showMessage('Please, write valid birthday date');
					break;
				}
			}
		} else if(inputs[i].name == 'repass') {
			if(inputs[i].value == '') {
				showMessage('All fields are required');
				break;
			} else if(inputs[i].value != inputs[i-1].value) {
				showMessage('Passwords must match');
				break;
			}
		} else {
			if(inputs[i].value == '') {
				showMessage('All fields are required');
				break;
			}
		}
		formData[inputs[i].name] = inputs[i].value;
		completed++;
	}

	if(completed == 4) {
		if(progress_icon.className.indexOf('visible') == -1)
			progress_icon.className += ' visible';

		var xhr = new XMLHttpRequest();
		xhr.open('POST', 'backend/reg.php', true);

		xhr.setRequestHeader("Content-Type", "application/json");

		xhr.onreadystatechange = function() {
			if(this.readyState == 4)  {

				if(this.status != 200) {
					progress_icon.className = progress_icon.className.replace(/\svisible/, '');
					submit_bttn.removeAttribute('disabled');
					showMessage('Registration error, try again later');
					return;
				} else {
					progress_icon.className = progress_icon.className.replace(/\svisible/, '');
					if(this.responseText != 'error') {
						showGreeting(this.responseText);
					}
				}

			}
		}

		xhr.send(JSON.stringify(formData));

	} else
		submit_bttn.removeAttribute('disabled');

	return false;
}

function showMessage(text) {
	alert_block.innerHTML = text;
}

function showGreeting(text) {
	greeting_block.innerHTML = text;
	greeting_block.className += ' visible';
}