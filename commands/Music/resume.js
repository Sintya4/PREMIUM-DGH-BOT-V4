const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "resume",
  aliases: ["restart", "back"],
  category: "music",
  description: "Resume The Music!",
  usage: "Resume",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send("Please Join A Voice Channel!");
    
    const Queue = await client.queue.get(message.guild.id);
    
    if (!Queue) return message.channel.send("Nothing Is Playing Right Now, Add Some Songs To Queue :D");
   
    if (Queue.Playing) return message.channel.send("🎶 Already Playing");
    
    Queue.Playing = true;
    Queue.Bot.dispatcher.resume();
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Success")
    .setDescription("🎶 Music Has Been Resumed!")
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("🎶 Music Has Been Resumed!"));
  }
};