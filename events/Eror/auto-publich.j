module.exports = async client => {
  client.on("message", async message => {
    let auto = await client.data.get(`Announcement_${message.guild.id}`);
    if (!auto) return;
    const sender = client.channels.cache.get(auto);
    if (!sender) return;
    client.on("message", message => {
      const { channel } = message;
      for (const name of sender.name) {
        if (channel.name === name) {
          message.crosspost().catch(error => {
            console.log(error);
            message.author
              .send(`Failed to Post Message On ${message.channel}`)
              .then(
                message.author.send(
                  `Successfully Post Message On ${message.channel}`
                )
              );
          });
        }
      }
    });
  });
};
