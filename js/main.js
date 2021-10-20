const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const mayusculaEl = document.getElementById('mayuscula')
const minusculaEl = document.getElementById('minuscula')
const numerosEl = document.getElementById('numeros')
const simbolosEl = document.getElementById('simbolos')
const generateEl = document.getElementById('generate')
const copiar = document.getElementById('copiar')

const randomFunc = {
	lower: getRandomLower,
	upper: getRandomUpper,
	number: getRandomNumber,
	symbol: getRandomSymbol
}

copiar.addEventListener('click', () => {
	const textarea = document.createElement('textarea')
	const password = resultEl.innerText
	
	if(!password) { return; }
	
	textarea.value = password;
	document.body.appendChild(textarea)
	textarea.select()
	document.execCommand('copy')
	textarea.remove()
	alert('Contraseña copiada')
})

generate.addEventListener('click', () => {
	const length = +lengthEl.value;
	const hasLower = minusculaEl.checked
	const hasUpper = mayusculaEl.checked
	const hasNumber = numerosEl.checked
	const hasSymbol = simbolosEl.checked
	
	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
});

function generatePassword(lower, upper, number, symbol, length) {
	let generatedPassword = ''
	const typesCount = lower + upper + number + symbol;
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0])
	
	// Doesn't have a selected type
	if(typesCount === 0) {
		return ''
	}
	
	// create a loop
	for(let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]()
		})
	}
	
	const finalPassword = generatedPassword.slice(0, length)
	
	return finalPassword
}

function getRandomLower() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
	const simbolos = '!@#$%^&*(){}[]=<>/,.'
	return simbolos[Math.floor(Math.random() * simbolos.length)]
}

