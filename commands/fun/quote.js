const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
  name: "quote",
  category: "fun",
  description: "quote!!!",
  usage: "quote <user>",
  args: true,
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    let user = await client.resolveUser(args[0]);
    if (!user)
      return message.channel.send(
        "You need to mention a user and provide text!"
      );

    let msg = args
      .slice(1)
      .join(" ")
 
    const e = user.displayAvatarURL({ format: "png" });
    const img = await canvacord.Canvas.quote({
      username: `${user.username}`,
      color: "#7289da",
      message: `${msg}`,
      image: e
    });
    let attachment = new Discord.MessageAttachment(img, "quote.png");
    return message.channel.send(attachment);
  }
};
