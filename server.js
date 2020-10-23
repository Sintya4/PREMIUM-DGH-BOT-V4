const path = require('path')

// Require the framework and instantiate it
const fastify = require("fastify")({
  logger: true
});

// Setup our static files
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/public/', // optional: default '/'
})

// Declare a route
fastify.get("/", function(request, reply) {
  reply.send({ hello: "world" });
});

// Run the server!
fastify.listen(process.env.PORT, function(err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
