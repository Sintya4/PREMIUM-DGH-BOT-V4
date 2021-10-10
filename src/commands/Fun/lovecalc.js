const Canvas = require("canvas");
const Discord = require("discord.js");
module.exports = {
  name: "lovecalc",
  category: "fun",
  aliases: ["lc"],
  P_bot: ["ATTACH_FILES"],
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
    if (!member) return client.send("**Base User Not Found!**", {message});
    let member2 =
      message.mentions.members.first(2)[1] ||
      message.guild.members.cache.get(args[1]) ||
      message.guild.members.cache.find(
        r => r.user.username.toLowerCase() === args[1].toLocaleLowerCase()
      ) ||
      message.guild.members.cache.find(
        r => r.displayName === args[1].toLocaleLowerCase()
      );
    if (!member2) return client.send("**Overlay User Not Found!**", {message});

    const wallpapers = [
      "https://cdn.discordapp.com/attachments/821904810772660255/856852387330261022/20210622_190502.png", // You can add as many as you want
      "https://cdn.discordapp.com/attachments/821904810772660255/856853479896383498/20210622_190752.png",
      "https://cdn.discordapp.com/attachments/821904810772660255/856853480101380097/20210622_190840.png",
      "https://cdn.discordapp.com/attachments/821904810772660255/856853480400355338/20210622_190926.png"
    ];
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
    message.channel.send({
      content: `${member.user.username} X ${
        member2.user.username
      } = ${i} of Love ${f(i)}`,
      files: [{ attachment: canvas.toBuffer(), name: "lovecalc.png" }]
    });
  }
};
