let discord = require("discord.js");
module.exports = {
  name: "avatar",
  description: "View Avatar",
  commandOptions: null,
  global: true,
  async execute(client, interaction) {
    let user = client.users.cache.get(interaction.member.user.id);
    let embed = new discord.MessageEmbed()
      .setColor("BLUE")
      .setAuthor(`${user.username}'s Avatar`, client.user.displayAvatarURL())
      .setImage(`${user.displayAvatarURL({ dynamic: true })}?size=256`);
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 4,
        data: {
          flags: 64,
          embeds: [embed]
        }
      }
    });
  }
};
