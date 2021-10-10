const DIG = require("br");

module.exports = {
  name: "jail",
  description: "",
  usage: "jail <user>",
  args: true,
  category: "fun",
  P_bot: ["ATTACH_FILES"],
  run: async (client, message, args) => {
    const Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
    let avatar2 = Member.user.displayAvatarURL();
    let img = await new DIG.Jail().getImage(avatar2.replace("webp", "png"));
    message.channel.send({ files: [{ attachment: img, name: "jail.png" }] });
  }
};
