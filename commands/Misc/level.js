const Discord = require("discord.js");
const canvacord = require("canvacord");
const toHex = require("colornames");
const db = require("quick.db");
let Levels = require("discord-xp");
let { Image_level } = require("../../config.js");
module.exports = {
  name: "level",
  aliases: ["lvl", "rank"],
  description: "Get the level of Author or Mentioned",
  usage: "level [user]",
  category: "misc",
  botPermission: ["MANAGE_GUILD"],
  run: async (client, message, args) => {
    let user =
      message.mentions.members.first() || message.guild.member(message.author);
    const User = await Levels.fetch(user.user.id, message.guild.id);
    const LevelUp = new Discord.MessageEmbed();
    let image = await client.data.get(`levelimg_${message.guild.id}`);
    //  let color = user.hoistRole.hexColor;//user.displayHexColor;
    const newxp = Levels.xpFor(parseInt(User.level) + 1);
    //  if (color == "#000000") color = user.hoistRole.hexColor || "";
    let rak;
    rak = new canvacord.Rank()
      .setAvatar(user.user.displayAvatarURL({ format: "png" }))
      .setCurrentXP(User.xp)
      .setRequiredXP(newxp)
      .setStatus(user.presence.status, true, 5)
      .setProgressBar("#00FFFF", "COLOR")
      .setUsername(user.user.username, "#1FF768")
      .setDiscriminator(user.user.discriminator)
      .setLevel(User.level);
    rak.setBackground("IMAGE", image || Image_level);

    rak.build().then(data => {
      const attachment = new Discord.MessageAttachment(data, "RankCard.png");
      let embed = new Discord.MessageEmbed()
        .setAuthor(user.user.username, message.guild.iconURL())
        .setColor("#ff2050")
        .setDescription(
          `**LEVEL** - ${User.level}\n**XP** - ${User.xp}/${newxp}`
        )
        .setImage("attachment://RankCard.png")
        .attachFiles(attachment);
      message.channel.startTyping();
      message.channel.send(embed);
      message.channel.stopTyping();
    });
  }
};
