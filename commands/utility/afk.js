module.exports = {
  name: "afk",
  category: "utility",
  run: async (client, message, args) => {
    let db = require ("quick.db")
    let status = await client.data.get(`afkstatus_${message.guild.id}_${message.author.id}`)
  switch (status) {
    case true:
    client.data.set(`afkstatus_${message.author.id}`, false);
    message.reply(`**Your afk has been removed.**`);
      break;
    case false:
    let reason;
    if (args[0]) reason = args.join(" ")
    reason = reason || "No reason specified";
    client.data.set(`afk_${message.guild.id}_${message.author.id}`, reason);
    client.data.set(`afkstatus_${message.guild.id}_${message.author.id}`, true);
    client.data.set(`time_${message.guild.id}_${message.author.id}`, Date.now());
    message.member.setNickname("[AFK] " + message.author.username).catch(err => {});
   message.channel.send(`You are now AFK - ${reason}`)
      break;
    case null:
    let reason2;
    if (args[0]) reason2 = args.join(" ")
    reason2 = reason2 || "No reason specified";
    client.data.set(`afk_${message.guild.id}_${message.author.id}`, reason2);
    client.data.set(`afkstatus_${message.guild.id}_${message.author.id}`, true);
    client.data.set(`time_${message.guild.id}_${message.author.id}`, Date.now());
    message.member.setNickname("[AFK] " + message.author.username).catch(err => {});
   message.channel.send(`You are now AFK - ${reason2}`)
      break;
  }
  }
}