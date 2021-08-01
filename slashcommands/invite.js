
const {
  Owner,
  Developer,
  Support,
  Dashboard,
  Server_ID
} = require("../config.js");
module.exports = {
 	name: 'invite',
	description: 'Hey Thx Invite Me :)',
	commandOptions: null,
	global: true,
	 async execute(client, message, user, args) {
     const embed = new client.discord.MessageEmbed()
       .setColor("GREEN")
        .setTitle("🙏Thanks🙏")
        .addField(
          "Invite Me",
         `[Click Me](https://discord.com/api/oauth2/authorize?client_id=849903077690572800&permissions=261929959351&redirect_uri=https%3A%2F%2Fdgh-bot.ddns.net%2Flogin&response_type=code&scope=applications.commands%20bot%20identify%20guilds%20guilds.join)`)
         .addField(
          "Vote",
          `[Click Me](https://discord4bots.ddns.net/bot/849903077690572800/)`
        )
        .addField("Support Server", `[Click Me](${Support})`)
        .addField("Dashboard", `[Click Me](https://dgh-bot.ddns.net)`)
        .addField("Owner", `<@${Owner}>`)
        .addField("Developer", `<@${Developer}>`)
        .setImage(
          `https://discordapp.com/api/guilds/${Server_ID}/embed.png?style=banner3`
        );
     message(null,{
        embed: embed,
        flags: 64
				}
		)
	},
};
