module.exports = async client => {
  client.on("guildCreate", async guild => {
    let newserverEmbedw = new client.Discord.MessageEmbed()
      .setTitle(`Hello, I'm ${client.user.username}!`)
      .setDescription(
        client.config.bot.bot_add_description.split("{guild}").join(guild.name)
      )
      .setColor("#5DBCD2")
      .setImage(client.config.image.guild_add);
    let embed = new client.Discord.MessageEmbed()
      .setTitle("Guild Add")
      .setDescription(
        `Name Server: ${guild.name}\nMember: ${
          guild.memberCount
        }\nOwner: ${await client.resolveUser(guild.ownerId).then(x => x.tag)}`
      )
      .setColor("#ff0000")
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setFooter(guild.name, guild.iconURL({ dynamic: true }));
    client.sendhook(null, {
      channel: client.config.logs.botadd,
      embed: [embed],
      name: "DGH ADD GUILD"
    });
    return client
      .resolveUser(guild.ownerId)
      .then(user => user.send({ embeds: [newserverEmbedw] }))
      .catch(() => {
        null;
      });
  });
  client.on("guildDelete", async guild => {
    if (!guild.available) return;
    let newserverEmbedw = new client.Discord.MessageEmbed()
      .setDescription(
        client.config.bot.bot_remove_description
          .split("{guild}")
          .join(guild.name)
      )
      .setColor("#5DBCD2");
    let embed = new client.Discord.MessageEmbed()
      .setTitle("Guild Remove")
      .setDescription(
        `Name Server: ${guild.name}\nMember: ${
          guild.memberCount
        }\nOwner: ${await client.resolveUser(guild.ownerId).then(x => x.tag)}`
      )
      .setColor("#ff0000")
      .setThumbnail(guild.iconURL({ dynamic: true }))
      .setFooter(guild.name, guild.iconURL({ dynamic: true }));
    client.sendhook(null, {
      channel: client.config.logs.botdel,
      embed: [embed],
      name: "DGH REMOVE GUILD"
    });
    return client
      .resolveUser(guild.ownerId)
      .then(user => user.send({ embeds: [newserverEmbedw] }))
      .catch(() => {
        null;
      });
  });
};
