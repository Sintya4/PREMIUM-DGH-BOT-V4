module.exports = {
  name: "del",
  async execute(client, interaction) {
    const faild = new client.Discord.MessageEmbed()
      .setTitle("Ticket")
      .setDescription(`Tickets already Close`)
      .setColor("GREEN")
      .setTimestamp()
      .setAuthor(
        interaction.guild.name,
        interaction.guild.iconURL({
          dynamic: true
        })
      );
    const thread = interaction.channel;
    let user = await client.data.get(`ticket_user_${thread.id}`);

    if (await client.data.get(`ticket_close_${user}`)) {
      interaction.followUp({
        embeds: [faild],
        ephemeral: true
      });
    } else {
      const suk = new client.Discord.MessageEmbed()
        .setTitle("Ticket")
        .setDescription(`Are you sure you would like to close this ticket?`)
        .setColor("GREEN")
        .setTimestamp()
        .setAuthor(
          interaction.guild.name,
          interaction.guild.iconURL({
            dynamic: true
          })
        );
      const dl = new client.Discord.MessageActionRow().addComponents(
        new client.Discord.MessageButton()
          .setCustomId("yes")
          .setLabel("Close")
          .setStyle("DANGER"),
        new client.Discord.MessageButton()
          .setCustomId("no")
          .setLabel("Cancel")
          .setStyle("SECONDARY")
      );
      let msg = await thread.send({ embeds: [suk], components: [dl] });
      client.data.set(`ticket_close_${interaction.user.id}`, thread.id);
      client.db.set(`${thread.id}_ticket`, msg.id);
    }
  }
};
