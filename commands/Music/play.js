const { Default_Prefix, Color } = require("../../config.js");
const { GetRegxp, Linker, Objector, Player } = require("../../Functions.js");
const Discord = require("discord.js"), Sr = require("youtube-sr"), syt = require("scrape-yt"), Ytdl = require("discord-ytdl-core"), db = require("quick.db");

module.exports = {
  name: "play",
  aliases: ["p"],
  category: "music",
  description: "Play Music With Link Or Playlist Or Query!",
  usage: "Play <Song Name | Song Link | Playlist Link>",
  args: true,
  cooldown: 5 ,
 run: async (client, message, args) => {
    const Channel = message.member.voice.channel;
    if (!Channel)
      return message.channel.send("Please Join A Voice Channel To Play Music!");
    if (!args[0])
      return message.channel.send(
        "Please Give Any Of The Following :\nYoutube Video (Link - ID) , Youtube Playlist (Link - ID) , Query"
      );
    if (
      !Channel.permissionsFor(message.guild.me).has("CONNECT") ||
      !Channel.permissionsFor(message.guild.me).has("SPEAK")
    )
      return message.channel.send(
        "I Don't Have Enough Permissions To Play Music - Connect , Speak"
      );
    
    if (!Channel.joinable) return message.channel.send("I Can't Join The Voice Channel!");

    const YtID = await GetRegxp("YtID"),
      YtUrl = await GetRegxp("YtUrl"),
      YtPlID = await GetRegxp("YtPlID"),
      YtPlUrl = await GetRegxp("YtPlUrl"),
      Base = await Linker("Base");
    let Song = null,
      SongInfo = null,
      Playlist = null;
    const ServerQueue = await client.queue.get(message.guild.id);

    if (YtID.test(args[0])) {
      try {
        const Link = await Linker(args[0]);
        const Info = await Ytdl.getInfo(Link);
        SongInfo = Info.videoDetails;
        Song = await Objector(SongInfo, message);
      } catch (error) {
        console.log(error);
        return message.channel.send("Error: No Video Found (ID)!");
      }
    } else if (YtUrl.test(args[0]) && !args[0].toLowerCase().includes("list")) {
      try {
        const Info = await Ytdl.getInfo(args[0]);
        SongInfo = Info.videoDetails;
        Song = await Objector(SongInfo, message);
      } catch (error) {
        console.log(error);
        return message.channel.send(
          "Error: Something Went Wrong Or No Video Found (Link)!"
        );
      }
    } else if (
      YtPlID.test(args[0]) &&
      !args[0].toLowerCase().startsWith("http")
    ) {
      try {
        const Info = await syt.getPlaylist(args[0]);
        const YtInfo = await Ytdl.getInfo(
          `https://www.youtube.com/watch?v=${Info.videos[0].id}`
        );
        SongInfo = YtInfo.videoDetails;
        Song = await Objector(SongInfo, message);
        const Arr = [];
        for (const Video of Info.videos) {
          const Infor = await Ytdl.getInfo(
            `https://www.youtube.com/watch?v=${Video.id}`
          );
          const Detail = Infor.videoDetails;
          await Arr.push(await Objector(Detail, message));
        }
        Playlist = {
          Yes: true,
          Data: Arr
        };
      } catch (error) {
        console.log(error);
        return message.channel.send(
          "Error: Something Went Wrong Or No Playlist Found Or Playlist Videos Are Private Or No Videos (ID)!"
        );
      }
    } else if (YtPlUrl.test(args[0])) {
      try {
        const Splitter = await args[0].split("list=")[1];
        console.log(Splitter);
        const Info = await syt.getPlaylist(
          Splitter.endsWith("/") ? Splitter.slice(0, -1) : Splitter
        );
        const YtInfo = await Ytdl.getInfo(
          `https://www.youtube.com/watch?v=${Info.videos[0].id}`
        );
        SongInfo = YtInfo.videoDetails;
        Song = await Objector(SongInfo, message);
        const Arr = [];
        for (const Video of Info.videos) {
          const Infor = await Ytdl.getInfo(
            `https://www.youtube.com/watch?v=${Video.id}`
          );
          const Detail = Infor.videoDetails;
          await Arr.push(await Objector(Detail, message));
        }
        Playlist = {
          Yes: true,
          Data: Arr
        };
      } catch (error) {
        console.log(error);
        return message.channel.send(
          "Error: Something Went Wrong Or No Playlist Found Or Playlist Videos Are Private Or No Videos (Url)!"
        );
      }
    } else {
      try {
        await Sr.search(args.join(" ")).then(async Info => {
           const YtInfo = await Ytdl.getInfo(`https://www.youtube.com/watch?v=${Info.id}`);
          SongInfo = YtInfo.videoDetails;
          Song = await Objector(SongInfo, message);
        });
      } catch (error) {
        console.log(error);
        return message.channel.send(
          "Error: Something Went Wrong Or No Video Found (Query)"
        );
      };
    };

    let Joined;
    try {
      Joined = await Channel.join();
      Channel.guild.voice.setSelfDeaf(true);
     } catch (error) {
      console.log(error);
      return message.channel.send("Error: I Can't Join The Voice Channel!");
    };

    if (ServerQueue) {
      if (Playlist && Playlist.Yes) {
        const Embed = new Discord.MessageEmbed()
          .setColor(Color)
          .setTitle("Playlist Added!")
          .setThumbnail(Playlist.Data[0].Thumbnail)
          .setDescription(
            `[Playlist](${
              args[0].includes("http")
                ? args[0]
                : `https://www.youtube.com/playlist?list=${args[0]}`
            }) Has Been Added To Queue!`
          )
          .setTimestamp();
        await Playlist.Data.forEach(async Video => {
          try {
            await ServerQueue.Songs.push(Video);
          } catch (error) {
            await Channel.leave().catch(() => {});
            return message.channel.send(
              "Error: Something Went Wrong From Bot Inside!"
            );
          }
        });
        return message.channel
          .send(Embed)
          .catch(() =>
            message.channel.send("Playlist Has Been Added To Queue!")
          );
      } else {
        const Embed = new Discord.MessageEmbed()
          .setColor(Color)
          .setTitle("Song Added!")
          .setThumbnail(Song.Thumbnail)
          .setDescription(
            `[${Song.Title}](${Song.Link}) Has Been Added To Queue!`
          )
          .setTimestamp();
        await ServerQueue.Songs.push(Song);
        return message.channel
          .send(Embed)
          .catch(() => message.channel.send("Song Has Been Added To Queue!"));
      }
    }

    const Database = {
      TextChannel: message.channel,
      VoiceChannel: Channel,
      Steam: null,
      Bot: Joined,
      Songs: [],
      Filters: {},
      Volume: 100,
      Loop: false,
      Always: false,
      Playing: true
    };

    await client.queue.set(message.guild.id, Database);

    if (Playlist && Playlist.Yes) {
      await Playlist.Data.forEach(ele => Database.Songs.push(ele));
    } else {
      await Database.Songs.push(Song);
    };

    try {
      await Player(message, Discord, client, Ytdl, { Play: Database.Songs[0], Color: Color }, db);
    } catch (error) {
      console.log(error);
      await client.queue.delete(message.guild.id);
      await Channel.leave().catch(() => {});
      return message.channel.send(
        "Error: Something Went Wrong From Bot Inside"
      );
    }
  }
};
