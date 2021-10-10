module.exports = {
  name: "sudo",
  description: "Makes a webhook to impersonate someone",
  usage: "sudo <user> <message>",
  category: "utility",
  args: true,
  P_bot: ["MANAGE_WEBHOOKS"],
  run: async (client, message, args) => {
    message.delete();
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!user) return client.send("Please provide a user!",{message});
    const webhook = await message.channel.createWebhook(user.displayName, {
      avatar: user.user.displayAvatarURL(),
      channel: message.channel.id
    });
    await webhook.send(args.slice(1).join(" ")).then(() => {
      webhook.delete();
    });
  }
};
