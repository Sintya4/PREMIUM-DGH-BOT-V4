const randomstring = require("randomstring");
const Discord = require("discord.js"),
  MessageEmbed = require("discord.js");
const db = require("quick.db");
let numbers = randomstring.generate({
  length: 5,
  charset: "numeric"
});
module.exports = {
  name: "new",
  usage: `new <reason>`,
  category: "ticket",
  description: "create your ticket",
  args: true,
  cooldown: 5,
  permission: "",
  bot: ["MANAGE_CHANNELS", "VIEW_CHANNEL", "MANAGE_ROLES"],
  run: async (client, message, args) => {
    const strat = await client.data.get(`ticket_${message.guild.id}`);
    const cc = await message.guild.channels
      .create(`Ticket_${numbers}`, {
        parent: strat.id,
        type: "text",
        topic: `Common Information:\nTicket Name: ${
          message.author.username
        }\nTicket ID: ${message.author.id}\nSubject: **\`${args.join(
          " "
        )}\`**\nDate: ${message.createdAt.toLocaleString()}`,
        permissionOverwrites: [
          {
            id: message.guild.id,
            deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
          },
          {
            id: message.author.id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
          },
          {
            id: client.user.id,
            allow: [
              "VIEW_CHANNEL",
              "MANAGE_CHANNELS",
              "MANAGE_MESSAGES",
              "SEND_MESSAGES"
            ]
          }
        ]
      })
      .then(async channel => {
        message.reply(`click <#${channel.id}> to view your ticket`);

        const ww = await channel.send(
          new Discord.MessageEmbed()
            .setColor("RANDOM")
            .addField("Subject", `${args.join(" ")}`)
            .addField(
              "Explain",
              "Describe your topic so it could be resolved faster!"
            )
            .addField("Ticket by", message.author.tag)
            .setDescription(
              `Thank you for creating a ticket.\nThe support team will assist you soon!\n\nClick :x: to delete this channel`
            )
        );

        await ww.react("❌");
        let collector = ww.createReactionCollector(
          (reaction, user) => user.id === message.author.id
        );
        collector.on("collect", async (reaction, user) => {
          if (reaction._emoji.name === "❌") {
            channel.edit({
              permissionOverwrites: [
                {
                  id: message.guild.id,
                  deny: [
                    "VIEW_CHANNEL",
                    "SEND_MESSAGES",
                    "READ_MESSAGE_HISTORY"
                  ]
                },
                {
                  id: message.author.id,
                  deny: [
                    "VIEW_CHANNEL",
                    "SEND_MESSAGES",
                    "READ_MESSAGE_HISTORY"
                  ]
                },
                {
                  id: client.user.id,
                  allow: [
                    "VIEW_CHANNEL",
                    "MANAGE_CHANNELS",
                    "MANAGE_MESSAGES",
                    "SEND_MESSAGES"
                  ]
                }
              ]
            });
          }
        });
        let chan = await client.data.fetch(`modlog_${message.guild.id}`);
        if (chan == null) return;

        if (!chan) return;
        var sChannel = message.guild.channels.cache.get(chan);
        if (!sChannel) return;
        sChannel.send(
          new Discord.MessageEmbed()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .setColor("#ff0000")
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField("**Moderation**", "Ticket New")
            .addField("**Username**", `${message.author.username}`)
            .addField("**ID**", message.author.id)
            .addField("**Subject**", args.join(" "))
            .addField("**Channel**", `<#${channel.id}>`)
            .addField("**Date**", message.createdAt.toLocaleString())
            .setTimestamp()
        );
      });
  }
};
