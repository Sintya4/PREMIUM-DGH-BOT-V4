const { Default_Prefix, COLOR } = require("../../config.js");
const Discord = require("discord.js");

module.exports = {
  name: "loop",
  aliases: ["lp"],
  category: "music",
  description: "Show Loop Status & You Can Also Set Loop Status!",
  usage: "Loop | <On Or Off>",
  run: async (client, message, args) => {
 let embed = new Discord.MessageEmbed()
.setColor(COLOR);

    const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("YOU NEED TO BE IN VOICE CHANNEL :/")
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("There is nothing playing that i could loop")
      return message.channel.send(embed);
    }
    
    //OOOOF
    serverQueue.loop = !serverQueue.loop
    
    
    embed.setDescription(`Loop is now **${serverQueue.loop ? "Enabled" : "Disabled"}**`)
    embed.setThumbnail(client.user.displayAvatarURL())
    message.channel.send(embed)
    
    
    
    
  }
}