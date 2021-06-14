const Discord = require("discord.js");
const fs = require("fs");
const { Client } = require("discord.js");
const db = require("quick.db");
const format = require(`humanize-duration`);
const ms = require("pretty-ms");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
let { Token } = require("./config.js");
for (const token of Token) {
  const client = new Client({
    disableEveryone: "everyone",
    partials: ["REACTION", "MESSAGE", "CHANNEL"]
  });
  const Discord4Bots = require("discord4bots");
  const dbl = new Discord4Bots("yhiJwowjQneauWvPaZnDfGHY", client);
  const { Database } = require("quickmongo");
  require("./reply"); //<message.inlineReply>
  const {
    Default_Prefix,
    Token,
    Support,
    id,
    Color,
    mongodb,
    Server_ID,
    DateDat,
    Dashboard
  } = require("./config.js");
  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();
  const cooldowns = new Discord.Collection();
  client.queue = new Map();
  client.vote = new Map();
  client.config = require("./emoji/emojis");
  let {
    awaitReply,
    resolveUser,
    getRandomString,
    send,
    emo,
    text,
    randomNumber,
    formating, emoji,
    translate
  } = require("./Functions.js"); //Files
  client.emotes = client.config.emojis;
  client.db = require("quick.db");
  client.data = new Database(mongodb);
  client.data2 = client.data;
  client.discord = require("discord.js");
  client.resolveUser = resolveUser;
  client.awaitReply = awaitReply;
  client.random = getRandomString;
  client.send = send;
  client.count = emo;
  client.EEmoji = emoji;
  client.text = text;
  client.format = formating;
  client.translate = translate;
  require("./index.js");
  require ("./handlers/commands.js")(client)
  //-------------------------------------------- S N I P E -------------------------------------------

  /*client.snipe = new Map();
client.on("messageDelete", function(message, channel) {
  client.snipe.set(message.channel.id, {
    content: message.content,
    author: message.author.username,
    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : null
  });
});*/

  //-------------------------------------------- A N T I  S W E A R -------------------------------------------
  //<SETUP>
  client.on("message", async message => {
    if (message.author.bot || !message.guild || message.webhookID) return;
    //   xp(message);
    let Prefix = await client.data.get(`Prefix_${message.guild.id}`);
    if (!Prefix) Prefix = Default_Prefix;
    const escapeRegex = str =>
      str.replace(/[.<>`•√π÷×¶∆£¢€¥*@_+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(
      `^(<@!?${client.user.id}>|${escapeRegex(Prefix)})\\s*`
    );
    if (!prefixRegex.test(message.content)) return;
    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content
      .slice(matchedPrefix.length)
      .trim()
      .split(/ +/);
    let cmd = args.shift().toLowerCase();

    let cmdx = await client.data.get(`cmd_${message.guild.id}`);
    if (cmdx) {
      let cmdy = cmdx.find(x => x.name === cmd);
      if (cmdy) message.channel.send(cmdy.responce);
    }

    let command =
      client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
    if (!command) return;
    if(command) console.log(`User: ${message.author.username} [${message.guild.name}] =>Send Command ${cmd}`)
    if (command.enabled === false) {
      const embed = new Discord.MessageEmbed()
        .setDescription(`This command is disabled.`)
        .setColor("RED")
        .setTimestamp();
      message.channel.send(embed);
      return;
    }
    if (command.premium === false) {
      let server = client.guilds.cache.get(Server_ID);
      if (!server) return;
      if (!server.members.cache.find(r => r.id === message.author.id)) {
        const embed = new Discord.MessageEmbed()
          .setDescription(
            `This command is Premium\nPlease Join [Server](https://dsc.gg/mincoder) To Get Premium Command`
          )
          .setColor("GOLD")
          .setTimestamp();
        message.channel.send(embed);
        return;
      }
    }
    //<COMMAND USAGE AND DESCRIPTION>
    if (command.args && !args.length) {
      return message.channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setTimestamp()
          .setDescription(
            `You didn't provide any arguments, ${
              message.author
            }!\nThe proper usage would be: \n\`\`\`html\n${command.usage ||
              "No Usage"}\n\`\`\`Description:\`\`\`html\n${command.description ||
              "No Description"}\n\`\`\``
          )
      );
    }
    //-------------------------------------------- P E R M I S S I O N -------------------------------------------

    if (command.botPermission) {
      let neededPerms = [];

      command.botPermission.forEach(p => {
        if (!message.guild.me.hasPermission(p)) neededPerms.push("`" + p + "`");
      });

      if (neededPerms.length)
        return message.channel.send(
          new MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setDescription(
              `I need ${neededPerms.join(
                ", "
              )} permission(s) to execute the command!`
            )
        );
    }

    if (command.authorPermission) {
      let neededPerms = [];

      command.authorPermission.forEach(p => {
        if (!message.member.hasPermission(p)) neededPerms.push("`" + p + "`");
      });
      if (neededPerms.length)
        return message.channel.send(
          new MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setDescription(
              `You do not have permission to use this command.\nThis command requires ${neededPerms.join(
                ", "
              )}`
            )
        );
    }
    if (!cooldowns.has(command.name)) {
      cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    if (timestamps.has(message.author.id)) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.channel.send(
          new MessageEmbed()
            .setColor("RED")
            .setTimestamp()
            .setDescription(
              `${client.emotes.error} Please wait **${ms(
                timeLeft
              )}** before reusing the command again.`
            )
        );
      }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    try {
      if (command) {
        command.run(client, message, args);
      }
    } catch (error) {
      const errrr = new MessageEmbed()
        .setColor("RED")
        .setTimestamp()
        .setDescription(
          `Something went wrong executing that command\nError Message: \`${
            error.message ? error.message : error
          }\``
        );
      return message.channel
        .send(errrr)
        .then(m => m.delete({ timeout: 13000 }).catch(e => {}));

      client.error(error);
    }
  });
  client
    .login(token)
    .catch(() =>
      console.log(`❌ Invalid Token Is Provided - Please Give Valid Token!`)
    );
}

// Load settings file.

