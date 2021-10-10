const DIG = require("br");

module.exports = {
  name: "stonks",
  usage: "stonks <user>",
  P_bot: ["ATTACH_FILES"],
  category: "fun",
  args: true,
  run: async (client, message, args) => {
    const Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
    let avatar2 = Member.user.displayAvatarURL();
    let img = await new DIG.Stonk().getImage(avatar2.replace("webp", "png"));
    message.channel.send({ files: [{ attachment: img, name: "stonks.png" }] });
  }
};
