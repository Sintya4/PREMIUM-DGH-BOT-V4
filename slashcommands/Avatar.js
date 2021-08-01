let discord = require("discord.js");
module.exports = {
  name: "avatar",
  description: "View Avatar",
  commandOptions: [
    {
      "type": 6,
      "name": "user",
      "description": "Get User Avatar",
      "required": false
    }
  ]
,
  global: true,
  async execute(client, message, user, args) {
    const target = (await client.resolveUser(args[0].value)) || user.user;
    let embed = new discord.MessageEmbed()
      .setColor("BLUE")
      .setAuthor(`${target.username}'s Avatar`, client.user.displayAvatarURL())
      .setImage(`${target.displayAvatarURL({ dynamic: true })}?size=256`);
    message(null, {
      embed: embed
    });
  }
};
