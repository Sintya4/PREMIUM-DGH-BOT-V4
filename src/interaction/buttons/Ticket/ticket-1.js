module.exports = {
  name: "no",
  async execute(client, interaction) {
    const chs = interaction.channel;
    let id = client.db.get(`${chs.id}_ticket`);
    let MSG = await chs.messages.fetch(id);
    MSG.delete().catch(e => {});
  }
};
