const music = require("@koenie06/discord.js-music");
module.exports = {
  name: "volume",
  description: "Volume The Music!",
  options: [
    {
      name: "volume",
      description: "Set volume Music",
      type: "INTEGER",
      required: true
    }
  ],
  P_bot: ["CONNECT", "SPEAK"],
  execute: async (client, interaction) => {
    const volume = interaction.options.getInteger("volume");
    if (volume > 100)
      return interaction.reply({
        content: "Can't go higher than 100%",
        ephemeral: true
      });
    const isConnected = await music.isConnected({
      interaction: interaction
    });
    if (!isConnected)
      return interaction.reply({
        content: "There are no songs playing",
        ephemeral: true
      });
    music.volume({
      interaction: interaction,
      volume: volume
    });

    interaction.reply({ content: `Set the volume to ${volume}` });
  }
};
