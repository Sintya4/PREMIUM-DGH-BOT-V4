const Discord = require("discord.js");

module.exports = {
  name: "level-roles",
  description: "Shows the list of Level Roles of the server.",
  category: "levels",
  run: async (client, message, args) => {
    const Success = new Discord.MessageEmbed()
      .setAuthor(
        `${message.guild.name}`,
        `${message.guild.iconURL({ dynamic: true })}`
      )
      .setTitle("[ Level Roles ]")
      .setImage(
        "https://media.discordapp.net/attachments/832519166459510795/832837073274273797/Level_Roles.png?width=1085&height=610"
      )
      .setColor("#c98aff")
      .setTimestamp();
    let levels = await client.data.get(`level_role_${message.guild.id}`);
    if (levels && levels.length) {
      let array = [];
      levels.forEach((Roles, x) => {
        array.push(
          `__**${x + 1}.**__**Roles: ${Roles.Level_Role}\nReach: ${
            Roles.Level_To_Reach
          }\nID: ${Roles.Level_Role_ID}**`
        );
      });
      Success.setDescription(
        array.join("\n\n") || "There are no Level Roles yet."
      );
      return message.channel.send({ embeds: [Success] });
    } else {
      const No_Roles = new Discord.MessageEmbed()
        .setTitle("There are no Level Roles yet.")
        .setColor("#c98aff")
        .setTimestamp();
      return message.channel.send({ embeds: [No_Roles] });
    }
  }
};
