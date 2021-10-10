const axios = require("axios");

module.exports = {
name: "djsdocs",
aliases: ["djs", "docs"],
category: "search",
args: true,
description: "Shows doc's from discord.js",
usage: "djsdocs <query>",
run: async(client, message, args) => {
 const uri = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      args
    )}`
    axios
      .get(uri)
      .then((embed) => {
        const { data } = embed
        if (data && !data.error) {
          message.channel.send({ embeds: [data] })
        } else {
          message.reply('Could not find that documentation')
        }
      })
      .catch((err) => {
        console.error(err)
      })
  }
}
