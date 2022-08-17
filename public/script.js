const socket = io();
const id = uuidv4();
const mouseField = document.querySelector('.mouse-field');

window.addEventListener("mousemove", event => {
  const { clientX, clientY } = event;
  socket.emit("mouse-move", { id, x: clientX, y: clientY });
});

socket.on("update-mouse-pos", ({id, x, y}) => {
  const mouseElement = document.getElementById(id);
  if (!mouseElement) {
    let newElement = document.createElement('div');
    newElement.classList.add('mouse');
    newElement.id = id;
    mouseField.appendChild(newElement);
  } else {
    mouseElement.style.left = `${x}px`;
    mouseElement.style.top = `${y}px`;
  }
})