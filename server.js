const Discord = require("discord.js");
const fs = require("fs");
const { Client } = require("discord.js");
const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const Discord4Bots = require("discord4bots");
const { Database } = require("quickmongo");
let dd = require('discord-buttons-plugins');
const YoutubePoster = require("discord-yt-poster");
let ddl = require('discord-buttons');

const { Owner, Developer, Support, Dashboard, Server_ID } = require("./config.js");
let { Token, mongodb } = require("./config.js")
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
  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();
  client.slashcommands = new Discord.Collection();
  client.data = new Database(mongodb);
  client.queue = new Map();
  client.vote = new Map();
//<Require Files>
  client.config = require("./emoji/emojis");
  client.discord = require("discord.js");
  client.db = require("quick.db");
  client.button = new dd(client)
  client.request = new (require("rss-parser"))();
  require("./index.js");
  require("./handlers/Level-Up.js")(client);
  require("./handlers/reply.js"); //<message.inlineReply>
  require ("./handlers/commands.js")(client)
  client.YTP = new YoutubePoster(client);
 
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
  global.client = client;
  
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
