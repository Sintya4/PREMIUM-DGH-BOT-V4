const { Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const moment = require("moment");
const fetch = require("node-fetch");
const url = require("url");
const api = require ("covidapi")
module.exports = {
  name: "covid",
  aliases: ["Covid-19"],
  category: "search",
  description: "Covid-19",
  usage: "covid <country>",
  args: true,
  run: async (client, message, args) => {
    message.delete();
    const a = args.join(" ")
   const data = await api.countries({country: args.join(" ")})
    const coronaembed = new Discord.MessageEmbed()
    .setColor("#00f8ff")
    .setTitle("Global Cases Covid-19")
    .setDescription(`Number of Covid-19 cases on \`${a}\``)
    .addField("Cases", data.cases, true)
    .addField("Active", data.active, true)
    .addField("Cases Today", data.todayCases, true)
    .addField("Critical Cases", data.critical, true)
    .addField("Deaths", data.deaths, true)
    .addField("Recovered", data.recovered, true)
    message.channel.send(coronaembed)
  }} 