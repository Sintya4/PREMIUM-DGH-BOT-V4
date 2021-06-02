const { Default_Prefix, COLOR } = require("../../config.js");
const Discord = require("discord.js");

module.exports = {
  name: "stop",
  aliases: ["end", "fuckoff"],
  category: "music",
  description: "Stop The Music!",
  usage: "Stop",
  run: async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
    .setColor(COLOR)
    .setTitle("Success")
    .setDescription("🎶 Music Has Been Stopped!")
    .setTimestamp();
    
      const { channel } = message.member.voice;
      
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("YOU NEED TO BE IN VOICE CHANNEL :/")
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("There is nothing playing that i could stop")
      return message.channel.send(embed);
    }

    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  }
};