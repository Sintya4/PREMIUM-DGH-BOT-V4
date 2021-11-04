const Discord = require("discord.js");
const sleep = (ms) => {
   if (!ms) throw new TypeError("Time isn't specified");
   return new Promise((resolve) => setTimeout(resolve, ms));
};
module.exports = client => {
const invites = {};
 client.on("ready", async () => {
  await sleep(1000);  
    client.guilds.cache.map(g => {
      g.invites.cache.map(guildInvites =>
        guildInvites ? (invites[g.id] = guildInvites) : null
      );
    });
  });
  client.on("guildMemberAdd", member => {
    try {
      member.guild.invites.fetch().then(async guildInvites => {
        const ei = invites[member.guild.id];
        invites[member.guild.id] = guildInvites;
        if (!ei) return client.emit("inviteJoin", member, "Invaild Link", null);
        await member.guild.invites.fetch().catch(() => undefined);
        const invite = guildInvites.find(i => {
          const a = ei.get(i.code);
          if (!a) return a = "oauth2";
          return a;
        });
        if (!invite) return;
        const inviter = client.users.cache.get(invite.inviter.id);
        if(!inviter) return inviter = null;
        client.emit("inviteJoin", member, invite, inviter);
      })
    } catch (e) {}
  });
};
