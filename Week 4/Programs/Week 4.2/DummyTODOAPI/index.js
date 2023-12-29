//create a simple random todo api server using express

const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
//fix the CORS issue
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

let todos = [
  { id: 1, title: 'todo1', desc: 'Desc of todo1', completed: false },
  { id: 2, title: 'todo2', desc: 'Desc of todo2', completed: false },
  { id: 3, title: 'todo3', desc: 'Desc of todo3', completed: false },
  { id: 4, title: 'todo4', desc: 'Desc of todo4', completed: false },
  { id: 5, title: 'todo5', desc: 'Desc of todo5', completed: false },
];

//getting todos shuffled, of random length between 1 and 5 and some random desc and title
app.get('/todos', (req, res) => {
  let shuffledTodos = todos.sort(() => 0.5 - Math.random());
  let randomTodos = shuffledTodos.slice(0, Math.floor(Math.random() * 5) + 1);

//   randomTodos.forEach((todo) => {
//     todo.title = todo.title + Math.floor(Math.random() * 10);
//     todo.desc = todo.desc + Math.floor(Math.random() * 10);
//   });

  res.status(200).json({ todos: randomTodos });
});

app.listen(port, () => {
  console.log(`Example app listening at ${port}`);
});
