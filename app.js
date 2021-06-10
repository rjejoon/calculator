
const btns = document.querySelectorAll('.button-item');
const output = document.querySelector('#output');
const eq = document.querySelector('#equation');

let inputs = [];

window.addEventListener('DOMContentLoaded', e => {
    btns.forEach(btn => {
        btn.addEventListener('mousedown', btnMouseDownHandler);
        btn.addEventListener('mouseup', btnMouseUpHandler);
    });
});

let isDecimal = false;

function btnMouseDownHandler(e) {
    this.classList.add('onclick');

    const n = output.textContent;
    const val = this.dataset.value;

    // TODO check whether it's valid
    if (this.classList.contains("clear")) {
        resetCalc();
    }
    else if (this.classList.contains("operator")) {
        if (output.textContent.length > 0) {
            inputs.push((n.indexOf('.') > 0) ? parseFloat(n) : parseInt(n));
            output.textContent = "";
        }
        inputs.push(val);
        eq.textContent += " " + val + " ";

        if (isDecimal) enableDecimalBtn();
    }
    else if (this.classList.contains("bracket") && isValidBracket(val)) {
        if (output.textContent.length > 0) {
            inputs.push((n.indexOf('.') > 0) ? parseFloat(n) : parseInt(n));
            output.textContent = "";
        }
        inputs.push(val);
        eq.textContent += val;
    }
    else if (this.classList.contains("decimal")) {
        output.textContent += val;
        eq.textContent += val;

        if (!isDecimal) disableDecimalBtn();
    }
    else if (this.classList.contains("number")) {
        output.textContent += val;
        eq.textContent += val;
    }
    else if (this.classList.contains("equal")) {
        // TODO evaluate
        // operate();
        if (output.textContent.length > 0) {
            inputs.push((n.indexOf('.') > 0) ? parseFloat(n) : parseInt(n));
            output.textContent = "";
        }
        console.log(inputs);
        inputs = [];
    }
}

function btnMouseUpHandler(e) {
    this.classList.remove('onclick');
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

function isValidBracket(b) {
    // only checks for the validity of the current bracket in inputs
    
    if (b === '(') return true;

    let numOpeningBracket = 0;
    for (const input of inputs) {
        if (input === '(') numOpeningBracket++;
        else if (input === ')') numOpeningBracket--;
    }
    return numOpeningBracket > 0;
}

function operate() {
    // Assume input equation is valid
    
    let foundOpenBracket = false;
    let ans = null;

    for (const input of inputs) {
        


    }

    return ans;
}
