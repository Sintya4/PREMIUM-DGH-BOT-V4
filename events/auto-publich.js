module.exports = async client => {
  client.on("message", async message => {
    let auto = client.data.get(`Announcement_${message.guild.id}`);
    const sender = client.channels.cache.get(auto);
    if (!sender) return;
      sender.crosspost()
        .then(
          message.author
            .send(`Successfully Post Message On ${message.channel}`)
            .catch(
              message.author.send(
                `Failed to Post Message On ${message.channel}`
              )
            )
        );
   });
};
