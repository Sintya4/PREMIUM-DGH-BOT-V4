module.exports = async client => {
  client.on("guildCreate", async guild => {
    const owner = await guild.fetchOwner();
    const embed = new client.Discord.MessageEmbed()
      .setColor("#5DBCD2")
      .setTitle("New Server")
      .addField("Name", `${guild.name}`, true)
      .addField("Guild ID", `${guild.id}`, true)
      .addField("Owner", `${owner.user.tag}`, true)
      .addField("Owner ID", `${owner.user.id}`, true)
      .addField("Users", `${guild.members.cache.size}`, true)
      .setFooter(`Guilds: ${client.guilds.cache.size}`)
      .setThumbnail(guild.iconURL());
    const embed_ = new client.Discord.MessageEmbed()
      .setTitle(`Hello, I'm ${client.user.username}!`)
      .setDescription(
        client.config.bot.bot_add_description.split("{guild}").join(guild.name)
      )
      .setColor("#5DBCD2")
      .setImage(client.config.image.guild_add);
    client.sendhook(null, {
      channel: client.config.logs.botadd,
      embed: [embed],
      name: "DGH ADD GUILD"
    });
    return owner.send({ embeds: [embed_] }).catch(() => {
      null;
    });
  });

  client.on("guildDelete", async guild => {
    const owner = await guild.fetchOwner();

    const embed = new client.Discord.MessageEmbed()
      .setColor("#5DBCD2")
      .setTitle("Server Left")
      .addField("Name", `${guild.name}`, true)
      .addField("Guild ID", `${guild.id}`, true)
      .addField("Owner", `${owner.user.tag}`, true)
      .addField("Owner ID", `${owner.user.id}`, true)
      .addField("Users", `${guild.members.cache.size}`, true)
      .setFooter(`Guilds: ${client.guilds.cache.size}`)
      .setThumbnail(guild.iconURL());
    const embed_ = new client.Discord.MessageEmbed()
      .setDescription(
        client.config.bot.bot_remove_description
          .split("{guild}")
          .join(guild.name)
      )
      .setColor("#5DBCD2")
      .setImage(client.config.image.guild_remove);
    client.sendhook(null, {
      channel: client.config.logs.botdel,
      embed: [embed],
      name: "DGH REMOVE GUILD"
    });
    return owner.send({ embeds: [embed_] }).catch(() => {
      null;
    });
  });
};
