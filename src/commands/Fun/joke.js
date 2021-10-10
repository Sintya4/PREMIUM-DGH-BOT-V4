const joke = require("one-liner-joke");
const Discord = require("discord.js");
module.exports = {
  name: "joke",
  category: "fun",
  description: "Get a random joke!",
  run: async (client, message, args) => {
    let jEmbed = new Discord.MessageEmbed()
      .addField("Joke", await client.translate(joke.getRandomJoke().body))
      .setColor("RANDOM")
      .setTimestamp()
      .setFooter(`Requested by ${message.author.tag}`);
    message.channel.send({ embeds: [jEmbed] });
  }
};
