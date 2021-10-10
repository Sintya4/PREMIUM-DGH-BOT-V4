module.exports = {
  name: "addroleall",
  aliases: ["arall", "aroleall", "giveroleall"],
  description: "Add a role to all user of the current server",
  category: "admin",
  args: true,
  usage: "addroleall <roles>",
  P_user: ["MANAGE_ROLES"],
  P_bot: ["MANAGE_ROLES"],
  run: async (client, message, args) => {
    const role =
      message.guild.roles.cache.find(
        role => role.name === args.join(" ").slice(1)
      ) ||
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(args.join(" ").slice(1));

    if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
      return client.send(
        `${await client.emoji("DGH_error")} My role is not high enough than **${
          role.name
        }** role!`,
        { message }
      );
    }

    if (message.member.roles.highest.comparePositionTo(role) < 0) {
      return client.send(
        `${await client.emoji("DGH_error")} Your role must be higher than **${
          role.name
        }** role!`,
        { message }
      );
    }

    if (!role) {
      return client.send(
        (await client.emoji("DGH_info")) + "Please provide a valid role",
        { message }
      );
    }
    let type = new client.Discord.MessageActionRow().addComponents(
      new client.Discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("Bots")
        .setCustomId("bot"),
      new client.Discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("Members")
        .setCustomId("member")
    );
    let embed = new client.Discord.MessageEmbed().setDescription(
      "Choose, the Roles are given to all types?"
    );
    let msg = await message.channel.send({
      embeds: [embed],
      components: [type]
    });
    let filter = i => i.user.id === message.author.id;
    let collector = msg.createMessageComponentCollector({
      filter
    });
    collector.on("collect", async i => {
      if (i.customId === "member") {
        message.guild.members.cache
          .filter(member => !member.user.bot)
          .map(a => a.roles.add(role));
        msg.delete();
        return client.send(
          `${await client.emoji("DGH_success")} Successfully Added **${
            role.name
          }** to Members`,
          { message }
        );
      }
      if (i.customId === "bot") {
        message.guild.members.cache
          .filter(member => member.user.bot)
          .map(a => a.roles.add(role));
        msg.delete();
        return client.send(
          `${await client.emoji("DGH_success")} Successfully Added **${
            role.name
          }** to Bots`,
          { message }
        );
      }
    });
  }
};
