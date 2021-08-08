let discord = require("discord.js");
module.exports = {
  name: "dashboard",
  description: "My Dashboard",
  commandOptions: null,
  global: true,
  async execute(client, message, user, args){
 await user.type()
  user.perms(["ADMINISTRATOR"])
  user.botperms(["ADMINISTRATOR"])
    let embed = new client.discord.MessageEmbed()
      .setTitle("My Dashboard")
      .setColor("RANDOM")
      .setDescription(
        `[Your Administrator](https://dgh-bot.ddns.net/server/${user.guild.id})`
      );
    message(null, {
      embed: embed,
      flags: 64
    });
  }
};
