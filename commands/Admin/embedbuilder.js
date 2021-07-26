const Discord = require("discord.js");

module.exports = {
  name: "createembed",
  category: "admin",
  description: "create a embed a command in a certain channel. supports embed!",
  authorPermission: ["MANAGE_MESSAGES"],
  botPermission: ["EMBED_LINKS"],
  run: async (client, message, args) => {
    message.delete();
    message.channel.send(
      new Discord.MessageEmbed()
        .setTitle(`Embed Setup | 1/7`)
        .setDescription(
          "What channel do you want your embed to be in?\nYou can cancel the setup at any time by saying `cancel`."
        )
        .setColor("RANDOM")
    );
    await startMessageCollectors(client, message, args);
    function startMessageCollectors(client, message, args) {
      let channelFilter = m => m.author.id === message.author.id;
      let channelCollector = new Discord.MessageCollector(
        message.channel,
        channelFilter,
        { max: 999 }
      );

      channelCollector.on("collect", async msg => {
        let channel = await msg.mentions.channels.first();
        if (msg.content.toLowerCase() === "cancel") {
          msg.channel.send("The embed setup has been cancelled.");
          channelCollector.stop();
          return;
        }
        if (!channel) {
          await msg.channel.send("That is not a valid channel! Cancelled.");
          await channelCollector.stop();
          return;
        } else {
          msg.channel.send(
            new Discord.MessageEmbed()
              .setTitle(`Embed Setup | 2/8`)
              .setDescription(
                `The embed will be in ${channel.toString()}. What title do you want for the embed?`
              )
              .setColor("RANDOM")
          );
          channelCollector.stop();
        }
        let titleFilter = m => m.author.id === message.author.id;
        let titleCollector = new Discord.MessageCollector(
          message.channel,
          titleFilter,
          { max: 999 }
        );
        titleCollector.on("collect", async msg => {
          let title = msg.content;
          if (msg.content.toLowerCase() === "cancel") {
            msg.channel.send("The embed setup has been cancelled.");
            channelCollector.stop();
            return;
          }
          if (!title) {
            await msg.channel.send(`You didn't specify a title! Cancelled.`);
            await titleCollector.stop();
          } else {
            msg.channel.send(
              new Discord.MessageEmbed()
                .setTitle(`Embed Setup | 3/8`)
                .setColor("RANDOM")
                .setDescription(
                  `Thats's a nice title! now what color do you want?`
                )
            );
            titleCollector.stop();
          }
          let durationFilter = m => m.author.id === message.author.id;
          let durationCollector = new Discord.MessageCollector(
            message.channel,
            durationFilter,
            { max: 999 }
          );
          durationCollector.on("collect", async msg => {
            let duration = msg.content.toUpperCase();
            if (msg.content.toLowerCase() === "cancel") {
              msg.channel.send("The embed setup has been cancelled.");
              durationCollector.stop();
              return;
            } else {
              msg.channel.send(
                new Discord.MessageEmbed()
                  .setColor("RANDOM")
                  .setTitle(`Embed Setup | 4/8`)
                  .setDescription(
                    `The color will be ${duration}, now what do you want the description to be?`
                  )
              );
              durationCollector.stop();
            }
            let winnersFilter = m => m.author.id === message.author.id;
            let winnersCollector = new Discord.MessageCollector(
              message.channel,
              winnersFilter,
              { max: 999 }
            );
            winnersCollector.on("collect", async msg => {
              let trueWinners = msg.content;

              if (msg.content.toLowerCase() === "cancel") {
                msg.channel.send("The embed setup has been cancelled.");
                winnersCollector.stop();
                return;
              } else {
                msg.channel.send(
                  new Discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(`Embed Setup | 5/7`)
                    .setDescription(
                      `OH what a nice description! Now, what do you want the footer to be?`
                    )
                );
                winnersCollector.stop();
              }
              let prizeFilter = m => m.author.id === message.author.id;
              let prizeCollector = new Discord.MessageCollector(
                message.channel,
                prizeFilter,
                { max: 999 }
              );
              prizeCollector.on("collect", async msg => {
                let prize = msg.content;
                if (msg.content.toLowerCase() === "cancel") {
                  msg.channel.send("The embed setup has been cancelled.");
                  prizeCollector.stop();
                  return;
                }
                if (!prize) {
                  await msg.channel.send(
                    `You didn't specify a footer! Cancelled!`
                  );
                  prizeCollector.stop();
                  return;
                } else {
                  msg.channel.send(
                    new Discord.MessageEmbed()
                      .setColor("RANDOM")
                      .setTitle(`Embed Setup | 6/7`)
                      .setDescription(
                        `What a cool footer! Do you want a timestamp? Type \`yes\` if you do, and type \`no\` if you don't.`
                      )
                  );
                  prizeCollector.stop();
                }
                let timeFilter = m => m.author.id === message.author.id;
                let timeCollector = new Discord.MessageCollector(
                  message.channel,
                  timeFilter,
                  { max: 999 }
                );
                timeCollector.on("collect", async msg => {
                  if (msg.content.toLowerCase() === "cancel") {
                    msg.channel.send("The embed setup has been cancelled.");
                    prizeCollector.stop();
                    return;
                  }
                  if (msg.content.toLowerCase() === "yes") {
                    await msg.channel.send(
                      new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(`DONE!`)
                        .setDescription(
                          `There will be a timestamp. The embed has been sent in ${channel.toString()}.`
                        )
                    );
                    timeCollector.stop();
                    const embed2 = new Discord.MessageEmbed()
                      .setTitle(title)
                      .setColor(duration)
                      .setDescription(trueWinners)
                      .setFooter(prize)
                      .setTimestamp();
                    message.guild.channels.cache.get(channel.id).send(embed2);
                  } else if (msg.content.toLowerCase() === "no") {
                    msg.channel.send(
                      new Discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle("DONE!")
                        .setDescription(
                          `There will be no timestamp. The embed has been sent in ${channel.toString()}.`
                        )
                    );
                    const embed = new Discord.MessageEmbed()
                      .setTitle(title)
                      .setColor(duration)
                      .setDescription(trueWinners)
                      .setFooter(prize);
                    message.guild.channels.cache.get(channel.id).send(embed);
                    timeCollector.stop();
                  }
                });
              });
            });
          });
        });
      });
    }
  }
};
