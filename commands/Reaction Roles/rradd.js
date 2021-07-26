const Discord = require("discord.js");
const emojis = require("../../emoji/emoji.js");

module.exports = {
  name: "rradd",
  args: true,
  category: "reaction",
  botPermission: [
    "VIEW_CHANNEL",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "MANAGE_ROLES"
  ],
  authorPermission: [
    "VIEW_CHANNEL",
    "MANAGE_CHANNELS",
    "MANAGE_GUILD",
    "MANAGE_ROLES"
  ],
  premium: false,
  usage:
    "rradd [channel mention | channelID] [messageID] [role mention | roleID] [emoji]\nTutorial: https://twitter.com/CODEGLITCH2/status/1393839312274223104?s=19",
  run: async (client, message, args) => {
    if (!args[0])
      return message.channel.send(
        `:x: | **Specify The ChannelID or mention The Channel**`
      ).then(m=>m.delete({timeout:10000}).catch(e=>{}));
    if (!args[1])
      return message.channel.send(`:x: | **Specify The messageID**`).then(m=>m.delete({timeout:10000}).catch(e=>{}));
    if (!args[2])
      return message.channel.send(
        `:x: | **Specify The roleID or mention The Role**`
      ).then(m=>m.delete({timeout:10000}).catch(e=>{}));
    if (!args[3]) return message.channel.send(`:x: | **Specify The emoji**`).then(m=>m.delete({timeout:10000}).catch(e=>{}));

    let channel =
      message.mentions.channels.first() ||
      message.guild.channels.cache.get(args[0]);
    if (!channel) return message.channel.send(`:x: | **Channel Not Found**`).then(m=>m.delete({timeout:10000}).catch(e=>{}));
    let msg = await channel.messages.fetch(args[1]);
    if (!msg) return message.channel.send(`:x: | **Message Not Found**`).then(m=>m.delete({timeout:10000}).catch(e=>{}));
    let role =
      message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
    if (!role) return message.channel.send(`:x: | **Role Not Found**`);
    let emoji = await Discord.Util.parseEmoji(args[3]);
    if (!emoji && !emojis.includes(args[3]))
      return message.channel.send(":x: | **Specify a valid Emoji**");
    if (emoji && !emojis.includes(args[3])) {
      let checking = await client.emojis.cache.find(x => x.id === emoji.id);
      if (!checking) return message.channel.send(`:x: | **Invalid Emoji**`);
    }
    let pog = await client.data.get(`reactions_${message.guild.id}_${msg.id}`);
    if (pog && pog.find(x => x.emoji == args[3])) {
      let embed = new Discord.MessageEmbed();
      embed.setAuthor(message.guild.name, message.guild.iconURL());
      embed.setTitle("Error");
      embed.setDescription(
        `:x: | **The emoji is already being used in The message for reaction Roles!**`
      );
      embed.setFooter(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      );
      embed.setTimestamp();
      embed.setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
      return message.channel.send({
        embed: embed
      }).then(m=>m.delete({timeout:10000}).catch(e=>{}));
    }
    await msg.react(args[3]);
    client.data.push(`reactions_${message.guild.id}_${msg.id}`, {
      emoji: args[3],
      roleId: role.id
    });

    let embed = new Discord.MessageEmbed();
    embed.setAuthor(message.guild.name, message.guild.iconURL());
    embed.setTitle("Success");
    embed.setThumbnail(message.guild.iconURL());
    embed.setDescription(`**The Reaction Role has been Set up**`);
    embed.setFooter(
      message.author.tag,
      message.author.displayAvatarURL({ dynamic: true })
    );
    embed.setColor("RANDOM");
    embed.setTimestamp();
    message.channel.send({
      embed: embed
    }).then(m=>m.delete({timeout:10000}).catch(e=>{}));
  }
};
