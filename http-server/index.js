const http = require("node:http");

const server = http.createServer((request, response) => {
  console.log("request", request);
  const method = request.method;
  const url = request.url;
  response.end(`${method}: ${url}`);
});

server.listen(8060, () => {
  console.log("Server is listening on port 8060");
});
