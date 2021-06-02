const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("wio.db");

module.exports = {
  name: "leave",
  aliases: ["goaway", "disconnect"],
  category: "music",
  description: "Leave The Voice Channel!",
  usage: "Leave",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send("Please Join A Voice Channel!");
    
    if (!message.guild.me.voice) return message.channel.send("I Am Not In Any Voice Channel!");
    
    try {
    
    await Channel.leave();
      
    } catch (error) {
      await  Channel.leave();
      return message.channel.send("Trying To Leave The Voice Channel...");
    };
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Success")
    .setDescription("🎶 Left The Voice Channel :C")
    .setTimestamp();
    
    return message.channel.send(Embed).catch(() => message.channel.send("🎶 Left The Voice Channel :C"));
  }
};