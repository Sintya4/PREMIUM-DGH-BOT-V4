const DIG = require("br");

module.exports = {
  name: "spank",
  usage: "spank <user>",
  category: "fun",
  args: true,
  P_bot: ["ATTACH_FILES"],
  run: async (client, message, args) => {
    const Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      client;
    let avatar = Member.user.displayAvatarURL();
    let avatar2 = message.author.displayAvatarURL();
    let img = await new DIG.Spank().getImage(avatar2.replace("webp","png"), avatar.replace("webp","png"));
    message.channel.send({ files: [{ attachment: img, name: "spank.png" }] });
  }
};
