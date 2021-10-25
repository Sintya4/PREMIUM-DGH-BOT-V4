const db = require("quick.db");

module.exports = {
  name: "resetwarns",
  aliases: ["rwarns"],
  usage: "rwarns <@user>",
  args: true,
  category: "moderation",
  P_user: ["ADMINISTRATOR"],
  P_bot: ["VIEW_CHANNELS"],
  description: "Reset warnings of mentioned person",
  run: async (client, message, args) => {
    const user = message.mentions.members.first();

    if (!user) {
      return client.send(
        "Please mention the person whose warning you want to reset",
        { message }
      );
    }

    if (message.author.id === user.id) {
      return client.send("You are not allowed to reset your warnings", {
        message
      });
    }

    if (message.mentions.users.first().bot) {
      return client.send("Bot are not allowed to have warnings", { message });
    }

    let warnings = await client.data.get(
      `warnings_${message.guild.id}_${user.id}`
    );

    if (warnings === null) {
      return client.send(
        `${message.mentions.users.first().username} do not have any warnings`,
        { message }
      );
    }

    client.data.delete(`warnings_${message.guild.id}_${user.id}`);
    client.send(
      `Your all warnings are reseted by ${message.author.username} from ${message.guild.name}`,
      { message, type: true, channel: user.id }
    );
    await client.send(
      `Reseted all warnings of ${message.mentions.users.first().username}`,
      { message }
    );
  }
};
