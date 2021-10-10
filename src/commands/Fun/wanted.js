const Discord = require("discord.js");

module.exports = {
  name: "wasted",
  aliases: ["wtd"],
  category: "fun",
  description: "Return A Wasted Image!",
  usage: "Wasted | <Mention Or ID>",
  P_bot: ["ATTACH_FILES"],
  run: async (client, message, args) => {
    const Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
    message.channel.send({
      embeds: [{
        color: "RANDOM",
        image: {
          url: `https://some-random-api.ml/canvas/wasted?avatar=${Member.user.displayAvatarURL(
            { format: "png" }
          )}`
        }
      }]
    });
  }
};
