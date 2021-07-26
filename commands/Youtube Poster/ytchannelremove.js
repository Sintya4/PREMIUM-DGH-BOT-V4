const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ytchannelremove",
  aliases: ["ytchanneldelete"],
  category: "yt_poster",
  authorPermission: ["ADMINISTRATOR"],
  description: "Delete/Remove a setup Channel by a CHANNELLINK",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let ChannelLink = args[0];
    if (!ChannelLink)
      return message.channel.send(`:x: Usage: \`ytchannelremove <LINK>`);

    //Delete a Channel
    client.YTP.deleteChannel(message.guild.id, ChannelLink)
      .then(ch => {
        //console.log(ch) See the Responses: https://github.com/Tomato6966/discord-yt-poster/wiki/Responses
        //send information message
        message.channel
          .send(
            new MessageEmbed()
              .setDescription(
                `I deleted the Settings for ${ch.deletedChannel.YTchannel} (<@${ch.deletedChannel.DiscordUser}>), posting in <#${ch.deletedChannel.DiscordChannel}>\n\nThe Message:\n${ch.deletedChannel.message}`
              )
              .setAuthor(message.author.tag)
              .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
              .setColor("RANDOM")
              .setFooter(`DGH BOT V2`)
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
