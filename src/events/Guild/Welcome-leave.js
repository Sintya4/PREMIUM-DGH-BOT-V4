module.exports = async client => {
  client.on("inviteJoin", async (member, invite, inviter) => {
    let channel = await client.data.get(`wel_channel__${member.guild.id}`);
    let nick = await client.data.get(`nick_auto_${member.guild.id}`);
    let roles = await client.data.get(`roles_auto_${member.guild.id}`);
    let msg1 = await client.data.get(`msg_welcome_${member.guild.id}`);
    if (!channel) {
      return;
    } else {
      if (!msg1) msg1 = "Welcome {user}";
      if (msg1) {
        msg1 = msg1.replace(/{user}/g, member);
        msg1 = msg1.replace(/{invite}/g, invite);
        msg1 = msg1.replace(/{inviter-username}/g, inviter.tag);
        msg1 = msg1.replace(/{inviter}/g, inviter);
        msg1 = msg1.replace(/{server}/g, member.guild.name);
        msg1 = msg1.replace(/{membercount}/g, member.guild.memberCount);
        msg1 = msg1.replace(/{username}/g, member.user.tag);
        msg1 = msg1.replace(
          /{member_join}/g,
          `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`
        );
        msg1 = msg1.replace(
          /{member_at}/g,
          `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`
        );
        let matches = msg1.match(/{:([a-zA-Z0-9]+)}/g);
        if (!matches) matches = msg1;
        for (const match of matches) {
          const rep = await member.guild.emojis.cache.find(
            emoji => emoji.name === match.substring(2, match.length - 1)
          );
          if (rep) msg1 = msg1.replace(match, rep);
        }
      }
      const embed = new client.Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(msg1);
      client
        .sendhook(null, {
          channel,
          embed: [embed], name: "BOT WELCOME"
        })
        .catch(() => null);
      if (roles) {
        roles.map(x =>
          member.roles.set(x).catch(() => {
            null;
          })
        );
      } else {
        null;
      }
      if (nick) {
        member
          .setNickname(nick.split("{username}").join(member.user.username))
          .catch(() => {
            null;
          });
      } else {
        null;
      }
    }
  });
  client.on("guildMemberRemove", async member => {
    let channel = await client.data.get(`lev_channel__${member.guild.id}`);
    let msg1 = await client.data.get(`msg_leave_${member.guild.id}`);
    if (!channel) {
      return;
    } else {
      if (!msg1) msg1 = "Goodbye {user}";
      if (msg1) {
        msg1 = msg1.replace(/{user}/g, member);
        msg1 = msg1.replace(/{server}/g, member.guild.name);
        msg1 = msg1.replace(/{membercount}/g, member.guild.memberCount);
        msg1 = msg1.replace(/{username}/g, member.user.tag);
        msg1 = msg1.replace(
          /{member_leave}/g,
          `<t:${Math.floor(Date.now() / 1000)}:R>`
        );
        let matches = msg1.match(/{:([a-zA-Z0-9]+)}/g);
        if (!matches) matches = msg1;
        for (const match of matches) {
          const rep = await member.guild.emojis.cache.find(
            emoji => emoji.name === match.substring(2, match.length - 1)
          );
          if (rep) msg1 = msg1.replace(match, rep);
        }
      }
      const embed = new client.Discord.MessageEmbed()
        .setColor("RANDOM")
        .setDescription(msg1);
      client
        .sendhook(null, {
          channel,
          embed: [embed], name: "BOT WELCOME"
        })
        .catch(() => null);
    }
  });
};
