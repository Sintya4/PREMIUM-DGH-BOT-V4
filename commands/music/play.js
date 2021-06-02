const { MessageEmbed } = require("discord.js")
const { Util } = require("discord.js");
const { QUEUE_LIMIT, COLOR } = require("../../config.js");
const ytsr = require('ytsr');
const { play } = require("../../Functions.js");


module.exports = {
  name: "play",
  aliases: ["p"],
  category: "music",
  cooldown: 5,
  args: true,
  description: "Play Music With Link Or Playlist Or Query!",
  usage: "Play <Song Name | Song Link | Playlist Link>",
  run: async (client, message, args) => {
   let embed = new MessageEmbed()
      .setColor(COLOR);

    //FIRST OF ALL WE WILL ADD ERROR MESSAGE AND PERMISSION MESSSAGE
    if (!args.length) {
      //IF AUTHOR DIDENT GIVE URL OR NAME
      embed.setAuthor("WRONG SYNTAX : Type `play <URL> or text`")
      return message.channel.send(embed);
    }

    const { channel } = message.member.voice;

    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("YOU NEED TO BE IN VOICE CHANNEL :/")
      return message.channel.send(embed);
    }

    //WE WILL ADD PERMS ERROR LATER :(

    const targetsong = args.join(" ");
    const videoPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
    const playlistPattern = /^.*(youtu.be\/|list=)([^#\&\?]*).*/gi;
    const urlcheck = videoPattern.test(args[0]);

    if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
      embed.setAuthor("I am Unable To Play Playlist for now")
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    const queueConstruct = {
      textChannel: message.channel,
      channel,
      connection: null,
      songs: [],
      loop: false,
      volume: 100,
      playing: true
    };

    const voteConstruct = {
      vote: 0,
      voters: []
    }

    let songData = null;
    let song = null;

    if (urlcheck) {
      try {
           const result = await ytsr(args[0], {page: 1})
        songData = result.items[0]

        song = {
          title: songData.title,
          url: songData.url,
          duration: songData.duration,
          thumbnail: songData.bestThumbnail.url,
          avatar: songData.author.bestAvatar.url,
          description: songData.description,
          author: songData.author.name,
          date: songData.uploadedAt
        };
      } catch (error) {
        if (message.include === "copyright") {
          return message
            .reply("THERE IS COPYRIGHT CONTENT IN VIDEO -_-")
            .catch(console.error);
        } else {
          console.error(error);
        }
      }
    } else {

      try {
        const result = await ytsr(targetsong, { pages: 1 })
        songData = result.items[0]

        song = {
          title: songData.title,
          url: songData.url,
          duration: songData.duration,
          thumbnail: songData.bestThumbnail.url,
          avatar: songData.author.bestAvatar.url,
          description: songData.description,
          author: songData.author.name,
          date: songData.uploadedAt
        };

      } catch (error) {
        console.log(error)
        return message.channel.send("Something went wrong!!")
      }
    }

    if (serverQueue) {
      if (serverQueue.songs.length > Math.floor(QUEUE_LIMIT - 1) && QUEUE_LIMIT !== 0) {
        return message.channel.send(`You can not add songs more than ${QUEUE_LIMIT} in queue`)
      }


      serverQueue.songs.push(song);
      embed.setAuthor("Added New Song To Queue", client.user.displayAvatarURL())
      embed.setDescription(`**[${song.title}](${song.url})**`)
      embed.setThumbnail(song.thumbnail);

      return serverQueue.textChannel
        .send(embed)
        .catch(console.error);
    } else {
      queueConstruct.songs.push(song);
    }

    if (!serverQueue)
      message.client.queue.set(message.guild.id, queueConstruct);
    message.client.vote.set(message.guild.id, voteConstruct);
    if (!serverQueue) {
      try {
        queueConstruct.connection = await channel.join();
        play(queueConstruct.songs[0], message);
      } catch (error) {
        console.error(`Could not join voice channel: ${error}`);
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel
          .send({
            embed: {
              description: `😭 | Could not join the channel: ${error}`,
              color: "#ff2050"
            }
          })
          .catch(console.error);
      }
    }
  }
};