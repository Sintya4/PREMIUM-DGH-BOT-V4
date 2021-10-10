module.exports = {
  name: "drop-giveaway",
  description: "Create a drop giveaway!",
  options: [
    {
      name: "winners",
      description: "How many winners the giveaway should have",
      type: "INTEGER",
      required: true
    },
    {
      name: "prize",
      description: "What the prize of the giveaway should be",
      type: "STRING",
      required: true
    },
    {
      name: "channel",
      description: "The channel to start the giveaway in",
      type: "CHANNEL",
      required: true
    }
  ],
  P_user: ["MANAGE_MESSAGES"],
  execute: async (client, interaction) => {
    const giveawayChannel = interaction.options.getChannel("channel");
    const giveawayWinnerCount = interaction.options.getInteger("winners");
    const giveawayPrize = interaction.options.getString("prize");
    if (!giveawayChannel.isText()) {
      return interaction.reply({
        content: ":x: Selected channel is not text-based.",
        ephemeral: true
      });
    }
    client.giveawaysManager.start(giveawayChannel, {
      winnerCount: giveawayWinnerCount,
      prize: giveawayPrize,
      hostedBy: interaction.user || null,
      thumbnail: "https://ezzud.fr/images/closedFixed.png",
      isDrop: true,
      messages: await client.ops.giveaway(client)
    });
    interaction.reply(`Giveaway started in ${giveawayChannel}!`);
  }
};
