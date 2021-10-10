const Discord = require("discord.js"),
  ms = require("ms");
module.exports = {
  name: "ban",
  aliases: ["b", "banish"],
  category: "moderation",
  description: "Ban anyone with one shot whithout knowing anyone xD",
  usage: "ban <@user> <reason>\nban <@user> <time> <reason>",
  args: true,
  P_user: ["BAN_MEMBERS"],
  P_bot: ["BAN_MEMBERS"],
  run: async (client, message, args) => {
    const [user, ...reason] = args;
    var banMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(user) ||
      message.guild.members.cache.find(
        r => r.user.username.toLowerCase() === user.toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        ro => ro.displayName.toLowerCase() === user.toLocaleLowerCase()
      );
    if (!banMember)
      return client.send("**User Is Not In The Guild**", { message });
    if (banMember === message.member)
      return client.send("**You Cannot Ban Yourself**", { message });
    if (!banMember.bannable)
      return client.send("**Cant Kick That User**", { message });
    const duration = reason[0] ? ms(reason[0]) : false;
    if (duration) reason.shift();
    const _reason = reason.join(" ") || "There is no definite reason";
    try {
      const sembed2 = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(
          `**You Have Been Banned From ${message.guild.name}\nfor ${_reason}\nBy ${message.author.tag}`
        )
        .setFooter(message.guild.name, message.guild.iconURL());
      banMember
        .send({ embeds: [sembed2] })
        .then(() => banMember.ban({ days: 7, reason: "" }))
        .catch(() => null);
    } catch {
      message.guild.members.ban(banMember, { days: 7, reason: "" });
    }
    if (_reason) {
      var sembed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(
          `**${banMember.user.username}** has been banned for - ${_reason}`
        );
      message.channel.send({ embeds: [sembed] });
    } else {
      message.guild.members.ban(banMember, { days: 7, reason: _reason });
      var sembed2 = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setDescription(`**${banMember.user.username}** has been banned`);
      message.channel.send({ embeds: [sembed2] });
    }
    if (duration && !isNaN(duration)) {
      setTimeout(async () => {
        message.guild.members
          .unban(banMember, {
            reason: "Duration expired"
          })
          .then(async () => {
            var embed = new Discord.MessageEmbed()
              .setColor("GREEN")
              .setDescription(
                `**${banMember.user.username}** has been Unbanned\nReason: Duration expired.`
              );
            await message.channel.send({ embeds: [embed] });
          });
        client.ops.mod("Ban","Banned", banMember, "Duration expired", message, client);
      }, Number(duration));
    }
    client.ops.mod("Ban", "Banned", banMember, _reason, message, client);
  }
};
