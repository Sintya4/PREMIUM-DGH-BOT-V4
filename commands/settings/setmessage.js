const Discord = require("discord.js");
const moment = require("moment-timezone");
module.exports = {
  name: "setmsg",
  category: "settings",
  botPermission: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD"
  ],
  authorPermission: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD"
  ],
  usage: "setmsg <welcome/leave> <msg>",
  description: "Set the welcome",
  run: async (client, message, args) => {
    let keys = ["welcome", "leave"];
    let welcomes = [
      "{member}",
      "{username}",
      "{tag}",
      "{server}",
      "{size}",
      "{date}",
      "{position}"
    ];
    let leaves = [
      "{member}",
      "{username}",
      "{tag}",
      "{server}",
      "{size}",
      "{date}",
      "{position}"
    ];
    let levels = [
      "{member}",
      "{username}",
      "{tag}",
      "{server}",
      "{level}",
      "{xp}",
      "{orl_xp}"
    ];
    var date = moment.tz("Asia/Jakarta");
    let joinPosition;
    const me = message.guild.members.cache.array();
    me.sort((a, b) => a.joinedAt - b.joinedAt);
    for (let i = 0; i < me.length; i++) {
      if (me[i].id == message.guild.member(message).id) joinPosition = i;
    }

    const key = await client.awaitReply(
      message,
      `**Choose what settings you want?\nKey: ${keys.join(
        " |"
      )}\nType \`cancel\` to stop setup**`,
      180000,
      true
    );
    if (!key)
      return message.channel.send("No response was given, Exiting setup...");
    if (key.content.toLowerCase() === "cancel")
      return message.channel.send("Exiting setup...");
    if (!keys.includes(args[0].toLowerCase())) {
      client.send("Error: Invalid Key provided, Please try again.", message);
    }

    //Setup
    if (key.content.toLowerCase() === "welcome") {
      let welcome = await client.awaitReply(
        message,
        `**Please give a message to welcomer?\nCode: ${welcomes.join(
          " |"
        )}\nType \`cancel\` to stop setup**`,
        180000,
        true
      );
      if (!welcome)
        return message.channel.send("No response was given, Exiting setup...");

      if (welcome.content.toLowerCase() === "cancel")
        return message.channel.send("Exiting setup...");

      client.data.set(`welmsg_${message.guild.id}`, welcome.content);
      client.send(
        `**Done** From now on I will send\n\`${
          welcome.content
        }\`\n\nView:\n${welcome.content
          .split(`{member}`)
          .join(message.author) // Member mention substitution
          .split(`{username}`)
          .join(message.author.username) // Username substitution
          .split(`{position}`)
          .join(joinPosition || 1) //member.guild.members.cache.size)
          .split(`{tag}`)
          .join(message.author.tag) // Tag substitution
          .split(`{date}`)
          .join(date.format("DD/MMM/YYYY, hh:mm:ss z")) // member guild joinedAt
          .split(`{server}`)
          .join(message.guild.name) // Name Server substitution
          .split(`{size}`)
          .join(message.guild.members.cache.size)}`,
        message
      );
    }

    if (key.content.toLowerCase() === "leave") {
      let leave = await client.awaitReply(
        message,
        `**Please give a message to leaver?\nCode: ${leaves.join(
          " |"
        )}\nType \`cancel\` to stop setup**`,
        180000,
        true
      );
      if (!leave)
        return message.channel.send("No response was given, Exiting setup...");
      if (leave.content.toLowerCase() === "cancel")
        return message.channel.send("Exiting setup...");

      client.data.set(`levmsg_${message.guild.id}`, leave.content);
      client.send(
        `**Done** From now on I will send\n\`${
          leave.content
        }\`\n\nView:\n${leave.content
          .split(`{member}`)
          .join(message.author) // Member mention substitution
          .split(`{username}`)
          .join(message.author.username) // Username substitution
          .split(`{position}`)
          .join(joinPosition || 1) //member.guild.members.cache.size)
          .split(`{tag}`)
          .join(message.author.tag) // Tag substitution
          .split(`{date}`)
          .join(date.format("DD/MMM/YYYY, hh:mm:ss z")) // member guild joinedAt
          .split(`{server}`)
          .join(message.guild.name) // Name Server substitution
          .split(`{size}`)
          .join(message.guild.members.cache.size)}`,
        message
      );
    }
    //Soon
/*
    if (key.content.toLowerCase() === "level") {
      let level = await client.awaitReply(
        message,
        `**Please give a message to level?\nCode: ${levels.join(
          " |"
        )}\nType \`cancel\` to stop setup**`,
        180000,
        true
      );
      if (!level)
        return message.channel.send("No response was given, Exiting setup...");
      if (level.content.toLowerCase() === "cancel")
        return message.channel.send("Exiting setup...");
      client.data.set(`lvlmsg_${message.guild.id}`, level.content);
      client.send(
        `**Done** From now on I will send\n\`${
          level.content
        }\`\n\nView:\n${level.content
          .split(`{member}`)
          .join(message.author) // Member mention substitution
          .split(`{username}`)
          .join(message.author.username) // Username substitution
          .split(`{tag}`)
          .join(message.author.tag) // Tag substitution
          .split(`{server}`)
          .join(message.guild.name)
          .split(`{xp}`)
          .join("100")
          .split(`{orl_xp}`)
          .join("0")
          .split(`{level}`)
          .join("1")}`,
        message
      );
    }*/
  }
};
