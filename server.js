const path = require('path')

// Require the framework and instantiate it
const fastify = require("fastify")({
  logger: true
});

// Setup our static files
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/', // optional: default '/'
})

// Our home page route, this pulls from public/index.html
// but you don't have to send a html, or even have a webpage!
fastify.get("/", function(request, reply) {
  return reply.sendFile('index.html')
});


// Our API route, fastify automatically turns it to JSON
fastify.get("/api/flavors", function(request, reply) {
  reply.send({ hello: 'world' })
});

// Run the server and report out to the logs
fastify.listen(process.env.PORT, function(err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
