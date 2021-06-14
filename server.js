const Discord = require("discord.js");
const fs = require("fs");
const { Client } = require("discord.js");
const db = require("quick.db");
const format = require(`humanize-duration`);
const ms = require("pretty-ms");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
let { Token , mongodb , Default_Prefix, Server_ID, Support} = require("./config.js");
const Discord4Bots = require("discord4bots");
const { Database } = require("quickmongo");
 

for (const token of Token) {
  const client = new Client({
    disableEveryone: "everyone",
    partials: ["REACTION", "MESSAGE", "CHANNEL"]
  });
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
  
  //<NEW COLLECTION>
  const dbl = new Discord4Bots("yhiJwowjQneauWvPaZnDfGHY", client);
  const cooldowns = new Discord.Collection();
  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();
  client.data = new Database(mongodb);
  client.queue = new Map();
  client.vote = new Map();
  
//<Require Files>
  client.config = require("./emoji/emojis");
  client.discord = require("discord.js");
  client.db = require("quick.db");
  require("./index.js");
  require("./handlers/Level-Up.js")(client);
  require("./handlers/reply.js"); //<message.inlineReply>
  require ("./handlers/commands.js")(client)
 
//<New Client>
  client.data2 = client.data;
  client.emotes = client.config.emojis;
  client.resolveUser = resolveUser;
  client.awaitReply = awaitReply;
  client.random = getRandomString;
  client.send = send;
  client.count = emo;
  client.EEmoji = emoji;
  client.text = text;
  client.format = formating;
  client.translate = translate;
 
  
  //<SETUP>
  client.on("message", async message => {
    if (message.author.bot || !message.guild || message.webhookID) return;
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
            `This command is Premium\nPlease Join [Server](${Support}) To Get Premium Command`
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
    
    //-------------------------------------------- C O O L  D O W N S -------------------------------------------
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
    //-------------------------------------------- B O T  L O G I N -------------------------------------------
  
  client
    .login(token)
    .catch(() =>
      console.log(`❌ Invalid Token Is Provided - Please Give Valid Token!`)
    );
}

//-------------------------------------------- I N F O R M A T I O N -------------------------------------------
 

//Made By Sintya
//Edit By Sintya

//Made on 12/5/2021
//All Cmd Working
//Copyright 2021 
//Github: Sintya4
//Discord Name: @么Sintya#0001
//Discord ID: 740947753135243354
//Source Github: github.com/sintya4/DGH-BOT-V3
//Website Bot List: discord4bots.tk
//Bot Name: DGH BOT V2
//Support My server 
//Link: dsc.gg/mincoder

//Config.js
// exports.Token = ["TOKEN BOT","TOKEN BOT#2"]///ot Token - Important
e// xports.Owner = "7Owner ID; //Bot Owner ID - Important
e// xports.Developer = "7Dev ID; //Bot Dev ID - Important
e// xports.Default_Prefix = "!PREFIX THE BOT; //Bot Default Prefix (Examples: A!, !)- Important
e* xports.COLOR = "BLUE";
 //Bot All Embeds Music;e* xports.Color = "RANDOM"; //Bot All Embeds Color - Use CAPS For Name (Examples: BLUE, RANDOM) - Important
e* xports.Support = "hLINK SERVER; //Support Server Link - Never Gonna Give You Up (If No Link Provided)
e* xports.Dashboard = "hWEBSITE BOT; //Dashboard Your Bot
e* xports.Server_ID = "8SERVER FOR PREMIUM COMMANDS; // ID Your Server
e* exports.mongodb = "MONGODB";
* exports.QUEUE_LIMIT = 0;
