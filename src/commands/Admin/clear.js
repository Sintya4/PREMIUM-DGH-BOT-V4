const Discord = require("discord.js");
module.exports = {
  name: "clear",
  aliases: ["purge"],
  category: "admin",
  P_bot: ["MANAGE_MESSAGES"],
  P_user: ["MANAGE_MESSAGES"],
  description: "Delete messages from the channel",
  run: async (client, message, args) => {
    await message.delete();
    let amount = Number(args[0], 10) || parseInt(args[0]);
    if (isNaN(amount) || !Number.isInteger(amount)) {
      return client.send("Please enter a number of messages to purge.", {
        message
      });
    } else if (!amount || amount < 2) {
      return client.send("Please enter a number of message between 2", {
        message
      });
    }
    if (amount <= amount + 200) {
      if (Math.floor(amount / 100) % 100 === 0) {
        message.channel.bulkDelete(amount, true).then(m => {
          client.send(`✅  Cleared **${m.size}**/**${amount}** messages!`, {
            timeout: 4000,
            message
          });
        });
      } else if (Math.floor(amount / 100) % 100) {
        setTimeout(() => {
          for (let i = 0; i < Math.floor(amount / 100) % 100; i++) {
            message.channel.bulkDelete(100, true);
          }
        }, 1000);
        setTimeout(() => {
          client.send(`✅  Cleared **${amount}**/**${amount}** messages!`, {
            timeout: 4000,
            message
          });
        }, 3000);
      } else if (amount % 100 === 0) {
        message.channel.bulkDelete(amount, true).then(m => {
          client.send(`✅  Cleared **${m.size}**/**${amount}** messages!`, {
            timeout: 4000,
            message
          });
        });
      } else {
        let s = await message.channel.bulkDelete(amount % 100, true);
        client.send(`✅  Cleared **${s.size}**/**${amount}** messages!`, {
          timeout: 4000,
          message
        });
      }
    }
  }
};
