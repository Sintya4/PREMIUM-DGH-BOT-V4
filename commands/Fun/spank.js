const DIG = require("br");

module.exports = {
  name: "spank",
  description: "",
  usage: "spank <user>",
  category: "fun",
  run: async (client, message, args) => {
    const Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      client;
    let avatar = Member.user.displayAvatarURL();
    let avatar2 = message.author.displayAvatarURL();
    let img = await new DIG.Spank().getImage(avatar2.replace("webp","png"), avatar.replace("webp","png"));
    let attach = new client.discord.MessageAttachment(img, "delete.png");
    message.channel.send(attach);
  }
};
