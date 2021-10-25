const music = require("@koenie06/discord.js-music");
module.exports = {
  name: "play",
  description: "Play Music With Link Or Playlist Or Query!",
  options: [
    {
      name: "song",
      description: "Song Name",
      type: "STRING",
      required: true
    }
  ],
  P_bot: ["CONNECT", "SPEAK"],
  execute: async (client, interaction) => {
    const channel = interaction.member.voice.channel;
    const song = interaction.options.getString("song");
    if (!channel)
      return interaction.reply({
        content: "You need to be in a voice channel!",
        ephemeral: true
      });

    music.play({
      interaction: interaction,
      channel: channel,
      song: song
    });
    return interaction.reply({
      content: "Search for the music...",
      ephemeral: true
    });
  }
};
