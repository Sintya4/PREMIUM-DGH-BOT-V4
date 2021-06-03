const Discord = require("discord.js");
module.exports = {
  name: "delapi",
  authorPermission: ["VIEW_CHANNEL", "MANAGE_GUILD"],
  botPermission: ["VIEW_CHANNEL", "MANAGE_GUILD"],
  category: "youtube",
  run: async (client, message, args) => {
    if (!message.channel.permissionsFor(message.author).has("MANAGE_GUILD"))
      return message.channel.send(
        ":x: | **You dont have permissions to use this Command!**"
      );
    let pog = await client.data.get(`youtuber_${message.guild.id}`);
     let api = args[0].replace("https://youtube.com/c/","").replace("/","");
   if (!api) {
      let embed = new Discord.MessageEmbed()
        .setTitle("Error")
        .setDescription(`:x: | **No API CHANNEL provided**\nFormat: \`delapi https://youtube.com/c/JoniDenta\``)
        .setFooter(
          message.author.tag,
          message.author.displayAvatarURL()
        )
        .setThumbnail(message.guild.iconURL())
        .setColor("#FF0000");
      return message.channel.send({
        embed: embed
      });
    }
    if (pog) {
      let data = pog.find(x => x.word.toLowerCase() === word.toLowerCase());
      let No = new Discord.MessageEmbed();
      No.setAuthor(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      );
      No.setDescription(`:x: | **Word Not Found**`);
      No.setColor("#FF0000");
      No.setFooter(
        message.guild.name,
        message.guild.iconURL()
      );
      No.setThumbnail(message.guild.iconURL());

      if (!data) return message.channel.send({ embed: No });

      let yes = pog.indexOf(data);
      delete pog[yes];

      var filter = pog.filter(x => {
        return x != null && x != "";
      });
      client.data.set(`words_${message.guild.id}`, filter);
      let embed = new Discord.MessageEmbed();
      embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
      embed.setDescription(`**The word has been deleted!** `);
      embed.setFooter(
        message.guild.name,
        message.guild.iconURL()
      );
      embed.setColor("GREEN");
      embed.setTimestamp();
      return message.channel.send({ embed: embed });
    } else {
      let embed = new Discord.MessageEmbed();
      embed.setAuthor(message.author.tag, message.author.displayAvatarURL());
      embed.setDescription(`:x: | **The word was not found!**`);
      embed.setFooter(
        message.guild.name,
        message.guild.iconURL()
      );
      embed.setColor("#FF0000");
      embed.setTimestamp();

      return message.channel.send({ embed: embed });
    }
  }
};
