const music = require("@koenie06/discord.js-music");
module.exports = {
  name: "stop",
  description: "Stop The Music!",
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
    const queue = music.getQueue({
      interaction: interaction
    });
    if (queue.length === 0)
      return interaction.reply({
        content: "No music is playing",
        ephemeral: true
      });
    music.stop({
      interaction: interaction
    });
  }
};
