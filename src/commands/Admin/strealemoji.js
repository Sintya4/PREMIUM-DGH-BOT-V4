const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "stealemoji",
  category: "admin",
  args: true,
  description: "stealemoji <emoji,emoji,emoji,...>",
  usage: "stealemoji <emoji name>",
  P_user: ["MANAGE_EMOJIS"],
  P_bot: ["MANAGE_EMOJIS"],
  run: async (client, message, args) => {
    const emojis = args.join(" ").match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi);
    if (!emojis)
      return client.send(`:x: | **Provde The emojis to add**`, { message });
    emojis.forEach(emote => {
      let emoji = Discord.Util.parseEmoji(emote);
      if (emoji.id) {
        const Link = `https://cdn.discordapp.com/emojis/${emoji.id}.${
          emoji.animated ? "gif" : "png"
        }`;
        message.guild.emojis
          .create(`${Link}`, `${`${emoji.name}`}`)
          .then(async em =>
            client.send(
              `${await client.emoji(
                "DGH_success"
              )} Emoji Has Been Added! | Emoji : ${em.toString()}`,
              { message }
            )
          )
          .catch(async error => {
            client.send(
              (await client.emoji("DGH_error")) + " | an Error occured",
              { message }
            );
          });
      }
    });
  }
};
