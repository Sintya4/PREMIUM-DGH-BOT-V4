const Discord = require("discord.js");

const db = require("quick.db");

module.exports = {
  name: "setautoroles",
  category: "settings",
  args: true,
  permissions: "ADMINISTRATOR",
  usage: "setautoroles <@roles>",
  description: "Set the Roles Welcome",
  botPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
  authorPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
  run: (client, message, args) => {
    let r = message.mentions.roles.first();
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
};
