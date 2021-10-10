const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "unmute",
  category: "moderation",
  args: true,
  usage: "unmute <user>",
  P_user: ["MANAGE_ROLES"],
  P_bot: ["MANAGE_ROLES"],
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
    if (!mutee)
      return client.send("**Please Enter A Valid User!**", { message });

    let reason = args.slice(1).join(" ");

    let muterole;
    let dbmute = await client.data.fetch(`muterole_${message.guild.id}`);
    let muteerole = message.guild.roles.cache.find(
      r => r.name === client.config.mod.muted_defauld
    );

    if (!message.guild.roles.cache.has(dbmute)) {
      muterole = muteerole;
    } else {
      muterole = message.guild.roles.cache.get(dbmute);
    }

    let rolefetched = await client.data.fetch(
      `muteeid_${message.guild.id}_${mutee.id}`
    );
    if (!rolefetched) return;

    if (!muterole)
      return client.send("**There Is No Mute Role To Remove!**", { message });
    if (!mutee.roles.cache.has(muterole.id))
      return client.send("**User is not Muted!**", { message });
    try {
      mutee.roles.remove(muterole.id).then(() => {
        mutee
          .send({
            embeds: [
              new MessageEmbed().setDescription(
                `**Hello, You Have Been Unmuted In ${
                  message.guild.name
                } for ${reason || "No Reason"}**`
              )
            ]
          })
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
    message.channel.send({ embeds: [sembed] });
    client.ops.mod("UnMute", "UnMute", mutee, reason, message, client);
  }
};
