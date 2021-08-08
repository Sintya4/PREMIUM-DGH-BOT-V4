const Discord = require("discord.js");
const {
  Default_Prefix,
  message_guild_add,
  Image_guild_add
} = require("../../config.js");
const MessageEmbed = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
module.exports = async client => {
  client.on("guildCreate", async guild => {
    if (!guild.available) return;
    let des = message_guild_add
      .split("{username}")
      .join(client.user.username)
      .split("{server}")
      .join(guild.name)
      .split("{Prefix}")
      .join(Default_Prefix);
    let newserverEmbedw = new Discord.MessageEmbed()
      .setTitle(`Hello, I'm ${client.user.username}!`)
      .setDescription(des)
      .setColor("#5DBCD2")
      .setImage(Image_guild_add);
    guild.owner.send(newserverEmbedw);
  });
};
