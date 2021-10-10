module.exports = {
  name: "delete",
  async execute(client, interaction) {
    const chs = interaction.channel;
   let user = await client.data.get(`ticket_user_${chs.id}`);
    client.data.delete(`ticket_create_${user}`);
    client.data.delete(`ticket_close_${user}`);
    client.data.delete(`ticket_user_${chs.id}`);
    client.db.delete(`${chs.id}_ticket`);
    chs.delete().catch(e => {
      null;
    });
  }
};
