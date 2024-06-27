const touches = [...document.querySelectorAll('.number')];
    //console.log(touches);
const listKeyCodes = touches.map(touche => touche.dataset.key)
const ecran = document.querySelector('.input');
//console.log(listKeyCodes)  
document.addEventListener('keydown',(e) =>{
    const value = e.keyCode.toString();
    calculer(value)
    //console.log(value, typeof value)
})

document.addEventListener('click', (e) =>{
    const value = e.target.dataset.key;
    calculer(value)

    //console.log(value, typeof value)
})

let currentInput = '';
    let operator = null;
    let firstOperand = null;

    const calculer = (value) => {
        if (listKeyCodes.includes(value)) {
            const keyElement = touches.find(touche => touche.dataset.key === value);
            const keyContent = keyElement.textContent;

            switch (value) {
                case '8': // DEL key
                    currentInput = currentInput.slice(0, -1);
                    ecran.textContent = currentInput || '0';
                    break;
                case 'r': // Reset key
                    currentInput = '';
                    firstOperand = null;
                    operator = null;
                    ecran.textContent = '0';
                    break;
                default:
                    if (!isNaN(keyContent) || keyContent === '.') {
                        // If it's a number or a dot
                        currentInput += keyContent;
                        ecran.textContent = currentInput;
                    } else if (['+', '-', 'X', '/'].includes(keyContent)) {
                        // If it's an operator
                        if (firstOperand === null) {
                            firstOperand = parseFloat(currentInput);
                        } else if (currentInput !== '') {
                            firstOperand = performCalculation(firstOperand, parseFloat(currentInput), operator);
                        }
                        operator = keyContent;
                        currentInput = '';
                        ecran.textContent = firstOperand;
                    } else if (keyContent === '=') {
                        // If it's the equal sign
                        if (firstOperand !== null && operator !== null && currentInput !== '') {
                            const result = performCalculation(firstOperand, parseFloat(currentInput), operator);
                            ecran.textContent = result;
                            firstOperand = result;
                            currentInput = '';
                            operator = null;
                        }
                    }
                    break;
            }
        }
    };

    const performCalculation = (a, b, op) => {
        switch (op) {
            case '+':
                return a + b;
            case '-':
                return a - b;
            case 'X':
                return a * b;
            case '/':
                return a / b;
            default:
                return b;
        }
    };