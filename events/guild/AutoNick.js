module.exports = async client => {
  client.on("guildMemberAdd", async member => {
   if (!member.guild.me.hasPermission("MANAGE_NICKNAMES")) return;
   if (member.user.bot) {
    let wrt = await client.data.get(`nicks_bot_${member.guild.id}`);
    if (!wrt) return;
    await member.setNickname(wrt.split("{tag}").join(member.user.username));
  } else {
    let wrt = await client.data.get(`nicks_${member.guild.id}`);
    if (!wrt) return;
    await member.setNickname(wrt.split("{tag}").join(member.user.username));
  }});
};
