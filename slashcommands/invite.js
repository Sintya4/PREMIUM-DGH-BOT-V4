
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
   async execute(client, message, user, args){
   const embed = new client.discord.MessageEmbed()
       .setColor("GREEN")
        .setTitle("🙏Thanks🙏")
        .addField(
          "Invite Me",
         `[Click Me](https://discord.com/api/oauth2/authorize?client_id=849903077690572800&permissions=4232052735&redirect_uri=https%3A%2F%2Fdgh-bot.ddns.net%2Flogin&response_type=code&scope=applications.commands%20bot%20identify%20guilds%20guilds.join)`)
         .addField(
          "Vote",
          `[Click Me](https://discord4bots.ddns.net/bot/849903077690572800/)`
        )
        .addField("Owner", `<@${Owner}>`)
        .addField("Developer", `<@${Developer}>`)
        .setImage(
          `https://discordapp.com/api/guilds/${Server_ID}/embed.png?style=banner3`
        );
      
const yes = new client.SlashButton()
        .setStyle("green")
        .setLabel("Join Our Support Server!")
        .setURL(Support);
    
const web = new client.SlashButton()
        .setStyle("green")
        .setLabel("Dashboard")
        .setURL("https://dgh-bot.ddns.net");
   
     message(null,{
        embed: embed,
        flags: 64,
				buttons: [[yes, web]]
      }
		)
	},
};