const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
  name: "mute",
  description: "Mute anyone who break rules",
  category: "moderation",
  args: true,
  usage: "mute <user> <reason>\nmute <user> <time> <reason>",
  P_user: ["MANAGE_ROLES", "MANAGE_GUILD"],
  P_bot: ["MANAGE_ROLES", "MANAGE_GUILD"],
  run: async (client, message, args) => {
    const [user, ...reason] = args;
    try {
      var mutee =
        message.mentions.members.first() ||
        message.guild.members.cache.get(user) ||
        message.guild.members.cache.find(
          r => r.user.username.toLowerCase() === user.toLocaleLowerCase()
        ) ||
        message.guild.members.cache.find(
          ro => ro.displayName.toLowerCase() === user.toLocaleLowerCase()
        );
      if (!mutee)
        return client.send("**Please Enter A Valid User To Be Muted!**", {
          message
        });

      if (mutee === message.member)
        return client.send("**You Cannot Mute Yourself!**", { message });
      if (
        mutee.roles.highest.comparePositionTo(message.guild.me.roles.highest) >=
        0
      )
        return client.send("**Cannot Mute This User!**", { message });

      const duration = reason[0] ? ms(reason[0]) : false;
      if (duration) reason.shift();
      const _reason = reason.join(" ") || "There is no definite reason";

      if (mutee.user.bot)
        return client.send("**Cannot Mute Bots!**", { message });
      const userRoles = mutee.roles.cache
        .filter(r => r.id !== message.guild.id)
        .map(r => r.id);

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

      if (!muterole) {
        try {
          muterole = await message.guild.roles.create({
            data: {
              name: client.config.mod.muted_defauld,
              color: "#514f48",
              permissions: []
            }
          });
          message.guild.channels.cache.map(async channel => {
            await channel.permissionOverwrites.create(muterole, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false,
              SPEAK: false,
              CONNECT: false
            });
          });
        } catch (e) {
          console.log(e);
        }
      }
      if (mutee.roles.cache.has(muterole.id))
        return client.send("**User Is Already Muted!**", { message });

      client.data.set(`muteeid_${message.guild.id}_${mutee.id}`, userRoles);
      try {
        const sembed2 = new MessageEmbed()
          .setColor("RED")
          .setDescription(
            `**You Have Been Muted From ${
              message.guild.name
            }\nfor - ${_reason}\nBy ${message.author.tag}${
              duration ? "\nTime - " + duration : ""
            }**`
          )
          .setFooter(message.guild.name, message.guild.iconURL());
        mutee.roles.set([muterole.id]).then(() => {
          mutee.send({ embeds: [sembed2] }).catch(() => null);
        });
      } catch {
        mutee.roles.set([muterole.id]);
      }
      if (_reason) {
        const sembed = new MessageEmbed()
          .setColor("GREEN")
          .setAuthor(message.guild.name, message.guild.iconURL())
          .setDescription(
            `${mutee.user.username} was successfully muted for ${_reason}`
          );
        message.channel.send({ embeds: [sembed] });
      } else {
        const sembed2 = new MessageEmbed()
          .setColor("GREEN")
          .setDescription(`${mutee.user.username} was successfully muted`);
        message.channel.send({ embeds: [sembed2] });
      }
      if (duration && !isNaN(duration)) {
        setTimeout(async () => {
          let ss = await client.data.get(
            `muteeid_${message.guild.id}_${mutee.id}`
          );
          mutee.roles.remove(muterole.id).then(async () => {
            var embed = new MessageEmbed()
              .setColor("GREEN")
              .setDescription(
                `**${mutee.user.username}** has been Unmute\nReason: Duration expired.`
              );
            await message.channel.send({ embeds: [embed] });
          });
          mutee.roles.add(ss);
        }, Number(duration));
      }
      client.ops.mod("Mute", "Muted", mutee, _reason, message, client);
    } catch {
      return;
    }
  }
};
