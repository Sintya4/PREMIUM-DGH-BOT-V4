let { Default_Prefix } = require("../../config.js");
module.exports = async client => {
  client.on("message", async message => {
   if (!message.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
   if (message.author.bot || !message.guild || message.webhookID) return;
    let enambed = await client.data.get(`nqn_${message.guild.id}`);
    if (!enambed) return;
    let Prefix = await client.data.get(`Prefix_${message.guild.id}`);
    if (!Prefix) Prefix = Default_Prefix;
    if (message.content.startsWith(Prefix + "react")) return;
    let msg = message.content;
    let emojis = msg.match(/(?<=:)([^:\s]+)(?=:)/g);
    if (!emojis) return;
    emojis.forEach(m => {
      let emoji = message.guild.emojis.cache.find(x => x.name === m);
      if (!emoji) return;
      let temp = emoji.toString();
      if (new RegExp(temp, "g").test(msg))
        msg = msg.replace(new RegExp(temp, "g"), emoji.toString());
      else msg = msg.replace(new RegExp(":" + m + ":", "g"), emoji.toString());
    });

    if (msg === message.content) return;

    let webhook = await message.channel.fetchWebhooks();
    let number = client.randomNumber(1, 2);
    webhook = webhook.find(x => x.name === "NQN" + number);

    if (!webhook) {
      webhook = await message.channel.createWebhook(`NQN` + number, {
        avatar: client.user.displayAvatarURL({ dynamic: true })
      });
    }

    await webhook.edit({
      name: message.member.nickname
        ? message.member.nickname
        : message.author.username,
      avatar: message.author.displayAvatarURL({ dynamic: true })
    });

    message.delete().catch(err => {});
    webhook.send(msg).catch(err => {});

    await webhook.edit({
      name: `NQN` + number,
      avatar: client.user.displayAvatarURL({ dynamic: true })
    });
  });
};
