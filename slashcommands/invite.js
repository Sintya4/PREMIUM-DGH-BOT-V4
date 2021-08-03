
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
<<<<<<< HEAD
   async execute(client, message, user, args){
   const embed = new client.discord.MessageEmbed()
=======
	 async execute(client, message, user, args) {
     const embed = new client.discord.MessageEmbed()
>>>>>>> 40a0d60820f21ff6e88c4b0d57ecc93cfe16cae2
       .setColor("GREEN")
        .setTitle("🙏Thanks🙏")
        .addField(
          "Invite Me",
         `[Click Me](https://discord.com/api/oauth2/authorize?client_id=849903077690572800&permissions=261929959351&redirect_uri=https%3A%2F%2Fdgh-bot.ddns.net%2Flogin&response_type=code&scope=applications.commands%20bot%20identify%20guilds%20guilds.join)`)
         .addField(
          "Vote",
          `[Click Me](https://discord4bots.ddns.net/bot/849903077690572800/)`
        )
<<<<<<< HEAD
=======
        .addField("Support Server", `[Click Me](${Support})`)
        .addField("Dashboard", `[Click Me](https://dgh-bot.ddns.net)`)
>>>>>>> 40a0d60820f21ff6e88c4b0d57ecc93cfe16cae2
        .addField("Owner", `<@${Owner}>`)
        .addField("Developer", `<@${Developer}>`)
        .setImage(
          `https://discordapp.com/api/guilds/${Server_ID}/embed.png?style=banner3`
        );
<<<<<<< HEAD
      
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
=======
     message(null,{
        embed: embed,
        flags: 64
				}
		)
	},
};
>>>>>>> 40a0d60820f21ff6e88c4b0d57ecc93cfe16cae2
