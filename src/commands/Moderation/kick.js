const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "kick",
  category: "moderation",
  description: "Kick anyone with one shot xD",
  usage: "kick <@user> <reason>",
  P_user: ["KICK_MEMBERS"],
  P_bot: ["KICK_MEMBERS"],
  args: true,
  run: async (client, message, args) => {
    message.delete();

    var kickMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()
      );
    if (!kickMember)
      return client.send("**User Is Not In The Guild!**", { message });
    if (kickMember.id === message.member.id)
      return client.send("**You Cannot Kick Yourself!**", { message });
    if (!kickMember.kickable)
      return client.send("**Cannot Kick This User!**", { message });
    var reason = args.slice(1).join(" ");
    try {
      const sembed2 = new MessageEmbed()
        .setColor("RED")
        .setDescription(
          `**You Have Been Kicked From ${message.guild.name}${
            reason ? "\nfor - " + reason : ""
          }\nBy ${message.author.tag}**`
        )
        .setFooter(message.guild.name, message.guild.iconURL());
      kickMember
        .send({ embeds: [sembed2] })
        .then(() => kickMember.kick({ reason: reason }))
        .catch(() => null);
    } catch {
      kickMember.kick({ reason: reason });
    }
    if (reason) {
      var sembed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(
          `**${kickMember.user.username}** has been kicked ${
            reason ? "for - " + reason : ""
          }`
        );
      message.channel.send({ embeds: [sembed] });
    } else {
      var sembed2 = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`**${kickMember.user.username}** has been kicked`);
      message.channel.send({ embeds: [sembed2] });
    }
    client.ops.mod("Kick", "Kick", kickMember, reason, message, client);
  }
};
