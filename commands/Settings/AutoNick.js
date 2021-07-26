const Discord = require("discord.js");

const db = require("quick.db");

module.exports = {
  name: "setautonick",
  category: "settings",
  permissions: "ADMINISTRATOR",
  usage: "setautonick <key> <[member] {tag}>",
  description: "Set the Roles Welcome",
  botPermission: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_NICKNAMES",
    "MANAGE_GUILD"
  ],
  authorPermission: ["MANAGE_GUILD"],
  run: async (client, message, args) => {
    let keys = ["member", "bot"];
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
    if (key.content.toLocaleLowerCase() === "member") {
      let nick = await client.awaitReply(
        message,
        `**Please give a Roles to Member Join?\n> [Member] {tag}\nType \`cancel\` to stop setup**`,
        180000,
        true
      );
      if (!nick)
        return message.channel.send("No response was given, Exiting setup...");

      if (nick.content.toLocaleLowerCase() === "cancel")
        return message.channel.send("Exiting setup...");

      const wel = new Discord.MessageEmbed()
        .setDescription(
          `**Done** From now on I will autoNick\n\`${
            nick.content
          }\`\nView\n\`${nick.content
            .split("{tag}")
            .join(message.author.username)}\``
        )
        .setColor("RED");
      client.data.set(`nicks_${message.guild.id}`, nick.content);

      message.channel.send(wel);
    }
    if (key.content.toLocaleLowerCase() === "bot") {
      let nick = await client.awaitReply(
        message,
        `**Please give a Roles to Bot Join?\n> [Member] {tag}\nType \`cancel\` to stop setup**`,
        180000,
        true
      );
      if (!nick)
        return message.channel.send("No response was given, Exiting setup...");

      if (nick.content.toLocaleLowerCase() === "cancel")
        return message.channel.send("Exiting setup...");
      const wel = new Discord.MessageEmbed()
        .setDescription(
          `**Done** From now on I will autoNick\n\`${
            nick.content
          }\`\nView\n\`${nick.content
            .split("{tag}")
            .join(message.author.username)}`
        )
        .setColor("RED");
      client.data.set(`nicks_bot_${message.guild.id}`, nick.content);

      message.channel.send(wel);
    }
  }
};
