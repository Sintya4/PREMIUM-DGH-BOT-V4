const { Default_Prefix, Color } = require("../../config.js");
const { Player } = require("../../Functions.js")
const Discord = require("discord.js"), Ytdl = require("discord-ytdl-core"), db = require("quick.db");

module.exports = {
  name: "applyfilter",
  aliases: ["af"],
  category: "music",
  args: true,
  description: "Enable Or Disable An Filter!",
  usage: "Applyfilter <Filter>",
  run: async (client, message, args) => {
    const Channel = message.member.voice.channel;

    if (!Channel) return message.channel.send("Please Join A Voice Channel!");

    const Queue = await client.queue.get(message.guild.id);

    if (!Queue)
      return message.channel.send(
        "Nothing Is Playing Right Now, Add Some Songs To Queue :D"
      );
    
    let Filter = args[0];
    
    const Filters = ["nightcore", "bassboost", "vaporwave", "phaser", "treble", "normalizer", "flanger"];
    
    if (!Filter) return message.channel.send("Please Give A Filter - " + Filters.map(fil => fil.charAt(0).toUpperCase() + fil.slice(1)).join(", "));
    
    if (!Filters.find(Fil => Fil === Filter.toLowerCase())) return message.channel.send("No Filter Found - " + Filter.charAt(0).toUpperCase() + Filter.slice(1));
    
    const Embed = new Discord.MessageEmbed()
      .setColor(Color)
      .setTitle("Success")
      .setDescription(`🎶 ${Filter.charAt(0).toUpperCase() + Filter.slice(1)} Has Been ${Queue.Filters[Filter] ? "Disabled" : "Enabled"}`)
      .setTimestamp();
    
    Filter = Filter.toLowerCase();
    
    Queue.Filters[Filter] = await Queue.Filters[Filter] ? false : true;
    
    await Player(message, Discord, client, Ytdl, { Filter: true, Play: Queue.Songs[0], Color: Color }, db);

    return message.channel.send(Embed).catch(() => message.channel.send(`🎶 ${Filter.charAt(0).toUpperCase() + Filter.slice(1)} Has Been ${Queue.Filters[Filter] ? "Disabled" : "Enabled"}`));
    
  }
};