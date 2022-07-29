const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  res.redirect("/");
});

io.on("connection", (socket) => {
  socket.on("message", (message, username) => {
    socket.broadcast.emit("message", message, username);
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(port));
