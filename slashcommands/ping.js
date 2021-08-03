module.exports = {
  name: "ping",
  description: "Ping!",
  commandOptions: null,
  global: true,
  async execute(client, message, user, args) {
    user.type();
    const embed = new client.discord.MessageEmbed()
      .setColor("RANDOM") // Tired of choosing the embed colors? Just type "RANDOM" on it!
      .addField("💓 API", `**${Math.floor(client.ws.ping)}ms**`); // Use "client.ping" if your Discord.js is < 1.15.1 --- Use "client.ws.ping" if your Discord.js is > 12.0.0
    message("🏓 Pong!", {
      embed: embed
    });
  }
};
