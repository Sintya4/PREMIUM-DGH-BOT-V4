const { Message, MessageEmbed } = require("discord.js");
//const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
//const db = require("wio.db");
const moment = require("moment");
const fetch = require("node-fetch");

const url = require("url");

module.exports = {
  name: "ss",
  aliases: ["screenshot"],
  category: "search",
  description: "Takes a screenshot of any webpage.",
  usage: "screenshot <URL>",
  args: true,
  run: async (client, message, args) => {
    message.delete();
    const user = message.author.tag
    const urls = args[0].replace(`pornhub.com`,"❌").replace(`nhentai.net`,"❌");
    if (urls.length < 8)
      return message
        .reply(
          "<a:failed:798526823976796161> https is too short to reach - 8 limit"
        )
        .then(m => m.delete({ timeout: 9000 }).catch(e => {}));

    const site = /^(https?:\/\/)/i.test(urls) ? urls : `http://${urls}`;
    try {
      const { body } = await fetch(
        `https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`
      );
       
      const embed = new Discord.MessageEmbed()
      .setDescription(`\`\`\`\nHere is a screenshot from requested URL\n\`\`\``)
      .setColor("RANDOM").setImage("attachment://Screenshot.png")
      .attachFiles([{ attachment: body, name: "Screenshot.png" }]
     );
      return message.channel.send(
     embed);
    } catch (err) {
      if (err.status === 404)
        return message.channel
          .send("Could not find any results. Invalid URL?")
          .then(m => m.delete({ timeout: 14000 }).catch(e => {}));
      return message
        .reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`)
        .then(m => m.delete({ timeout: 13000 }).catch(e => {}));
    }
  }
};
