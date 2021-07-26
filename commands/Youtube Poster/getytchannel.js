const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "getytchannel",
  aliases: ["getchannel"],
  category: "yt_poster",
  args: true,
  description: "Get a setup Channel by a CHANNELLINK",
  usage: "getytchannel <link>",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let ChannelLink = args[0];
    client.YTP.getChannel(message.guild.id, ChannelLink)
      .then(ch => {
        message.channel
          .send(
            new MessageEmbed()
              .setColor("GREEN")
              .setDescription(
                `**Guild:**\n> **\`${
                  client.guilds.cache.get(ch.DiscordGuild).name
                }\`**` +
                  "\n" +
                  `**Channel to Post:**\n> **${message.guild.channels.cache.get(
                    ch.DiscordChannel
                  )}**` +
                  "\n" +
                  `**Channel Link:**\n> **${ch.YTchannel}**` +
                  "\n" +
                  `**Linked User:**\n> **\`${
                    message.guild.members.cache.get(ch.DiscordUser).user.tag
                  }\`**` +
                  "\n" +
                  `**Last Video:**\n> **\`https://youtube.com/watch=?v${ch.oldvid}\`**` +
                  "\n" +
                  `**Message:**\n>>> \`\`\`${ch.message}\`\`\``
              )
              .setAuthor(message.author.tag)
              .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
              .setFooter("DGH BOT V2")
          )
          .then(msg => msg.react("👍"));
      })
      .catch(e => {
        console.log(e);
        message.channel.send(`${e.message ? e.message : e}`, {
          code: "js"
        });
      });
  }
};
