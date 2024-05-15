const slide = document.querySelector('#slider');
const color = document.querySelector('#color-grid');
const clearButton = document.querySelector('#clear');
const fillButton = document.querySelector('#fill');
const rainbowButton = document.querySelector('#rainbow');
const eyedropperButton = document.querySelector('#eyedropper');
const eraserButton = document.querySelector('#eraser');
const container = document.querySelector('#sketch-area');

let isMouseDown = false
let rainbow_mode = false;
let eraser_mode = false;
let eyedropper_mode = false;

function updateSizeIndicator(size){
    const sizeText = document.querySelector('#size-indicator');
    sizeText.textContent = `Size: ${size}`;
}

function clearBox(elementID){
    document.getElementById(elementID).innerHTML = "";
}

function getColor(square){
    color.value = rgbToHex(square.style.backgroundColor);
}

function toggleMode(node){
    if(node.id === 'rainbow'){
        rainbow_mode = !rainbow_mode;
        node.classList.toggle('mode-button-unactivate', !rainbow_mode);
        node.classList.toggle('mode-button-activate', rainbow_mode);
    }
    if(node.id === 'eyedropper'){
        eyedropper_mode = !eyedropper_mode;
        node.classList.toggle('mode-button-unactivate', !eyedropper_mode);
        node.classList.toggle('mode-button-activate', eyedropper_mode);
    }
    if(node.id === 'eraser'){
        eraser_mode = !eraser_mode;
        node.classList.toggle('mode-button-unactivate', !eraser_mode);
        node.classList.toggle('mode-button-activate', eraser_mode);
    }
}

function changeColor(e){
    if(eraser_mode){
        e.style.backgroundColor = '#ffffff';
    }
    else if(rainbow_mode){ 
        e.style.backgroundColor = randomRGB();
    }
    else{
        e.style.backgroundColor = color.value;
    }
}

function buildCanvas(size){
    clearBox('sketch-area');

    const square = document.createElement('div');
    const squareSize = (1/size) * 100;
    const numberOfSquare = size**2

    square.style.cssText = `
    width: ${squareSize}%;
    height: ${squareSize}%;
    box-sizing: border-box;x    
    z-index: 3;
    `;

    for(let i = 1; i <= numberOfSquare; i++){
        const clone = square.cloneNode(true);
        clone.classList.add('square');
        clone.setAttribute('id', `square${i}`);
        const SQUARE_ID = `square${i}`;

        clone.addEventListener('mouseover', function(e){
            if(isMouseDown && !eyedropper_mode){
                changeColor(e.target);
            }
        });

        clone.addEventListener('click', function(e){
                getColor(e.target);
        });

        container.appendChild(clone);
    }
}

function rgbToHex(rgb) {
    // Parse the RGB string
    const [r, g, b] = rgb.match(/\d+/g).map(Number);

    // Convert each component to hex and pad with zeros if needed
    const hexR = r.toString(16).padStart(2, '0');
    const hexG = g.toString(16).padStart(2, '0');
    const hexB = b.toString(16).padStart(2, '0');

    // Return the hex color value
    return `#${hexR}${hexG}${hexB}`;
}


function randomRGB(){
    const R = Math.floor(Math.random() * (255 - 0 + 1)) + 1;
    const G = Math.floor(Math.random() * (255 - 0 + 1)) + 1;
    const B = Math.floor(Math.random() * (255 - 0 + 1)) + 1;
    return `rgb(${R},${G},${B})`;
}

window.onload = () => {
    buildCanvas(32);
}


slide.addEventListener('input', function(){
    updateSizeIndicator(this.value);
});

slide.addEventListener('mouseup', function(){
    buildCanvas(this.value);
});

container.addEventListener('mousedown', function(){
    isMouseDown = true;
});

container.addEventListener('mouseup', function(){
    isMouseDown = false;
});

fillButton.addEventListener('click', function(){
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
        square.style.backgroundColor = color.value;
    })
});

clearButton.addEventListener('click', function(){
    clearBox('sketch-area');
    buildCanvas(slide.value);
});

rainbowButton.addEventListener('click', function(e){
    toggleMode(e.target);
});

eyedropperButton.addEventListener('click', function(e){
    toggleMode(e.target);
});

eraserButton.addEventListener('click', function(e){
    toggleMode(e.target);
});
