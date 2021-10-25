const music = require("@koenie06/discord.js-music");
module.exports = {
  name: "repeat",
  description: "Repeat The Music!",
  options: [
    {
      name: "onoff",
      description: "On Or Off",
      type: "BOOLEAN",
      required: true
    }
  ],
  P_bot: ["CONNECT", "SPEAK"],
  execute: async (client, interaction) => {
    const OnOrOff = interaction.options.getBoolean("onoff");
    const isConnected = await music.isConnected({
      interaction: interaction
    });
    if (!isConnected)
      return interaction.reply({
        content: "There are no songs playing",
        ephemeral: true
      });
    const isRepeated = music.isRepeated({
      interaction: interaction
    });
    if (isRepeated === OnOrOff)
      return interaction.reply({
        content: `Repeat mode is already on ${OnOrOff}`,
        ephemeral: true
      });
    music.repeat({
      interaction: interaction,
      value: OnOrOff
    });
    interaction.reply({ content: `Turned repeat mode to ${OnOrOff}` });

  }
};
