module.exports = {
  name: "open",
  async execute(client, interaction) {
    const chs = interaction.channel;
    let user = await client.data.get(`ticket_user_${chs.id}`);
    await client.data.delete(`ticket_close_${user}`);
    chs.send({
      embeds: [
        new client.Discord.MessageEmbed()
          .setColor("RED")
          .setDescription(`Ticket Opens by ${interaction.user}`)
      ]
    });
    chs.permissionOverwrites
      .set([
        {
          id: interaction.guild.roles.everyone,
          deny: ["VIEW_CHANNEL"]
        },
        {
          id: await client.data.get(`ticket_user_${chs.id}`),
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
      ])
      .catch(e => {
        null;
      });
    let id = client.db.get(`${chs.id}_ticket`);
    let MSG = await chs.messages.fetch(id);
    MSG.delete().catch(e => {});
  }
};
