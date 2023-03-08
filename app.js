const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

document.getElementById('clear-button').addEventListener('click', clearCanvas);
document.getElementById('color-picker').addEventListener('change', changeColor);
document.getElementById('brush-size').addEventListener('input', changeBrushSize);
document.getElementById('brush-shape').addEventListener('change', changeBrushShape);
document.getElementById('fill-button').addEventListener('click', fillCanvas);
document.getElementById('save-button').addEventListener('click', saveCanvas);

function startDrawing(event) {
  isDrawing = true;
  [lastX, lastY] = [event.offsetX, event.offsetY];
}

function draw(event) {
  if (!isDrawing) return;
  context.strokeStyle = document.getElementById('color-picker').value;
  context.lineWidth = document.getElementById('brush-size').value;
  context.lineCap = document.getElementById('brush-shape').value;
  context.beginPath();
  context.moveTo(lastX, lastY);
  context.lineTo(event.offsetX, event.offsetY);
  context.stroke();
  [lastX, lastY] = [event.offsetX, event.offsetY];
}

function stopDrawing() {
  isDrawing = false;
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function changeColor() {
  context.strokeStyle = document.getElementById('color-picker').value;
}

function changeBrushSize() {
  context.lineWidth = document.getElementById('brush-size').value;
}

function changeBrushShape() {
  context.lineCap = document.getElementById('brush-shape').value;
}

function fillCanvas() {
  context.fillStyle = document.getElementById('color-picker').value;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
  const link = document.createElement('a');
  link.download = 'canvas.png';
  link.href = canvas.toDataURL();
  link.click();
}
