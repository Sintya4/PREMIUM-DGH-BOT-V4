// ALL OF THESE COMMANDS ARE MADE BY Rahuletto#0243, So go check him out - https://simplyd.js.org

const Discord = require("discord.js");
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
module.exports = {
  giveaway: async client => {
    return {
      giveaway: `@everyone\n${await client.emoji(
        "DGH_React_Giveaway"
      )} **GIVEAWAY** `,
      giveawayEnded: `@everyone\n${await client.emoji(
        "DGH_React_Giveaway"
      )} **GIVEAWAY ENDED** ${await client.emoji("DGH_React_Giveaway")}`,
      timeRemaining: "Time remaining: **{duration}**!",
      inviteToParticipate: `React with ${await client.emoji(
        "DGH_React_Giveaway"
      )} to participate!`,
      winMessage: `${await client.emoji(
        "DGH_React_Giveaway"
      )} {winners} won **{this.prize}**!`,
      embedFooter: `{this.winnerCount} winner(s) • ${client.user.username}`,
      noWinner: "Giveaway cancelled, no valid participations.",
      hostedBy: "Hosted by: {this.hostedBy}",
      winners: "winner(s): ",
      endedAt: "Ended at"
    };
  },
  mod: async (type, types, user, reason, message, client) => {
    let channel = await client.data.fetch(`modlog_${message.guild.id}`);
    if (channel == null) return;
    if (!channel) return;
    const embed = new Discord.MessageEmbed()
      .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
      .setColor("#ff0000")
      .setThumbnail(user.user.displayAvatarURL({ dynamic: true }))
      .setFooter(message.guild.name, message.guild.iconURL())
      .addField("**Moderation**", type)
      .addField(`**${types}**`, user.user.username)
      .addField("**ID**", `${user.id}`)
      .addField(`**${types} By**`, message.author.username)
      .addField("**Reason**", `${reason}`)
      .addField("**Date**", message.createdAt.toLocaleString())
      .setTimestamp();

    var sChannel = message.guild.channels.cache.get(channel);
    if (!sChannel) return;
    sChannel.send({ embeds: [embed] });
  },
  rps: async (client, message, options = {}) => {
    let mem;
    let opponent = message.mentions.members.first();
    if (!opponent) return client.send("No opponent mentioned!", { message });
    if (opponent.id == message.author.id)
      return client.send("You cannot play by yourself!", { message });
    let foot = "Rock Paper Scissors";
    let acceptEmbed = new Discord.MessageEmbed()
      .setTitle(`Waiting for ${opponent.user.tag} to accept!`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setColor(options.embedColor || 0x075fff)
      .setFooter(foot);

    let accept = new Discord.MessageButton()
      .setLabel("Accept")
      .setStyle("SUCCESS")
      .setCustomId("accept");

    let decline = new Discord.MessageButton()
      .setLabel("Decline")
      .setStyle("DANGER")
      .setCustomId("decline");

    let accep = new Discord.MessageActionRow().addComponents([accept, decline]);
    message.channel
      .send({
        embeds: [acceptEmbed],
        components: [accep]
      })
      .then(m => {
        let filter = button => button.user.id == opponent.id;
        const collector = m.createMessageComponentCollector({
          type: "BUTTON",
          time: 30000,
          filter: filter
        });
        collector.on("collect", button => {
          if (button.customId == "decline") {
            button.deferUpdate();
            return collector.stop("decline");
          }
          button.deferUpdate();
          let embed = new Discord.MessageEmbed()
            .setTitle(`${message.author.tag} VS. ${opponent.user.tag}`)
            .setColor(options.embedColor || 0x075fff)
            .setFooter(foot)
            .setDescription("Select 🪨, 📄, or ✂️");

          if (options.rockColor === "grey") {
            options.rockColor = "SECONDARY";
          } else if (options.rockColor === "red") {
            options.rockColor = "DANGER";
          } else if (options.rockColor === "green") {
            options.rockColor = "SUCCESS";
          } else if (options.rockColor === "blurple") {
            options.rockColor = "PRIMARY";
          }

          let rock = new Discord.MessageButton()
            .setLabel("ROCK")
            .setCustomId("rock")
            .setStyle(options.rockColor || "SECONDARY")
            .setEmoji("🪨");

          if (options.paperColor === "grey") {
            options.paperColor = "SECONDARY";
          } else if (options.paperColor === "red") {
            options.paperColor = "DANGER";
          } else if (options.paperColor === "green") {
            options.paperColor = "SUCCESS";
          } else if (options.paperColor === "blurple") {
            options.paperColor = "PRIMARY";
          }

          let paper = new Discord.MessageButton()
            .setLabel("PAPER")
            .setCustomId("paper")
            .setStyle(options.paperColor || "SECONDARY")
            .setEmoji("📄");

          if (options.scissorsColor === "grey") {
            options.scissorsColor = "SECONDARY";
          } else if (options.scissorsColor === "red") {
            options.scissorsColor = "DANGER";
          } else if (options.scissorsColor === "green") {
            options.scissorsColor = "SUCCESS";
          } else if (options.scissorsColor === "blurple") {
            options.scissorsColor = "PRIMARY";
          }

          let scissors = new Discord.MessageButton()
            .setLabel("SCISSORS")
            .setCustomId("scissors")
            .setStyle(options.scissorsColor || "SECONDARY")
            .setEmoji("✂️");

          let row = new Discord.MessageActionRow().addComponents([
            rock,
            paper,
            scissors
          ]);

          m.edit({
            embeds: [embed],
            components: [row]
          });

          collector.stop();
          let ids = new Set();
          ids.add(message.author.id);
          ids.add(opponent.id);
          let op, auth;
          let filter = button => ids.has(button.user.id);
          const collect = m.createMessageComponentCollector({
            filter: filter,
            type: "BUTTON",
            time: 30000
          });
          collect.on("collect", b => {
            ids.delete(b.user.id);
            b.deferUpdate();
            if (b.user.id == opponent.id) {
              mem = b.customId;
            }
            if (b.user.id == message.author.id) {
              auth = b.customId;
            }
            if (ids.size == 0) collect.stop();
          });
          collect.on("end", (c, reason) => {
            if (reason == "time") {
              let embed = new Discord.MessageEmbed()
                .setTitle("Game Timed Out!")
                .setColor(options.timeoutEmbedColor || 0xc90000)
                .setDescription(
                  "One or more players did not make a move in time(30s)"
                )
                .setFooter(foot);
              m.edit({
                embeds: [embed],
                components: []
              });
            } else {
              if (mem == "rock" && auth == "scissors") {
                let embed = new Discord.MessageEmbed()
                  .setTitle(`${opponent.user.tag} Wins!`)
                  .setColor(options.winEmbedColor || 0x06bd00)
                  .setDescription("Rock defeats Scissors")
                  .setFooter(foot);
                m.edit({ embeds: [embed], components: [] });
              } else if (mem == "scissors" && auth == "rock") {
                let embed = new Discord.MessageEmbed()
                  .setTitle(`${message.member.user.tag} Wins!`)
                  .setColor(options.winEmbedColor || 0x06bd00)
                  .setDescription("Rock defeats Scissors")
                  .setFooter(foot);
                m.edit({ embeds: [embed], components: [] });
              } else if (mem == "scissors" && auth == "paper") {
                let embed = new Discord.MessageEmbed()
                  .setTitle(`${opponent.user.tag} Wins!`)
                  .setColor(options.winEmbedColor || 0x06bd00)
                  .setDescription("Scissors defeats Paper")
                  .setFooter(foot);
                m.edit({ embeds: [embed], components: [] });
              } else if (mem == "paper" && auth == "scissors") {
                let embed = new Discord.MessageEmbed()
                  .setTitle(`${message.member.user.tag} Wins!`)
                  .setColor(options.winEmbedColor || 0x06bd00)
                  .setDescription("Scissors defeats Paper")
                  .setFooter(foot);
                m.edit({ embeds: [embed], components: [] });
              } else if (mem == "paper" && auth == "rock") {
                let embed = new Discord.MessageEmbed()
                  .setTitle(`${opponent.user.tag} Wins!`)
                  .setColor(options.winEmbedColor || 0x06bd00)
                  .setDescription("Paper defeats Rock")
                  .setFooter(foot);
                m.edit({ embeds: [embed], components: [] });
              } else if (mem == "rock" && auth == "paper") {
                let embed = new Discord.MessageEmbed()
                  .setTitle(`${message.member.user.tag} Wins!`)
                  .setColor(options.winEmbedColor || 0x06bd00)
                  .setDescription("Paper defeats Rock")
                  .setFooter(foot);
                m.edit({ embeds: [embed], components: [] });
              } else {
                let embed = new Discord.MessageEmbed()
                  .setTitle("Draw!")
                  .setColor(options.winEmbedColor || 0x06bd00)
                  .setDescription(`Both players chose ${mem}`)
                  .setFooter(foot);
                m.edit({ embeds: [embed], components: [] });
              }
            }
          });
        });
        collector.on("end", (collected, reason) => {
          if (reason == "time") {
            let embed = new Discord.MessageEmbed()
              .setTitle("Challenge Not Accepted in Time")
              .setAuthor(message.author.tag, message.author.displayAvatarURL())
              .setColor(options.timeoutEmbedColor || 0xc90000)
              .setFooter(foot)
              .setDescription("Ran out of time!\nTime limit: 30s");
            m.edit({
              embeds: [embed],
              components: []
            });
          }
          if (reason == "decline") {
            let embed = new Discord.MessageEmbed()
              .setTitle("Game Declined!")
              .setAuthor(message.author.tag, message.author.displayAvatarURL())
              .setColor(options.timeoutEmbedColor || 0xc90000)
              .setFooter(foot)
              .setDescription(`${opponent.user.tag} has declined your game!`);
            m.edit({
              embeds: [embed],
              components: []
            });
          }
        });
      });
  },
  tictactoe: async (client, message, options = {}) => {
    let opponent = message.mentions.members.first();

    if (!opponent)
      return client.send("Please provide the user to challenge!", { message });

    if (opponent.id === message.member.id)
      return client.send(
        "You cant play for 2 Players. Please provide the user to challenge!",
        { message }
      );

    let foot = "Make sure to win ;)";
    let acceptEmbed = new Discord.MessageEmbed()
      .setTitle(`Waiting for ${opponent.user.tag} to accept!`)
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setColor(options.embedColor || 0x075fff)
      .setFooter(foot);

    let accept = new Discord.MessageButton()
      .setLabel("Accept")
      .setStyle("SUCCESS")
      .setCustomId("acceptttt");

    let decline = new Discord.MessageButton()
      .setLabel("Decline")
      .setStyle("DANGER")
      .setCustomId("declinettt");

    let accep = new Discord.MessageActionRow().addComponents([accept, decline]);
    message.channel
      .send({
        embeds: [acceptEmbed],
        components: [accep]
      })
      .then(m => {
        let filter = button => button.user.id == opponent.id;
        const collector = m.createMessageComponentCollector({
          type: "BUTTON",
          time: 30000,
          filter: filter
        });
        collector.on("collect", async button => {
          if (button.customId == "declinettt") {
            button.deferUpdate();
            return collector.stop("decline");
          } else if (button.customId == "acceptttt") {
            button.deferUpdate();
            collector.stop();

            let fighters = [message.member.id, opponent.id].sort(() =>
              Math.random() > 0.5 ? 1 : -1
            );

            let x_emoji = options.xEmoji || "❌";
            let o_emoji = options.oEmoji || "⭕";

            let dashmoji = options.idleEmoji || "➖";

            let Args = {
              user: 0,
              a1: {
                style: "SECONDARY",
                emoji: dashmoji,
                disabled: false
              },
              a2: {
                style: "SECONDARY",
                emoji: dashmoji,
                disabled: false
              },
              a3: {
                style: "SECONDARY",
                emoji: dashmoji,
                disabled: false
              },
              b1: {
                style: "SECONDARY",
                emoji: dashmoji,
                disabled: false
              },
              b2: {
                style: "SECONDARY",
                emoji: dashmoji,
                disabled: false
              },
              b3: {
                style: "SECONDARY",
                emoji: dashmoji,
                disabled: false
              },
              c1: {
                style: "SECONDARY",
                emoji: dashmoji,
                disabled: false
              },
              c2: {
                style: "SECONDARY",
                emoji: dashmoji,
                disabled: false
              },
              c3: {
                style: "SECONDARY",
                emoji: dashmoji,
                disabled: false
              }
            };
            const { MessageActionRow, MessageButton } = require("discord.js");

            const xoemb = new Discord.MessageEmbed()
              .setTitle("TicTacToe")
              .setDescription(
                `**How to Play ?**\n*Wait for your turn.. If its your turn, Click one of the buttons from the table to draw your emoji at there.*`
              )
              .setColor(options.embedColor || 0x075fff)
              .setFooter(foot)
              .setTimestamp();
            let infomsg = await message.channel
              .send({ embeds: [xoemb] })
              .then(ms => {
                setTimeout(() => ms.delete(), 10000);
              });

            let msg = await message.channel.send({
              content: `Waiting for Input | <@!${Args.userid}>, Your Emoji: ${o_emoji}`
            });
            tictactoe(msg);

            async function tictactoe(m) {
              Args.userid = fighters[Args.user];
              let won = {
                O: false,
                X: false
              };
              if (
                Args.a1.emoji == o_emoji &&
                Args.b1.emoji == o_emoji &&
                Args.c1.emoji == o_emoji
              )
                won["O"] = true;
              if (
                Args.a2.emoji == o_emoji &&
                Args.b2.emoji == o_emoji &&
                Args.c2.emoji == o_emoji
              )
                won["O"] = true;
              if (
                Args.a3.emoji == o_emoji &&
                Args.b3.emoji == o_emoji &&
                Args.c3.emoji == o_emoji
              )
                won["O"] = true;
              if (
                Args.a1.emoji == o_emoji &&
                Args.b2.emoji == o_emoji &&
                Args.c3.emoji == o_emoji
              )
                won["O"] = true;
              if (
                Args.a3.emoji == o_emoji &&
                Args.b2.emoji == o_emoji &&
                Args.c1.emoji == o_emoji
              )
                won["O"] = true;
              if (
                Args.a1.emoji == o_emoji &&
                Args.a2.emoji == o_emoji &&
                Args.a3.emoji == o_emoji
              )
                won["O"] = true;
              if (
                Args.b1.emoji == o_emoji &&
                Args.b2.emoji == o_emoji &&
                Args.b3.emoji == o_emoji
              )
                won["O"] = true;
              if (
                Args.c1.emoji == o_emoji &&
                Args.c2.emoji == o_emoji &&
                Args.c3.emoji == o_emoji
              )
                won["O"] = true;
              if (won["O"] != false) {
                if (Args.user == 0)
                  return m.edit({
                    content: `<@!${
                      fighters[1]
                    }> (${o_emoji}) won.. That was a nice game.`,
                    components: []
                  });
                else if (Args.user == 1)
                  return m.edit({
                    content: `<@!${
                      fighters[0]
                    }> (${o_emoji}) won.. That was a nice game.`,
                    components: []
                  });
              }
              if (
                Args.a1.emoji == x_emoji &&
                Args.b1.emoji == x_emoji &&
                Args.c1.emoji == x_emoji
              )
                won["X"] = true;
              if (
                Args.a2.emoji == x_emoji &&
                Args.b2.emoji == x_emoji &&
                Args.c2.emoji == x_emoji
              )
                won["X"] = true;
              if (
                Args.a3.emoji == x_emoji &&
                Args.b3.emoji == x_emoji &&
                Args.c3.emoji == x_emoji
              )
                won["X"] = true;
              if (
                Args.a1.emoji == x_emoji &&
                Args.b2.emoji == x_emoji &&
                Args.c3.emoji == x_emoji
              )
                won["X"] = true;
              if (
                Args.a3.emoji == x_emoji &&
                Args.b2.emoji == x_emoji &&
                Args.c1.emoji == x_emoji
              )
                won["X"] = true;
              if (
                Args.a1.emoji == x_emoji &&
                Args.a2.emoji == x_emoji &&
                Args.a3.emoji == x_emoji
              )
                won["X"] = true;
              if (
                Args.b1.emoji == x_emoji &&
                Args.b2.emoji == x_emoji &&
                Args.b3.emoji == x_emoji
              )
                won["X"] = true;
              if (
                Args.c1.emoji == x_emoji &&
                Args.c2.emoji == x_emoji &&
                Args.c3.emoji == x_emoji
              )
                won["X"] = true;
              if (won["X"] != false) {
                if (Args.user == 0)
                  return m.edit({
                    content: `<@!${
                      fighters[1]
                    }> (${x_emoji}) won.. That was a nice game.`,
                    components: []
                  });
                else if (Args.user == 1)
                  return m.edit({
                    content: `<@!${
                      fighters[0]
                    }> (${x_emoji}) won.. That was a nice game.`,
                    components: []
                  });
              }
              let a1 = new MessageButton()
                .setStyle(Args.a1.style)
                .setEmoji(Args.a1.emoji)
                .setCustomId("a1")
                .setDisabled(Args.a1.disabled);
              let a2 = new MessageButton()
                .setStyle(Args.a2.style)
                .setEmoji(Args.a2.emoji)
                .setCustomId("a2")
                .setDisabled(Args.a2.disabled);
              let a3 = new MessageButton()
                .setStyle(Args.a3.style)
                .setEmoji(Args.a3.emoji)
                .setCustomId("a3")
                .setDisabled(Args.a3.disabled);
              let b1 = new MessageButton()
                .setStyle(Args.b1.style)
                .setEmoji(Args.b1.emoji)
                .setCustomId("b1")
                .setDisabled(Args.b1.disabled);
              let b2 = new MessageButton()
                .setStyle(Args.b2.style)
                .setEmoji(Args.b2.emoji)
                .setCustomId("b2")
                .setDisabled(Args.b2.disabled);
              let b3 = new MessageButton()
                .setStyle(Args.b3.style)
                .setEmoji(Args.b3.emoji)
                .setCustomId("b3")
                .setDisabled(Args.b3.disabled);
              let c1 = new MessageButton()
                .setStyle(Args.c1.style)
                .setEmoji(Args.c1.emoji)
                .setCustomId("c1")
                .setDisabled(Args.c1.disabled);
              let c2 = new MessageButton()
                .setStyle(Args.c2.style)
                .setEmoji(Args.c2.emoji)
                .setCustomId("c2")
                .setDisabled(Args.c2.disabled);
              let c3 = new MessageButton()
                .setStyle(Args.c3.style)
                .setEmoji(Args.c3.emoji)
                .setCustomId("c3")
                .setDisabled(Args.c3.disabled);
              let a = new MessageActionRow().addComponents([a1, a2, a3]);
              let b = new MessageActionRow().addComponents([b1, b2, b3]);
              let c = new MessageActionRow().addComponents([c1, c2, c3]);
              let buttons = { components: [a, b, c] };

              m.edit({
                content: `Waiting for Input | <@!${
                  Args.userid
                }> | Your Emoji: ${
                  Args.user == 0 ? `${o_emoji}` : `${x_emoji}`
                }`,
                components: [a, b, c]
              });
              const filter = button => button.user.id === Args.userid;

              const collector = m.createMessageComponentCollector({
                filter,
                componentType: "BUTTON",
                max: 1,
                time: 30000
              });

              collector.on("collect", b => {
                if (b.user.id !== Args.userid)
                  return b.reply({
                    content: "Wait for your chance.",
                    ephemeral: true
                  });

                if (Args.user == 0) {
                  Args.user = 1;
                  Args[b.customId] = {
                    style: "SUCCESS",
                    emoji: o_emoji,
                    disabled: true
                  };
                } else {
                  Args.user = 0;
                  Args[b.customId] = {
                    style: "DANGER",
                    emoji: x_emoji,
                    disabled: true
                  };
                }
                b.deferUpdate();
                const map = (obj, fun) =>
                  Object.entries(obj).reduce(
                    (prev, [key, value]) => ({
                      ...prev,
                      [key]: fun(key, value)
                    }),
                    {}
                  );
                const objectFilter = (obj, predicate) =>
                  Object.keys(obj)
                    .filter(key => predicate(obj[key]))
                    .reduce((res, key) => ((res[key] = obj[key]), res), {});
                let Brgs = objectFilter(
                  map(Args, (_, fruit) => fruit.emoji == dashmoji),
                  num => num == true
                );
                if (Object.keys(Brgs).length == 0)
                  return m.edit({ content: "It's a tie!" });
                tictactoe(m);
              });
              collector.on("end", collected => {
                if (collected.size == 0)
                  m.edit({
                    content: `<@!${Args.userid}> didn\'t react in time! (30s)`,
                    components: []
                  });
              });
            }
          }
        });

        collector.on("end", (collected, reason) => {
          if (reason == "time") {
            let embed = new Discord.MessageEmbed()
              .setTitle("Challenge Not Accepted in Time")
              .setAuthor(message.author.tag, message.author.displayAvatarURL())
              .setColor(options.timeoutEmbedColor || 0xc90000)
              .setFooter(foot)
              .setDescription("Ran out of time!\nTime limit: 30s");
            m.edit({
              embeds: [embed],
              components: []
            });
          }
          if (reason == "decline") {
            let embed = new Discord.MessageEmbed()
              .setTitle("Game Declined!")
              .setAuthor(message.author.tag, message.author.displayAvatarURL())
              .setColor(options.timeoutEmbedColor || 0xc90000)
              .setFooter(foot)
              .setDescription(`${opponent.user.tag} has declined your game!`);
            m.edit({
              embeds: [embed],
              components: []
            });
          }
        });
      });
  },

  embedder: async (message, channel, options = {}) => {
    const Discord = require("discord.js");
    let conf = false;
    let but = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setStyle("SUCCESS")
        .setLabel("Create")
        .setEmoji("872694899080855563")
        .setCustomId("embc"),
      new Discord.MessageButton()
        .setStyle("DANGER")
        .setLabel("Cancel")
        .setEmoji("872694849059561603")
        .setCustomId("embd")
    );

    let result = new Discord.MessageEmbed().setColor("#2F3136");
    let opt = new Discord.MessageActionRow().addComponents(
      new Discord.MessageSelectMenu()
        .setCustomId("embedder")
        .setPlaceholder("Select an option")
        .addOptions([
          {
            label: "Title",
            description: "Set a title for the embed",
            value: "etitle"
          },
          {
            label: "Description",
            description: "Set a description for the embed",
            value: "edesc"
          },
          {
            label: "Color",
            description: "Set a color for the embed",
            value: "ecolor"
          },
          {
            label: "Footer",
            description: "Set a footer text for the embed",
            value: "efooter"
          },
          {
            label: "Thumbnail",
            description: "Set a thumbnail for the embed",
            value: "ethumb"
          },
          {
            label: "Image",
            description:
              "Set an image for the embed (big image at bottom middle)",
            value: "eimg"
          },
          {
            label: "Author",
            description: "Set an author text for the embed (text above title)",
            value: "eauthor"
          },
          {
            label: "URL",
            description: "Set an URL for the embed (hyperlink for title)",
            value: "eurl"
          },
          {
            label: "Timestamp",
            description: "Set a timestamp for the embed (beside footer)",
            value: "etime"
          }
        ])
    );

    let filter1 = i => i.user.id === message.author.id;
    let filter2 = m => m.author.id === message.author.id;

    let cr = new Discord.MessageEmbed()
      .setTitle("Embed Creator")
      .setDescription("Please pick an option below to set a value for embed")
      .setColor("GOLD");

    let pre = new Discord.MessageEmbed()
      .setColor("#2F3136")
      .setDescription("None");

    let msg = await message.channel.send({
      embeds: [cr],
      components: [opt]
    });

    let preview = await message.channel.send({
      content: "**Preview:**",
      embeds: [pre],
      components: [but]
    });

    const colb = await preview.createMessageComponentCollector({
      filter: filter1
    });
    colb.on("collect", async i => {
      if (i.customId === "embc") {
        if (conf === false)
          return i.reply({
            embeds: [
              new Discord.MessageEmbed()
                .setColor("GOLD")
                .setDescription(
                  "You need to put description in embed first before you can send it!"
                )
            ],
            ephemeral: true
          });
        i.channel.send({
          embeds: [
            new Discord.MessageEmbed()
              .setColor("GOLD")
              .setDescription(
                `Nice! Embed was successfully sent in ${channel}!`
              )
          ]
        });
        msg.delete();
        preview.delete();
        channel.send({
          embeds: [result]
        });
      }
      if (i.customId === "embd") {
        i.channel.send({
          embeds: [
            new Discord.MessageEmbed()
              .setColor("GOLD")
              .setDescription("Successfully cancelled making embed!")
          ]
        });
        msg.delete();
        preview.delete();
      }
    });

    const col = await msg.createMessageComponentCollector({
      filter: filter1,
      componentType: "SELECT_MENU"
    });

    col.on("collect", async i => {
      if (i.values[0] === "etitle") {
        i.reply({
          embeds: [
            new Discord.MessageEmbed()
              .setColor("GOLD")
              .setDescription(
                "**Title** option was selected! Now, please provide title for the embed."
              )
          ],
          ephemeral: true
        });
        let t1 = await message.channel.awaitMessages({
          filter: filter2,
          max: 1
        });
        let title = t1.first().content;
        pre.setTitle(title);
        result.setTitle(title);
        t1.first().delete();
        preview.edit({
          content: "**Preview:**",
          embeds: [pre]
        });
      }

      if (i.values[0] === "edesc") {
        i.reply({
          embeds: [
            new Discord.MessageEmbed()
              .setColor("GOLD")
              .setDescription(
                "**Description** option was selected! Now, please provide description for the embed."
              )
          ],
          ephemeral: true
        });
        let d1 = await message.channel.awaitMessages({
          filter: filter2,
          max: 1
        });
        let desc = d1.first().content;
        conf = true;
        pre.setDescription(desc);
        result.setDescription(desc);
        d1.first().delete();
        preview.edit({
          content: "**Preview:**",
          embeds: [pre]
        });
      }
      if (i.values[0] === "ecolor") {
        i.reply({
          embeds: [
            new Discord.MessageEmbed()
              .setColor("GOLD")
              .setDescription(
                "**Color** option was selected! Now, please provide HEX COLOR for the embed."
              )
          ],
          ephemeral: true
        });
        let c1 = await message.channel.awaitMessages({
          filter: filter2,
          max: 1
        });
        let color = c1.first().content;
        if (!color.startsWith("#"))
          return i.followUp({
            embeds: [
              new Discord.MessageEmbed()
                .setColor("GOLD")
                .setDescription(
                  "Hex code must start with #. To provide a color again, please click the menu and press this option again."
                )
            ],
            ephemeral: true
          });
        result.setColor(color);
        pre.setColor(color);
        c1.first().delete();
        preview.edit({
          content: "**Preview:**",
          embeds: [pre]
        });
      }

      if (i.values[0] === "efooter") {
        i.reply({
          embeds: [
            new Discord.MessageEmbed()
              .setColor("GOLD")
              .setDescription(
                "**Footer** option was selected! Now, please provide footer text for the embed."
              )
          ],
          ephemeral: true
        });
        let f1 = await message.channel.awaitMessages({
          filter: filter2,
          max: 1
        });
        let footer = f1.first().content;
        result.setFooter(footer);
        pre.setFooter(footer);
        f1.first().delete();
        preview.edit({
          content: "**Preview:**",
          embeds: [pre]
        });
      }
      if (i.values[0] === "ethumb") {
        i.reply({
          embeds: [
            new Discord.MessageEmbed()
              .setColor("GOLD")
              .setDescription(
                "**Thumbnail** option was selected! Now, please provide thumbnail URL for the embed."
              )
          ],
          ephemeral: true
        });
        let th1 = await message.channel.awaitMessages({
          filter: filter2,
          max: 1
        });
        let thumb = th1.first().content;
        function is_url(str) {
          let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
          if (regexp.test(str)) {
            return true;
          } else {
            return false;
          }
        }

        if (is_url(thumb) === false) {
          th1.first().delete();
          return i.followUp({
            embeds: [
              new Discord.MessageEmbed()
                .setColor("GOLD")
                .setDescription(
                  "**__Thumbnail__** must be a link. To provide a thumbnail again, please click the menu and press this option again."
                )
            ],
            ephemeral: true
          });
        }
        pre.setThumbnail(thumb);
        result.setThumbnail(thumb);
        th1.first().delete();
        preview.edit({
          content: "**Preview:**",
          embeds: [pre]
        });
      }
      if (i.values[0] === "eimg") {
        i.reply({
          embeds: [
            new Discord.MessageEmbed()
              .setColor("GOLD")
              .setDescription(
                "**Image** option was selected! Now, please provide image link for the embed."
              )
          ],
          ephemeral: true
        });
        let i1 = await message.channel.awaitMessages({
          filter: filter2,
          max: 1
        });
        let img = i1.first().content;
        function is_url(str) {
          let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
          if (regexp.test(str)) {
            return true;
          } else {
            return false;
          }
        }

        if (is_url(img) === false) {
          i1.first().delete();
          return i.followUp({
            embeds: [
              new Discord.MessageEmbed()
                .setColor("GOLD")
                .setDescription(
                  "**__Image__** must be a link. To provide an image again, please click the menu and press this option again."
                )
            ],
            ephemeral: true
          });
        }
        pre.setImage(img);
        pre.setImage(img);
        i1.first().delete();
        preview.edit({
          content: "**Preview:**",
          embeds: [pre]
        });
      }
      if (i.values[0] === "eurl") {
        i.reply({
          embeds: [
            new Discord.MessageEmbed()
              .setColor("GOLD")
              .setDescription(
                "**URL** option was selected! Now, please provide URL for the embed."
              )
          ],
          ephemeral: true
        });
        let u1 = await message.channel.awaitMessages({
          filter: filter2,
          max: 1
        });
        let url = u1.first().content;
        pre.setURL(url);
        result.setURL(url);
        u1.first().delete();
        preview.edit({
          content: "**Preview:**",
          embeds: [pre]
        });
      }
      if (i.values[0] === "eauthor") {
        i.reply({
          embeds: [
            new Discord.MessageEmbed()
              .setColor("GOLD")
              .setDescription(
                "**Author** option was selected! Now, please provide author text for the embed."
              )
          ],
          ephemeral: true
        });
        let a1 = await message.channel.awaitMessages({
          filter: filter2,
          max: 1
        });
        let author = a1.first().content;
        result.setAuthor(author);
        pre.setAuthor(author);
        a1.first().delete();
        preview.edit({
          content: "**Preview:**",
          embeds: [pre]
        });
      }
      if (i.values[0] === "etime") {
        i.reply({
          embeds: [
            new Discord.MessageEmbed()
              .setColor("GOLD")
              .setDescription(
                "**Timestamp** option was selected! **Now, __Are you sure you want to set timestamp? (TYPING TRUE WILL BE PERMANENT, FALSE CANCELS SETTING TIMESTAMP BUT IT WON'T REMOVE THE TIMESTAMP [unless you type the command again])** Please provide a boolean either `true` or `false` to set timestamp"
              )
          ],
          ephemeral: true
        });

        let ti1 = await message.channel.awaitMessages({
          filter: filter2,
          max: 1
        });
        let times = ti1.first().content;
        let tim = ["true", "false"];
        if (!tim.includes(times))
          return i.followUp({
            embeds: [
              new Discord.MessageEmbed()
                .setColor("GOLD")
                .setDescription(
                  "Option must be `true` or `false`. To set a timestamp again, please click the menu and press this option again."
                )
            ],
            ephemeral: true
          });
        if (times === "true") {
          pre.setTimestamp();
          result.setTimestamp();
          ti1.first().delete();
          preview.edit({
            content: "**Preview:**",
            embeds: [pre]
          });
        } else if (times === "false") {
          ti1.first().delete();
        }
      }
    });
  },
  rolelist: async message => {
    let i0 = 0;
    let i1 = 10;
    let page = 1;

    let description;

    description = message.guild.roles.cache
      .map(r => r)
      .map(
        (r, i) =>
          `**${i + 1})** ${r}  \`(${
            message.guild.members.cache.filter(member =>
              member.roles.cache.some(role => role.id === r.id)
            ).size
          } Members)\``
      )
      .slice(0, 10)
      .join("\n");

    let emb = new MessageEmbed()
      .setColor("GREEN")
      .setFooter(
        `Page ${page}/${Math.ceil(message.guild.roles.cache.size / 10)}`
      )
      .setDescription(description);

    let pages = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("PRIMARY")
        .setLabel("❮ BACK")
        .setCustomId("previous_role"),
      new MessageButton()
        .setStyle("PRIMARY")
        .setLabel("NEXT ❯")
        .setCustomId("next_role")
    );

    let dis = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("PRIMARY")
        .setLabel("❮ BACK")
        .setDisabled(true)
        .setCustomId("previous_role"),
      new MessageButton()
        .setStyle("PRIMARY")
        .setLabel("NEXT ❯")
        .setDisabled(true)
        .setCustomId("next_role")
    );

    if (message.guild.roles.cache.size < 10)
      return message.channel.send({
        embeds: [emb],
        components: [dis]
      });

    let msg = await message.channel.send({
      embeds: [emb],
      components: [pages]
    });

    let filter = i => i.user.id === message.author.id;

    let collector = msg.createMessageComponentCollector({
      filter
    });

    collector.on("collect", async i => {
      if (i.customId === "previous_role") {
        i0 = i0 - 10;
        i1 = i1 - 10;
        page = page - 1;

        if (i1 < 9) return msg.delete();

        description = message.guild.roles.cache
          .map(r => r)
          .map(
            (r, i) =>
              `**${i + 1})** ${r}  \`(${
                message.guild.members.cache.filter(member =>
                  member.roles.cache.some(role => role.id === r.id)
                ).size
              } Members)\``
          )
          .slice(i0, i1)
          .join("\n");

        emb
          .setFooter(
            `Page ${page}/${Math.ceil(message.guild.roles.cache.size / 10)}`
          )
          .setDescription(description);

        msg.edit({
          embeds: [emb]
        });
      }

      if (i.customId === "next_role") {
        i0 = i0 + 10;
        i1 = i1 + 10;
        page = page + 1;

        if (i1 > message.guild.roles.cache.size + 10) return msg.delete();
        if (!i0 || !i1) return msg.delete();

        description = message.guild.roles.cache
          .map(r => r)
          .map(
            (r, i) =>
              `**${i + 1})** ${r}  \`(${
                message.guild.members.cache.filter(member =>
                  member.roles.cache.some(role => role.id === r.id)
                ).size
              } Members)\``
          )
          .slice(i0, i1)
          .join("\n");

        emb
          .setFooter(
            `Page ${page}/${Math.ceil(message.guild.roles.cache.size / 10)}`
          )
          .setDescription(description);
        msg.edit({
          embeds: [emb]
        });
      }
    });
  },
  emojilist: async (message, client) => {
    let i0 = 0;
    let i1 = 10;
    let page = 1;

    let description;

    description = client.emojis.cache
      .map(r => r)
      .map((r, i) => `**${i + 1})** ${r}\`(${r.name})\``)
      .slice(0, 10)
      .join("\n");

    let emb = new MessageEmbed()
      .setColor("GREEN")
      .setFooter(`Page ${page}/${Math.ceil(client.emojis.cache.size / 10)}`)
      .setDescription(description);

    let pages = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("PRIMARY")
        .setEmoji("⬅️")
        .setCustomId("previous_emoji"),
      new MessageButton()
        .setStyle("PRIMARY")
        .setEmoji("➡️")
        .setCustomId("next_emoji")
    );

    let dis = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("PRIMARY")
        .setEmoji("⬅️")
        .setDisabled(true)
        .setCustomId("previous_emoji"),
      new MessageButton()
        .setStyle("PRIMARY")
        .setEmoji("➡️")
        .setDisabled(true)
        .setCustomId("next_emoji")
    );

    if (client.emojis.cache.size < 10)
      return message.channel.send({
        embeds: [emb],
        components: [dis]
      });

    let msg = await message.channel.send({
      embeds: [emb],
      components: [pages]
    });

    let filter = i => i.user.id === message.author.id;

    let collector = msg.createMessageComponentCollector({
      filter
    });

    collector.on("collect", async i => {
      if (i.customId === "previous_emoji") {
        i0 = i0 - 10;
        i1 = i1 - 10;
        page = page - 1;

        if (i1 < 9) return msg.delete();

        description = client.emojis.cache
          .map(r => r)
          .map((r, i) => `**${i + 1})** ${r}\`(${r.name})\``)
          .slice(i0, i1)
          .join("\n");

        emb
          .setFooter(`Page ${page}/${Math.ceil(client.emojis.cache.size / 10)}`)
          .setDescription(description);

        msg.edit({
          embeds: [emb]
        });
      }

      if (i.customId === "next_emoji") {
        i0 = i0 + 10;
        i1 = i1 + 10;
        page = page + 1;

        if (i1 > client.emojis.cache.size + 10) return msg.delete();
        if (!i0 || !i1) return msg.delete();

        description = client.emojis.cache
          .map(r => r)
          .map((r, i) => `**${i + 1})** ${r}\`(${r.name})\``)
          .slice(i0, i1)
          .join("\n");

        emb
          .setFooter(`Page ${page}/${Math.ceil(client.emojis.cache.size / 10)}`)
          .setDescription(description);
        msg.edit({
          embeds: [emb]
        });
      }
    });
  },
  serverlist: async (message, client) => {
    let i0 = 0;
    let i1 = 10;
    let page = 1;

    let description;

    description = client.guilds.cache
      .sort((a, b) => b.memberCount - a.memberCount)
      .map(r => r)
      .map(
        (r, i) =>
          `**${i + 1})** ${r.name}\n\`(${r.memberCount} Members | ${
            client.users.cache.get(r.ownerId)?.username ? client.users.cache.get(r.ownerId).username: "Invaild User"
          } (${r.ownerId}) Owner)\``
      )
      .slice(0, 10)
      .join("\n");

    let emb = new MessageEmbed()
      .setColor("GREEN")
      .setFooter(`Page ${page}/${Math.ceil(client.guilds.cache.size / 10)}`)
      .setDescription(description);

    let pages = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("PRIMARY")
        .setEmoji("⬅️")
        .setCustomId("previous_server"),
      new MessageButton()
        .setStyle("PRIMARY")
        .setEmoji("➡️")
        .setCustomId("next_server")
    );

    let dis = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("PRIMARY")
        .setEmoji("⬅️")
        .setDisabled(true)
        .setCustomId("previous_server"),
      new MessageButton()
        .setStyle("PRIMARY")
        .setEmoji("➡️")
        .setDisabled(true)
        .setCustomId("next_server")
    );

    if (client.guilds.cache.size < 10)
      return message.channel.send({
        embeds: [emb],
        components: [dis]
      });

    let msg = await message.channel.send({
      embeds: [emb],
      components: [pages]
    });

    let filter = i => i.user.id === message.author.id;

    let collector = msg.createMessageComponentCollector({
      filter
    });

    collector.on("collect", async i => {
      if (i.customId === "previous_server") {
        i0 = i0 - 10;
        i1 = i1 - 10;
        page = page - 1;

        if (i1 < 9) return msg.delete();

        description = client.guilds.cache
          .sort((a, b) => b.memberCount - a.memberCount)
          .map(r => r)
          .map(
            (r, i) =>
              `**${i + 1})** ${r.name}\n\`(${r.memberCount} Members \n ${
               client.users.cache.get(r.ownerId)?.username ? client.users.cache.get(r.ownerId).username: "Invaild User"
             } (${r.ownerId}) Owner)\``
          )
          .slice(i0, i1)
          .join("\n");

        emb
          .setFooter(`Page ${page}/${Math.ceil(client.guilds.cache.size / 10)}`)
          .setDescription(description);

        msg.edit({
          embeds: [emb]
        });
      }

      if (i.customId === "next_server") {
        i0 = i0 + 10;
        i1 = i1 + 10;
        page = page + 1;

        if (i1 > client.guilds.cache.size + 10) return msg.delete();
        if (!i0 || !i1) return msg.delete();

        description = client.guilds.cache
          .sort((a, b) => b.memberCount - a.memberCount)
          .map(r => r)
          .map(
            (r, i) =>
              `**${i + 1})** ${r.name}\n\`(${r.memberCount} Members \n ${
               client.users.cache.get(r.ownerId)?.username ? client.users.cache.get(r.ownerId).username: "Invaild User"
             } (${r.ownerId}) Owner)\``
          )
          .slice(i0, i1)
          .join("\n");

        emb
          .setFooter(`Page ${page}/${Math.ceil(client.guilds.cache.size / 10)}`)
          .setDescription(description);
        msg.edit({
          embeds: [emb]
        });
      }
    });
  }
};
