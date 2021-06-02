const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "unmute",
  category: "moderation",
  args: true,
  usage: "unmute <user>",
  botPermission: ["MANAGE_GUILD"],
  authorPermission: ["MANAGE_GUILD"],
  run: async (client, message, args) => {
    let mutee =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()
      );
    if (!mutee) return message.channel.send("**Please Enter A Valid User!**");

    let reason = args.slice(1).join(" ");

    let muterole;
    let dbmute = await client.data.fetch(`muterole_${message.guild.id}`);
    let muteerole = message.guild.roles.cache.find(r => r.name === "Muted");

    if (!message.guild.roles.cache.has(dbmute)) {
      muterole = muteerole;
    } else {
      muterole = message.guild.roles.cache.get(dbmute);
    }

    let rolefetched = await client.data.fetch(`muteeid_${message.guild.id}_${mutee.id}`);
    if (!rolefetched) return;

    if (!muterole)
      return message.channel.send("**There Is No Mute Role To Remove!**");
    if (!mutee.roles.cache.has(muterole.id))
      return message.channel.send("**User is not Muted!**");
    try {
      mutee.roles.remove(muterole.id).then(() => {
        mutee
          .send(
            `**Hello, You Have Been Unmuted In ${
              message.guild.name
            } for ${reason || "No Reason"}**`
          )
          .catch(() => null);
        let roleadds = rolefetched;
        if (!roleadds) return;
        mutee.roles.add(roleadds);
      });
    } catch {
      let roleadds2 = rolefetched;
      if (!roleadds2) return;
      mutee.roles.add(roleadds2);
    }
    const sembed = new MessageEmbed()
      .setColor("GREEN")
      .setDescription(`${mutee.user.username} was successfully unmuted.`);
    message.channel.send(sembed);

    let channel = await client.data.fetch(`modlog_${message.guild.id}`);
    if (!channel) return;

    let embed = new MessageEmbed()
      .setColor("RED")
      .setThumbnail(mutee.user.displayAvatarURL({ dynamic: true }))
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
      .addField("**Moderation**", "unmute")
      .addField("**Unmuted**", mutee.user.username)
      .addField("**Moderator**", message.author.username)
      .addField("**Reason**", `${reason || "**No Reason**"}`)
      .addField("**Date**", message.createdAt.toLocaleString())
      .setFooter(message.member.displayName, message.author.displayAvatarURL())
      .setTimestamp();

    var sChannel = message.guild.channels.cache.get(channel);
    if (!sChannel) return;
    sChannel.send(embed);
  }
};
