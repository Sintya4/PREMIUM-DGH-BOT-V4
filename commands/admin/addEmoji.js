const Discord = require("discord.js");
const { parse } = require("twemoji-parser");
const { MessageEmbed } = require("discord.js");
const Color = `RANDOM`;

module.exports = {
  name: "addemoji",
  category: "admin",
  permissions: "MANAGE_EMOJIS",
  args: true,
  description: "addemoji <url>",
  usage: "addemoji <url>",
  authorPermission: ["MANAGE_EMOJIS"],
  botPermission: ["MANAGE_EMOJIS"],
  run: async (client, message, args) => {
    const emoji = args[0];
    const name = args.slice(1).join(" ").replace(" ","_").replace("'","_").replace("-","_").replace(".","_").replace("+","_");
    if(!name){return message.channel.send("Pls Give Name Emoji")}
    message.guild.emojis.create(`${emoji}`, `${name}`);
    const Added = new MessageEmbed()
      .setTitle(`Emoji Added`)
      .setColor(`${Color}`)
      .setDescription(
        `Emoji Has Been Added! | Name : ${name ||
          `${name}`} | Preview : [Click Me](${emoji})`
      );
    message.delete()
    return message.channel.send(Added);
  }
};
