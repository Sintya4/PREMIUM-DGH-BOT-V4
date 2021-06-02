const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");

module.exports = {
  name: "nowplaying",
  aliases: ["np"],
  category: "music",
  description: "Show Music Information!",
  usage: "Nowplaying",
  run: async (client, message, args) => {
 let embed = new Discord.MessageEmbed()
.setColor(Color)
      
    const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("YOU NEED TO BE IN VOICE CHANNEL :/")
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("Bot is not playing anything")
      return message.channel.send(embed);
    }
    
    embed.setDescription(`**NOW PLAYING** - ${serverQueue.songs[0].title}`)
    .setThumbnail(serverQueue.songs[0].thumbnail)
    message.channel.send(embed)

    
    
    
  }
}