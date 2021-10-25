const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "lyrics",
  description: "Get Lyrics of a Song",
  options: [
    {
      name: "song-name",
      description: "The name of the song",
      required: true,
      type: "STRING"
    }
  ],
  execute: async (client, interaction, options) => {
    const song = interaction.options.getString("song-name");
    if (!song)
      return interaction.reply("Please provide a song to search for!");
    const json = await fetch(
      `https://api.popcat.xyz/lyrics?song=${encodeURIComponent(song)}`
    ).then(r => r.json());
    if (json.error) return interaction.followUp("Song not found!");
    const url = `${song.replace(" ", "+")}`;
    let lyrics = json.lyrics;
    if (lyrics.length > 4096)
      lyrics = `Too long to show, visit [https://popcat.xyz/lyrics/${url}](https://popcat.xyz/lyrics/${url}) For full lyrics`;
    const embed = new MessageEmbed()
      .setTitle(json.full_title === "none" ? json.title : json.full_title)
      .setURL(json.url)
      .setThumbnail(json.image)
      .addField("Artist", json.artist)
      .setDescription("Lyrics:\n\n" + lyrics)
      .setColor("ffc0cb");
    interaction.reply({ embeds: [embed] });
  }
};
