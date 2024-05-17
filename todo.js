// todo add "limpiar mi cuarto"
// todo done 0
// todo ls
// todo alv reset

// necesitamos
// un arvhivo para guardar los todo (.jon)
// una funcion apra cada comando
// usar ProcessingInstruction.argv para leer los camandos
// usar fs para leer y escribir el archivo

const fs = require("fs");

const dbfile = "db.json";
const command = process.argv[2];
function init() {
  const fileExists = fs.existsSync(dbfile);

  if (!fileExists) {
    fs.writeFileSync(dbfile, JSON.stringify({ todos: [] }));
  }
}

function getTodos() {
  const content = fs.readFileSync(dbfile, "utf8");
  return JSON.parse(content).todos;
}

function updateTodos(todos) {
  const newTods = { todos: todos };
  const newTodosAsString = JSON.stringify(newTods);
  fs.writeFileSync(dbfile, newTodosAsString);
}

function add(task) {
  const todos = getTodos();
  todos.push(task);
  updateTodos(todos);
}

function done(taskIndex) {
  const todos = getTodos();
  todos.splice(taskIndex, 1);
  updateTodos(todos);
}

function ls() {
  const todos = getTodos();

  if (!todos.length) {
    console.log("EMPTY");
    process.exit(0);
  }
  todos.forEach((task, idx) => {
    console.log(idx, "-", task);
  });
}

function alv() {
  updateTodos([]);
}

function main() {
  const command = process.argv[2];
  const arg = process.argv[3];

  init();
  if (command == "ls") {
    ls();
  } else if (command == "add") {
    if (!arg) {
      console.error("missing task");
      process.exit(1);
    }
    add(arg);
    ls();
    console.log("Task added");
  } else if (command == "done") {
    if (!arg) {
      console.error("missing task");
      process.exit(1);
    }
    const idx = parseInt(arg);
    if (isNaN(idx)) {
      console.log("invalid index");
      process.exit(1);
    }
    const todos = getTodos();

    if (idx < 0 || idx >= todos.lengt) {
      console.error("invalid index");
      process.exit(1);
    }

    done(idx);
    ls();
    console.log("task completed!");
  } else if (command == "alv") {
    alv();
    console.log("algo lindo vendra");
  } else {
    console.error("invalid command:", command);
    process.exit(1);
  }
}

main();
