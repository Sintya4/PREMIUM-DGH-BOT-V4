const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
  name: "add-level-role",
  description: "Add a Role that is given when a user reached a specific level.",
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
  run: async (client, message, args) => {
    const provide = new Discord.MessageEmbed()
      .setTitle("You need to mention a role.")
      .setColor("#c98aff")
      .setTimestamp();
    const provideLevel = new Discord.MessageEmbed()
      .setTitle("You need to provide a number.")
      .setDescription(
        "This will give a user the role when the user reached the level."
      )
      .setColor("#c98aff")
      .setTimestamp();

    const Role_To_Add = message.mentions.roles.first();
    if (!Role_To_Add) return message.channel.send(provide);

    const Level_To_Reach = args[1];
    if (!Level_To_Reach) return message.channel.send(provideLevel);
    if (isNaN(Level_To_Reach)) return message.channel.send(provideLevel);

    if (Level_To_Reach.includes("+")) return message.channel.send(provideLevel);
    if (Level_To_Reach.includes("-")) return message.channel.send(provideLevel);
    if (Level_To_Reach.includes(".")) return message.channel.send(provideLevel);

    let pog = await client.data.get(`level_role_${message.guild.id}`);
    if (pog && pog.find(x => x.Level_Role_ID === Role_To_Add.id)) {
      const Already = new Discord.MessageEmbed()
        .setTitle("There is already a role that has that same level to reach.")
        .setColor("#c98aff")
        .setTimestamp();
      return message.channel.send(Already);
    }

    client.data.push(`level_role_${message.guild.id}`, {
      Level_Role: `${Role_To_Add.name}`,
      Level_Role_ID: `${Role_To_Add.id}`,
      Level_To_Reach: parseInt(Level_To_Reach)
    });

    const Success = new Discord.MessageEmbed()
      .setTitle("New Level Role has been successfully added.")
      .setColor("#c98aff")
      .setTimestamp();
    return message.channel.send(Success);
  }
};
