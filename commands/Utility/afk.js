module.exports = {
  name: "afk",
  category: "utility",
  run: async (client, message, args) => {
    let db = require ("quick.db")
    let status = db.get(`afkstatus_${message.guild.id}_${message.author.id}`)
  switch (status) {
    case true:
    db.set(`afkstatus_${message.author.id}`, false);
 //   message.reply(`**Your afk has been removed.**`);
      break;
    case false:
    let reason;
    if (args[0]) reason = args.join(" ")
    reason = reason || "No reason specified";
    db.set(`afk_${message.guild.id}_${message.author.id}`, reason);
    db.set(`nick_${message.guild.id}_${message.author.id}`, message.member.displayName);
    db.set(`afkstatus_${message.guild.id}_${message.author.id}`, true);
    db.set(`time_${message.guild.id}_${message.author.id}`, Date.now());
    message.member.setNickname("⌜𝙰𝙵𝙺⌟ " + message.author.username).catch(err => {});
   client.send(`You are now AFK - ${reason}`, message)
      break;
    case null:
    let reason2;
    if (args[0]) reason2 = args.join(" ")
    reason2 = reason2 || "No reason specified";
    db.set(`afk_${message.guild.id}_${message.author.id}`, reason2);
    db.set(`nick_${message.guild.id}_${message.author.id}`, message.member.displayName);
    db.set(`afkstatus_${message.guild.id}_${message.author.id}`, true);
    db.set(`time_${message.guild.id}_${message.author.id}`, Date.now());
    message.member.setNickname("⌜𝙰𝙵𝙺⌟ " + message.author.username).catch(err => {});
   client.send(`You are now AFK - ${reason2}`, message)
      break;
  }
  }
}