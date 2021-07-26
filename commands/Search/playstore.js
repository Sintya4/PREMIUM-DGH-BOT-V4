const Discord = require("discord.js");
const PlayStore = require("google-play-scraper");
const EmbedColor = `GREEN`;
const db = require("quick.db");
  module.exports = {
  name: "playstore",
  aliases: ["pstore", "googleplaystore", "ps"],
  description: "Show Playstore Application Information Of Your Given Name!",
  usage: "Playstore <Application Name>",
  category: "search",
  run: async (client, message, args, del) => {
    message.delete();
    if (!args[0])
      return message.channel.send(
        `Please Give Something To Search - ${message.author}`
      );

    PlayStore.search({
      term: args.join(" "),
      num: 1
    }).then(Data => {
      let App;

      try {
        App = JSON.parse(JSON.stringify(Data[0]));
      } catch (error) {
        return message.channel.send(
          `No Application Found - ${message.author.username}!`
        );
      }

      let Embed = new Discord.MessageEmbed()
        .setColor(EmbedColor || "RANDOM")
        .setThumbnail(App.icon)
        .setURL(App.url)
        .setTitle(`${App.title}`)
        .setDescription(`\`\`\`\n${App.summary}\n\`\`\``)
        .addField(`Price`,` \`\`\`\n${App.priceText}\n\`\`\``, true)
        .addField(`Developer`,`\`\`\`\n ${App.developer}\n\`\`\``, true)
        .addField(`Score`,`⭐ ${App.scoreText || "There is no ⭐"}`, true)
        .setFooter(`Requested By ${message.author.username}`)
        .setTimestamp();

      return message.channel.send(Embed).then(m => {

      m.react("✅")

      m.react("❌")

    });
    });
  }
};