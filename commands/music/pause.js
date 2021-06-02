const { MessageEmbed } = require("discord.js")

const { COLOR } = require("../../config.js");

module.exports = {
  name: "pause",
  aliases: ["wait"],
  category: "music",
  description: "Pause Music!",
  usage: "Pause",
  run: async (client, message, args) => {
  const { channel } = message.member.voice;
   let embed = new MessageEmbed()
   .setColor(COLOR);

    
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("YOU NEED TO BE IN VOICE CHANNEL :/")
      return message.channel.send(embed);
    }
    
    
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("There is nothing playing that i could pause")
      return message.channel.send(embed);
    }
    
    if(serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause(true)
      
      embed.setDescription("✅ | Paused The Current Playing Song")
      embed.setThumbnail(client.user.displayAvatarURL())
      return message.channel.send(embed)
  }  
  }
}