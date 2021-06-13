module.exports = async client => {
  client.on("guildMemberAdd", async member => {
    let wrt = await client.data.get(`roles_${member.guild.id}`);
    if (wrt === null) return;
    let role = await member.guild.roles.cache.get(wrt);
    if (role === null) return;
    await member.roles.add(role);
  });
};
