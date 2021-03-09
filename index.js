const express = require("express");
const app = express();

app.use(express.json());
// we use this middleware because body parsing is not enabled by default in express

const port = 4000;

const users = [
  { id: 1, name: "Jake" },
  { id: 2, name: "Raymond" },
  { id: 3, name: "Boyle" },
];

app.get("/", (req, res) => {
  res.send("Simple express server");
});

app.get("/api/users", (req, res) => {
  res.send(users);
});

app.get("/api/users/:id", (req, res) => {
  let user = users.find((user) => user.id === parseInt(req.params.id));
  !user ? res.status(404).send("User not Found") : res.send(user);
});

app.get("/api/params/:param1", (req, res) => {
  res.send(`Parameter passed is ${req.params.param1}`);
});

// Try these 2 requests
// http://localhost:4000/api/params
// http://localhost:4000/api/params/123

app.get("/api/query", (req, res) => {
  res.send(`Parameter passed is ${req.query.name}`);
});
//Try these
// http://localhost:4000/api/query
// http://localhost:4000/api/query?name=JohnDoe

app.post("/api/users", (req, res) => {
  let user = {
    id: users.length + 1,
    name: req.body.name,
  };
  users.push(user);
  res.send(user);
});

app.delete("/api/users/:id", (req, res) => {
  let user = users.find((user) => user.id === parseInt(req.params.id));
  if (!user) return res.status(404).send("User not Found");
  const index = users.indexOf(user);
  users.splice(index, 1);
  res.send(user);
});

app.listen(port, () =>
  console.log(`Server is listening at http://localhost:${port}`)
);
