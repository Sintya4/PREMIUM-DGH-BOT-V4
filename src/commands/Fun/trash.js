const { MessageEmbed } = require("discord.js");
const axios = require("axios");

module.exports = {
  name: "trash",
  usage: "trash <user>",
  args: true,
  category: "fun",
  run: async (client, message, args) => {
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;
    const url = `https://api.no-api-key.com/api/v1/trash?image=${user.user.displayAvatarURL(
      { format: "png" }
    )}`;

    let response, data;
    try {
      response = await axios.get(url);
      data = response.data;
    } catch (e) {
      return client.send(`An error occured!`, {message});
    }

    const embed = new MessageEmbed()
      .setAuthor(
        `${message.guild.name} was used in!`,
        message.guild.iconURL({ dynamic: true })
      )
      .setImage(data.url)
      .setColor("RANDOM")
      .setFooter(
        `${message.author.username} asked this`,
        message.author.displayAvatarURL({ dynamic: true })
      );

    await message.channel.send({ embeds: [embed] });
  }
};
