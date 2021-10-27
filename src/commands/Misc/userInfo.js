const { MessageEmbed } = require("discord.js");
const { embed } = require("discord.js");
const moment = require("moment");

module.exports = {
  name: "userinfo",
  aliases: ["whois", "user"],
  usage: "userinfo <MENTION/ID>",
  category: "misc",
  description: "Get advance stats of given person or yourself",
  run: async (client, message, args) => {
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    if (!user) {
      return client.send("Unable to find this person!", { message });
    }

    // Format Permissions
    const permissions = user.permissions.toArray().map(perm => {
      return perm
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\w\S*/g, txt => {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    });

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
      partner: await client.emoji("DGH_Partner"),
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
    let status_time = user.presence?.activities[0]?.createdTimestamp ?user.presence.activities[0].createdTimestamp : Date.now()
    //ACTIVITY
    let array = [];
    if (user.presence?.activities.length ? user.presence.activities.length : null) {
      let data = user.presence.activities;

      for (let i = 0; i < data.length; i++) {
        let name = data[i].name || "None";
        let xname = data[i].details || "None";
        let zname = data[i].state || "None";
        let ename = data[i].emoji?.name ? data[i].emoji.name : "None";
        let type = data[i].type;

        array.push(
          `**${type}** : \`${name} : ${xname} :\` ${ename} \`: ${zname}\``
        );

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
      .addField("Joined At", `**\`${moment(user.joinedAt).format("LLLL")}\`**`)
      .addField(
        "Account Created At",
        `**\`${moment(user.createdAt).format("LLLL")} (${moment(
          user.user.createdAt,
          "YYYYMMDD"
        ).fromNow()})\`**`
      )
      .addField(
        "Common Information",
        `**\`Tags: ${user.user.username}
ID: ${user.user.id}
Discriminator: ${user.user.discriminator}
Bot: ${user.user.bot}
Deleted User: ${user.deleted}
Online Time:\`** <t:${Math.floor(status_time / 1000)}:R>
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
      .addField("Permissions", `**\`${permissions.join(", ")}\`**`)
      .setFooter(user.presence?.status ? user.presence.status : "offline", stat[user.presence?.status ? user.presence.status : "offline"]);

    return message.channel.send({ embeds: [embed] });
  }
};
