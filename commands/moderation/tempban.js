const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ms = require("ms");
module.exports = {
  name: "tempban",
  aliases: ["tb", "tban"],
  category: "moderation",
  description: "Time ban a user you want",
  usage: "tempban <@user> <time> <reason>",
  args: true,
  authorPermission: ["BAN_MEMBERS"],
  botPermission: ["BAN_MEMBERS"],
  run: async (client, message, args) => {
    try {
      const bot = client;
      if (!args[0])
        return message.channel.send("**Please Provide A User To Ban!**");

      let banMember =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(
          r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
        ) ||
        message.guild.members.cache.find(
          ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()
        );
      if (!banMember)
        return message.channel.send("**User Is Not In The Guild**");
      if (banMember === message.member)
        return message.channel.send("**You Cannot Ban Yourself**");
      const regex = args.splice(1).join(" ");

      var reason = args.slice(2).join(" ");

      if (!banMember.bannable)
        return message.channel.send("**Cant Kick That User**");
      try {
        message.guild.members.ban(banMember).then(() => {
          setTimeout(function() {
            message.guild.members.unban(banMember.id);
            message.channel.send(
              `<@${banMember.user.username}> has been unbanned after the tempban of ${regex}`
            );
          }, ms(regex));
          return undefined;
        });
        banMember
          .send(
            `**Hello, You Have Been Banned From ${
              message.guild.name
            } for - ${reason || "No Reason"}** - Time ${regex}`
          )
          .catch(() => null);
      } catch {
        message.guild.members.ban(banMember).then(() => {
          setTimeout(function() {
            message.guild.members.unban(banMember.id);
            message.channel.send(
              `<@${banMember.user.username}> has been unbanned after the tempban of ${regex}`
            );
          }, ms(regex));
          return undefined;
        });
      }
      if (reason) {
        var sembed = new MessageEmbed()
          .setColor("GREEN")
          .setDescription(
            `**${banMember.user.username}** has been banned for ${reason} - Time ${regex}`
          );
        message.channel.send(sembed);
      } else {
        var sembed2 = new MessageEmbed()
          .setColor("GREEN")
          .setDescription(
            `**${banMember.user.username}** has been banned - Time ${regex}`
          );
        message.channel.send(sembed2);
      }
      let channel = await client.data.fetch(`modlog_${message.guild.id}`);
      if (channel == null) return;

      if (!channel) return;

      const embed = new MessageEmbed()
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
        .setColor("#ff0000")
        .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
        .setFooter(message.guild.name, message.guild.iconURL())
        .addField("**Moderation**", "tempban")
        .addField("**Banned**", banMember.user.username)
        .addField("**ID**", `${banMember.id}`)
        .addField("**Time (s)**", `${regex}`)
        .addField("**Banned By**", message.author.username)
        .addField("**Reason**", `${reason || "**No Reason**"}`)
        .addField("**Date**", message.createdAt.toLocaleString())
        .setTimestamp();

      var sChannel = message.guild.channels.cache.get(channel);
      if (!sChannel) return;
      sChannel.send(embed);
    } catch (e) {
      return message.channel.send(`**${e.message}**`);
    }
  }
};
