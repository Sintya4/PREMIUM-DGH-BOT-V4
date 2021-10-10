const Discord = require("discord.js");
module.exports = {
  name: "embed",
  category: "utility",
  description: "Get bot embed :/",
  usage: "embed [...Text]\nembed -json [Raw JSON]",
  args: true,
  run: async (client, message, args) => {
    const [key, ...value] = args;
    switch (key) {
      case "-json": {
        try {
          const json = JSON.parse(args.join(" "));
          return message.channel.send({
            embeds: [json]
          });
        } catch (error) {
          return message.channel.send(
            "Go to the web: https://embedbuilder.nadekobot.me/"
          );
        }
      }
    }
    return message.channel.send({
      embeds: [
        new Discord.MessageEmbed()
          .setDescription(args.join(" "))
          .setColor("RANDOM")
      ]
    });
  }
};
