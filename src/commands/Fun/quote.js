const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports = {
  name: "quote",
  category: "fun",
  usage: "quote <user>",
  P_bot: ["ATTACH_FILES"],
  run: async (client, message, args) => {
    let user = await client.resolveUser(args[0]);
    if (!user)
      return client.send("You need to mention a user and provide text!", {
        message
      });

    let msg = args.slice(1).join(" ");

    const e = user.displayAvatarURL({ format: "png" });
    const img = await canvacord.Canvas.quote({
      username: `${user.username}`,
      color: "#7289da",
      message: `${msg}`,
      image: e
    });
    return message.channel.send({
      files: [{ attachment: img, name: "quote.png" }]
    });
  }
};
