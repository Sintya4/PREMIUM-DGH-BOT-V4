module.exports = async client => {
  client.on("message", async (message) => {
    let auto = client.data.get(`Announcement_${message.guild.id}`);
     const sender = client.channels.cache.get(auto);
    if (!sender) return;
    if(message.channel.name === sender.name){
        message.crosspost().then(message.author.send("").catch(error => message.
    }
    
    
    
    
    
    
  });
};
