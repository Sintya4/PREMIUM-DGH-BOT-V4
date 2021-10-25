module.exports = {
  name: "afk",
  category: "utility",
  P_bot: ["MANAGE_NICKNAMES"],
  run: async (client, message, args) => {
    let status = client.db.get(
      `afkstatus_${message.guild.id}_${message.author.id}`
    );
    switch (status) {
      case true:
        client.db.set(`afkstatus_${message.author.id}`, false);
        break;
      case false:
        let reason = args.join(" ") || "No reason specified";
        client.db.set(`afk_${message.guild.id}_${message.author.id}`, reason);
        client.db.set(
          `nick_${message.guild.id}_${message.author.id}`,
          message.member.displayName
        );
        client.db.set(
          `afkstatus_${message.guild.id}_${message.author.id}`,
          true
        );
        client.db.set(
          `time_${message.guild.id}_${message.author.id}`,
          Date.now()
        );
        message.member
          .setNickname("⌜𝙰𝙵𝙺⌟ " + message.author.username)
          .catch(err => {});
        client.send(`You are now AFK - ${reason}`, { message });

        break;
      case null:
        let reason2 = args.join(" ") || "No reason specified";
        client.db.set(`afk_${message.guild.id}_${message.author.id}`, reason2);
        client.db.set(
          `nick_${message.guild.id}_${message.author.id}`,
          message.member.displayName
        );
        client.db.set(
          `afkstatus_${message.guild.id}_${message.author.id}`,
          true
        );
        client.db.set(
          `time_${message.guild.id}_${message.author.id}`,
          Date.now()
        );
        message.member
          .setNickname("⌜𝙰𝙵𝙺⌟ " + message.author.username)
          .catch(err => {});
        client.send(`You are now AFK - ${reason2}`, { message });
        break;
    }
  }
};
