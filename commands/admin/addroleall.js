module.exports = {
  name: "addroleall",
  aliases: ["arall", "aroleall", "giveroleall"],
  description: "Add a role to all user of the current server",
  category: "admin",
  args: true,
  usage: "addroleall <Roles>",
  botPermission: ["MANAGE_ROLES"],
  authorPermission: ["MANAGE_ROLES"],
  run: (client, message, args) => {
    if (!message.guild.me.hasPermission("MANAGE_ROLES"))
      return message.channel.send(
        "I don't have enough permission to do that !"
      );
    const role =
      message.guild.roles.cache.find(
        role => role.name === args.join(" ").slice(1)
      ) ||
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(args.join(" ").slice(1));

    if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
      return message.channel.send(
        `My role is not high enough than **${role.name}** role!`
      );
    }

    if (message.member.roles.highest.comparePositionTo(role) < 0) {
      return message.channel.send(
        `Your role must be higher than **${role.name}** role!`
      );
    }

    if (!role) {
      return message.channel.send("Please provide a valid role");
    }

    message.guild.members.cache.forEach(member => member.roles.add(role));

    message.channel.send(
      `${client.emotes.success} Successfully Added **${role.name}** to Everyone`
    );
  }
};
