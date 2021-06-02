const https = require("https");
const Discord = require("discord.js");
const url = [
  "https://www.reddit.com/r/dankmemes/hot/.json?limit=100",
  "https://www.reddit.com/r/memes/hot/.json?limit=100"
];
module.exports = {
  name: "meme",
  usage: `meme`,
  category: "fun",
  description: "Sends a random meme",
  args: false,
  cooldown: 1,
  permission: "",

  run: async (client, message, args) => {
    //code
    message.delete();

    https.get(url[Math.floor(Math.random() * url.length)], result => {
      let body = "";
      result.on("data", chunk => {
        body += chunk;
      });
      result
        .on("end", () => {
          let response = JSON.parse(body);
          let index =
            response.data.children[Math.floor(Math.random() * 99) + 1].data;
          if (index.post_hint !== "image") {
            return message.channel.send(
              new Discord.MessageEmbed()
                .setAuthor("r/dankmemes")
                .setColor("RANDOM")
              //        .setDescription(`[${title}](${client.unicron.serverInviteURL})`));
            );
          }
          let image = index.url;
          let title = index.title;
          return message.channel.send(
            new Discord.MessageEmbed()
              .setAuthor("r/dankmemes")
              .setImage(image)
              .setColor("RANDOM")
            // .setDescription(`[${title}](${client.unicron.serverInviteURL})`));
          );
        })
        .on("error", error => {
          client.logger.error(error);
          return false;
        });
    });
  }
};
