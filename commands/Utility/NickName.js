const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "setnick",
  aliases: ["sn", "nick"],
  category: "moderation",
  description: "Sets Or Changes Nickname Of An User",
  usage: "setnick [mention | name | nickname | ID] <{tag}/nickname>",
  botPermission: ["CHANGE_NICKNAME"],
  args: true,
  category: "utility",
  run: async (client, message, args) => {
    const bot = client;
    message.delete()
    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      message.member;
    if (!member) return message.channel.send("**Please Enter A Username!**");

    if (
      member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >=
      0
    )
      return message.channel.send(
        "**Cannot Set or Change Nickname Of This User!**"
      );

    if (!args[1]) return message.channel.send("**Please Enter A Nickname**");

    let nick = args
      .slice(1)
      .join(" ")
      .replace(`{tag}`, member.user.username);

    try {
      member.setNickname(nick);
      const embed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(
          `**Changed Nickname of ${member.displayName} to ${nick}**`
        );
      message.channel.send(embed);
    } catch {
      return message.channel.send("**Missing Permissions - [CHANGE_NICKNAME]");
    }

    let channel = db.fetch(`modlog_${message.guild.id}`);
    if (!channel) return;

    const sembed = new MessageEmbed()
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
      .setColor("#ff0000")
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setFooter(message.guild.name, message.guild.iconURL())
      .addField("**Moderation**", "setnick")
      .addField("**Nick Changed Of**", member.user.username)
      .addField("**Nick Changed By**", message.author.username)
      .addField("**Nick Changed To**", nick)
      .addField("**Date**", message.createdAt.toLocaleString())
      .setTimestamp();

    var sChannel = message.guild.channels.cache.get(channel);
    if (!sChannel) return;
    sChannel.send(sembed);
  }
};
