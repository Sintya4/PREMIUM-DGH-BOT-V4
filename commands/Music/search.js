const { Default_Prefix, Color } = require("../../config.js");
const { Player, Objector } = require("../../Functions.js");
const Discord = require("discord.js");
const db = require("quick.db"),
  Sr = require("youtube-sr"),
  Ytdl = require("discord-ytdl-core");

module.exports = {
  name: "search",
  aliases: [],
  category: "music",
  description: "Search Music!",
  usage: "Search",
  run: async (client, message, args) => {
    const Channel = message.member.voice.channel;

    if (!Channel) return message.channel.send("Please Join A Voice Channel!");
    if (!args[0]) return message.channel.send("Please Give Query To Search!");

    const Queue = await client.queue.get(message.guild.id);

    if (
      !Channel.permissionsFor(message.guild.me).has("CONNECT") ||
      !Channel.permissionsFor(message.guild.me).has("SPEAK")
    )
      return message.channel.send(
        "I Don't Have Enough Permissions To Play Music - Connect , Speak"
      );

    if (!Channel.joinable)
      return message.channel.send("I Can't Join The Voice Channel!");

    await Sr.search(args.join(" "), { limit: 10 }).then(async Data => {
      if (!Data[0].id)
        return message.channel.send(
          "Error: Something Went Wrong Or No Video Found"
        );
      const All = await Data.map(
          (Video, Position) =>
            `${Position + 1}. **[${
              Video.title.length > 100 ? Video.title + "..." : Video.title
            }](https://youtube.com/watch?v=${Video.id})**`
        ),
        Filter = m => m.author.id === message.author.id;
      
      const Embed = new Discord.MessageEmbed()
      .setColor(Color)
      .setTitle("Please Choose")
      .setDescription(All)
      .setFooter("Please Select Betweent 1 - 10, Time: 5 Minutes")
      .setTimestamp();
      
      message.channel.send(Embed).catch(() => message.channel.send(`Please Select Between 1 - 10, Time: 5 Minutes\n\n${All}`))

      await message.channel
        .awaitMessages(Filter, { max: 1, time: 300000, errors: ["time"] })
        .then(async Msg => {
          let Content = parseInt(Msg.first().content),
            SongInfo = null,
            Song = null;
          Msg = Msg.first();
          if (isNaN(Content))
            return message.channel.send(
              "Invalid Number Provided, Search Cancelled"
            );
          if (Content - 1 > All.length || !All[Content])
            return message.channel.send(
              "Invalid Number Provided, Search Cancelled"
            );

          try {
            const Find = await Data.find(Dat => Dat === Data[Content - 1]);
            console.log(Find);
            const YtInfo = await Ytdl.getInfo(
              `https://youtube.com/watch?v=${Find.id}`
            );
            SongInfo = YtInfo.videoDetails;
            Song = await Objector(SongInfo, message);
          } catch (error) {
            console.log(error)
            return message.channel.send("Error: Something Went Wrong");
          }

          let Joined;
          try {
            Joined = await Channel.join();
              Channel.guild.voice.setSelfDeaf(true);
  } catch (error) {
            console.log(error);
            return message.channel.send(
              "Error: I Can't Join The Voice Channel!"
            );
          }

          if (Queue) {
            const Embed = new Discord.MessageEmbed()
              .setColor(Color)
              .setTitle("Song Added!")
              .setThumbnail(Song.Thumbnail)
              .setDescription(
                `[${Song.Title}](${Song.Link}) Has Been Added To Queue!`
              )
              .setTimestamp();
            await Queue.Songs.push(Song);
            return message.channel
              .send(Embed)
              .catch(() =>
                message.channel.send("Song Has Been Added To Queue!")
              );
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

          await Database.Songs.push(Song);

          try {
            await Player(message, Discord, client, Ytdl, {
              Play: Database.Songs[0],
              Color: Color
            }, db);
          } catch (error) {
            console.log(error);
            await client.queue.delete(message.guild.id);
            await Channel.leave().catch(() => {});
            return message.channel.send(
              "Error: Something Went Wrong From Bot Inside"
            );
          }
        });
    });
  }
};