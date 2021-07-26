const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");

module.exports = {
  name: "loop",
  aliases: ["lp"],
  category: "music",
  description: "Show Loop Status & You Can Also Set Loop Status!",
  usage: "Loop | <On Or Off>",
  run: async (client, message, args) => {
    
    const Channel = message.member.voice.channel;
    
    if (!Channel) return message.channel.send("Please Join A Voice Channel!");
    
    const Queue = await client.queue.get(message.guild.id);
    
    if (!Queue) return message.channel.send("Nothing Is Playing Right Now, Add Some Songs To Queue :D");
    
    const Embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Loop Status")
    .setDescription(`🎶 Loop Status - ${Queue.Loop ? "On" : "Off"}`)
    .setTimestamp();
    
    if (!args[0]) return message.channel.send(Embed);
    
    const Settings = ["on", "off"];
    
    if (!Settings.find(Set => Set === args[0].toLowerCase())) return message.channel.send("Invalid Option Provided - On , Off");
    
    const Status = Queue.Loop ? "on" : "off";
    
    args[0] = args[0].toLowerCase();
    
    if (args[0] === Status) return message.channel.send(`Already ${Queue.Loop ? "On" : "Off"}`);
    
    const Embeded = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Success")
    .setTimestamp();
    
    if (args[0] === "on") {
      Queue.Loop = true;
      Embeded.setDescription("🎶 Loop Has Been Enabled!")
      return message.channel.send(Embeded).catch(() => message.channel.send("Loop Has Been Enabled!"))
    } else {
      Queue.Loop = false;
      Embeded.setDescription("🎶 Loop Has Been Disabled!");
      return message.channel.send(Embeded).catch(() => message.channel.send("Loop Has Been Disabled!"));
    };
  }
};