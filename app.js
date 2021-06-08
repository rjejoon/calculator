
const btns = document.querySelectorAll('.button-item');
const output = document.querySelector('#output');
const eq = document.querySelector('#equation');


window.addEventListener('DOMContentLoaded', e => {
    btns.forEach(btn => {
        btn.addEventListener('mousedown', btnMouseDownHandler);
        btn.addEventListener('mouseup', btnMouseUpHandler);
    });

});

function btnMouseDownHandler(e) {
    this.classList.add('whiten');

    // TODO check whether it's valid
    if (this.classList.contains("clear")) {
        output.textContent = "";
        eq.textContent = "";
    }
    else if (this.classList.contains("operator")) {
        output.textContent = "";
        eq.textContent += " " + this.dataset.value + " ";
    }
    else if (this.classList.contains("bracket")) {
        output.textContent += this.dataset.value;
        eq.textContent += this.dataset.value;
    }
    else if (this.classList.contains("equal")) {
        // TODO evaluate
    }
    else if (this.classList.contains("decimal")) {
        output.textContent += this.dataset.value;
        eq.textContent += this.dataset.value;
    }
    else if (this.classList.contains("number")) {
        output.textContent += this.dataset.value;
        eq.textContent += this.dataset.value;
    }
}

function btnMouseUpHandler(e) {
    this.classList.remove('whiten');
}
