const { MessageEmbed } = require("discord.js");
const { embed } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "userinfo",
  aliases: ["whois", "user"],
  usage: "userinfo <MENTION/ID>",
  category: "info",
  description: "Get advance stats of given person or yourself",
  run: async (client, message, args) => {
    let user;
    if (!args.length) {
      user = message.guild.member(message.author);
    } else {
      user = message.guild.member(
        message.mentions.members.first() ||
          (await message.guild.members.fetch(args[0]))
      );
    }

    if (!user) {
      return client.send(
        "Unable to find this person!"
      );
    }

    // Format Permissions
    const permissions = user.permissions.toArray().map(perm => {
      return perm
        .toLowerCase()
        .replace(/_/g, " ") // Replace all underscores with spaces
        .replace(/\w\S*/g, txt => {
          // Capitalize the first letter of each word
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    });

    // Calculate Join Position
    let joinPosition;
    const members = message.guild.members.cache.array();
    members.sort((a, b) => a.joinedAt - b.joinedAt);
    for (let i = 0; i < members.length; i++) {
      if (members[i].id == message.guild.member(user).id) joinPosition = i;
    }

    //OPTIONS FOR STATUS

    let stat = {
      online: "https://emoji.gg/assets/emoji/9166_online.png",
      idle: "https://emoji.gg/assets/emoji/3929_idle.png",
      dnd: "https://emoji.gg/assets/emoji/2531_dnd.png",
      offline: "https://emoji.gg/assets/emoji/7445_status_offline.png"
    };
    //NOW BADGES
    let badges = await user.user.flags;
    badges = await badges.toArray();

    const emoji = {
      brigade: await client.emoji("DGH_Employee"),
      partner:await client.emoji("DGH_Partner"),
      events: await client.emoji("DGH_hypesquad"),
      brillance: await client.emoji("DGH_hypesquadbrillance"),
      bravery: await client.emoji("DGH_hypesquadbravery"),
      balance: await client.emoji("DGH_hypesquadbalance"),
      hunter_gold: await client.emoji("DGH_huntergold"),
      hunter: await client.emoji("DGH_hunter"),
      support: await client.emoji("DGH_support"),
      developers: await client.emoji("DGH_developers"),
      nitro: await client.emoji("DGH_nitro"),
      boost: await client.emoji("DGH_boosts"),
      bot: await client.emoji("DGH_botclassic")
    };

    let newbadges = [];
    badges.forEach(m => {
      newbadges.push(
        m
          .replace("DISCORD_EMPLOYEE", `${emoji.brigade} Discord Employee`)
          .replace("DISCORD_PARTNER", `${emoji.partner} Discord Partner`)
          .replace("HYPESQUAD_EVENTS", `${emoji.events} Hypesquad Events`)
          .replace("HOUSE_BRILLIANCE", `${emoji.brillance} Brillance`)
          .replace("HOUSE_BRAVERY", `${emoji.bravery} Bravery`)
          .replace("HOUSE_BALANCE", `${emoji.balance} Balance`)
          .replace("BUGHUNTER_LEVEL_2", `${emoji.hunter_gold} BugHunter Gold`)
          .replace("BUGHUNTER_LEVEL_1", `${emoji.hunter} BugHunter`)
          .replace("EARLY_SUPPORTER", `${emoji.support} Early Supporter`)
          .replace(
            "VERIFIED_DEVELOPER",
            `${emoji.developers} Verified Developer`
          )
      );
    });

    let embed = new MessageEmbed().setThumbnail(
      user.user.displayAvatarURL({ dynamic: true })
    );

    //ACTIVITY
    let array = [];
    if (user.user.presence.activities.length) {
      let data = user.user.presence.activities;

      for (let i = 0; i < data.length; i++) {
        let name = data[i].name || "None";
        let xname = data[i].details || "None";
        let zname = data[i].state || "None";
        let type = data[i].type;

        array.push(`**${type}** : \`${name} : ${xname} : ${zname}\``);

        if (data[i].name === "Spotify") {
          embed.setThumbnail(
            `https://i.scdn.co/image/${data[i].assets.largeImage.replace(
              "spotify:",
              ""
            )}`
          );
        }

        embed.setDescription(array.join(" "));
      }
    }
    //Check Roles used by members
    let roles = user.roles.cache
      .map(r => `<@&${r.id}>`)
      .join(", ")
      .replace(new RegExp(`<@&${message.guild.id}>`, "g"), "");
    if (roles.length === 0) roles = "-";

    //EMBED COLOR BASED ON member
    embed.setColor(
      user.displayHexColor === "#000000" ? "#ffffff" : user.displayHexColor
    );

    //OTHER STUFF
    embed.setAuthor(
      user.user.tag,
      user.user.displayAvatarURL({ dynamic: true })
    );

    //CHECK IF USER HAVE NICKNAME
    if (user.nickname !== null) embed.addField("Nickname", user.nickname);
    embed
      .addField(
        "Joined At",
        `**\`${moment(user.user.joinedAt).format("LLLL")}\`**`)
      .addField(
        "Account Created At",
        `**\`${moment(user.user.createdAt).format("LLLL")} (${moment(
          user.user.createdAt,
          "YYYYMMDD"
        ).fromNow()})\`**`)
      .addField(
        "Common Information",
        `Tags: \`${user.user.username}\`
ID: \`${user.user.id}\`
Discriminator: \`${user.user.discriminator}\`
Bot: ${user.user.bot}
Deleted User: ${user.deleted}
Position: ${joinPosition || 1}
      `
      );
    let xxx = user.user.avatarURL({ dynamic: true });
    if (xxx.includes("gif"))
      embed.addField(
        "Badget",
        `${emoji.nitro} Nitro\n` + newbadges.join("\n") || "None"
      );
    if (!xxx.includes("gif"))
      embed.addField("Badget", newbadges.join("\n") || "None");
    embed
      .addField("Roles", roles)
      .addField("Permissions", `**\`${permissions.join("\n")}\`**`)
      .setFooter(user.user.presence.status, stat[user.user.presence.status]);

    return message.channel.send(embed).catch(async err => {
      return message.channel.send(await client.emoji("DGH_error") +
        "Error : " + err
      );
    });
  }
};
