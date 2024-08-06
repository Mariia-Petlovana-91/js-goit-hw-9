const refs = {
	form: document.querySelector('.form-js'),
};


refs.form.addEventListener('input', collectFieldValues);
refs.form.addEventListener('submit', sendForm);

const STORAGE_KEY = "feedback-form-state";
let formData = {};


function getDataFromLocalStorage() {
	const dataFromLocalStorage = JSON.parse(localStorage.getItem(STORAGE_KEY));
	if (dataFromLocalStorage) {
		formData = dataFromLocalStorage;
		for (let key in dataFromLocalStorage) {
			if (dataFromLocalStorage.hasOwnProperty(key)) {
				refs.form.elements[key].value = dataFromLocalStorage[key];
			}
		}
	}
}

getDataFromLocalStorage();

function collectFieldValues(e) {
	formData[e.target.name] = e.target.value.trim();
	localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function sendForm(e) {
	e.preventDefault();

	const allFieldsFilled = [...refs.form.elements].every(element => {
		return element.name === "" || element.value.trim() !== "";
	});

	if (!allFieldsFilled) {
		alert("Fill please all fields");
		return;
	}

	console.log(formData);
	e.currentTarget.reset();
	localStorage.removeItem(STORAGE_KEY);
	formData = {};
}