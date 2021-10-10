let ms = require("ms");
module.exports = {
  name: "start-giveaway",
  description: "Start a giveaway!",
  options: [
    {
      name: "duration",
      description:
        "How long the giveaway should last for. Example values: 1m, 1h, 1d",
      type: "STRING",
      required: true
    },
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
  async execute(client, interaction) {
    const giveawayChannel = interaction.options.getChannel("channel");
    const giveawayDuration = interaction.options.getString("duration");
    const giveawayWinnerCount = interaction.options.getInteger("winners");
    const giveawayPrize = interaction.options.getString("prize");

    if (!giveawayChannel.isText()) {
      return interaction.reply({
        content: ":x: Selected channel is not text-based.",
        ephemeral: true
      });
    }
    client.giveawaysManager.start(giveawayChannel, {
      duration: ms(giveawayDuration),
      prize: giveawayPrize,
      winnerCount: parseInt(giveawayWinnerCount),
      hostedBy: interaction.user || null,
      thumbnail: "https://ezzud.fr/images/closedFixed.png",
      messages: await client.ops.giveaway(client)
    });

    interaction.reply({
      content: `Giveaway started in ${giveawayChannel}!`,
      ephemeral: true
    });
  }
};
