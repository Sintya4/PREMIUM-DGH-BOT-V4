const fs = require("fs");
const mongoose = require("mongoose");
let { mongodb, Default_Prefix, url_uptime } = require("../../config.js");
let fetch = require("node-fetch");
let Discord = require("discord.js");
let MessageEmbed = Discord.MessageEmbed;

module.exports = async client => {
  client.on("ready", async () => {
    await mongoose.connect(mongodb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    let users = 0;
    client.guilds.cache.forEach(x => {
      users += x.memberCount;
    });
    console.clear();
    console.log(`Bot Is Ready To Go!\nTag: ${client.user.tag}`);
    client.user
      .setPresence({
        activity: {
          type: "WATCHING",
          name: `Commands: ${Default_Prefix}help | ${client.user.username}\nIn ${client.guilds.cache.size} Servers | with ${users} Users | in ${client.channels.cache.size} Channels\nUpdate Command`
        },
        status: "idle"
      })
      .then(console.log)
      .catch(console.error);

    //Slash Cmd
    require("../../handlers/Slash-ready.js")(client);
  });

  mongoose.connection.on("connected", () => {
    console.log("Mongoose has successfully connected!");
  });
  // send msg if successfull connection to mongodb
  mongoose.connection.on("err", err => {
    console.error(`Mongoose connection error: \n${err.stack}`);
  });
  // send msg if error on connection
  mongoose.connection.on("disconnected", () => {
    console.warn("Mongoose connection lost");
  });
  setInterval(async () => {
    await fetch(url_uptime);
  }, 2400);
};
//Create By Sintya
