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
    message.delete();
    let keys = ["welcome", "leave","anti-swear"];
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
    let wards = [
      "{user-mention}",
      "{server-name}",
      "{user-tag}",
      "{user-username}"
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
    if (key.content === "cancel")
      return message.channel.send("Exiting setup...");
    if (!keys.includes(key.content)) {
      client.send("Error: Invalid Key provided, Please try again.", message);
    }

    //Setup
    if (key.content === "welcome") {
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

      if (welcome.content === "cancel")
        return message.channel.send("Exiting setup...");
    //  let Msg = await emoji(welcome.content(), message)
      client.data.set(`welmsg_${message.guild.id}`, welcome.content);
      client.send(
        `**Done** From now on I will send\n\`${
       welcome.content.toString() }\`\n\nView:\n${welcome.content
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

    if (key.content === "leave") {
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
      if (leave.content === "cancel")
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
    if (key.content === "anti-swear") {
      let words = await client.awaitReply(
        message,
        `**Please give a message to Warning Anti-swear?\nCode: ${wards.join(
          " |"
        )}\nType \`cancel\` to stop setup**`,
        180000,
        true
      );
      if (!words)
        return message.channel.send("No response was given, Exiting setup...");
      if (words.content === "cancel")
        return message.channel.send("Exiting setup...");

     client.data.set(`message_${message.guild.id}`, words.content )
     client.send(
        `**Done** From now on I will send\n\`${
          words.content
        }\`\n\nView:\n${words.content
        .split("{user-mention}").join("<@"+message.author.id+">").split("{server-name}").join(message.guild.name).split("{user-tag}").join(message.author.tag).split("{user-username}").join(message.author.username)}`,
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
function emoji(msg, message){
  let emojis = msg.match(/(?<=:)([^:\s]+)(?=:)/g);
    if (!emojis) return;
  let temp;
    emojis.forEach(m => {
      let emoji = message.guild.emojis.cache.find(x => x.name === m);
      if (!emoji) return;
      temp = emoji.toString();
        if (new RegExp(temp, "g").test(msg))
        msg = msg.replace(new RegExp(temp, "g"), emoji.toString());
      else msg = msg.replace(new RegExp(":" + m + ":", "g"), emoji.toString());
    });

}