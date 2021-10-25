const music = require("@koenie06/discord.js-music");
module.exports = {
  name: "getqueue",
  description: "Get Queue The Music!",
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
    const queue = await music.getQueue({
      interaction: interaction
    });

    let response = ``;

    for (let i = 0; i < queue.length; i++) {
      response += `${i + 1}. [${queue[i].info.title}](${queue[i].info.url}) - ${
        queue[i].info.duration
      }\n`;
    }

    interaction.reply({ content: response });
  }
};
