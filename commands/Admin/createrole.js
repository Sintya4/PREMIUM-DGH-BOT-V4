const Discord = require("discord.js");
const toHex = require("colornames");

module.exports = {
  name: "createrole",
  description: "Creates A new role in the guild",
  category: "admin",
  args: true,
  botPermission:["MANAGE_ROLES","ADMINISTRATOR"],
  authorPermission:["MANAGE_ROLES","ADMINISTRATOR"],
  usage: "createrole <colorname> <Name>",
  run: async (client, message, args) => {
    const name = args.slice(1).join(" ");
    const regex = !/[^a-zA-Z0-9]+/g.test(name);
    if (!name) {
      return client.send(client.emoji("DGH_error") + " You need to specify a name for your Role", message);
    }
    if (regex === false) {
      return client.send(
        await client.emoji("DGH_error") +" That is not valid role name. It can contain only letters and numbers",message
      );
    }
    if (name.length > 100) {
      return client.send(
        await client.emoji("DGH_error") +" Your role can't be more than 100 characters long", message
      );
    }
   const rr = await message.guild.roles.create({
      data: {
        name: name.join("-"),
        color: toHex(args[0])
      }
    });
    let embed = new Discord.MessageEmbed()
      .setAuthor(
        `${message.author.username} - (${message.author.id})`,
        message.author.displayAvatarURL()
      )
      .setColor("RANDOM").setDescription(`
**Role: ** ${rr}
**Action: ** New Role Created
**Role Color: ** ${args[0]}
**Channel: ** ${message.channel}
**By: ** ${message.member}
      `);
    message.channel.send(embed);
  }
};
