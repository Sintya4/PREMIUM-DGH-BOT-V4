module.exports = {
  name: "afk",
  category: "utility",
  run: async (client, message, args) => {
    let db = require ("quick.db")
    let status = db.get(`afkstatus_${message.guild.id}_${message.author.id}`)
  switch (status) {
    case true:
    db.set(`afkstatus_${message.author.id}`, false);
    message.reply(`**Your afk has been removed.**`);
      break;
    case false:
    let reason;
    if (args[0]) reason = args.join(" ")
    reason = reason || "No reason specified";
    db.set(`afk_${message.guild.id}_${message.author.id}`, reason);
    db.set(`afkstatus_${message.guild.id}_${message.author.id}`, true);
    db.set(`time_${message.guild.id}_${message.author.id}`, Date.now());
    message.member.setNickname("[AFK] " + message.author.username).catch(err => {});
   message.channel.send(`You are now AFK - ${reason}`)
      break;
    case null:
    let reason2;
    if (args[0]) reason2 = args.join(" ")
    reason2 = reason2 || "No reason specified";
    db.set(`afk_${message.guild.id}_${message.author.id}`, reason2);
    db.set(`afkstatus_${message.guild.id}_${message.author.id}`, true);
    db.set(`time_${message.guild.id}_${message.author.id}`, Date.now());
    message.member.setNickname("[AFK] " + message.author.username).catch(err => {});
   message.channel.send(`You are now AFK - ${reason2}`)
      break;
  }
  }
}