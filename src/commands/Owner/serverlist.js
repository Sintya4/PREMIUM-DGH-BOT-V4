module.exports = {
  name: "serverlist",
  ownerOnly: true,
  category: "owner",

  run: async (client, message, args) => {
    client.ops.serverlist(message, client);
  }
};
