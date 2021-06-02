
const http = require("http");
const express = require("express");
const app = express();
var server = http.createServer(app);

app.get("/", (request, response) => {
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("DISCORD BOT YO");
});

const listener = server.listen(process.env.PORT, function() {
  console.log(`Your app is listening on port ` + listener.address().port);
});

