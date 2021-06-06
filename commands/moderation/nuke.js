module.exports = {
  name: "nuke",
  category: "moderation",
  description: "Delete all the messages in a channel.",
  usage: "",
  authorPermission: ["MANAGE_CHANNELS"],
  botPermission: ["MANAGE_CHANNELS"],
  run: async (client, message, args) => {
    let channel = client.channels.cache.get(message.channel.id);
    const position = channel.position;
    const topic = channel.topic;
    const channel2 = await channel.clone();
    channel2.setPosition(position);
    channel2.setTopic(topic);
    channel.delete();
    const nuke = new client.discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription(":boom: **Channel Has Been Nuked!**");
    return channel2.send(nuke).then(m=>m.delete({timeout:10000}).catch(e=>{}));
  }
};
