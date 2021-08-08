module.exports = {
  name: "dashboard",
  description: "ashboard DGH BOT",
  aliases: ["db"],
  category: "admin",
  run: async (client, message, args) => {
    const web = new client.button.MessageButton()
      .setStyle("green")
      .setEmoji(client.emoji("DGH_info","id"))
      .setLabel("Click Here")
      .setURL(`https://dgh-bot.ddns.net/server/${message.guild.id}`);
    client.button.send("MY DASHBOARD", {
      channel: message.channel.id,
      buttons: [[web]]
    });
  }
};
