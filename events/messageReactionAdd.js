module.exports = async client => {
client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  const { guild } = reaction.message;
  if (!guild) return;
  if (!guild.me.hasPermission("MANAGE_ROLES")) return;
  const member = guild.members.cache.get(user.id);
  if (!member) return;
const data = client.db.get(`reactions_${guild.id}_${reaction.message.id}`)
  if (!data) return;
  const reaction2 = data.find(
    (r) => r.emoji === reaction.emoji.toString()
  );
  if (!reaction2) return;
member.roles.add(reaction2.roleId).catch(err => undefined);
  const name = await guild.roles.cache.get(reaction2.roleId)
  const embed = new client.discord.MessageEmbed()
  .setTitle("Role Added")
  .setColor("RED")
  .setDescription(`You have got the ${name.name} role by reacting in ${guild.name}`)
member.send(embed)
});
}