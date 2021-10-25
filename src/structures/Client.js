const {
  Intents,
  Client,
  Collection,
  Discord,
  Message,
  MessageEmbed,
  MessageButton,
  MessageActionRow
} = require("discord.js");
const ytdl = require("ytdl-core");
const fetch = require("node-fetch");
const dblist = require("dblist.api");
const { GiveawaysManager } = require("discord-giveaways");
const {
  bot,
  server,
  image,
  mod,
  logs,
  status,
  giveaway
} = require("../../config");
const YoutubePoster = require("discord-yt-poster");
const { Database } = require("quickmongo");
const format = require(`humanize-duration`);
const moment = require("moment");

module.exports = class DGH_BOT_CLIENT extends Client {
  constructor() {
    super({
      messageCacheLifetime: 60,
      fetchAllMembers: false,
      messageCacheMaxSize: 10,
      restTimeOffset: 0,
      restWsBridgetimeout: 100,
      shards: "auto",
      allowedMentions: { parse: ["users", "roles"], repliedUser: true },
      partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"],
      intents: Object.keys(Intents.FLAGS).filter(f => f.startsWith("GUILD"))
    });
    /**
     * @constructor
     * @param  {discord.Client} client
     */

    //=================== C L I E N T ===================
    this.commands = new Collection();
    this.aliases = new Collection();
    this.cooldowns = new Collection();
    this.buttons = new Collection();
    this.selects = new Collection();
    this.slashs = new Collection();
    this.snipe = new Map();
    this.config = require("../../config");
    this.image = require("./Other/image");
    this.Discord = require("discord.js");
    this.data = new Database(bot.mongourl);
    this.db = require("quick.db");
    this.YTP = new YoutubePoster(this);
    this.ops = require("./Other/options");
    this.queue = new Map();
    this.vote = new Map();
    this.giveawaysManager = new GiveawaysManager(this, giveaway.default);
  }

  //=================== F U N C T I O N ===================
  async start() {
    const dbl = new dblist("API", this);
    const { init } = require("./mongoose");
    require("./verifyConfig")(this.config);
    init();
    super.login(bot.token);
    this.on("ready", async () => {
      console.log(`Bot Is Ready To Go!\nTag: ${this.user.tag}`);
      this.sendhook(null, {
        channel: logs.boton,
        embed: [
          new MessageEmbed()
            .setColor("GREEN")
            .setDescription(
              `${await this.emoji("DGH_success")} ${
                this.user.tag
              } is now ${await this.user.presence.status}\n\n${await this.emoji(
                "DGH_create_at"
              )} ${moment
                .tz("Asia/Jakarta")
                .format("llll")}\n\n${await this.emoji("DGH_role")} Cached ${
                this.users.cache.size
              } Users, ${this.channels.cache.size} Channels and ${
                this.guilds.cache.size
              } Servers `
            )
        ],
        name: "DGH STATUS"
      });
      let users = 0;
      this.guilds.cache.forEach(x => {
        users += x.memberCount;
      });
      this.user.setPresence({
        activities: [
          {
            type: this.config.status.type,
            name: this.config.status.name
              .split("<channel>")
              .join(this.channels.cache.size)
              .split("<server>")
              .join(this.guilds.cache.size)
              .split("<user>")
              .join(users)
          }
        ],
        status: this.config.status.stats
      });
      require("../dashboard/app")(this);
      require("./SlashCommands")(this);
      dbl.server_count();
    });
  }
  async resolveUser(search) {
    if (!search || typeof search !== "string") return null;
    let user = null;
    search = search.split(" ").join("");
    if (search.match(/^<@!?(\d+)>$/))
      user = await this.users
        .fetch(search.match(/^<@!?(\d+)>$/)[1])
        .catch(() => {});
    if (search.match(/^!?(\w+)#(\d+)$/) && !user)
      user = this.users.cache.find(
        u =>
          u.username === search.match(/^!?(\w+)#(\d+)$/)[0] &&
          u.discriminator === search.match(/^!?(\w+)#(\d+)$/)[1]
      );
    if (search.match(/.{2,32}/) && !user)
      user = this.users.cache.find(u => u.username === search);
    if (!user) user = await this.users.fetch(search).catch(() => {});
    return user;
  }
  /**
   * @returns {Promise<GuildMember>|null}
   * @param {string} search
   * @param {Guild} guild
   */
  async resolveMember(search, guild) {
    if (!search || typeof search !== "string") return null;
    search = search.split(" ").join("");
    const user = await this.resolveUser(search);
    if (!user) return null;
    try {
      return await guild.members.fetch(user);
    } catch (e) {
      null;
    }
  }
  /**
   * @returns {Role|null}
   * @param {string} search
   * @param {Guild} guild
   */
  resolveRole(search, guild) {
    if (!search || typeof search !== "string") return null;
    search = search.split(" ").join("");
    let role = null;
    if (search.match(/^<@&!?(\d+)>$/))
      role = guild.roles.cache.get(search.match(/^<@&!?(\d+)>$/)[1]);
    if (!role) role = guild.roles.cache.find(r => r.name === search);
    if (!role) role = guild.roles.cache.get(search);
    return role;
  }
  /**
   * @returns {Channel|null}
   * @param {string} search
   */
  resolveChannel(search) {
    if (!search) return null;
    let channel = null;
    channel = this.channels.cache.get(
      search
        .replace("<", "")
        .replace("#", "")
        .replace(">", "")
        .split(" ")
        .join("")
    );
    if (!channel) channel = this.channels.cache.find(c => c.name === search);
    if (!channel) channel = this.channels.cache.get(search);
    return channel;
  }
  async getRandomString(length) {
    var chars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var s = "";
    for (var i = 0; i < length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      s += chars.substring(rnum, rnum + 1);
    }
    return s;
  }
  async timestamp(time, form) {
    var minutes = Math.floor(time / 1000) % 60;
    var hours = Math.floor(minutes / 60) % 24;
    var days = Math.floor(hours / 24) % 7;
    var weeks = Math.floor(days / 7) % 1;
    var d = new Date();
    var year = d.getUTCFullYear();
    var month = d.getUTCMonth();
    var day = d.getUTCDate();
    var hour = d.getUTCHours();
    var minute = d.getUTCMinutes();
    var second = d.getUTCSeconds();
    var datum = new Date(
      Date.UTC(
        year,
        month,
        day + days + weeks * 7,
        hour + hours,
        minute + minutes,
        second
      )
    );
    if (form) {
      return "<t:" + datum.getTime() / 1000 + `:${form || ""}>`;
    } else {
      return "<t:" + datum.getTime() / 1000 + `>`;
    }
  }
  async awaitReply(
    content = null,
    {
      message,
      image,
      embed,
      color = "BLUE",
      max = 1,
      time = 60000,
      obj = false
    }
  ) {
    const filter = m => m.author.id === message.author.id;
    await message.channel.send({
      embeds: embed
        ? embed
        : [
            {
              description: content,
              color: color,
              image: {
                url: image ? image : null
              },
              footer: {
                text: `Time: ${format(time)}`
              }
            }
          ]
    });

    try {
      const collected = await message.channel.awaitMessages({
        filter,
        max: max,
        time: time,
        errors: ["time"]
      });
      if (obj) {
        return collected.first();
      }
      return collected.first().content;
    } catch (e) {
      return false;
    }
  }
  async send(
    content = null,
    {
      message,
      embed,
      color = "RANDOM",
      image,
      timeout,
      channel = null,
      type = null
    }
  ) {
    let msg = (await type)
      ? ((await this.resolveUser(channel)) || message.author)
          .send({
            embeds: embed
              ? embed
              : [
                  {
                    author: {
                      icon_url: message.author.displayAvatarURL({
                        dynamic: true
                      }),
                      name: message.author.username
                    },
                    description: content,
                    color: color,
                    image: {
                      url: image ? image : null
                    }
                  }
                ]
          })
          .then(a => {
            if (timeout) {
              setTimeout(() => {
                a.delete();
              }, timeout);
            } else null;
          })
      : (channel ? this.channels.cache.get(channel) : message.channel)
          .send({
            embeds: embed
              ? embed
              : [
                  {
                    author: {
                      icon_url: message.author.displayAvatarURL({
                        dynamic: true
                      }),
                      name: message.author.username
                    },
                    description: content,
                    color: color,
                    image: {
                      url: image ? image : null
                    }
                  }
                ]
          })
          .then(a => {
            if (timeout) {
              setTimeout(() => {
                a.delete();
              }, timeout);
            } else null;
          });

    return { message: msg };
    //EZ :V
  }
  async sendhook(
    msg,
    {
      remove = false,
      channel,
      embed = null,
      name = "DGH HOOK",
      avatar = this.user.displayAvatarURL()
    }
  ) {
    if (!channel || typeof channel !== "string")
      throw new SyntaxError("Invaild Channel");
    const channel_ = await this.resolveChannel(channel);
    let webhook = await channel_
      .fetchWebhooks()
      .then(x => x.find(x => x.name === name));
    if (!webhook)
        webhook = await channel_.createWebhook(name, {avatar});
    return await webhook.send(embed ? { embeds: embed } : msg).then(e => {
      remove ? webhook.delete() : e;
    });
  }
  async emoji(name, option) {
    let emojis = this.emojis.cache.find(x => x.name === name);
    if (!emojis) return `:${name}:`;
    if (option === "id") {
      return emojis.id;
    }
    if (option === "name") {
      return emojis.name;
    }
    if (emojis) {
      return name
        .split(new RegExp(name, "g"))
        .join(emojis.toString())
        .split(" ")
        .join("_");
    }
  }
};
