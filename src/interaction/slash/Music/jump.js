const music = require("@koenie06/discord.js-music");
module.exports = {
  name: "jump",
  description: "Jump The Music!",
  options: [
    {
      name: "number",
      description: "Jump To Music",
      type: "INTEGER",
      required: true
    }
  ],
  P_bot: ["CONNECT", "SPEAK"],
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
    const queue = music.queue({
      interaction: interaction
    });
    if (number > queue.length)
      return interaction.reply({
        content: "Can't jump that far!",
        ephemeral: true
      });

    music.jump({
      interaction: interaction,
      number: number
    });

    interaction.reply({ content: `Jump the song to the given queue number.` });
  }
};
