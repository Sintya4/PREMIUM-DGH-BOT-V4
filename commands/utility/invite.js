const Discord = require("discord.js");
const db = require("quick.db");
const { Owner, Developer, Support, Dashboard, Server_ID } = require("../../config.js");
module.exports = {
  name: "invite",
  aliases: ["invitelink","vote"],
  category: "utility",
  description: "Give You My Invite Link, Etc!",
  usage: "Invite",
  guildOnly: true,
  cooldown: 5,
  run: async (client, message, args) => {
    message.delete();
    const Invite = `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=9&redirect_uri=https%3A%2F%2Fdiscord.gg%2FrZ2Qa5wWFV`;
    let image = `https://discordapp.com/api/guilds/${Server_ID}/embed.png?style=banner3`;
    const Embed = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setTitle("🙏Thanks🙏")
      .addField("Invite Me", `[Click Me](${Invite})`)
      .addField("Vote",`[Click Me](https://infinitybotlist.com/bots/790937024941129759/)`)
      .addField("Support Server", `[Click Me](${Support})`)
      .addField("Dashboard", `[Click Me](${Dashboard})`)
      .addField("Owner", `<@${Owner}>`)
      .addField("Developer", `<@${Developer}>`)
      .setImage(image);
    return message.channel
      .send(Embed)
      .catch(() => message.channel.send("Invite Link - " + Invite))
      .then(m => m.delete({ timeout: 44000 }).catch(e => {}));
  }
};
