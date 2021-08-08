const { Discord, discord } = require("discord.js");

const { MessageEmbed } = require("discord.js");

const moment = require("moment");

const EmbedColor = "GREEN";

const fetch = require("node-fetch");

module.exports = {
  name: "github",

  category: "search",

  usage: "Github <Name>",
  args: true,
  exmaple: "Github Emoji",

  description: `Github User Account Information!`,

  run: async (client, message, args, cha) => {
    message.delete();

    try {
      if (!args[0]) return message.channel.send(`Please Give Me A Username!`);

      fetch(`https://api.github.com/users/${args.join("-")}`)
        .then(res => res.json())
        .then(body => {
          if (body.message)
            return message.channel.send(
              `User Not Found | Please Give Me A Valid Username!`
            );

          let {
            login,
            avatar_url,
            name,
            id,
            html_url,
            public_repos,
            followers,
            following,
            location,
            created_at,
            bio
          } = body;

          const embed = new MessageEmbed()

            .setColor(EmbedColor || "RANDOM")

            .setAuthor(`${login} Information!`, avatar_url)

            .setThumbnail(`${avatar_url}`)

            .addField(`Username`, `${login}`)

            .addField(`ID`, `${id}`)

            .addField(`Bio`, `${bio || "No Bio"}`)

            .addField(`Public Repositories`, `${public_repos || "None"}`, true)

            .addField(`Followers`, `${followers || "No Followers"}`, true)

            .addField(`Following`, `${following || "No Following"}`, true)

            .addField(`Location`, `${location || "No Location"}`)

            .addField(
              `Account Created`,
              moment.utc(created_at).format("dddd, MMMM, Do YYYY")
            )

            .setFooter(`Tysm For Using Me! ${message.author.username}`);

          message.channel.send(embed).then(m => {
            m.react("❌");
          });

          client.on("messageReactionAdd", async (reaction, user) => {
            if (user.bot) return; // If the user was a bot, return.

            if (!reaction.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.

            if (reaction.emoji.name === "❌") {
              message.channel.bulkDelete(1);
            }
          });
        });
    } catch (error) {
      console.log(
        `[Commands] [github] Getting Error In github Command :

`,
        error
      );

      return message.channel
        .send(`Something Went Wrong Try Again Later!`)
        .then(m => {
          m.react("🆗");

          m.react("🔒");
        });

      client.on("messageReactionAdd", async (reaction, user) => {
        if (user.bot) return; // If the user was a bot, return.

        if (!reaction.message.guild) return; // If the user was reacting something but not in the guild/server, ignore them.

        if (reaction.emoji.name === "🔒") {
          message.channel.bulkDelete(1);
        }
      });
    }
  }
};
