let Discord = require("discord.js");
let Levels = require("discord-xp");
let { mongodb } = require("../config.js");
const canvacord = require("canvacord");

module.exports = async client => {
  Levels.setURL(mongodb); //can be putten in .env too and then imported//Add this to your main file (example: index.js or main.js)
  client.on("message", async message => {
    if (message.author.bot === true) return;
    const randomXp = Math.floor(Math.random() * 34) + 1;
    const hasLeveledUp = await Levels.appendXp(
      message.author.id,
      message.guild.id,
      randomXp
    );
    if (hasLeveledUp) {
      const User = await Levels.fetch(message.author.id, message.guild.id);
      let channel_id = await client.data.get(`levelch_${message.guild.id}`);
      if (channel_id === null)
        return client.send(`You Have Leveled Up To Level **${User.level}**`, message);

      let image = await client.data.get(`levelimg_${message.guild.id}`);
      let user = message.author;
      let levelchannel = client.channels.cache.get(channel_id);
      const neededXp = Levels.xpFor(parseInt(User.level) + 1);

      const ran = new canvacord.Rank()
        .setAvatar(user.displayAvatarURL({ dynamic: false, format: "png" }))
        .setCurrentXP(User.xp)
        .setRequiredXP(neededXp)
        .setLevel(User.level)
        .setRank(0, "a", false)
        .setStatus(user.presence.status, true, 5)
        .setProgressBar("#00FFFF", "COLOR")
        .setUsername(user.username, "#1FF768")
        .setDiscriminator(user.discriminator)
        .setBackground(
          "IMAGE",image||
          "https://cdn.discordapp.com/attachments/816254133353840660/819965380406673475/IMG-20201117-WA0142.jpg"
        );
      ran.build().then(data => {
        const attachment = new Discord.MessageAttachment(data, "Rankcard.png");
        const EmbedLevel = new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(user.username, message.guild.iconURL())
          .setTimestamp()
          .setDescription(
            `**LEVEL UP** - ${User.level}
**XP UP** - ${User.xp}/${neededXp}`
          )
          .setImage("attachment://Rankcard.png")
          .attachFiles(attachment);

        levelchannel.send(EmbedLevel);
      
  })}});
 }
