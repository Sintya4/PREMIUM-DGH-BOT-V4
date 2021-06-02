const db = require ("quick.db")
module.exports = {
  name: "setup",
  usage: `setup <category_id>`,
  category: "ticket",
  description: "Category ticket setup",
  args: true,
  cooldown: 4,
  permissions: "MANAGE_CHANNELS",
  bot: ["SEND_MESSAGES", "MANAGE_CHANNELS", "VIEW_CHANNEL"],
  run: async (client, message, args) => {
    //code
    const channel = message.guild.channels.cache.get(args[0]);
    if (!channel || channel.type !== "category")
      return message.channel.send(
        `Give Id Cetegory!. Invalid channel category... Exiting setup...Try again...`
      );
    if (
      !channel
        .permissionsFor(message.guild.me)
        .has(["SEND_MESSAGES", "MANAGE_CHANNELS", "VIEW_CHANNEL"])
    )
      return message.channel.send(
        "Unicron doesn't have permissions to that channel, please give Unicron access to that channel for this to work and try again...Exiting Setup"
      );
    db.set(`ticket_${message.guild.id}`, channel);
    return message.channel.send(
      `Ticket System Category has been set to \`${channel.name}\`.`
    );
  }
};
