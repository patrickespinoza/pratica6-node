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
  return JSON.parse(content).Names;
}
function add() {}

function ls() {}

function rm() {}

function done() {}
