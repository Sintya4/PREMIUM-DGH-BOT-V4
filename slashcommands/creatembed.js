let discord = require("discord.js");
module.exports = {
  name: "creatembed",
  description: "create a embed a command in a certain channel. supports embed!",
  commandOptions: [
    {
      type: 7,
      name: "channel",
      description: "What channel do you want your embed to be in?",
      required: true
    },
    {
      type: 3,
      name: "title",
      description: "What title do you want for the embed?",
      required: true
    },
    {
      type: 3,
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
      type: 3,
      name: "description",
      description: "now what do you want the description to be?",
      required: true
    },
    {
      type: 3,
      name: "footer",
      description: "Now, what do you want the footer to be?",
      required: true
    },
    {
      type: 3,
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
    }
  ],
  global: true,
  async execute(client, message, user, args) {
    await user.type();
    user.perms(["MANAGE_MESSAGES"]);
    user.botperms(["EMBED_LINKS"]);
    if (args[5].value === "yes") {
      await message(null, {
        flags: 64,
        embed: new client.discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`DONE!`)
          .setDescription(
            `There will be a timestamp. The embed has been sent in <#${args[0].value}>.`
          )
      });

      const embed2 = new client.discord.MessageEmbed()
        .setTitle(args[1].value)
        .setColor(args[2].value)
        .setDescription(args[3].value)
        .setFooter(args[4].value)
        .setTimestamp();
      user.guild.channels.cache.get(args[0].value).send(embed2);
    } else if (args[5].value === "no") {
      await message(null, {
        flags: 64,
        embed: new client.discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`DONE!`)
          .setDescription(
            `There will be no timestamp. The embed has been sent in <#${args[0].value}>.`
          )
      });
      const embed = new client.discord.MessageEmbed()
        .setTitle(args[1].value)
        .setColor(args[2].value)
        .setDescription(args[3].value)
        .setFooter(args[4].value)
      user.guild.channels.cache.get(args[0].value).send(embed);
    }
  }
};
