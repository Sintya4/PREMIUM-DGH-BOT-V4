module.exports = {
  name: "add-word",
  category: "anti_swear",
  description: "Visiting members to say rude",
  P_user: ["VIEW_CHANNEL", "MANAGE_GUILD"],
  P_bot: ["VIEW_CHANNEL", "MANAGE_GUILD"],
  run: async (client, message, args) => {
    let pog = await client.data.get(`words_${message.guild.id}`);
    let word = args[0];
    if (!word) {
      let embed = new client.Discord.MessageEmbed()
        .setTitle("Error")
        .setDescription(`:x: | **No word provided**\nFormat: \`+addword fk\``)
        .setFooter(
          message.author.tag,
          message.author.displayAvatarURL()
        )
        .setThumbnail(message.guild.iconURL())
        .setColor("#FF0000");
      return message.channel.send({
        embeds: [embed]
      });
    }
    if (pog && pog.find(find => find.word == word)) {
      let embed = new client.Discord.MessageEmbed();
      embed.setAuthor(message.guild.name, message.guild.iconURL());
      embed.setTitle("Error");
      embed.setDescription(`:x: | **The word is already on the database**`);
      embed.setFooter(
        message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      );
      embed.setTimestamp();
      embed.setThumbnail(message.author.displayAvatarURL({ dynamic: true }));
      return message.channel.send({
        embeds: [embed]
      });
    }
    let yes = {
      word: word,
      author: message.author.tag
    };
    client.data.push(`words_${message.guild.id}`, yes);
    let embed = new client.Discord.MessageEmbed();
    embed.setAuthor(message.guild.name, message.guild.iconURL());
    embed.setTitle("Success");
    embed.setThumbnail(message.guild.iconURL());
    embed.setDescription(`**The word has been added!**`);
    embed.setFooter(
      message.author.tag,
      message.author.displayAvatarURL({ dynamic: true })
    );
    embed.setColor("RANDOM");
    embed.setTimestamp();
    message.channel.send({
      embeds: [embed]
    });
  }
};
