const Discord = require("discord.js");
const music = require("@koenie06/discord.js-music");
const events = music.event;
module.exports = client => {
  events.on("playSong", async (channel, songInfo, requester) => {
    const PlayEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail(songInfo.thumbnail)
      .setTitle("Now Playing!")
      .setDescription(
        `${await client.emoji("DGH_music")} Now Playing: **${
          songInfo.title
        }\nChannel: \`${songInfo.author}\`**\nThis was requested by ${
          requester.tag
        } (${requester.id})`
      )
      .setTimestamp();

    channel.send({ embeds: [PlayEmbed] });
  });

  events.on("addSong", async (channel, songInfo, requester) => {
    const AddEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setThumbnail(songInfo.thumbnail)
      .setDescription(
        `${await client.emoji("DGH_add")} Added the Song: **${
          songInfo.title
        }\nChannel: \`${songInfo.author}\`**\nAdded by ${requester.tag} (${
          requester.id
        })`
      )
      .setTimestamp();
    channel.send({ embeds: [AddEmbed] });
  });

  events.on("playList", async (channel, playlist, songInfo, requester) => {
    const AddEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(
        `Started playing the song [${songInfo.title}](${songInfo.url}) by \`${songInfo.author}\` of the playlist ${playlist.title}.
        This was requested by ${requester.tag} (${requester.id})`
      )
      .setTimestamp();
    channel.send({ embeds: [AddEmbed] });
  });

  events.on("addList", async (channel, playlist, requester) => {
    const AddEmbed = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setDescription(
        `${await client.emoji("DGH_add")} Added the playlist: **${
          playlist.title
        } with \`${
          playlist.videos.length
        }\` amount of videos to the queue**\nAdded by ${requester.tag} (${
          requester.id
        })`
      )
      .setTimestamp();
    channel.send({ embeds: [AddEmbed] });
  });

  events.on("finish", async channel => {
    const Embeded = new Discord.MessageEmbed()
      .setColor("RANDOM")
      .setTitle("Queue Ended!")
      .setDescription(
        "Server Queue Has Been Ended, Thanks For Listening To Me <3\n\nPro Tip: You Can Use **24.7** Command To Make It 24/7 :D"
      )
      .setTimestamp();
    channel.send({ embeds: [Embeded] });
  });
};
