const Discord = require("discord.js");
const db = require("quick.db");
const fs = require("fs");
const Guild = require("../../models/log"); //require our log model
const mongoose = require("mongoose");

module.exports = {
  name: "setchannel",
  category: "settings",
  description: "Set the channel",
  botPermission: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "MANAGE_WEBHOOKS"
  ],
  authorPermission: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD"
  ],
  run: async (client, message, args) => {
    message.delete();
    let keys = [
      "welcome",
      "leave",
      "report",
      "level",
      "moderation-log",
      "log-server",
      "chat-bot",
      "starboard"
    ];
    const key = await client.awaitReply(
      message,
      `**Choose what settings you want?\nKey: ${keys.join(
        " | "
      )}\nType \`cancel\` to stop setup**`,
      180000,
      true
    );
    if (!key)
      return message.channel.send("No response was given, Exiting setup...");
    if (key.content.toLocaleLowerCase() === "cancel")
      return message.channel.send("Exiting setup...");
    if (!keys.includes(key.content.toLocaleLowerCase())) {
      client.send("Error: Invalid Key provided, Please try again.", message);
    }

    //Setup
    if (key.content.toLocaleLowerCase() === "welcome") {
      let welcome = await client.awaitReply(
        message,
        `**Please give a channel to welcomer\nI'm not allowed to channel the Voice or Category
        \nType \`cancel\` to stop setup**`,
        180000,
        true
      );
      if (!welcome)
        return message.channel.send("No response was given, Exiting setup...");

      if (welcome.content.toLocaleLowerCase() === "cancel")
        return message.channel.send("Exiting setup...");
      const channel =
        welcome.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        welcome.guild.channels.cache.find(
          c => c.name.toLowerCase() === welcome.content.toLocaleLowerCase()
        );
      if (!channel || channel.type !== "text")
        return client.send("**Please Enter A Valid Text Channel!**");
      client.data.set(`welchannel_${message.guild.id}`, channel.id);
      client.send(
        `**Done** From now on I will send welcome in ${channel}`,
        message
      );
    }

    if (key.content.toLocaleLowerCase() === "leave") {
      let content = await client.awaitReply(
        message,
        `**Please give a channel to Leave\nI'm not allowed to channel the Voice or Category
        \nType \`cancel\` to stop setup**`,
        180000,
        true
      );
      if (!content)
        return message.channel.send("No response was given, Exiting setup...");

      if (content.content.toLocaleLowerCase() === "cancel")
        return message.channel.send("Exiting setup...");
      const channel =
        content.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        content.guild.channels.cache.find(
          c => c.name.toLowerCase() === content.content.toLocaleLowerCase()
        );
      if (!channel || channel.type !== "text")
        return client.send("**Please Enter A Valid Text Channel!**");
      client.data.set(`levchannel_${message.guild.id}`, channel.id);
      client.send(
        `**Done** From now on I will send Leave in ${channel}`,
        message
      );
    }

    if (key.content.toLocaleLowerCase() === "level") {
      let content = await client.awaitReply(
        message,
        `**Please give a channel to Level\nI'm not allowed to channel the Voice or Category
        \nType \`cancel\` to stop setup**`,
        180000,
        true
      );
      if (!content)
        return message.channel.send("No response was given, Exiting setup...");

      if (content.content.toLocaleLowerCase() === "cancel")
        return message.channel.send("Exiting setup...");
      const channel =
        content.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        content.guild.channels.cache.find(
          c => c.name.toLowerCase() === content.content.toLocaleLowerCase()
        );
      if (!channel || channel.type !== "text")
        return client.send("**Please Enter A Valid Text Channel!**");
      client.data.set(`levelch_${message.guild.id}`, channel.id);
      client.send(
        `**Done** From now on I will send level in ${channel}`,
        message
      );
    }

    if (key.content.toLocaleLowerCase() === "report") {
      let content = await client.awaitReply(
        message,
        `**Please give a channel to Report\nI'm not allowed to channel the Voice or Category
        \nType \`cancel\` to stop setup**`,
        180000,
        true
      );
      if (!content)
        return message.channel.send("No response was given, Exiting setup...");

      if (content.content.toLocaleLowerCase() === "cancel")
        return message.channel.send("Exiting setup...");
      const channel =
        content.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        content.guild.channels.cache.find(
          c => c.name.toLowerCase() === content.content.toLocaleLowerCase()
        );
      if (!channel || channel.type !== "text")
        return client.send("**Please Enter A Valid Text Channel!**");
      client.data.set(`reports_${message.guild.id}`, channel.id);
      client.send(
        `**Done** From now on I will send report in ${channel}`,
        message
      );
    }

    if (key.content.toLocaleLowerCase() === "moderation-log") {
      let content = await client.awaitReply(
        message,
        `**Please give a channel to Moderation log\nI'm not allowed to channel the Voice or Category
        \nType \`cancel\` to stop setup**`,
        180000,
        true
      );
      if (!content)
        return message.channel.send("No response was given, Exiting setup...");

      if (content.content.toLocaleLowerCase() === "cancel")
        return message.channel.send("Exiting setup...");
      const channel =
        content.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        content.guild.channels.cache.find(
          c => c.name.toLowerCase() === content.content.toLocaleLowerCase()
        );
      if (!channel || channel.type !== "text")
        return client.send("**Please Enter A Valid Text Channel!**");
      client.data.set(`modlog_${message.guild.id}`, channel.id);
      client.send(
        `**Done** From now on I will send Moderation Logs in ${channel}`,
        message
      );
    }

    if (key.content.toLocaleLowerCase() === "log-server") {
      let content = await client.awaitReply(
        message,
        `**Please give a channel to Server Logs\nI'm not allowed to channel the Voice or Category
        \nType \`cancel\` to stop setup**`,
        180000,
        true
      );
      if (!content)
        return message.channel.send("No response was given, Exiting setup...");

      if (content.content.toLocaleLowerCase() === "cancel")
        return message.channel.send("Exiting setup...");
      const channel =
        content.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        content.guild.channels.cache.find(
          c => c.name.toLowerCase() === content.content.toLocaleLowerCase()
        );
      if (!channel || channel.type !== "text")
        return client.send("**Please Enter A Valid Text Channel!**");

      const guild1 = message.guild;
      let webhookid;
      let webhooktoken;
      await channel
        .createWebhook(guild1.name, {
          avatar: guild1.iconURL({ format: "png" })
        })
        .then(webhook => {
          webhookid = webhook.id;
          webhooktoken = webhook.token;
        });

      await Guild.findOne(
        //will find data from database
        {
          guildID: message.guild.id
        },
        async (err, guild) => {
          if (err) console.error(err);
          if (!guild) {
            // what the bot should do if there is no data found for the server
            const newGuild = new Guild({
              _id: mongoose.Types.ObjectId(),
              guildID: message.guild.id,
              guildName: message.guild.name,
              logChannelID: channel.id,
              webhookid: webhookid,
              webhooktoken: webhooktoken
            });

            await newGuild
              .save() //save the data to database(mongodb)
              .then(result => console.log(result))
              .catch(err => console.error(err));

            client.send(
              `**Done** From now on I will send Server Logs in ${channel}`,
              message
            );
          } else {
            guild
              .updateOne({
                //if data is found then update it with new one
                logChannelID: channel.id,
                webhooktoken: webhooktoken,
                webhookid: webhookid
              })
              .catch(err => console.error(err));

            return client.send(
              `The log channel has been updated to ${channel}`,
              message
            );
          }
        }
      );
    }

    if (key.content.toLocaleLowerCase() === "starboard") {
      let content = await client.awaitReply(
        message,
        `**Please give a channel to Starboard\nI'm not allowed to channel the Voice or Category
        \nType \`cancel\` to stop setup**`,
        180000,
        true
      );
      if (!content)
        return message.channel.send("No response was given, Exiting setup...");

      if (content.content.toLocaleLowerCase() === "cancel")
        return message.channel.send("Exiting setup...");
      const channel =
        content.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        content.guild.channels.cache.find(
          c => c.name.toLowerCase() === content.content.toLocaleLowerCase()
        );
      if (!channel || channel.type !== "text")
        return client.send("**Please Enter A Valid Text Channel!**");
      client.data.set(`starboard_${message.guild.id}`, channel.id);
      client.send(
        `**Done** From now on I will send Starboard in ${channel}`,
        message
      );
    }

    if (key.content.toLocaleLowerCase() === "auto-publico") {
      let content = await client.awaitReply(
        message,
        `**Please give a channel to Auto Public Channel Announcement\nType \`cancel\` to stop setup**`,
        180000,
        true
      );
      if (!content)
        return message.channel.send("No response was given, Exiting setup...");

      if (content.content.toLocaleLowerCase() === "cancel")
        return message.channel.send("Exiting setup...");
      const channel =
        content.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        content.guild.channels.cache.find(
          c => c.name.toLowerCase() === content.content.toLocaleLowerCase()
        );
      if (!channel || channel.type !== "news")
        return client.send("**Please Enter A Valid News Channel!**");
      client.data.push(`Announcement_${message.guild.id}`,channel.id);
      client.send(
        `**Done** From now on I will send Auto Public Channel Announcement in ${channel}`,
        message
      );
    }

    if (key.content.toLocaleLowerCase() === "chat-bot") {
      let content = await client.awaitReply(
        message,
        `**Please give a channel to Chat Bot\nI'm not allowed to channel the Voice or Category
        \nType \`cancel\` to stop setup**`,
        180000,
        true
      );
      if (!content)
        return message.channel.send("No response was given, Exiting setup...");

      if (content.content.toLocaleLowerCase() === "cancel")
        return message.channel.send("Exiting setup...");
      const channel =
        content.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        content.guild.channels.cache.find(
          c => c.name.toLowerCase() === content.content.toLocaleLowerCase()
        );
      if (!channel || channel.type !== "text")
        return client.send("**Please Enter A Valid Text Channel!**");
      client.data.set(`chatbot_${message.guild.id}`, channel.id);
      client.send(
        `**Done** From now on I will send Chat-bot in ${channel}`,
        message
      );
    }
  }
};
