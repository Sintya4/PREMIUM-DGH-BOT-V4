const Discord = require("discord.js");
const db = require("quick.db");
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
      "starboard",
      "auto-publich"
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
    if (key.content === "cancel")
      return message.channel.send("Exiting setup...");
    if (!keys.includes(key.content)) {
      client.send("Error: Invalid Key provided, Please try again.", message);
    }

    //Setup
    if (key.content === "welcome") {
      let welcome = await client.awaitReply(
        message,
        `**Please give a channel to welcomer\nI'm not allowed to channel the Voice or Category
        \nType \`cancel\` to stop setup**`,
        180000,
        true
      );
      if (!welcome)
        return message.channel.send("No response was given, Exiting setup...");

      if (welcome.content === "cancel")
        return message.channel.send("Exiting setup...");
      const channel =
        welcome.mentions.channels.first() ||
        client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
        message.guild.channels.cache.find(
          c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
        );
      if (!channel || channel.type !== "text")
        return client.send("**Please Enter A Valid Text Channel!**");

      client.data.set(`welchannel_${message.guild.id}`, channel.id);
      client.send(
        `**Done** From now on I will send welcome message in ${channel}`,
        message
      );
    }
  }
};

/*  const [key, ...value] = args;
    switch (key) {
      default:
        return message.channel.send(
          new Discord.MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setFooter(
              message.author.tag,
              message.author.displayAvatarURL({ dynamic: true }) ||
                client.user.displayAvatarURL({ dynamic: true })
            )
            .setDescription("Error: Invalid Key provided, Please try again.")
        );
      case "leave":
        {
          if (!channel) {
            return message.channel.send(
              `${client.emotes.error}Pls Give Invalid channel... Try again...`
            );
          }
          client.data.set(`levchannel_${message.guild.id}`, channel.id);
          const leave = new Discord.MessageEmbed()
            .setDescription(
              `**Done** From now on I will send welcome message in ${channel} when someone leaves the server`
            )
            .setColor("RED");
          message.channel
            .send(leave)
            .then(m => m.delete({ timeout: 5000 }).catch(e => {}));
        }
        break;
      case "chat-bot":
        {
          if (!channel) {
            return message.channel.send(
              `${client.emotes.error}Pls Give Invalid channel... Try again...`
            );
          }
          client.data.set(`chatbot_${message.guild.id}`, channel.id);
          const chat = new Discord.MessageEmbed()
            .setDescription(
              `**Done** From now on I will send Chatbot in ${channel}`
            )
            .setColor("RED");
          message.channel
            .send(chat)
            .then(m => m.delete({ timeout: 5000 }).catch(e => {}));
        }
        break;
      case "starboard":
        {
          if (!channel) {
            return message.channel.send(
              `${client.emotes.error}Pls Give Invalid channel... Try again...`
            );
          }
          client.data.set(`starboard_${message.guild.id}`, channel.id);
          const chat = new Discord.MessageEmbed()
            .setDescription(
              `**Done** From now on I will send Starboard in ${channel}`
            )
            .setColor("RED");
          message.channel
            .send(chat)
            .then(m => m.delete({ timeout: 5000 }).catch(e => {}));
        }
        break;
      case "welcome":
        {
          if (!channel) {
            return message.channel.send(
              `${client.emotes.error}Pls Give Invalid channel... Try again...`
            );
          }
          client.data.set(`welchannel_${message.guild.id}`, channel.id);
          const welcome = new Discord.MessageEmbed()
            .setDescription(
              `**Done** From now on I will send welcome message in ${channel} when someone joins the server`
            )
            .setColor("RED");
          message.channel
            .send(welcome)
            .then(m => m.delete({ timeout: 5000 }).catch(e => {}));
        }
        break;
      case "report":
        {
          if (!channel) {
            return message.channel.send(
              `${client.emotes.error}Pls Give Invalid channel... Try again...`
            );
          }
          client.data.set(`reports_${message.guild.id}`, channel.id);
          const welcome = new Discord.MessageEmbed()
            .setDescription(
              `**Done** From now on I will send reports member in ${channel}`
            )
            .setColor("RED");
          message.channel
            .send(welcome)
            .then(m => m.delete({ timeout: 5000 }).catch(e => {}));
        }

        break;
      case "level":
        {
          if (!channel) {
            return message.channel.send(
              `${client.emotes.error}Pls Give Invalid channel... Try again...`
            );
          }
          client.data.set(`levelch_${message.guild.id}`, channel.id);
          const welcome = new Discord.MessageEmbed()
            .setDescription(
              `**Done** From now on I will send level up in ${channel}`
            )
            .setColor("RED");
          message.channel
            .send(welcome)
            .then(m => m.delete({ timeout: 5000 }).catch(e => {}));
        }
        break;
      case "modlogserver":
        {
          const channel = await message.mentions.channels.first();
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

          if (!channel)
            return message.channel
              .send(
                "I cannot find that channel. Please mention a channel within this server."
              ) // if the user do not mention a channel
              .then(m => m.delete({ timeout: 5000 }));

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

                return message.channel.send(
                  `The log channel has been set to ${channel}`
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

                return message.channel.send(
                  `The log channel has been updated to ${channel}`
                );
              }
            }
          );
        }
        break;
      case "modlog": {
        const bot = client;
        if (!args[0]) {
          let b = await client.data.fetch(`modlog_${message.guild.id}`);
          let channelName = message.guild.channels.cache.get(b);
          if (message.guild.channels.cache.has(b)) {
            return message.channel.send(
              `**Modlog Channel Set In This Server Is \`${channelName.name}\`!**`
            );
          } else
            return message.channel.send(
              "**Please Enter A Channel Name or ID To Set!**"
            );
        }
        let channel =
          message.mentions.channels.first() ||
          bot.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) ||
          message.guild.channels.cache.find(
            c => c.name.toLowerCase() === args.join(" ").toLocaleLowerCase()
          );

        if (!channel || channel.type !== "text")
          return message.channel.send("**Please Enter A Valid Text Channel!**");

        try {
          let a = await client.data.fetch(`modlog_${message.guild.id}`);

          if (channel.id === a) {
            return message.channel.send(
              "**This Channel is Already Set As Modlog Channel!**"
            );
          } else {
            bot.guilds.cache
              .get(message.guild.id)
              .channels.cache.get(channel.id)
              .send("**Modlog Channel Set!**");
            client.data.set(`modlog_${message.guild.id}`, channel.id);

            message.channel
              .send(
                `**Modlog Channel Has Been Set Successfully in \`${channel.name}\`!**`
              )
              .then(m => m.delete({ timeout: 5000 }).catch(e => {}));
          }
        } catch {
          return message.channel.send(
            "**Error - `Missing Permissions Or Channel Is Not A Text Channel!`**"
          );
        }
      }
    }
  }
};
*/
