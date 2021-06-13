const Discord = require("discord.js");
const { Default_Prefix } = require("../../config.js");
const MessageEmbed = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
module.exports = async client => {
  client.on("guildCreate", async guild => {
    if (!guild.available) return;
  /*  let channelID;
    let channels = guild.channels;
    channelLoop: for (let c of channels) {
      let channelType = c[1].type;
      if (channelType === "text") {
        channelID = c[0];
        break channelLoop;
      }
    }

    let channel = client.channels.get(guild.systemChannelID || channelID);
    if (!channel) {
      let newserverEmbed = new Discord.MessageEmbed()
        .setTitle("Hello, I'm DGH BOT!")
        .setDescription(
          `__Thanks for adding ${client.user.username} to your server :smiley:__
Use \`${Default_Prefix}help\` to get a list of commands. If you need more information`
        )
        .setColor("#5DBCD2");
      guild.owner.send(newserverEmbed);
    }
*/
    let newserverEmbedw = new Discord.MessageEmbed()
      .setTitle("Hello, I'm DGH BOT!")
      .setDescription(
        `__Thanks for adding ${client.user.username} to your server :smiley:__
Use \`${Default_Prefix}help\` to get a list of commands. If you need more information`
      )
      .setColor("#5DBCD2");
   guild.owner.send(newserverEmbedw);
  }); /*
  const embed = new Discord.MessageEmbed()
      .setTitle("Hello, I'm DGH BOT!")
      .setColor("RANDOM")
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .addField(
        "Information",
        `You've just added me to **${guild.name}**.\n\nHere is some information about myself:\n\nMy Prefix:\`!help|mention\`\nCommands: Moderation, Settings, misc, welcome, fun, utility`,
        true
      )
      .addField(
        "My Website",
        " Sorry My Website in Glitch.com :(\n [Here](https://bot-jsll.glitch.me/)",
        true
      )
      .addField(
        "DGH-BOT NQN",
        "DGH-Bot has Emoji Send Command just like BOT NQN",
        true
      )
      .setImage(
        "https://cdn.discordapp.com/attachments/829696536396955649/829696583343144970/Kasih_Nama_Woi_23_1080p.gif"
      )
      .addField(
        "Permissions",
        "Give Permissions among others : MANAGE_WEBHOOKS,BAN_MEMBERS,KICK_MEMBERS_MANAGE_ROLES,MANAGE_NICKNAME",
        true
      )
      .setTimestamp() // moment().format('LLL'),
      .setFooter(`${client.user.tag}`);
    guild.owner.send(embed);
  });*/
};
