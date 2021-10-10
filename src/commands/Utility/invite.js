const Discord = require("discord.js");

module.exports = {
  name: "invite",
  category: "utility",
  description: "Give You My Invite Link, Etc!",
  run: async (client, message, args) => {
    const embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTitle("🙏Thanks🙏")
      .addField("Invite Me", `[Click Me](${client.config.bot.invite})`)
      .addField(
        "Like Me",
        `[Click Me](https://dblist.ddns.net/bots/849903077690572800/)`
      )
      .addField("Support Server", `[Click Me](${client.config.server.invite})`)
      .setImage(
        `https://discordapp.com/api/guilds/${client.config.server.id}/embed.png?style=banner3`
      );
    message.channel.send({ embeds: [embed] });
  }
};
