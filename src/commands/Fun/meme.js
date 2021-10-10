const https = require("https");
const Discord = require("discord.js");
const url = [
  "https://www.reddit.com/r/dankmemes/hot/.json?limit=100",
  "https://www.reddit.com/r/memes/hot/.json?limit=100"
];
module.exports = {
  name: "meme",
  category: "fun",
  description: "Sends a random meme",
  run: async (client, message, args) => {
    https.get(url[Math.floor(Math.random() * url.length)], result => {
      let body = "";
      result.on("data", chunk => {
        body += chunk;
      });
      result
        .on("end", async () => {
          let response = JSON.parse(body);
          let index =
            response.data.children[Math.floor(Math.random() * 99) + 1].data;
          if (index.post_hint !== "image") {
            return message.channel.send({
              embeds: [
                new Discord.MessageEmbed()
                  .setAuthor("r/dankmemes")
                  .setDescription('error getting image, try again in a moment')
                  .setColor("RANDOM")
              ]
            });
          }
          let image = index.url;
          let title = index.title;
          return message.channel.send({
            embeds: [
              new Discord.MessageEmbed()
                .setAuthor("r/dankmemes")
                .setImage(image)
                .setColor("RANDOM")
            ]
          });
        })
        .on("error", error => {
          client.send(error, {message});
          return false;
        });
    });
  }
};
