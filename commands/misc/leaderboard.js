const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const Canvas = require("canvas");
const fs = require("fs");
const Levels = require("discord-xp");
module.exports = {
  name: "leaderboard",
  aliases: ["lb"],
  category: "misc",
  botPermission: ["MANAGE_GUILD"],
  run: async (client, message, args) => {
    const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.
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
    const textString4 = leaderboard.map(
      e =>
        `#${e.position}. ${e.username}#${
          e.discriminator
        } » XP: ${e.xp.toLocaleString()}`
    );
    const canvas = Canvas.createCanvas(1400, 633);
    const ctx = canvas.getContext("2d");
    //set the Background to the welcome.png
    const background = await Canvas.loadImage(
      "https://cdn.discordapp.com/attachments/824570294198599685/853153027425959946/Discord_IAP_KeyVisuals_Header_01.gif"
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#f2f2f2";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    ctx.font = "bold 40px Genta";
    ctx.fillStyle = "#f2f2f2";
    ctx.fillText(textString4.join("\n"), 100, 100);
    ctx.beginPath();
    ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true); //position of img
    ctx.closePath();
    ctx.clip()
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      `Leaderboard.png`
    );
    const embed = new MessageEmbed()
      .setTitle(`**Leaderboard ${message.guild.name}**`)
      .setColor("#efcb83")
      .setDescription(`${lb.join("\n")}\n\n**IMAGE »**`)
      .setImage(`attachment://Leaderboard.png`)
      .attachFiles(attachment);
   message.inlineReply(embed);
  }
};


