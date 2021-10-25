let discord = require("discord.js");
module.exports = {
  name: "embed",
  description:
    "Create a embed a command in a certain channel. supports embed!",
  options: [
    {
      name: "create",
      description: "create a embed",
      type: "SUB_COMMAND",
      options: [
        {
          type: "CHANNEL",
          name: "channel",
          description: "What channel do you want your embed to be in?",
          required: true
        },
        {
          type: "STRING",
          name: "title",
          description: "What title do you want for the embed?",
          required: true
        },
        {
          type: "STRING",
          name: "color",
          description: "Thats's a nice title! now what color do you want?",
          required: true,
          choices: [
            {
              name: "Random",
              value: "RANDOM"
            },
            {
              name: "Red",
              value: "RED"
            },
            {
              name: "Aqua",
              value: "AQUA"
            },
            {
              name: "Dark Aqua",
              value: "DARK_AQUA"
            },
            {
              name: "Green",
              value: "GREEN"
            },
            {
              name: "Dark Green",
              value: "DARK_GREEN"
            },
            {
              name: "Blue",
              value: "BLUE"
            },
            {
              name: "Dark Blue",
              value: "DARK_BLUE"
            },
            {
              name: "Purple",
              value: "PURPLE"
            },
            {
              name: "Dark Purple",
              value: "DARK_PURPLE"
            },
            {
              name: "Luminous Vivid Pink",
              value: "LUMINOUS_VIVID_PINK"
            },
            {
              name: "Dark Vivid Pink",
              value: "DARK_VIVID_PINK"
            },
            {
              name: "Gold",
              value: "GOLD"
            },
            {
              name: "Dark Gold",
              value: "DARK_GOLD"
            },
            {
              name: "Orange",
              value: "ORANGE"
            },
            {
              name: "Dark Orange",
              value: "DARK_ORANGE"
            },
            {
              name: "Dark Red",
              value: "DARK_RED"
            },
            {
              name: "Grey",
              value: "GREY"
            },
            {
              name: "Dark Grey",
              value: "DARK_GREY"
            },
            {
              name: "Darker Grey",
              value: "DARKER_GREY"
            },
            {
              name: "Light Grey",
              value: "LIGHT_GREY"
            },
            {
              name: "Navy",
              value: "NAVY"
            },
            {
              name: "Dark Navy",
              value: "DARK_NAVY"
            },
            {
              name: "Yellow",
              value: "YELLOW"
            },
            {
              name: "White",
              value: "WHITE"
            }
          ]
        },
        {
          type: "STRING",
          name: "description",
          description: "now what do you want the description to be?",
          required: true
        },
        {
          type: "STRING",
          name: "footer",
          description: "Now, what do you want the footer to be?",
          required: true
        },
        {
          type: "STRING",
          name: "timestamp",
          description:
            "Do you want a timestamp? Type \\`yes\\` if you do, and type \\`no\\` if you don't.",
          required: true,
          choices: [
            {
              name: "Yes",
              value: "yes"
            },
            {
              name: "No",
              value: "no"
            }
          ]
        },
        {
          type: "STRING",
          name: "image",
          description: "Now you use the image otherwise just leave it",
          required: false
        },
        {
          type: "STRING",
          name: "thumbnails",
          description: "Now you use the thumbnails otherwise just leave it",
          required: false
        },
        {
          type: "STRING",
          name: "msg",
          description:
            "Now you just add the above message after embed otherwise you just leave it",
          required: false
        }
      ]
    },
    {
      name: "edit",
      type: "SUB_COMMAND",
      description: "Edit a Embed",
      options: [
        {
          name: "url",
          description: "Url message or share url in message paste here",
          type: "STRING",
          required: true
        },
        {
          type: "STRING",
          name: "title",
          description: "What title do you want for the embed?",
          required: true
        },
        {
          type: "STRING",
          name: "color",
          description: "Thats's a nice title! now what color do you want?",
          required: true,
          choices: [
            {
              name: "Random",
              value: "RANDOM"
            },
            {
              name: "Red",
              value: "RED"
            },
            {
              name: "Aqua",
              value: "AQUA"
            },
            {
              name: "Dark Aqua",
              value: "DARK_AQUA"
            },
            {
              name: "Green",
              value: "GREEN"
            },
            {
              name: "Dark Green",
              value: "DARK_GREEN"
            },
            {
              name: "Blue",
              value: "BLUE"
            },
            {
              name: "Dark Blue",
              value: "DARK_BLUE"
            },
            {
              name: "Purple",
              value: "PURPLE"
            },
            {
              name: "Dark Purple",
              value: "DARK_PURPLE"
            },
            {
              name: "Luminous Vivid Pink",
              value: "LUMINOUS_VIVID_PINK"
            },
            {
              name: "Dark Vivid Pink",
              value: "DARK_VIVID_PINK"
            },
            {
              name: "Gold",
              value: "GOLD"
            },
            {
              name: "Dark Gold",
              value: "DARK_GOLD"
            },
            {
              name: "Orange",
              value: "ORANGE"
            },
            {
              name: "Dark Orange",
              value: "DARK_ORANGE"
            },
            {
              name: "Dark Red",
              value: "DARK_RED"
            },
            {
              name: "Grey",
              value: "GREY"
            },
            {
              name: "Dark Grey",
              value: "DARK_GREY"
            },
            {
              name: "Darker Grey",
              value: "DARKER_GREY"
            },
            {
              name: "Light Grey",
              value: "LIGHT_GREY"
            },
            {
              name: "Navy",
              value: "NAVY"
            },
            {
              name: "Dark Navy",
              value: "DARK_NAVY"
            },
            {
              name: "Yellow",
              value: "YELLOW"
            },
            {
              name: "White",
              value: "WHITE"
            }
          ]
        },
        {
          type: "STRING",
          name: "description",
          description: "now what do you want the description to be?",
          required: true
        },
        {
          type: "STRING",
          name: "footer",
          description: "Now, what do you want the footer to be?",
          required: true
        },
        {
          type: "STRING",
          name: "timestamp",
          description:
            "Do you want a timestamp? Type \\`yes\\` if you do, and type \\`no\\` if you don't.",
          required: true,
          choices: [
            {
              name: "Yes",
              value: "yes"
            },
            {
              name: "No",
              value: "no"
            }
          ]
        },
        {
          type: "STRING",
          name: "image",
          description: "Now you use the image otherwise just leave it",
          required: false
        },
        {
          type: "STRING",
          name: "thumbnails",
          description: "Now you use the thumbnails otherwise just leave it",
          required: false
        },
        {
          type: "STRING",
          name: "msg",
          description:
            "Now you just add the above message after embed otherwise you just leave it",
          required: false
        }
      ]
    }
  ],
  P_user: ["MANAGE_MESSAGES"],
  P_bot: ["MANAGE_MESSAGES"],
  async execute(client, interaction) {
    const subCommand = interaction.options.getSubcommand();
    const title = interaction.options.getString("title");
    const message_ = interaction.options.getString("msg");
    const url = interaction.options.getString("url");
    const channel = interaction.options.getChannel("channel");
    const description = interaction.options.getString("description");
    const color = interaction.options.getString("color");
    const footer = interaction.options.getString("footer");
    const timesm = interaction.options.getString("timestamp");
    const image = interaction.options.getString("image");
    const thumbnails = interaction.options.getString("thumbnails");

    if (subCommand === "create") {
      if (timesm === "yes") {
        await interaction.reply({
          ephemeral: true,
          embeds: [
            new client.Discord.MessageEmbed()
              .setColor("RANDOM")
              .setTitle(`DONE!`)
              .setDescription(
                `There will be a timestamp. The embed has been sent in <#${channel.id}>.`
              )
          ]
        });

        const embed2 = new client.Discord.MessageEmbed()
          .setTitle(title)
          .setColor(color)
          .setDescription(description.split("#").join("#"))
          .setFooter(footer)
          .setImage(image)
          .setThumbnail(thumbnails)
          .setTimestamp();
        interaction.guild.channels.cache
          .get(channel.id)
          .send(
            message_
              ? { content: message_, embeds: [embed2] }
              : { embeds: [embed2] }
          );
      } else if (timesm === "no") {
        await interaction.reply({
          ephemeral: true,
          embeds: [
            new client.Discord.MessageEmbed()
              .setColor("RANDOM")
              .setTitle(`DONE!`)
              .setDescription(
                `There will be no timestamp. The embed has been sent in <#${channel.id}>.`
              )
          ]
        });
        const embed = new client.Discord.MessageEmbed()
          .setTitle(title)
          .setColor(color)
          .setDescription(description.split("#").join("#"))
          .setImage(image)
          .setThumbnail(thumbnails)
          .setFooter(footer);
        interaction.guild.channels.cache
          .get(channel.id)
          .send(
            message_
              ? { content: message_, embeds: [embed] }
              : { embeds: [embed] }
          );
      }
    } else if (subCommand === "edit") {
      if (timesm === "yes") {
        const embed2 = new client.Discord.MessageEmbed()
          .setTitle(title)
          .setColor(color)
          .setDescription(description.split("#").join("#"))
          .setFooter(footer)
          .setImage(image)
          .setThumbnail(thumbnails)
          .setTimestamp();
        interaction.guild.channels.cache
          .get(url.split("/")[5])
          .messages.fetch(url.split("/")[6])
          .then(x => {
            x.edit(
              message_
                ? { content: message_, embeds: [embed2] }
                : { embeds: [embed2] }
            )
              .then(() => {
                interaction.reply({
                  ephemeral: true,
                  embeds: [
                    new client.Discord.MessageEmbed()
                      .setColor("RANDOM")
                      .setTitle(`DONE!`)
                      .setDescription(
                        `There will be a timestamp. The embed has changed to a new one.`
                      )
                  ]
                });
              })
              .catch(() => {
                interaction.reply({
                  ephemeral: true,
                  embeds: [
                    new client.Discord.MessageEmbed()
                      .setColor("RANDOM")
                      .setTitle(`Fail`)
                      .setDescription(
                        `Error Cannot edit the embed, Try checking the message id and try again!`
                      )
                  ]
                });
              });
          })
          .catch(() => {
            interaction.reply({
              ephemeral: true,
              embeds: [
                new client.Discord.MessageEmbed()
                  .setColor("RANDOM")
                  .setTitle(`Fail`)
                  .setDescription(
                    `Error Cannot edit the embed, Try checking the message id and try again!`
                  )
              ]
            });
          });
      } else if (timesm === "no") {
        const embed = new client.Discord.MessageEmbed()
          .setTitle(title)
          .setColor(color)
          .setDescription(description.split("#").join("#"))
          .setImage(image)
          .setThumbnail(thumbnails)
          .setFooter(footer);
        interaction.guild.channels.cache
          .get(url.split("/")[5])
          .messages.fetch(url.split("/")[6])
          .then(x => {
            x.edit(
              message_
                ? { content: message_, embeds: [embed] }
                : { embeds: [embed] }
            )
              .then(() => {
                interaction.reply({
                  ephemeral: true,
                  embeds: [
                    new client.Discord.MessageEmbed()
                      .setColor("RANDOM")
                      .setTitle(`DONE!`)
                      .setDescription(
                        `There will be no timestamp. The embed has changed to a new one.`
                      )
                  ]
                });
              })
              .catch(() => {
                interaction.reply({
                  ephemeral: true,
                  embeds: [
                    new client.Discord.MessageEmbed()
                      .setColor("RANDOM")
                      .setTitle(`Fail`)
                      .setDescription(
                        `Error Cannot edit the embed, Try checking the message id and try again!`
                      )
                  ]
                });
              });
          })
          .catch(() => {
            interaction.reply({
              ephemeral: true,
              embeds: [
                new client.Discord.MessageEmbed()
                  .setColor("RANDOM")
                  .setTitle(`Fail`)
                  .setDescription(
                    `Error Cannot edit the embed, Try checking the message id and try again!`
                  )
              ]
            });
          });
      }
    }
  }
};
