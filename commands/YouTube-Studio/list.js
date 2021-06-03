const Discord = require("discord.js");
module.exports = {
  name: "youtube-list",
 authorPermission: ["VIEW_CHANNEL", "MANAGE_GUILD"],
  botPermission: ["VIEW_CHANNEL", "MANAGE_GUILD"],
   category: "youtube",
  run: async (client, message, args) => {
    let embed = new Discord.MessageEmbed();
    embed.setTitle(`${message.guild.name} | API CHANNEL list`);
    embed.setThumbnail(message.guild.iconURL());
    embed.setFooter(message.author.tag, message.author.displayAvatarURL());
    embed.setColor("GREEN");
    let api = await client.data.get(`youtuber_${message.guild.id}`);
    if (api && api.length) {
      let array = [];
      api.forEach(x => {
        array.push(`**API:** \`${x.api}\` | **Channel:**<#${x.channel}>`);
      });

      embed.setDescription(`${array.join("\n")}`);
      embed.setFooter(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      );
    } else {
      return message.channel.send(":x: | **There are No API CHANNEL.**");
    }

    return message.channel.send({ embed: embed });
  }
};
