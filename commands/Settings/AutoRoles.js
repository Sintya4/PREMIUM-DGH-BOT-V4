const Discord = require("discord.js");

const db = require("quick.db");

module.exports = {
  name: "setautoroles",
  category: "settings",
  permissions: "ADMINISTRATOR",
  usage: "setautoroles <key> <@roles>",
  description: "Set the Roles Welcome",
  botPermission: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_ROLES",
    "MANAGE_GUILD"
  ],
  authorPermission: [
    "MANAGE_GUILD"
  ],
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
      let roles = await client.awaitReply(
        message,
        `**Please give a Roles to Member Join?\n> @member\nType \`cancel\` to stop setup**`,
        180000,
        true
      );
      if (!roles)
        return message.channel.send("No response was given, Exiting setup...");

      if (roles.content.toLocaleLowerCase() === "cancel")
        return message.channel.send("Exiting setup...");

      let r = roles.mentions.roles.first();
      if (message.guild.me.roles.highest.comparePositionTo(r) < 0) {
        return message.channel.send(
          `My role is not high enough than **${r.name}** role!`
        );
      }

      const wel = new Discord.MessageEmbed()
        .setDescription(`**Done** From now on I will autoRoles\n\`${r.name}\``)
        .setColor("RED");
      client.data.set(`roles_${message.guild.id}`, r.id);

      message.channel.send(wel);
    }
   if (key.content.toLocaleLowerCase() === "bot") {
      let roles = await client.awaitReply(
        message,
        `**Please give a Roles to Bot Join?\n> @bot\nType \`cancel\` to stop setup**`,
        180000,
        true
      );
      if (!roles)
        return message.channel.send("No response was given, Exiting setup...");

      if (roles.content.toLocaleLowerCase() === "cancel")
        return message.channel.send("Exiting setup...");

      let r = roles.mentions.roles.first();
      if (message.guild.me.roles.highest.comparePositionTo(r) < 0) {
        return message.channel.send(
          `My role is not high enough than **${r.name}** role!`
        );
      }

      const wel = new Discord.MessageEmbed()
        .setDescription(`**Done** From now on I will autoRoles\n\`${r.name}\``)
        .setColor("RED");
      client.data.set(`roles_bot_${message.guild.id}`, r.id);

      message.channel.send(wel);
    }
  }
};
