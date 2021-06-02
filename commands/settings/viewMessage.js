const Discord = require("discord.js");

const db = require("quick.db");

module.exports = {
  name: "viewmsg",
  category: "settings",
  args: true,
  usage: "viewmsg <key // welcome/leave/inviter>",
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
  description: "View Message <welcome/leave>",
  run:async (client, message, args) => {
    const channel = message.mentions.channels.first();
    const [key, ...value] = args;
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
          const leave =await client.data.get(`levmsg_${message.guild.id}`) || client.db.get(`levmsg_${message.guild.id}`);
          const lev = new Discord.MessageEmbed()
            .setDescription(`View Message **${key}**\n\`\`\`\n${leave}\n\`\`\``)
            .setColor("GREEN");
          message.channel.send(lev);
        }
        break;
      case "inviter":
        {
          let d = client.data.get(`inviter_${message.guild.id}`);
          const wl = new Discord.MessageEmbed()
            .setDescription(`View Message **${key}**\n\`\`\`\n${d}\n\`\`\``)
            .setColor("GREEN");
          message.channel.send(wl);
        }
        break;
      case "welcome": {
        const welcome = await client.data.get(`welmsg_${message.guild.id}`) || client.db.get(`welmsg_${message.guild.id}`);
        const wel = new Discord.MessageEmbed()
          .setDescription(`View Message **${key}**\n\`\`\`\n${welcome}\n\`\`\``)
          .setColor("GREEN");
        message.channel.send(wel);
      }
    }
  }
};
