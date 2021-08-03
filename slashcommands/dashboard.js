let discord = require("discord.js");
module.exports = {
  name: "dashboard",
  description: "My Dashboard",
  commandOptions: null,
  global: true,
  async execute(client, message, user, args){
  user.perms(["ADMINISTRATOR"])
  user.botperms(["ADMINISTRATOR"])
  user.type()
    let embed = new client.discord.MessageEmbed()
      .setTitle("My Dashboard")
      .setColor("RANDOM")
      .setDescription(
        `[Your Administrator](https://dgh-bot.ddns.net/${user.guild.id})`
      );
    message(null, {
      embed: embed,
      flags: 64
    });
  }
};
