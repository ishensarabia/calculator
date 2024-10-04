// On DOM Load
document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.display h1');
    // Selectors
    const buttons = document.querySelectorAll('.btn');

    let firstOperand = '';
    let secondOperand = '';
    let activeOperand = ''; // first or second
    let operator;

    // Functions

    function add(a, b) {
        return a + b;
    }


    function subtract(a, b) {
        return a - b;
    }

    function multiply(a, b) {
        return a * b;
    }

    function divide(a, b) {
        return a / b;
    }

    
    function operate(operator, a, b) {
        switch (operator) {
            case '+':
                return add(a, b);
            case '-':
                return subtract(a, b);
            case '*':
                return multiply(a, b);
            case '/':
                return divide(a, b);
            default:
                return 'Error';
        }
    };

    
    function cleanup() {
        firstOperand = '';
        secondOperand = '';
        activeOperand = '';
        operator = '';
    }


    // Event Listeners
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // if button is not a number
            if (isNaN(button.textContent)) {
                // if button is not a number
                if (button.textContent === 'AC') {
                    cleanup();
                    display.textContent = '0';
                    return;
                } 
                
                if (button.textContent === '=') {
                    // if there is no operator
                    if (!operator) {
                        return;
                    }
                    // if there is no second operand
                    if (!secondOperand) {
                        return;
                    }
                    // if there is no first operand
                    if (!firstOperand) {
                        return;
                    }
                    // if there is a first operand and a second operand
                    if (firstOperand && secondOperand) {
                        // if the operator is division and the second operand is 0
                        if (operator === '/' && secondOperand === '0') {
                            display.textContent = 'Error';
                            return;
                        }
                        // calculate the result
                        const result = operate(operator, parseFloat(firstOperand), parseFloat(secondOperand));
                        // display the result
                        display.textContent = Number(result).toLocaleString();
                        // store the result as the first operand
                        firstOperand = result;
                        secondOperand = '';
                        operator = '';
                        return;
                    }
                } 
                
                if (button.textContent === '.') {
                    // if the operand already contains a decimal point
                    if (firstOperand.includes('.')) {
                        return;
                    } else {
                        if (activeOperand === '') {
                            firstOperand += button.textContent;
                            // display the operand
                            display.textContent = firstOperand;
                        } else {
                            secondOperand += button.textContent;
                            // display the operand
                            display.textContent = secondOperand;
                        }
                    }
                } else if (button.textContent === '/') {
                    operator = '/';
                    activeOperand = 'second';
                }
                else if (button.textContent === '*') {
                    operator = '*';
                    activeOperand = 'second';
                }
                else if (button.textContent === '-') {
                    operator = '-';
                    activeOperand = 'second';
                }
                else if (button.textContent === '+') {
                    operator = '+';
                    activeOperand = 'second';
                } 
            } 
            else {
                if (activeOperand === '') {
                    firstOperand += button.textContent;
                    // display the operand
                    display.textContent = Number(firstOperand).toLocaleString();
                } else {
                    secondOperand += button.textContent;
                    // display the operand
                    display.textContent = Number(secondOperand).toLocaleString();
                }
            }
        });
    });

    // Keyboard Support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            // if there is no operator
            if (!operator) {
                return;
            }
            // if there is no second operand
            if (!secondOperand) {
                return;
            }
            // if there is no first operand
            if (!firstOperand) {
                return;
            }
            // if there is a first operand and a second operand
            if (firstOperand && secondOperand) {
                // if the operator is division and the second operand is 0
                if (operator === '/' && secondOperand === '0') {
                    display.textContent = 'Error';
                    return;
                }
                // calculate the result
                const result = operate(operator, parseFloat(firstOperand), parseFloat(secondOperand));
                // display the result
                display.textContent = Number(result).toLocaleString();
                // store the result as the first operand
                firstOperand = result;
                secondOperand = '';
                operator = '';
                return;
            }
        } else if (e.key === 'Escape') {
            cleanup();
            display.textContent = '0';
            return;
        } else if (e.key === '.') {
            // if the operand already contains a decimal point
            if (firstOperand.includes('.')) {
                return;
            } else {
                if (activeOperand === '') {
                    firstOperand += e.key;
                    // display the operand
                    display.textContent = firstOperand;
                } else {
                    secondOperand += e.key;
                    // display the operand
                    display.textContent = secondOperand;
                }
            }
        } else if (e.key === '/') {
            operator = '/';
            activeOperand = 'second';
        } else if (e.key === '*') {
            operator = '*';
            activeOperand = 'second';
        } else if (e.key === '-') {
            operator = '-';
            activeOperand = 'second';
        } else if (e.key === '+') {
            operator = '+';
            activeOperand = 'second';
        } else if (!isNaN(e.key)) {
            if (activeOperand === '') {
                firstOperand += e.key;
                // display the operand
                display.textContent = Number(firstOperand).toLocaleString();
            } else {
                secondOperand += e.key;
                // display the operand
                display.textContent = Number(secondOperand).toLocaleString();
            }
        }
    }); 

});