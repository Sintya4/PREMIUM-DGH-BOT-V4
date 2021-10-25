const music = require("@koenie06/discord.js-music");
module.exports = {
  name: "resume",
  description: "Resume The Music!",
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
    const isResumed = music.isResumed({
      interaction: interaction
    });
    if (isResumed)
      return interaction.reply({
        content: "The song is already resumed",
        ephemeral: true
      });
    music.resume({
      interaction: interaction
    });
    interaction.reply({ content: `Resumed the music` });
  }
};
