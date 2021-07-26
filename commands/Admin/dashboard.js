module.exports = {
  name: "dashboard",
  description: "Dashboard DGH BOT",
  aliases: ["db"],
  category: "admin",
  run: async (client, message, args) => {
    const web = new client.button.MessageButton()
      .setStyle("green")
      .setLabel("Click Here")
      .setURL(`https://dgh-bot.ddns.net/server/${message.guild.id}`);
    client.button.send("MY DASHBOARD", {
      channel: message.channel.id,
      buttons: [[web]]
    });
  }
};
