module.exports = {
  name: "setprefix",
  aliases: ["newprefix", "sp"],
  category: "settings",
  P_user: ["ADMINISTRATOR"],
  args: true,
  usage: "Setprefix <New Prefix>",
  run: async (client, message, args) => {
    let Prefix = await client.data.get(`Prefix_${message.guild.id}`);
    if (!Prefix) Prefix = client.config.bot.prefix;
    const NewPrefix = args.join(" ");
    if (NewPrefix.length > 10)
      return client.send("Too Long Prefix - 10 Limit", { message });

    if (NewPrefix === Prefix)
      return client.send("Given Prefix Is The Current Prefix!", { message });

    const Embed = new client.Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Sucess")
      .setDescription(`New Prefix Has Been Setted - ${NewPrefix}`)
      .setFooter(`Setted By ${message.author.username}`)
      .setTimestamp();

    const Embed2 = new client.Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Sucess")
      .setDescription(`New Prefix Has Been Setted - ${NewPrefix}`)
      .setFooter(`Server ${message.guild.name}\nBy ${message.author.username}`)
      .setTimestamp();
    const user = client.users.cache.get(message.guild.ownerId);
    await client.data.set(`Prefix_${message.guild.id}`, NewPrefix);
    try {
      message.channel
        .send({ embeds: [Embed] })
        .then(m => user.send({ embeds: [Embed2] }))
        .catch(e => {});
    } catch (e) {
      return message.channel
        .send({
          content: `New Prefix Has Been Setted - ${NewPrefix}`
        })
        .then(m => user.send({ embeds: [Embed2] }))
        .catch(e => {});
    }
  }
};
