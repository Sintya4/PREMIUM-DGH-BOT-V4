module.exports = {
  name: "announcement",
  ownerOnly: true,
  category: "owner",
  args: true,
  description: "<notify all Owners on the server with a message...>",
  run: async (client, message, args) => {
      client.guilds.cache.map(member => {
      client.send(args.join(" ").split("{user}").join(`<@${member.ownerId}>`).split("{server}").join(`<@${member.name}>`), { message, channel: member.ownerId, type: true });
    });
  }
};
