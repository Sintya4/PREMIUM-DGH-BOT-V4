const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");

const db = require("quick.db");
const fs = require("fs");
const Canvas = require("canvas");
const Levels = require("discord-xp");
module.exports = {
  name: "lea",
  category: "misc",
  botPermission: ["MANAGE_GUILD"],
  run: async (client, message, args) => {
       const canvas = Canvas.createCanvas(1772, 633);
    const ctx = canvas.getContext("2d");
    //set the Background to the welcome.png
    const background = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/824570294198599685/853153027425959946/Discord_IAP_KeyVisuals_Header_01.gif"
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#f2f2f2";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
 
       var textString4 =
           ` 
           Welcome
           wel
           wwl wl
           wel 
           `;
    ctx.font = "bold 60px Genta";
    ctx.fillStyle = "#f2f2f2";
    ctx.fillText(textString4, 100, canvas.height / 2 - 180);
    ctx.beginPath();
    ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true); //position of img
    ctx.closePath();
    ctx.clip();
   const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "welcome-image.gif"
    );
  
    message.channel.send(attachment);
    
    
    
    
    
    
    
    
    }}
 /*   const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.
    if (rawLeaderboard.length < 1)
      return message.reply("Nobody's in leaderboard yet.");
    const leaderboard = await Levels.computeLeaderboard(
      client,
      rawLeaderboard,
      true
    ); // We process the leaderboard.
    const lb = leaderboard.map(
      e =>
        `__**${e.position}.**__ ** ${e.username}#${
          e.discriminator
        } » Level: \`${e.level}\` » XP: \`${e.xp.toLocaleString()}\`**`
    ); // We map the outputs.
    const embed = new MessageEmbed()
      .setTitle(`**Leaderboard ${message.guild.name}**`)
      .setColor("#efcb83")
      .setDescription(`${lb.join("\n")}`);
    message.inlineReply(embed);
  }
};
*/