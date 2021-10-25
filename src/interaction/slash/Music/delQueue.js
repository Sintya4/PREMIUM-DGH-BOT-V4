const music = require("@koenie06/discord.js-music");
module.exports = {
  name: "removequeue",
  description: "Remove Queue The Music!",
  P_bot: ["CONNECT", "SPEAK"],
  options: [
    {
      name: "number",
      description: "Remove Queue",
      type: "INTEGER",
      required: true
    }
  ],
  execute: async (client, interaction) => {
    const number = interaction.options.getInteger("number");
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
    if (!queue[number - 1])
      return interaction.reply({
        content: "That number of the queue doesn't exist",
        ephemeral: true
      });
    music.removeQueue({
      interaction: interaction,
      number: number
    });
    interaction.reply({
      content: `Removed the ${number}th song of the queue.`
    });
  }
};
