
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

function btnMouseUpHandler(e) {
    this.classList.remove('onclick');
}

function btnMouseLeaveHandler(e) {
    this.classList.remove('onclick');
}

function keydownHandler(e) {
    const targetBtn = document.querySelector(`.button-item[data-key="${e.key}"]`);
    if (!targetBtn) return;

    btnAction(targetBtn);
}

function btnAction(btn) {

    const n = output.textContent;
    const val = btn.dataset.value;

    // TODO check whether it's valid
    if (btn.classList.contains("clear")) {
        resetCalc();

    } else if (btn.classList.contains("delete")) {
        output.textContent = output.textContent.slice(0, -1);

    } else if (btn.classList.contains("operator")) {

        if (btn.classList.contains("unary")) {
            unaryOpAction(val, n);
        } else {
            binaryOpAction(val, n);
        }
        if (isDecimal) enableDecimalBtn();

    } else if (btn.classList.contains("bracket") && isValidBracket(val)) {
        if (output.textContent.length > 0) {
            inputs.push((n.indexOf('.') > -1) ? parseFloat(n) : parseInt(n));
            output.textContent = "";
        }
        inputs.push(val);
        eq.textContent += val;

    } else if (btn.classList.contains("decimal")) {
        output.textContent += val;

        if (!isDecimal) disableDecimalBtn();

    } else if (btn.classList.contains("number")) {
        output.textContent += val;

    } else if (btn.classList.contains("equal")) {
        // TODO evaluate
        if (output.textContent.length > 0) {
            inputs.push(numstrToNumber(n));
        }
        eq.textContent += `${n} =`;

        const result = operate();
        output.textContent = result;
        inputs = [result];
    }

    if (output.textContent.length > 0) {
        toggleClearBtn(document.querySelector('.clear'));
    } else {
        toggleDelBtn(document.querySelector('.delete'));
    }
}

function numstrToNumber(numstr) {
    if (numstr.length > 0) {
        return (numstr.indexOf('.') > -1) ? parseFloat(numstr) : parseInt(numstr);
    }
    return null;
}

function toggleClearBtn(clearBtn) {
    if (!clearBtn) return;

    clearBtn.textContent = "CE";
    clearBtn.classList.remove('clear');
    clearBtn.classList.add('delete');
    clearBtn.dataset['value'] = 'del';
    clearBtn.dataset['key'] = 'Backspace';
}

function toggleDelBtn(delBtn) {
    if (!delBtn) return;

    delBtn.textContent = "AC";
    delBtn.classList.remove('delete');
    delBtn.classList.add('clear');
    delBtn.dataset['value'] = 'clear';
    delBtn.dataset['key'] = 'Escape';
}

function unaryOpAction(op, numstr) {
    if (op === "negation") {
        output.textContent = (numstr.indexOf('-') > -1) ? output.textContent.slice(1) : '-' + output.textContent;
    } else if (op === "sqrt") {
        output.textContent = round(Math.sqrt(output.textContent), 8);     // TODO handle neg sqrt error
    } else if (op === "%") {
        output.textContent = numstrToNumber(numstr) / 100;
    }
}

function binaryOpAction(op, numstr) {
    inputs.push(numstrToNumber(numstr));
    inputs.push(op);
    eq.textContent += `${numstr} ${op} `;
    output.textContent = '';
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
