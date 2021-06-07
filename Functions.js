//I WILL BE BACK AFTER 5 min
const ytdl = require('ytdl-core');
const { MessageEmbed, Client } = require("discord.js")
const { QUEUE_LIMIT, COLOR } = require("./config.js");
const yes = ['yes', 'y', 'ye', 'yea', 'correct'];
const no = ['no', 'n', 'nah', 'nope', 'fuck off'];

const format = require(`humanize-duration`);
module.exports = {
  async play(song, message) {
    const queue = message.client.queue.get(message.guild.id);
    let embed = new MessageEmbed()
      .setColor(COLOR);

    if (!song) {
      queue.channel.leave();
      message.client.queue.delete(message.guild.id);
      embed.setAuthor("MUSIC QUEUE IS ENDED NOW :/")
      return queue.textChannel
        .send(embed)
        .catch(console.error);
    }

    try {
      var stream = await ytdl(song.url, {
        highWaterMark: 1 << 25
      });
    } catch (error) {
      if (queue) {
        queue.songs.shift();
        module.exports.play(queue.songs[0], message);
      }

      if (error.message.includes === "copyright") {
        return message.channel.send("THIS VIDEO CONTAINS COPYRIGHT CONTENT");
      } else {
        console.error(error);
      }
    }

    const dispatcher = queue.connection
      .play(stream)
      .on("finish", () => {
        if (queue.loop) {
          let lastsong = queue.songs.shift();
          queue.songs.push(lastsong);
          module.exports.play(queue.songs[0], message);
        } else {
          queue.songs.shift();
          module.exports.play(queue.songs[0], message);
        }
      })
      .on("error", console.error);

    dispatcher.setVolumeLogarithmic(queue.volume / 100); //VOLUME
    embed.setAuthor("Started Playing Song", message.client.user.displayAvatarURL())
      .setDescription(`**[${song.title}](${song.url})**\n${song.description}`)
      .setImage(song.thumbnail)
      .setThumbnail(song.avatar)
      .setFooter(`${song.author} | ${song.duration}m | ${song.date}`)

    queue.textChannel
      .send(embed)
      .catch(err => message.channel.send("UNABLE TO PLAY SONG"));
  },
async awaitReply(message, question, limit = 60000, obj = false) {
        const filter = m => m.author.id === message.author.id;
      let con = await message.channel.send({
      embed: { description: question, color: "BLUE","footer": {
    "text": `Time: ${format(limit)}`
  } }
    })
        try {
            const collected = await message.channel.awaitMessages(filter, { max: 1, time: limit, errors: ['time'] });
            if (obj)return collected.first();
            return collected.first().content;
        } catch (e) {
            return false;
        }
    },
    async verify(channel, user, { time = 30000, extraYes = [], extraNo = [] } = {}) {
    const filter = res => {
      const value = res.content.toLowerCase();
      return (user ? res.author.id === user.id : true)
        && (yes.includes(value) || no.includes(value) || extraYes.includes(value) || extraNo.includes(value));
    };
    const verify = await channel.awaitMessages(filter, {
      max: 1,
      time
    });
    if (!verify.size) return 0;
    const choice = verify.first().content.toLowerCase();
    if (yes.includes(choice) || extraYes.includes(choice)) return true;
    if (no.includes(choice) || extraNo.includes(choice)) return false;
    return false;
  },
  async list(arr, conj = 'and') {
    const len = arr.length;
    if (len === 0) return '';
    if (len === 1) return arr[0];
    return `${arr.slice(0, -1).join(', ')}${len > 1 ? `${len > 2 ? ',' : ''} ${conj} ` : ''}${arr.slice(-1)}`;
  },
  async randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  async getRandomString(length) {
    var chars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var s = "";
    for (var i = 0; i < length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      s += chars.substring(rnum, rnum + 1);
    }

    return s;
  },
  async send(content, message, color) {
    if (!color) color = "RANDOM";

    return message.channel.send({
      embed: { description: content, color: color }
    });
  },
  async emo(count) {
    const mapping = {
      " ": "  ",
      "0": ":zero:",
      "1": ":one:",
      "2": ":two:",
      "3": ":three:",
      "4": ":four:",
      "5": ":five:",
      "6": ":six:",
      "7": ":seven:",
      "8": ":eight:",
      "9": ":nine:"
    };
    let coun = count
      .split("")
      .map(c => mapping[c] || c)
      .join("");
    return coun;
  },
  async text(text) {
    const emojified = `${text}`
      .toLowerCase()
      .split("")
      .map(letter => {
        if (/[a-z]/g.test(letter)) {
          return `:regional_indicator_${letter}: `;
        }

        return letter;
      })
      .join("");
    return emojified;
  },
  async resolveUser(search) {
    if (!search || typeof search !== "string") return null;
    let user = null;
    if (search.match(/^<@!?(\d+)>$/))
      user = this.users.fetch(search.match(/^<@!?(\d+)>$/)[1]).catch(() => {});
    if (search.match(/^!?(\w+)#(\d+)$/) && !user)
      user = this.users.cache.find(
        u =>
          u.username === search.match(/^!?(\w+)#(\d+)$/)[0] &&
          u.discriminator === search.match(/^!?(\w+)#(\d+)$/)[1]
      );
    if (search.match(/.{2,32}/) && !user)
      user = this.users.cache.find(u => u.username === search);
    if (!user) user = this.users.fetch(search).catch(() => {});
    return user;
  },
 async formating(ms) {
  let days, daysms, hours, hoursms, minutes, minutesms, sec;
  days = Math.floor(ms / (24 * 60 * 60 * 1000));
  daysms = ms % (24 * 60 * 60 * 1000);
  hours = Math.floor(daysms / (60 * 60 * 1000));
  hoursms = ms % (60 * 60 * 1000);
  minutes = Math.floor(hoursms / (60 * 1000));
  minutesms = ms % (60 * 1000);
  sec = Math.floor(minutesms / 1000);

  return (
    days +
    " Days, " +
    hours +
    " Hours, " +
    minutes +
    " Minutes, " +
    sec +
    " Seconds."
  );
},
 async translate(text, message) {
    let language = await client.data.get(`LANG_${message.guild.id}`);
    let translate = require("@k3rn31p4nic/google-translate-api");
    const translated = await translate(text, {
      to: language || "english"
    });
    return translated.text;
  }

};