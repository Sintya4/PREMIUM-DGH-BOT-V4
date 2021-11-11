let Discord = require("discord.js");
let Levels = require("discord-xp");
const canvacord = require("canvacord");

module.exports = async client => {
  Levels.setURL(client.config.bot.mongourl); //can be putten in .env too and then imported//Add this to your main file (example: index.js or main.js)
  client.on("messageCreate", async message => {
    if (message.author.bot || !message.guild || message.webhookID) return;
    const randomXp = Math.floor(Math.random() * 34) + 1;
    const hasLeveledUp = await Levels.appendXp(
      message.author.id,
      message.guild.id,
      randomXp
    );
    if (hasLeveledUp) {
      const User = await Levels.fetch(message.author.id, message.guild.id);
      const newxp = Levels.xpFor(parseInt(User.level) + 1);
      let channel_id = await client.data.get(`lvl_channel__${message.guild.id}`);
      let msg1 = await client.data.get(`msg_level_${message.guild.id}`);
      if (msg1) {
        msg1 = msg1.replace(/{user}/g, message.author);
        msg1 = msg1.replace(/{server}/g, message.guild.name);
        msg1 = msg1.replace(/{username}/g, message.author.tag);
        msg1 = msg1.replace(/{member_xp}/g, `${User.xp}/${newxp}`);
        msg1 = msg1.replace(/{member_level}/g, User.level);
        let matches = msg1.match(/{:([a-zA-Z0-9]+)}/g);
        if (!matches) matches = msg1;
        for (const match of matches) {
          const rep = await message.guild.emojis.cache.find(
            emoji => emoji.name === match.substring(2, match.length - 1)
          );
          if (rep) msg1 = msg1.replace(match, rep);
        }
      } else {
        msg1 = `You Have Leveled Up To Level **${User.level}**`;
      }
      if (channel_id) {
        return client.send(msg1, {
          message,
          channel: channel_id
        });
      } else {
        return client.send(msg1, {
          message
        });
      }
    }
  });
};
