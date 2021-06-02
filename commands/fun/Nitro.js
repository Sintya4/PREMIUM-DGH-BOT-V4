const path = require('path');
module.exports = {
  name: "nitro",
  category: "fun",
  description: "",
  usage: "",
  run: async (client, message, args) => {
    message.channel.send(
      `htt${String.fromCharCode(8203)}ps://discord.${String.fromCharCode(8203)}gift/${client.random(24)}`
      ,{ files: [{ attachment: 'https://cdn.discordapp.com/attachments/774606487397466113/834809116869787718/nitro-1.png', name: "Nitro.png" }]}
    );
  }
};
