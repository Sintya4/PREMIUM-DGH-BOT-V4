const path = require("path");
const Canvas = require("canvas");
const Discord = require("discord.js");
module.exports = {
  name: "lovecalc",
  category: "fun",
  description: "",
  usage: "",
  aliases: ["lc"],

  run: async (client, message, args) => {
    let member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.guild.members.cache.find(
        r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName === args[0].toLocaleLowerCase()
      );
    if (!member) return message.channel.send("**Base User Not Found!**");
    let member2 =
      message.mentions.members.first(2)[1] ||
      message.guild.members.cache.get(args[1]) ||
      message.guild.members.cache.find(
        r => r.user.username.toLowerCase() === args[1].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName === args[1].toLocaleLowerCase()
      );
    if (!member2) return message.channel.send("**Overlay User Not Found!**");

    const wallpapers = [
      "https://cdn.discordapp.com/attachments/821904810772660255/856852387330261022/20210622_190502.png", // You can add as many as you want
      "https://cdn.discordapp.com/attachments/821904810772660255/856853479896383498/20210622_190752.png",
      "https://cdn.discordapp.com/attachments/821904810772660255/856853480101380097/20210622_190840.png",
      "https://cdn.discordapp.com/attachments/821904810772660255/856853480400355338/20210622_190926.png"
    ];
    // Here we will create a random number. Math.random only creates a randomly generated number between 0 and 1.
    const response = wallpapers[Math.floor(Math.random() * wallpapers.length)];
    const i = Math.floor(Math.random() * 100) + 1;

    let f = function(e) {
      if (e > 100) {
        return "💘";
      } else if (e > 80) {
        return "💞";
      } else if (e > 60) {
        return "💝";
      } else if (e > 50) {
        return "💕";
      } else if (e > 40) {
        return "💓";
      } else if (e > 20) {
        return "❤️";
      } else {
        return "💔";
      }
    };
    const canvas = Canvas.createCanvas(1692, 553);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage(response);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#f2f2f2";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ format: "jpg" })
    );
    ctx.drawImage(avatar, 1, canvas.height / 2 - 300, 570, 570);
    const avatar2 = await Canvas.loadImage(
      member2.user.displayAvatarURL({ format: "jpg" })
    );
    ctx.drawImage(avatar2, 1130, canvas.height / 2 - 299, 570, 570);
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "Lovecalc.png"
    );
    message.channel.send(
      `${member.user.username} + ${member2.user.username} = ${i} of Love ${f(i)}
`,
      attachment
    );
  }
};
