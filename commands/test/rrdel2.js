const Discord = require("discord.js");
const emojis = require("../../emoji/emoji.js");

module.exports = {
  name: "rrdel2",
  args: true,
  category: "reactio",
  usage:
    "rrdel [channel mention | channelID] [messageID] [role mention | roleID] [emoji]",
  bot: [
    "VIEW_CHANNEL",
    "EMBED_LINKS",
    "ATTACH_FILES",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "MANAGE_ROLES"
  ],
  author:
    "VIEW_CHANNEL" ||
    "EMBED_LINKS" ||
    "ATTACH_FILES" ||
    "MANAGE_CHANNELS" ||
    "MANAGE_GUILD" ||
    "MANAGE_ROLES",
  run: async (client, message, args) => {
    if (!args[0])
      return message.channel.send(
        `:x: | **Specify The ChannelID or mention The Channel**`
      );
    if (!args[1])
      return message.channel.send(`:x: | **Specify The messageID**`);
    if (!args[2])
      return message.channel.send(
        `:x: | **Specify The roleID or mention The Role**`
      );
    if (!args[3]) return message.channel.send(`:x: | **Specify The emoji**`);

    let channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]);
    if (!channel) return message.channel.send(`:x: | **Channel Not Found**`);
    let msg = await channel.messages.fetch(args[1]);
    if (!msg) return message.channel.send(`:x: | **Message Not Found**`);
    let role =
      message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
    if (!role) return message.channel.send(`:x: | **Role Not Found**`);
    let emoji = await Discord.Util.parseEmoji(args[3]);
    if (!emoji && !emojis.includes(args[3]))
      return message.channel.send(":x: | **Specify a valid Emoji**");

    let pog = client.db.get(`reactions_${message.guild.id}_${msg.id}`);

    if (pog) {
      let data = pog.find(x => x.emoji === args[3]);
      let embed = new Discord.MessageEmbed();
      embed.setAuthor(message.guild.name, message.guild.iconURL());
      embed.setTitle("Error");
      embed.setDescription(`:x: | **Reaction Roles not Found!**`);
      embed.setFooter(
        message.author.tag + " | made by 𝙁𝘾 么 Glitch Editz",
        message.author.displayAvatarURL({ dynamic: true })
      );
      embed.setTimestamp();
      embed.setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
      if (!data)
        return message.channel.send({
          embed: embed
        });
      let index = pog.indexOf(data);
      delete pog[index];
      var filter = pog.filter(x => {
        return x !== null && x;
      });
      client.db.set(`reactions_${message.guild.id}_${msg.id}`, filter);
      let embed2 = new Discord.MessageEmbed();
      embed2.setAuthor(message.author.tag, message.author.displayAvatarURL());
      embed2.setDescription(`**The Reaction Role has been deleted!** `);
      embed2.setFooter(
        message.guild.name + " | made by 𝙁𝘾 么 Glitch Editz",
        message.guild.iconURL()
      );
      embed2.setColor("GREEN");
      embed2.setTimestamp();
      return message.channel.send({
        embed: embed2
      });
    } else {
      let embed = new Discord.MessageEmbed();
      embed.setAuthor(message.guild.name, message.guild.iconURL());
      embed.setTitle("Error");
      embed.setDescription(`:x: | **Reaction Roles not Found!**`);
      embed.setFooter(
        message.author.tag + " | made by 𝙁𝘾 么 Glitch Editz",
        message.author.displayAvatarURL({ dynamic: true })
      );
      embed.setTimestamp();
      embed.setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
      return message.channel.send({
        embed: embed
      });
    }
  }
};
