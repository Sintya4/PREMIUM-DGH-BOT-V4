const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "changemymind",
  aliases: ["cmm"],
  description: "Change my mind",
  category: "fun",
  P_bot: ["ATTACH_FILES"],
  run: async (client, message, args) => {
    const text = args.join(" ");
    if (!text) return client.send("Please provide text", {message});
    const sendMsg = await client.send("⚙ Processing Image..", {message});
    const data = await fetch(
      `https://nekobot.xyz/api/imagegen?type=changemymind&text=${text}`
    ).then(res => res.json());
    sendMsg.delete();
    const embed = new MessageEmbed()
      .setFooter(message.author.username)
      .setColor("BLUE")
      .setDescription(
        `[Click here if the image failed to load.](${data.message})`
      )
      .setImage(data.message)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }
};
