const Discord = require("discord.js");
const moment = require("moment");
module.exports = {
  name: "serverinfo",
  description: "Displays server information & statistics!",
  category: "misc",
  usage: "serverinfo",
  aliases: ["stats", "serverstats", "guildinfo", "guildstats"],
  run: async (client, message, args) => {
    let guildFeatures =
      message.guild.features.map(p => {
      return p
        .toLowerCase()
        .replace(/_/g, " ").replace(/enabled/g, "").replace(/url/g, "Link")
        .replace(/\w\S*/g, txt => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    })
        /*.join(`\n${await client.emoji("DGH_success")}: `)
        .replace(/animated_icon/gi, `Animated Icon`)
        .replace(/banner/gi, `Banner`)
        .replace(/commerce/gi, `Commerce`)
        .replace(/community/gi, `Community`)
        .replace(/discoverable/gi, `Discoverable`)
        .replace(/featurable/gi, `Featurable`)
        .replace(/invite_splash/gi, `Invite Splash`)
        .replace(/news/gi, `News`)
        .replace(/THREE_DAY_THREAD_ARCHIVE/gi, `Three Day Thread Archive`)
        .replace(/SEVEN_DAY_THREAD_ARCHIVE/gi, `Seven Day Thread Archive`)
        .replace(/PRIVATE_THREADS/gi, `Private`)
        .replace(/more_stickers/gi, `More Stickers`)
        .replace(/monetization_enabled/gi, `Monetization`)
        .replace(/ticketed_events_enabled/gi, `Ticketed Events`)
        .replace(/preview_enabled/gi, `Preview`)
        .replace(
          /member_verification_gate_enabled/gi,
          `Member Verification Gate`
        )
        .replace(/partnered/gi, `Partnered`)
        .replace(/relay_enabled/gi, `Relay Enabled`)
        .replace(/vanity_url/gi, `Vanity Link`)
        .replace(/verified/gi, `Verified`)
        .replace(/vip_regions/gi, `VIP Regions`)
        .replace(/welcome_screen_enabled/gi, `Welcome Screen`)*/ || "None";
    let guildCreatedAt = moment(message.guild.createdAt).format("lll");
    let guildCreatedAtFromNow = moment(
      message.guild.createdAt,
      "YYYYMMDD"
    ).fromNow();
    let afkChannel = message.guild.afkChannel
      ? message.guild.afkChannel
      : "None";
    let guildDescription = message.guild.description
      ? message.guild.description
      : "None";
    let guildName = message.guild.name;
    let guildIcon = message.guild.iconURL({
      dynamic: true
    });
    let guildBanner = message.guild.splash ? message.guild.splashURL() : ""; // message.guild.banner ? message.guild.banner : "";

    let roleSize = message.guild.roles.cache.size;
    let emojiSize = message.guild.emojis.cache.size;
    let channelSize = message.guild.channels.cache.size;
    let textChannels = message.guild.channels.cache.filter(
      c => c.type === "text"
    ).size;
    let voiceChannels = message.guild.channels.cache.filter(
      c => c.type === "voice"
    ).size;

    let guildMemberCount = message.guild.memberCount;
    let guildOwner = message.guild.members.cache.get(message.guild.ownerId).user
      .tag; // await message.guild.members.fetch(message.guild.ownerID)
    let fetchedMembers = await message.guild.members.cache;

    let onlineMembers = fetchedMembers.filter(
        c => c.presence?.status === "online"
      ).size,
      offlineMembers = fetchedMembers.filter(
        c => c.presence?.status === "offline"
      ).size,
      dndMembers = fetchedMembers.filter(c => c.presence?.status === "dnd")
        .size,
      idleMembers = fetchedMembers.filter(c => c.presence?.status === "idle")
        .size,
      bots = fetchedMembers.filter(c => c.user.bot).size,
      humans = fetchedMembers.filter(c => !c.user.bot).size;
    let humanPercent = Math.round(
      (message.guild.members.cache.filter(m => !m.user.bot).size /
        message.guild.memberCount) *
        100
    );
    let botPercent = Math.round(
      (message.guild.members.cache.filter(m => m.user.bot).size /
        message.guild.memberCount) *
        100
    );

    let embed = new Discord.MessageEmbed()

      .setColor("RANDOM")
      .setTitle(message.guild.name)
      .setThumbnail(guildIcon)
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setDescription(`*${guildDescription}*`)
      .addField(
        "Members:",
        `**${guildMemberCount} Members**` +
          `\n🤖 ${bots} Bots (**\`${botPercent}%\`**)` +
          `\n👋 ${humans} Humans (**\`${humanPercent}%\`**)`,
        true
      )
      .addField(
        `Presences:`,
        `${await client.emoji("DGH_on")} ${onlineMembers} Online` +
          `\n${await client.emoji("DGH_idle")} ${idleMembers} Idle` +
          `\n${await client.emoji("DGH_dnd")} ${dndMembers} DND` +
          `\n${await client.emoji("DGH_off")} ${offlineMembers} Offline`,
        true
      )
      .addField(
        "Guild:",
        `:id: Guild: ${guildName}` +
          `\n${(await client.emoji("DGH_create_at")) ||
            "🕰️"} Created At: ${guildCreatedAt} (${guildCreatedAtFromNow})` +
          `\n${(await client.emoji("DGH_owner_guild")) ||
            "👑"} Owner: [${guildOwner}](https://discord.com/users/${
            message.guild.ownerId
          } 'ID: ${message.guild.ownerId}.` +
          `\n${(await client.emoji("DGH_create_at")) || "🕰️"} Created At: ${
            message.guild.members.cache.get(message.guild.ownerId).user
              .createdAt
          }')` +
          `\n${(await client.emoji("DGH_afk")) ||
            "⌨️"} AFK Channel: ${afkChannel}\n${(await client.emoji("DGH_boosts"))} Boost Tier: ${message.guild.premiumTier.toString()}\n${(await client.emoji("DGH_boosts"))} Boosts: ${message.guild.premiumSubscriptionCount}`,
        true
      )
      .addField(
        "Server Features",
        `${await client.emoji("DGH_success")}: **\`${guildFeatures.join(`\`**\n${await client.emoji("DGH_success")}: **\``)}\`**`,
        true
      )
      .addField(
        "Misc",
        `${await client.emoji("DGH_role")} ${roleSize} Roles` +
          `\n${channelSize} **Channels**:` +
          `\n${await client.emoji("DGH_text")} ${textChannels} Text Channels` +
          `\n${await client.emoji("DGH_vc")} ${voiceChannels} Voice Channels` +
          `\n${(await client.emoji("DGH_emoji")) || "🙂"} ${emojiSize} Emojis`,
        true
      )
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setImage(guildBanner);
    return message.channel.send({ embeds: [embed] });
  }
};
