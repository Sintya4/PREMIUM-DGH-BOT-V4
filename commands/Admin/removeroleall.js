module.exports = {
  name: "removeroleall",
  aliases: ["rrall", "rroleall", "takeroleall"],
  description: "remove a role from all user of the current server",
  category: "admin",
  args: true,
  usage: "removeroleall <roles>",
 botPermission:["MANAGE_ROLES","ADMINISTRATOR"],
  authorPermission:["MANAGE_ROLES","ADMINISTRATOR"],
   run:async (client, message, args) => {
  const role =
      message.guild.roles.cache.find(
        role => role.name === args.join(" ").slice(1)
      ) ||
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(args.join(" ").slice(1));

    if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
      return client.send(
        `${await client.emoji("DGH_error")} My role is not high enough than **${role.name}** role!`, message
      );
    }

    if (message.member.roles.highest.comparePositionTo(role) < 0) {
      return client.send(
        `${await client.emoji("DGH_error")} Your role must be higher than **${role.name}** role!`,message
      );
    }

    if (!role) {
      return client.send(await client.emoji("DGH_info") + "Please provide a valid role");
    }

    message.guild.members.cache.forEach(member => member.roles.remove(role));
    client.send(
      `${await client.emoji("DGH_success")} Successfully Added **${role.name}** to Everyone`, message
    );
  }
};
