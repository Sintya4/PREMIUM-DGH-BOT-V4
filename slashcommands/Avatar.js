let discord = require("discord.js");
module.exports = {
  name: "avatar",
  description: "View Avatar",
  commandOptions: [
    {
      type: 6,
      name: "user",
      description: "Get User Avatar",
      required: true
    }
  ],
  global: true,
  async execute(client, message, user, args) {
    user.type();
    const target = await client.resolveUser(args[0].value || user.id);
    let embed = new discord.MessageEmbed()
      .setColor("BLUE")
      .setAuthor(`${target.username}'s Avatar`, client.user.displayAvatarURL())
      .setImage(`${target.displayAvatarURL({ dynamic: true })}?size=256`);
    message(null, {
      embed: embed
    });
  }
};
