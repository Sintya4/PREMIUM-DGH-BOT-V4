const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "warn",
  category: "moderation",
  usage: "warn <@mention> <reason>",
  args: true,
  P_user: ["ADMINISTRATOR"],
  P_bot: ["VIEW_CHANNELS"],
  description: "Warn anyone who do not obey the rules",
  run: async (client, message, args) => {
    const user = message.mentions.members.first();

    if (!user) {
      return client.send(
        "Please Mention the person to who you want to warn - warn @mention <reaosn>",
        { message }
      );
    }

    if (message.mentions.users.first().bot) {
      return client.send("You can not warn bots", { message });
    }

    if (message.author.id === user.id) {
      return client.send("You can not warn yourself", { message });
    }

    if (user.id === message.guild.ownerId) {
      return client.send("You jerk, how you can warn server owner -_-", {
        message
      });
    }

    const reason = args.slice(1).join(" ");

    if (!reason) {
      return client.send(
        "Please provide reason to warn - warn @mention <reason>",
        { message }
      );
    }

    let warnings = await client.data.get(
      `warnings_${message.guild.id}_${user.id}`
    );
    if (warnings === null) {
      client.data.set(`warnings_${message.guild.id}_${user.id}`, 1);
      client.send(
        `You have been warned in **${message.guild.name}** for ${reason}`,
        { message, type: true, channel: user.id }
      );
      await client.send(
        `You warned **${
          message.mentions.users.first().username
        }** for ${reason}`,
        { message }
      );
    } else if (warnings !== null) {
      client.data.add(`warnings_${message.guild.id}_${user.id}`, 1);
      client.send(
        `You have been warned in **${message.guild.name}** for ${reason}`,
        { message, type: true, channel: user.id }
      );
      await client.send(
        `You warned **${
          message.mentions.users.first().username
        }** for ${reason}`,
        { message }
      );
    }
    client.ops.mod("Warn", "Warn", user, reason, message, client);
  }
};
