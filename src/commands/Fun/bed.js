const DIG = require("br");

module.exports = {
  name: "bed",
  description: "",
  usage: "bed <user>",
  args: true,
  category: "fun",
  P_bot: ["ATTACH_FILES"],
  run: async (client, message, args) => {
    const Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      client;
    let avatar2 = message.author.displayAvatarURL();
    let avatar1 = Member.user.displayAvatarURL();
    let img = await new DIG.Bed().getImage(
      avatar1.replace("webp", "png"),
      avatar2.replace("webp", "png")
    );
    message.channel.send({ files: [{ attachment: img, name: "bed.png" }] });
  }
};
