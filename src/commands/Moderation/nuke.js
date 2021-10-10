module.exports = {
  name: "nuke",
  category: "moderation",
  description: "Delete all the messages in a channel.",
  P_user: ["MANAGE_CHANNELS"],
  P_bot: ["MANAGE_CHANNELS"],
  cooldown: 10,
  run: async (client, message, args) => {
    let channel = client.channels.cache.get(message.channel.id);
    const position = channel.position;
    const topic = channel.topic;
    const channel2 = await channel.clone();
    channel2.setPosition(position);
    channel2.setTopic(topic);
    channel.delete();
    return client.send(":boom: **Channel Has Been Nuked!**", {
      channel: channel2.id,
      message,
      timeout: 10000
    });
  }
};
