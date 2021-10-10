
module.exports = {
  name: "emojilist",
  ownerOnly: true,
  category: "owner",
  run: async (client, message, args) => {
    client.ops.emojilist(message, client);
  }
};
