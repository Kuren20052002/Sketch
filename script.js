buildCanvas(50);
const slide = document.querySelector('#slider');
slide.addEventListener('input', function(){
    updateSizeIndicator(this.value);
});
slide.addEventListener('mouseup', function(){
    buildCanvas(this.value);
});

function updateSizeIndicator(size){
    const sizeText = document.querySelector('#size-indicator');
    sizeText.textContent = `Size: ${size}`;
}

function clearBox(elementID){
    document.getElementById(elementID).innerHTML = "";
}


function buildCanvas(size){
    clearBox('sketch-area');

    const container = document.querySelector('#sketch-area');
    const square = document.createElement('div');
    const squareSize = (1/size) * 100;
    const numberOfSquare = size**2

    square.style.cssText = `
    width: ${squareSize}%;
    height: ${squareSize}%;
    box-sizing: border-box;
    background-color: black;
    `;

    for(let i = 1; i <= numberOfSquare; i++){
        const clone = square.cloneNode(true);
        clone.setAttribute('id', `square${i}`);
        container.appendChild(clone);
    }
}