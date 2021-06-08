
const btns = document.querySelectorAll('.button');


window.addEventListener('DOMContentLoaded', e => {
    btns.forEach(btn => {
        btn.addEventListener('mousedown', btnMouseDownHandler);
        btn.addEventListener('mouseup', btnMouseUpHandler);
    });

});

function btnMouseDownHandler(e) {
    this.style.backgroundColor = '#f5f5f5';
    this.style.color = 'black';
}

function btnMouseUpHandler(e) {
    this.style.backgroundColor = 'black';
    this.style.color = 'white';
}
