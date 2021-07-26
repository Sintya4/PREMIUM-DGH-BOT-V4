const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "queue",
  aliases: ["q"],
  category: "music",
  description: "Show Music Queue!",
  usage: "Queue",
  run: async (client, message, args) => {
    const Channel = message.member.voice.channel;

    if (!Channel) return message.channel.send("Please Join A Voice Channel!");

    const Queue = await client.queue.get(message.guild.id);

    if (!Queue || !Queue.Songs)
      return message.channel.send(
        "Nothing Is Playing Right Now, Add Some Songs To Queue :D"
      );
    
    const Sort = await Queue.Songs.map((Song, Position) => `${(Position + 1) === 1 ? "Now Playing" : (Position - 1) === 0 ? 1 : (Position)} | ${Song.Title.length > 60 ? Song.Title.slice(0, 60) + "..." : Song.Title}`).join("\n");
    
    if (!Sort) return message.channel.send("Nothing Is Playing Right Now, Add Some Songs To Queue :D");

    return message.channel.send("```" + Sort + "```", {
      split: { char: "\n" }
    });
  }
};
  