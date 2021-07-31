const fs = require("fs");
const mongoose = require("mongoose");
let { mongodb, Default_Prefix, url_uptime } = require("../../config.js");
let fetch = require("node-fetch");
module.exports = async client => {
  setInterval(async () => {
    await fetch(url_uptime);
  }, 2400);
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
    handleUploads();
    console.clear();
    console.log(`Bot Is Ready To Go!\nTag: ${client.user.tag}`);
    client.user
      .setPresence({
        activity: {
          type: "WATCHING",
          name: `Commands: ${Default_Prefix}help | ${client.user.username}\nIn ${client.guilds.cache.size} Servers | with ${users} Users | in ${client.channels.cache.size} Channels`
        },
        status: "idle"
      })
      .then(console.log)
      .catch(console.error);

    const commandFiles = fs
      .readdirSync("./slashcommands")
      .filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`../../slashcommands/${file}`);
      if (command.global == true) {
        client.api.applications(client.user.id).commands.post({
          data: {
            name: command.name,
            description: command.description,
            options: command.commandOptions
          }
        });
      }
      client.slashcommands.set(command.name, command);
      console.log(`🟩 Command POST: ${command.name} | Global | ${file}`);
    }
    console.log("");

    let cmdArrGlobal = await client.api
      .applications(client.user.id)
      .commands.get();
    cmdArrGlobal.forEach(element => {
      console.log(
        "🟩 Global command loaded : " + element.name + " (" + element.id + ")"
      );
    });
    console.log("");
  });

  client.ws.on("INTERACTION_CREATE", async interaction => {
    if (!client.commands.has(interaction.data.name)) return;
    let clicker = {
      id: interaction.guild_id
        ? interaction.member.user.id
        : interaction.user.id,
      user: client.users.resolve(
        interaction.guild_id ? interaction.member.user.id : interaction.user.id
      ),
      member: interaction.guild
        ? interaction.guild.members.resolve(interaction.member.user.id)
        : undefined
    };
   try {
      client.slashcommands
        .get(interaction.data.name)
        .execute(client, message, clicker, interaction.data.options);
    } catch (error) {
      console.error(
        `🟥 Error Slash Command: ${interaction.data.name} | ${error.message}`
      );
      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            flags: 64,
            content: `Sorry, there was an error executing that command!`
          }
        }
      });
    }
    async function message(
      content,
      { embed, files, tts, allowed_mentions, flags, ephemeral } = {}
    ) {
      return client.api
        .interactions(interaction.id, interaction.token)
        .callback.post({
          data: {
            type: 4,
            data: {
              content,
              embeds: [embed],
              files,
              tts,
              allowed_mentions,
              flags: ephemeral ? 64 : flags
            }
          }
        });
    }
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
  //send msg if connection lost to mongodb

  function handleUploads() {
    if (client.db.fetch(`postedVideos`) === null)
      client.db.set(`postedVideos`, []);
    setInterval(() => {
      client.request
        .parseURL(
          `https://www.youtube.com/feeds/videos.xml?channel_id=UCCYx4dmf08Am_KHQe7KPAsg`
        )
        .then(data => {
          if (client.db.fetch(`postedVideos`).includes(data.items[0].link))
            return;
          else {
            client.db.set(`videoData`, data.items[0]);
            client.db.push("postedVideos", data.items[0].link);
            let parsed = client.db.fetch(`videoData`);
            let channel = client.channels.cache.get("821904810772660255");
            if (!channel) return;

            let message = "Hello @everyone, **{author}** just now uploaded a video **{title}**!\n{url}"
              .replace(/{author}/g, parsed.author)
              .replace(
                /{title}/g,
                client.discord.Util.escapeMarkdown(parsed.title)
              )
              .replace(/{url}/g, parsed.link);
            channel.send(message);
          }
        });
    }, 30000);
  }
};
