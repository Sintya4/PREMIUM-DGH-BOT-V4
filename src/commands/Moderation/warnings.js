const db = require("quick.db");

module.exports = {
  name: "warnings",
  description: "Get the warnings of yours or mentioned person",
  category: "moderation",
  usage: "warnings <@user>",
  P_user: ["ADMINISTRATOR"],
  P_bot: ["VIEW_CHANNELS"],
  arga: true,
  run: async(client, message, args) => {
    const user = message.mentions.members.first() || message.author;
    let warnings = await client.data.get(`warnings_${message.guild.id}_${user.id}`);
    if (warnings === null) warnings = 0;
    client.send(`${user} have **${warnings}** warning(s)`,{message});
  }
};
