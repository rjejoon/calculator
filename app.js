
const btns = document.querySelectorAll('.button-item');
const output = document.querySelector('#output');
const eq = document.querySelector('#equation');

let inputs = [];
let isDecimal = false;

window.addEventListener('DOMContentLoaded', e => {
    btns.forEach(btn => {
        btn.addEventListener('mousedown', btnMouseDownHandler);
        btn.addEventListener('mouseup', btnMouseUpHandler);
        btn.addEventListener('mouseleave', btnMouseLeaveHandler);
    });
    document.addEventListener('keydown', keydownHandler);
});


function btnMouseDownHandler(e) {
    this.classList.add('onclick');

    btnAction(this);

}

function btnAction(btn) {

    const n = output.textContent;
    const val = btn.dataset.value;

    // TODO check whether it's valid
    if (btn.classList.contains("clear")) {
        resetCalc();
    }
    else if (btn.classList.contains("operator")) {
        if (output.textContent.length > 0) {
            inputs.push((n.indexOf('.') > -1) ? parseFloat(n) : parseInt(n));
            output.textContent = "";
        }
        inputs.push(val);
        eq.textContent += " " + val + " ";

        if (isDecimal) enableDecimalBtn();
    }
    else if (btn.classList.contains("bracket") && isValidBracket(val)) {
        if (output.textContent.length > 0) {
            inputs.push((n.indexOf('.') > -1) ? parseFloat(n) : parseInt(n));
            output.textContent = "";
        }
        inputs.push(val);
        eq.textContent += val;
    }
    else if (btn.classList.contains("decimal")) {
        output.textContent += val;
        eq.textContent += val;

        if (!isDecimal) disableDecimalBtn();
    }
    else if (btn.classList.contains("number")) {
        output.textContent += val;
        eq.textContent += val;
    }
    else if (btn.classList.contains("equal")) {
        // TODO evaluate
        if (output.textContent.length > 0) {
            inputs.push((n.indexOf('.') > -1) ? parseFloat(n) : parseInt(n));
        }
        output.textContent = operate();
        inputs = [];
    }

}

function btnMouseUpHandler(e) {
    this.classList.remove('onclick');
}

function btnMouseLeaveHandler(e) {
    this.classList.remove('onclick');
}

function keydownHandler(e) {
    const targetBtn = document.querySelector(`.button-item[data-value="${e.key}"]`);
    if (!targetBtn) return;

    btnAction(targetBtn);
}

function enableDecimalBtn() {
    isDecimal = false;
    document.querySelector('.button-item.decimal').removeAttribute('disabled');
}

function disableDecimalBtn() {
    isDecimal = true;
    document.querySelector('.button-item.decimal').setAttribute('disabled', 'true');
    document.querySelector('.button-item.decimal').classList.remove('onclick');
}

function resetCalc() {
    output.textContent = "";
    eq.textContent = "";
    enableDecimalBtn();
    inputs = [];
}

function operate() {
    // Assume input equation is valid
    
    let ans;
    let firstOperand = null;
    let secondOperand = null;
    let operator = null;

    while (inputs.length > 1) {
        operator = findOperatorIndex();
        firstOperand = inputs[operator-1];
        secondOperand = inputs[operator+1];

        ans = calculate(firstOperand, inputs[operator], secondOperand);
        inputs.splice(operator-1, 3, ans);
    }

    return round(inputs[0], 8); // TODO make decimal places responsive
}

function findOperatorIndex() {
    let firstOperator = -1;     // return -1 if there is no operator

    for (let i=0; i<inputs.length; i++) {
        if (inputs[i] === '*' || inputs[i] === '/') {
            return i;
        }
        if (inputs[i] === '+' || inputs[i] === '-') {
            firstOperator = i;
            break;
        }
    }
    for (let i=firstOperator+1; i<inputs.length; i++) {
        if (inputs[i] === '*' || inputs[i] === '/')     
            return i;   // multiplication and division take precedence over addition and subtraction
    }
    return firstOperator;
}

function calculate(firstOp, operator, secOp) {
    if (operator === '+')      return firstOp + secOp; 
    else if (operator === '-') return firstOp - secOp;
    else if (operator === '*') return firstOp * secOp;
    else if (operator === '/') return firstOp / secOp;
}

function round(value, decimals) {
    return Number(Math.round(value + `e+${decimals}`) + `e-${decimals}`);
}
