let discord = require("discord.js");
module.exports = {
  name: "avatar",
  description: "View Avatar",
  commandOptions: [
    {
<<<<<<< HEAD
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
=======
      "type": 6,
      "name": "user",
      "description": "Get User Avatar",
      "required": false
    }
  ]
,
  global: true,
  async execute(client, message, user, args) {
    const target = (await client.resolveUser(args[0].value || user.id));
>>>>>>> 40a0d60820f21ff6e88c4b0d57ecc93cfe16cae2
    let embed = new discord.MessageEmbed()
      .setColor("BLUE")
      .setAuthor(`${target.username}'s Avatar`, client.user.displayAvatarURL())
      .setImage(`${target.displayAvatarURL({ dynamic: true })}?size=256`);
    message(null, {
      embed: embed
    });
  }
};
