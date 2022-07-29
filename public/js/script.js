const form = document.querySelector("form");

// set username
let username = "";

do {
  username = prompt("Enter you name");
} while (!username);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputContent = document.querySelector(".input__style");
  let message = inputContent.value;
  if (message === "") return;

  renderMessage(message, username, "ingoing");
  socket.emit("message", message, username);

  inputContent.value = "";
});

function renderMessage(message, name, type) {
  const html = `
  <div class="chat ${type}">
  <div class="chat__icon">
    <i class="fas fa-user"></i>
  </div>
  <div class="chat__message_name">
    <div class="message">${message}</div>
    <div class="username">${name}</div>
  </div>
</div>
  
  `;

  const chats = document.querySelector(".chats");
  chats.insertAdjacentHTML("beforeend", html);
}

socket.on("message", (message, username) => {
  renderMessage(message, username, "outgoing");
});
