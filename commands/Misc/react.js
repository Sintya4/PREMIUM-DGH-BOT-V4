module.exports = {
  name: "react",
  category: "misc",
  args: true,
  usage: "react <id msg> <:emoji:>",
  botPermission: ["ADD_REACTIONS", "MANAGE_MESSAGES", "MANAGE_EMOJIS"],
  description: "Reaction Command Like NQN",
  run: async (client, message, args) => {
    message.delete();
    let ID;
    let Name;
    if (args[1].split(":")) {
      let Thinger = args[1].split(":");
      Name = Thinger[1];
      ID = client.emojis.cache.find(x => x.name === Name);
    }
    const m = await message.channel.messages.fetch(args[0]);
    if (!m) return message.channel.send(`:x: | **Message Not Found**`);
    const filter1 = (reaction, user) =>
      (reaction.emoji.name === Name) & (user.id === message.author.id);
    await m.react(ID);
  const collector1 = await m.createReactionCollector(filter1);
    collector1.on("collect", async (reaction, user) => {
      reaction.users.remove(client.user.id); // <<== This removes also the bot reaction
    });
  }
};
