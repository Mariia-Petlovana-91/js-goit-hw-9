const refs = {
	form:document.querySelector('.form-js'),
}

refs.form.addEventListener('input', collectFieldValues);
refs.form.addEventListener('submit', sendForm);


const STORAGE_KEY = "feedback-form-state";
const formData = {};

function getDataFromLocalStorage(){
      const dataFromLocalStorage = JSON.parse( localStorage.getItem(STORAGE_KEY));
      
      if(dataFromLocalStorage){
		for (let key in dataFromLocalStorage){
			if (dataFromLocalStorage.hasOwnProperty(key)){
				refs.form.elements[key].value = dataFromLocalStorage[key];
			}
		}
	}

	
}

getDataFromLocalStorage();


function collectFieldValues (e){
	formData[e.target.name] = e.target.value;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(formData).trim());	
}


function sendForm(e){
	console.log(formData);
	e.preventDefault();
	e.currentTarget.reset();
	localStorage.removeItem(STORAGE_KEY);
}
