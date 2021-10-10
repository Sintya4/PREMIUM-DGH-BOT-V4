module.exports = {
  name: "yes",
  async execute(client, interaction) {
    const chs = interaction.channel;
    const opt = new client.Discord.MessageActionRow().addComponents(
      new client.Discord.MessageButton()
        .setCustomId("open")
        .setLabel("🔓 Open")
        .setStyle("SECONDARY"),
      new client.Discord.MessageButton()
        .setCustomId("delete")
        .setLabel("⛔ Delete")
        .setStyle("SECONDARY")
    );
    let ss = await chs.send({
      embeds: [
        new client.Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(`Ticket Closed by ${interaction.user}`)
      ],
      components: [opt]
    });
    chs.permissionOverwrites
      .set([
        {
          id: interaction.guild.roles.everyone,
          deny: ["VIEW_CHANNEL"]
        },
        {
          id: await client.data.get(`ticket_user_${chs.id}`),
          deny: ["VIEW_CHANNEL"]
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
      ])
      .catch(e => {
        null;
      });
    let id = client.db.get(`${chs.id}_ticket`);
    let MSG = await chs.messages.fetch(id);
    MSG.delete()
      .catch(e => {})
      .then(client.db.set(`${chs.id}_ticket`, ss.id));
  }
};
