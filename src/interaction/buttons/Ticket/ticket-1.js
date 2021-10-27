module.exports = {
  name: "no",
  async execute(client, interaction) {
    const chs = interaction.channel;
    let id = client.db.get(`${chs.id}_ticket`);
    let MSG = await chs.messages.fetch(id);
    let user = await client.data.get(`ticket_user_${chs.id}`);
    client.data.delete(`ticket_close_${user}`);
    MSG.delete().catch(e => {});
  }
};
