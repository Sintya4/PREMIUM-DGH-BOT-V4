const music = require("@koenie06/discord.js-music");
module.exports = {
  name: "skip",
  description: "Skip The Music!",
  P_bot: ["CONNECT", "SPEAK"],
  execute: async (client, interaction) => {
    const isConnected = await music.isConnected({
      interaction: interaction
    });
    if (!isConnected)
      return interaction.reply({
        content: "There are no songs playing",
        ephemeral: true
      });
    music.skip({
      interaction: interaction
    });
    interaction.reply({ content: `Skipped the song` });
  }
};
