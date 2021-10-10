module.exports = {
  name: "rps",
  category: "games",
  usage: "rps <@user>",
  description: "Let's play rps",
  run: async (client, message, args) => {
    client.ops.rps(client, message);
  }
};
