const Canvas = require("canvas");
const GIFEncoder = require(`gifencoder`);
const Discord = require("discord.js");
const db = require("quick.db");
const { Image_welcome, message_welcome } = require("../../config.js");
const moment = require("moment-timezone");
module.exports = async client => {
  //fires every time when someone joins the server
  client.on("guildMemberAdd", async member => {
    let image = await client.data.get(`welimage_${member.guild.id}`);
    const canvas = Canvas.createCanvas(1772, 633);
    const ctx = canvas.getContext("2d");
     //set the Background to the welcome.png
    const background = await Canvas.loadImage(
      `${image || Image_welcome}`
    );
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
   ctx.strokeStyle = "#f2f2f2";
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    var textString3 = `${member.user.username}`;
    if (textString3.length >= 14) {
      ctx.font = "bold 100px Genta";
      ctx.fillStyle = "#f2f2f2";
      ctx.fillText(textString3, 720, canvas.height / 2 + 20);
    } else {
      ctx.font = "bold 150px Genta";
      ctx.fillStyle = "#f2f2f2";
      ctx.fillText(textString3, 720, canvas.height / 2 + 20);
    }
    var textString2 = `#${member.user.discriminator}`;
    ctx.font = "bold 40px Genta";
    ctx.fillStyle = "#f2f2f2";
    ctx.fillText(textString2, 730, canvas.height / 2 + 58);
    var textString4 = `Member #${member.guild.memberCount}`;
    ctx.font = "bold 60px Genta";
    ctx.fillStyle = "#f2f2f2";
    ctx.fillText(textString4, 750, canvas.height / 2 + 125);
    var textString4 = `${member.guild.name}`;
    ctx.font = "bold 60px Genta";
    ctx.fillStyle = "#f2f2f2";
    ctx.fillText(textString4, 700, canvas.height / 2 - 150);
    ctx.beginPath();
    ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true); //position of img
    ctx.closePath();
    ctx.clip();
    const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ format: "jpg" })
    );
    ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500);
    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "welcome-image.png"
    );
    var date = moment.tz("Asia/Jakarta");
    let chx = await client.data.get(`welchannel_${member.guild.id}`);
    if (chx === null) return;
    let joinPosition;
    const me = member.guild.members.cache.array();
    me.sort((a, b) => a.joinedAt - b.joinedAt);
    for (let i = 0; i < me.length; i++) {
      if (me[i].id == member.guild.member(member).id) joinPosition = i;
    };
   // console.log(attachm);
    let ch =
    await client.data.get(`welmsg_${member.guild.id}`) || client.db.get(`welmsg_${member.guild.id}`) || message_welcome;
    const messs = ch
      .split(`{member}`)
      .join(member) // Member mention substitution
      .split(`{username}`)
      .join(member.user.username) // Username substitution
      .split(`{position}`)
      .join(joinPosition || 1) //member.guild.members.cache.size)
      .split(`{tag}`)
      .join(member.user.tag) // Tag substitution
      .split(`{date}`)
      .join(date.format("DD/MMM/YYYY, hh:mm:ss z")) // member guild joinedAt
      .split(`{server}`)
      .join(member.guild.name) // Name Server substitution
      .split(`{size}`)
      .join(member.guild.members.cache.size);
    const welcomeembed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      .setDescription(messs)
      .setImage("attachment://welcome-image.png")
      .attachFiles(attachment);
    const sender = client.channels.cache.get(chx);
    if (!sender) return;
    sender.send(welcomeembed);
  });
};