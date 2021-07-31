let discord = require("discord.js");
module.exports = {
  name: "avatar",
  description: "View Avatar",
  commandOptions: null,
  global: true,
  async execute(client, message, user, args) {
    let embed = new discord.MessageEmbed()
      .setColor("BLUE")
      .setAuthor(`${user.user.username}'s Avatar`, client.user.displayAvatarURL())
      .setImage(`${user.user.displayAvatarURL({ dynamic: true })}?size=256`);
    message(null, {
      embed: embed,
    })
   }
};
