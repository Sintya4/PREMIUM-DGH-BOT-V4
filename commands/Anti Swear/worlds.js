const Discord = require("discord.js");
module.exports = {
  name: "words",
 authorPermission: ["VIEW_CHANNEL", "MANAGE_GUILD"],
  botPermission: ["VIEW_CHANNEL", "MANAGE_GUILD"],
   category: "anti-swear",
  run: async (client, message, args) => {
    let embed = new Discord.MessageEmbed();
    embed.setTitle(`${message.guild.name} | Anti Swear words list`);
    embed.setThumbnail(message.guild.iconURL());
    embed.setFooter(message.author.tag, message.author.displayAvatarURL());
    embed.setColor("GREEN");
    let words = await client.data.get(`words_${message.guild.id}`);
    if (words && words.length) {
      let array = [];
      words.forEach(x => {
        array.push(`**Word:** \`${x.word}\` | **added By:** ${x.author}`);
      });

      embed.setDescription(`${array.join("\n")}`);
      embed.setFooter(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      );
    } else {
      return client.send(await client.emoji("DGH_error") +":x: | **There are No words.**", message);
    }

    return message.channel.send({ embed: embed });
  }
};
