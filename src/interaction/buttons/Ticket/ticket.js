module.exports = {
  name: "tic",
  async execute(client, interaction) {
    const faild = new client.Discord.MessageEmbed()
      .setTitle("Ticket")
      .setDescription(`Tickets already available`)
      .setColor("GREEN")
      .setTimestamp()
      .setAuthor(
        interaction.guild.name,
        interaction.guild.iconURL({
          dynamic: true
        })
      );
    if (await client.data.get(`ticket_create_${interaction.user.id}`)) {
      interaction.followUp({
        embeds: [faild],
        ephemeral: true
      });
    } else {
      const channel = await interaction.guild.channels.create(
        `${interaction.user.username} ticket`,
        {
          topic: `Common Information:
Ticket Name: ${interaction.user.username}
Ticket ID: ${interaction.user.id}`,
          permissionOverwrites: [
            {
              id: interaction.guild.roles.everyone,
              deny: ["VIEW_CHANNEL"]
            },
            {
              id: interaction.user.id,
              allow: ["VIEW_CHANNEL"]
            },
            {
              id: client.user.id,
              allow: [
                "VIEW_CHANNEL",
                "MANAGE_CHANNELS",
                "MANAGE_MESSAGES",
                "SEND_MESSAGES"
              ]
            }
          ]
        }
      );

      const embed = new client.Discord.MessageEmbed()
        .setTitle("Ticket")
        .setDescription(
          "Hello there,\nThe staff will be here as soon as possible mean while tell us about your issue!\nThank You!"
        )
        .setColor("GREEN")
        .setTimestamp()
        .setAuthor(
          interaction.guild.name,
          interaction.guild.iconURL({
            dynamic: true
          })
        );
      const suk = new client.Discord.MessageEmbed()
        .setTitle("Ticket")
        .setDescription(`Ticket created <#${channel.id}>`)
        .setColor("GREEN")
        .setTimestamp()
        .setAuthor(
          interaction.guild.name,
          interaction.guild.iconURL({
            dynamic: true
          })
        );
      const del = new client.Discord.MessageActionRow().addComponents(
        new client.Discord.MessageButton()
          .setCustomId("del")
          .setLabel("🔒 Close")
          .setStyle("DANGER")
      );
      channel
        .send({
          content: `Welcome <@${interaction.user.id}>`,
          embeds: [embed],
          components: [del]
        })
        .then(
          interaction.followUp({
            embeds: [suk],
            ephemeral: true
          })
        );
      client.data.set(`ticket_user_${channel.id}`, interaction.user.id);
      client.data.set(`ticket_create_${interaction.user.id}`, channel.id);
    }
  }
};
