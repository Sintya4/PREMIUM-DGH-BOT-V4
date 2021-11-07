const Discord = require("discord.js");
module.exports = async client => {
  client.on("messageReactionAdd", async (reaction, user) => {
    await reaction.fetch();
    let chx = await client.data.get(
      `starboard_channel__${reaction.message.guild.id}`
    );
    if (chx === null) return;
    if (reaction.emoji.name === "⭐" || reaction.emoji.name === "🌟") {
      const starboard = client.channels.cache.get(chx);

      const fetchMsg = await reaction.message.fetch();
      if (!starboard) throw new Error("INVALID_CHANNEL_ID");
      if (reaction.message.channel.name.toLowerCase() === starboard.name)
        return;
      const attachment = fetchMsg.attachments.first();
      const url = attachment ? attachment.url : null;
      const jumprow = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageButton()
                        .setLabel("Jump to the message").setStyle("LINK").setURL(fetchMsg.url));      
      let embed;
      if (fetchMsg.embeds.length !== 0 && fetchMsg.author.bot) {
        embed = new Discord.MessageEmbed()
          .setAuthor(fetchMsg.author.tag, fetchMsg.author.displayAvatarURL())
          .setColor("#FFC83D")
          .setDescription(
            fetchMsg.embeds[0]?.description
              ? fetchMsg.embeds[0].description
              : "Invaild Embed"
          )
          .setImage(
            fetchMsg.embeds[0].image?.proxyURL
              ? fetchMsg.embeds[0].image.proxyURL
              : null
          ).setFooter("⭐ | ID: " + fetchMsg.id);
      } else {
        embed = new Discord.MessageEmbed()
          .setAuthor(fetchMsg.author.tag, fetchMsg.author.displayAvatarURL())
          .setColor("#FFC83D")
          .setDescription(
            `\`\`\`\n${fetchMsg?.content.replace(/`/g, "'") ? fetchMsg.content.replace(/`/g, "'") : ""}\n\`\`\``
          )
          .setImage(url).setFooter("⭐ | ID: " + fetchMsg.id);
      }
      const msgs = await starboard.messages.fetch({ limit: 100 });

      const existingMsg = msgs.find(async msg => {
        if (msg.embeds.length === 1) {
          if (msg.embeds[0] === null || msg.embeds[0] === [])
            return starboard.send({
              content: `⭐ 1 | <#${reaction.message.channel.id}>`,
              embeds: [embed],components: [jumprow]
            });

          if (
            msg.embeds[0] &&
            msg.embeds[0].footer &&
            msg.embeds[0].footer.text === "⭐ | ID: " + fetchMsg.id
          ) {
            let reacts = reaction && reaction.count ? reaction.count : 1;

            msg.edit({
              content: `${counter(reacts)} ${reacts} | <#${
                reaction.message.channel.id
              }>`,
              embeds: [embed],components: [jumprow]
            });
          } else {
            let reacts = reaction && reaction.count ? reaction.count : 1;

            starboard.send({
              content: `${counter(reacts)} ${reacts} | <#${
                reaction.message.channel.id
              }>`,
              embeds: [embed], components: [jumprow]
            });
          }
        } else {
          let reacts = reaction && reaction.count ? reaction.count : 1;
          starboard.send({
            content: `${counter(reacts)} ${reacts} | <#${
              reaction.message.channel.id
            }>`,
            embeds: [embed], components: [jumprow]
          });
        }
      });
    }

    client.on("messageReactionRemove", async (reaction, user) => {
      await reaction.fetch();
      let chx = await client.data.get(
        `starboard_channel__${reaction.message.guild.id}`
      );
      if (chx === null) return;
      if (reaction.emoji.name === "⭐" || reaction.emoji.name === "🌟") {
        const starboard = client.channels.cache.get(chx);

        const fetchMsg = await reaction.message.fetch();
        if (!starboard) throw new Error("INVALID_CHANNEL_ID");

        const attachment = fetchMsg.attachments.first();
        const url = attachment ? attachment.url : null;
        const jumprow = new Discord.MessageActionRow().addComponents(
                    new Discord.MessageButton()
                        .setLabel("Jump to the message").setStyle("LINK").setURL(fetchMsg.url));      
        let embed;
        if (fetchMsg.embeds.length !== 0 && fetchMsg.author.bot) {
          embed = new Discord.MessageEmbed()
            .setAuthor(fetchMsg.author.tag, fetchMsg.author.displayAvatarURL())
            .setColor("#FFC83D")
            .setDescription(
              fetchMsg.embeds[0]?.description
                ? fetchMsg.embeds[0].description
                : "Invaild Embed"
            ).setImage(
              fetchMsg.embeds[0].image?.proxyURL
                ? fetchMsg.embeds[0].image.proxyURL
                : null
            )
            .setFooter("⭐ | ID: " + fetchMsg.id);
        } else {
          embed = new Discord.MessageEmbed()
            .setAuthor(fetchMsg.author.tag, fetchMsg.author.displayAvatarURL())
            .setColor("#FFC83D")
            .setDescription(
            `\`\`\`\n${fetchMsg?.content.replace(/`/g, "'") ? fetchMsg.content.replace(/`/g, "'") : ""}\n\`\`\``
          )
            .setImage(url).setFooter("⭐ | ID: " + fetchMsg.id);
        }

        const msgs = await starboard.messages.fetch({ limit: 100 });

        const existingMsg = msgs.find(async msg => {
          if (msg.embeds.length === 1) {
            if (
              msg.embeds[0] &&
              msg.embeds[0].footer &&
              msg.embeds[0].footer.text === "⭐ | ID: " + fetchMsg.id
            ) {
              let reacts = reaction && reaction.count;
              if (reacts === 0) {
                msg.delete();
              } else {
                msg.edit({
                  content: `${counter(reacts)} ${reacts} | <#${
                    reaction.message.channel.id
                  }>`,components: [jumprow]
                });
              }
            }
          }
        });
      }
    });
  });
  let counter = function(e) {
    if (e > 49) {
      return "💫";
    } else if (e > 19) {
      return "🌠";
    } else if (e > 12) {
      return "🌟";
    } else {
      return "⭐";
    }
  };
};
