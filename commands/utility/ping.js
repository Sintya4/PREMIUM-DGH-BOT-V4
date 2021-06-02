const { Default_Prefix, Color, Support } = require("../../config.js");
const Discord = require("discord.js");
const db = require("quick.db");
module.exports = {
  name: "ping",
  aliases: ["ms"],
  category: "utility",
  description: "Show Bot Ping!",
  usage: "Ping",
  run: async (client, message, args) => {
const m = await message.channel.send("Pinging..."); // Make sure the async is written, top of the client.on("message", ...)
     const embed = new Discord.MessageEmbed()
      .setColor("RANDOM") // Tired of choosing the embed colors? Just type "RANDOM" on it!
      .addField("⌛ Latency", `**${m.createdTimestamp -  message.createdTimestamp}ms**`)
      .addField("💓 API", `**${Math.floor(client.ws.ping)}ms**`) // Use "client.ping" if your Discord.js is < 1.15.1 --- Use "client.ws.ping" if your Discord.js is > 12.0.0
      return m.edit(`🏓 Pong!`, embed);
   }}
   