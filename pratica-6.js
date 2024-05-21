const fs = require("fs");

const filejson = "file.json";

const command = process.argv[2];

function init() {
  const fileExist = fs.existsSync(filejson);
  if (!fileExist) {
    fs.writeFileSync(filejson, JSON.stringify({ Names: [] }));
  }
}

function getAll() {
  const readFile = fs.readFileSync(filejson, "utf8");
  return JSON.parse(readFile).Names;
}

function updateNames() {
  const newNames = { Names: names };
  const newNamesString = JSON.stringify(newNames);
  fs.writeFileSync(filejson, newNamesString);
}
function add(task) {
  const names = getAll();
  names.push(task);
  updateNames(names);
}

function done(taskIndex) {
  const names = getAll();
  names.splice(taskIndex, 1);
  updateNames(names);
}

function ls() {
  const names = getAll();

  if (!names.length) {
    console.log("empty");
    process.exit(0);
  }

  names.forEach((task, idx) => {
    console.log(idx, "", task);
  });
}

function rm() {
  updateNames([]);
}

function main() {
  const command = process.argv[2];
  const arg = process.argv[3];

  init();
  if (command == "ls") {
    ls();
  } else if (command == "add") {
    if (!arg) {
      console.error("Missing task");
      process.exit(1);
    }
    add(arg);
    ls();
    console.log("Task added");
  } else if (command == "done") {
    if (!arg) {
      console.error("Missing task");
      process.exit(1);
    }
    const idx = parseInt(arg);
    if (isNaN(idx)) {
      console.error("invalid index");
      process.exit(1);
    }
    const names = getAll();
    if (idx < 0 || idx >= names.length) {
      console.error("Invalid index");
      process.exit(1);
    }
    done(idx);
    ls();
    console.log("Task completed");
  } else if (command == "rm") {
    rm();
    console.log("Se elimino todo");
  } else {
    console.error("invalid command", command);
    process.exit(1);
  }
}
main();
