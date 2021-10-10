const Discord = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: "fox",
  category: "fun",
  description: "Random pictures of a fox",
  cooldown: 2000,
  P_bot: ["ATTACH_FILES"],
  run: async (client, message, args) => {
    const response = await fetch("https://randomfox.ca/floof/");
    const { image } = await response.json();
    message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setDescription("https://randomfox.ca/")
          .setImage(image)
      ]
    });
  }
};
