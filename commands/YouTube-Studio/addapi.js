
let Discord = require("discord.js");
module.exports = {
        name: "addapi",
        usage: `addapi [Channel_id_youtuber]`,
        category: "youtube",
        description: "",
        cooldown: 2,
    run: async (client, message, args) => {
    const channel = message.mentions.channels.first();
    
    let pog = await client.data.get(`youtuber_${message.guild.id}`);
    let api = args[0].replace("https://youtube.com/c/","").replace("/","");
    if (!api) {
      let embed = new Discord.MessageEmbed()
        .setTitle("Error")
        .setDescription(`:x: | **No Api Channel provided**\nFormat: \`addapi https://youtube.com/c/JoniDenta\``)
        .setFooter(
          message.author.tag,
          message.author.displayAvatarURL()
        )
        .setThumbnail(message.guild.iconURL())
        .setColor("#FF0000");
      return message.channel.send({
        embed: embed
      });
    };
     
    if (pog && pog.find(find => find.api == api)) {
      let embed = new Discord.MessageEmbed();
      embed.setAuthor(message.guild.name, message.guild.iconURL());
      embed.setTitle("Error");
      embed.setDescription(`:x: | **The API CHANNEL is already on the database**`);
      embed.setFooter(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      );
      embed.setTimestamp();
      embed.setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
      return message.channel.send({
        embed: embed
      });
    }
    let yes = {
      api: api,
      channel: channel.id
    };
    client.data.push(`youtuber_${message.guild.id}`, yes);
    let embed = new Discord.MessageEmbed();
    embed.setAuthor(message.guild.name, message.guild.iconURL());
    embed.setTitle("Success");
    embed.setThumbnail(message.guild.iconURL());
    embed.setDescription(`**The API CHANNEL has been added!**`);
    embed.setFooter(
      message.author.tag,
      message.author.displayAvatarURL({ dynamic: true })
    );
    embed.setColor("RANDOM");
    embed.setTimestamp();
    message.channel.send({
      embed: embed
    });
  }
};
