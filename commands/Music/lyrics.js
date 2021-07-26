const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const Finder = require("lyrics-finder");

module.exports = {
  name: "lyrics",
  aliases: ["ly"],
  category: "music",
  enabled: false,
  description: "Show Song Lyrics!",
  usage: "Lyrics",
  args: true,
  run: async (client, message, args) => {
    const Queue = client.queue.get(message.guild.id);

    if (!Queue && !args[0])
      return message.channel.send("Please Give Something To Search!");

    let Lyric,
      Thing = Queue ? Queue.Songs[0].Title : args.join(" ");

    try {
      Lyric = await Finder(Thing, "");
      if (!Lyric) {
        if (Queue && args[0]) {
          Lyric = await Finder(args.join(" "), "");
        } else {
          return message.channel.send("No Lyrics Found - " + Thing);
        }
      }
    } catch (error) {
      return message.channel.send("No Lyrics Found - " + Thing);
    }

    Lyric = await Lyric.replace(/(.{2040})/g, "`\n1\n`");
    const L = new Discord.MessageEmbed()
   .setColor("RANDOM")
    .addField(`${client.emotes.music} Lyric ${args.join(" ")}`, Lyric,{ split: { char: "`\n`" }})
    return message.channel.send(L);
  }
};
