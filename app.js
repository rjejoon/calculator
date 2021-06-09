
const btns = document.querySelectorAll('.button-item');
const output = document.querySelector('#output');
const eq = document.querySelector('#equation');

const inputs = [];

window.addEventListener('DOMContentLoaded', e => {
    btns.forEach(btn => {
        btn.addEventListener('mousedown', btnMouseDownHandler);
        btn.addEventListener('mouseup', btnMouseUpHandler);
    });
});

let isDecimal = false;

function btnMouseDownHandler(e) {
    this.classList.add('onclick');

    const val = this.dataset.value;
    // TODO check whether it's valid
    if (this.classList.contains("clear")) {
        resetCalc();
    }
    else if (this.classList.contains("operator")) {
        let n = output.textContent;
        output.textContent = "";
        inputs.push((n.indexOf('.') > 0) ? parseFloat(n) : parseInt(n));
        eq.textContent += " " + val + " ";

        if (isDecimal) enableDecimalBtn();
    }
    else if (this.classList.contains("bracket") && isValidBracket(val)) {
        inputs.push(val);
        output.textContent += val;
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
}

function isValidBracket(b) {
    // only checks for the validity of the current bracket in inputs
    
    if (b === '(') return true;

    let hasOpeningBracket = false;
    for (const input of reversed) {
        if (input === '(') return true;
    }
    return false;
}

function operate() {
    // Assume input equation is valid
    
    let foundOpenBracket = false;
    let ans = null;

    for (const input of inputs) {
        


    }

    return ans;
}
