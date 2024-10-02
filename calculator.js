// On DOM Load
document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.display h1');
    // Selectors
    const buttons = document.querySelectorAll('.btn');
    // Functions
    function calculate(expression) {
        try {
        // Split the expression into operands and operators
        const operators = expression.split(/[\d.]+/).filter(op => op);
        const operands = expression.split(/[^.\d]+/).map(Number);

        // Perform the calculations
        let result = operands[0];
        for (let i = 1; i < operands.length; i++) {
            switch (operators[i - 1]) {
            case '+':
                result += operands[i];
                break;
            case '-':
                result -= operands[i];
                break;
            case '*':
                result *= operands[i];
                break;
            case '/':
                result /= operands[i];
                break;
            default:
                throw new Error('Invalid operator');
            }
        }
        return result;
        } catch (error) {
        console.error('Calculation error:', error);
        return 'Error';
        }
    }
    // Event Listeners
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // if button is not a number
            if (isNaN(button.textContent)) {
            // if button is not a number
            if (button.textContent === 'C') {
                display.textContent = '';
            } else if (button.textContent === '=') {
                display.textContent = calculate(display.textContent);
            } else {
                display.textContent += button.textContent;
            }
            } else {
                display.textContent += button.textContent;
            }
        });


    });

});