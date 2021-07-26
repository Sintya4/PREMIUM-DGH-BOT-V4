const DIG = require("br");

module.exports = {
  name: "bed",
  description: "",
  usage: "bed <user>",
  category: "fun",
  run: async (client, message, args) => {
    const Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) || client;
    let avatar2 = Member.user.displayAvatarURL();
    let avatar1 = message.author.displayAvatarURL();
    let img = await new DIG.Bed().getImage(avatar1.replace("webp","png"),avatar2.replace("webp","png"));
    let attach = new client.discord.MessageAttachment(img, "delete.png");
    message.channel.send(attach);
  }
};
