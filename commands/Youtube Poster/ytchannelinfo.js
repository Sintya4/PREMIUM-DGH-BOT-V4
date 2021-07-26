const { Client, Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ytchannelinfo",
  aliases: ["ytchinfo"],
  category: "yt_poster",
  description: "Get detailed YT-Channel-Data by a CHANNELLINK",
  usage: "",
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    let ChannelLink = args[0];
    if (!ChannelLink)
      return message.channel.send(`:x: Usage: \`channelinfo <LINK>\``);

    //get Channel Information
    client.YTP.getChannelInfo(ChannelLink)
      .then(Channel => {
        let embed = new MessageEmbed()
          .setTitle(Channel.name)
          .setURL(Channel.url)
          .setColor("RED")
          .addField("**Subscribercount:**", "`" + Channel.subscribers + "`")
          .addField("**Tags:**", Channel.tags.map(t => `\`${t}\``).join(",  "))
          .addField("**Unlisted:**", Channel.unlisted ? "✅" : "❌", true)
          .addField("**FamilySafe:**", Channel.familySafe ? "✅" : "❌", true)
          .setFooter("ID: " + Channel.id)
          .setImage(Channel.mobileBanner[0].url)
          .setDescription(String(Channel.description).substr(0, 1500))
          .setAuthor(message.author.tag)
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
          .setColor("RANDOM")
          .setFooter(`DGH BOT V2`); //Send the Message
        message.channel
          .send({
            embed: embed
          })
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
