const fs = require("fs");
const Discord = require("discord.js");

module.exports = {
  name: "remove-level-role",
  description: "Remove a Level Role that is given when a user levels up.",
  category: "settings",
  botPermission: ["MANAGE_CHANNELS", "MANAGE_GUILD"],
  authorPermission: ["MANAGE_CHANNELS", "MANAGE_GUILD"],
  run: async (client, message, args) => {
    const provide = new Discord.MessageEmbed()
      .setTitle("You need to provide a role ID.")
      .setColor("#c98aff")
      .setTimestamp();
    const No_Roles = new Discord.MessageEmbed()
      .setTitle("There is no Level Role with that ID.")
      .setColor("#c98aff")
      .setTimestamp();

    const Success = new Discord.MessageEmbed()
      .setTitle("Level Role has been successfully removed.")
      .setColor("#c98aff")
      .setTimestamp();

    const Role_To_Remove = message.mentions.roles.first();
    if (!Role_To_Remove) return message.channel.send(provide);
    let pog = await client.data.get(`level_role_${message.guild.id}`);
    if (pog) {
      let data = pog.find(x => x.Level_Role_ID === Role_To_Remove.id);
      if (!data) {
        return message.channel.send(No_Roles);
      }
      if (data) {
        let yes = pog.indexOf(data);
        delete pog[yes];

        var filter = pog.filter(x => {
          return x != null && x != "";
        });
        client.data.set(`level_role_${message.guild.id}`, filter);
        message.channel.send(Success);
        //Saves the Data, this also means that it won't bring back the previous data after it got deleted
      }
    } else {
      return message.channel.send(No_Roles);
    }
  }
};
