const discord = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "findemoji",
  aliases: ["finde"],
  category: "admin",
  description: "Steals Emoji from Other Servers to ur Server.",
  P_bot: ["MANAGE_EMOJIS"],
  P_user: ["MANAGE_EMOJIS"],

  run: async (client, message, args) => {
    let pages = new client.Discord.MessageActionRow().addComponents(
      new client.Discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("❮ BACK")
        .setCustomId("previous"),
      new client.Discord.MessageButton()
        .setStyle("PRIMARY")
        .setLabel("NEXT ❯")
        .setCustomId("next"),
      new client.Discord.MessageButton()
        .setStyle("SUCCESS")
        .setLabel("ADD ✓")
        .setCustomId("add"),
      new client.Discord.MessageButton()
        .setStyle("DANGER")
        .setLabel("CANCEL ❌")
        .setCustomId("cancel")
    );
    let emojis = await fetch("https://emoji.gg/api/").then(res => res.json());
    const q = args
      .join(" ")
      .toLowerCase()
      .trim()
      .split(" ")
      .join("_");
    let matches = emojis.filter(s => s.title == q || s.title.includes(q));

    let noResult = new discord.MessageEmbed()
      .setDescription(
        `| ${await client.emoji("DGH_error")} No Results found for ${args.join(
          " "
        )}!`
      )
      .setColor("FF2052");

    let page = 0;
    let i0 = 0;
    let i1 = 10;

    if (!matches.length) return message.channel.send({ embeds: [noResult] });
    let embed = new discord.MessageEmbed()
      .setTitle(matches[page].title)
      .setURL("https://discordemoji.com/emoji/" + matches[page].slug)
      .setColor("00FFFF")
      .setImage(matches[page].image)
      .setFooter(`Emoji ${page + 1}/${matches.length}`);
    let msg = await message.channel.send({
      embeds: [embed],
      components: [pages]
    });

    let filter = i => i.user.id === message.author.id;
    let collector = msg.createMessageComponentCollector({
      filter,
      time: 10000
    });

    collector.on("collect", async i => {
      if (i.customId === "previous") {
        i0 = i0 - 10;
        i1 = i1 - 10;
        page = page - 1;
        if (i1 < 9) return msg.delete();
        let embed = new discord.MessageEmbed()
          .setTitle(matches[page].title)
          .setURL("https://discordemoji.com/emoji/" + matches[page].slug)
          .setColor("00FFFF")
          .setImage(matches[page].image)
          .setFooter(`Emoji ${page + 1}/${matches.length}`);

        msg.edit({ embeds: [embed] });
      }
      if (i.customId === "next") {
        i0 = i0 + 10;
        i1 = i1 + 10;
        page = page + 1;

        if (i1 > matches.length + 10) return msg.delete();
        if (!i0 || !i1) return msg.delete();
        let embed = new discord.MessageEmbed()
          .setTitle(matches[page].title)
          .setURL("https://discordemoji.com/emoji/" + matches[page].slug)
          .setColor("00FFFF")
          .setImage(matches[page].image)
          .setFooter(`Emoji ${page + 1}/${matches.length}`);

        msg.edit({ embeds: [embed] });
      }
      if (i.customId === "add") {
        const res = matches[page];
        let created;
        message.channel.sendTyping();
        try {
          created = await message.guild.emojis.create(res.image, res.title);
          message.channel.sendTyping();
        } catch {
          message.channel.sendTyping();
          client.send(`Unable to add ${res.title}.`, { message });
        }
        let embed = new discord.MessageEmbed()
          .setColor("00FFFF")
          .setDescription(
            `${await client.emoji(
              "DGH_success"
            )} Successfully added ${created}!`
          );

        msg.edit({ embeds: [embed], components: [] });
        message.channel.sendTyping();
      }
      if (i.customId === "cancel") {
        msg.delete();
        return client.send("Cancelled command.", { message });
      }
    });
    collector.on("end", async i => {
     let embed = new discord.MessageEmbed()
      .setTitle(matches[page].title)
      .setURL("https://discordemoji.com/emoji/" + matches[page].slug)
      .setColor("00FFFF")
      .setImage(matches[page].image)
      .setFooter(`Emoji ${page + 1}/${matches.length}`);
      pages.components[0].setDisabled(true);
      pages.components[1].setDisabled(true);
      pages.components[2].setDisabled(true);
      msg.edit({ embeds: [embed], components: [pages] });
    });
  }
};
