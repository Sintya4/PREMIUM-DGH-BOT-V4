const Discord = require("discord.js");
const moment = require("moment");
module.exports = {
  name: "serverinfo",
  description: "Displays server information & statistics!",
  category: "misc",
  usage: "serverinfo",
  aliases: ["stats", "serverstats", "guildinfo", "guildstats"],
  run: async (client, message, args) => {
   
    let flags = {
      dubai: "<:flag_db:801544606730813490>",
      frankfurt: ":flag_de:",
      london: ":flag_gb:",
      amsterdam: ":flag_nl:",
      india: ":flag_in:",
      japan: ":flag_jp:",
      russia: ":flag_ru:",
      hong_kong: ":flag_hk:",
      brazil: ":flag_br:",
      europe: ":flag_eu:",
      sydney: ":flag_au:",
      south_africa: ":flag_za:",
      singapore: ":flag_sg:",
      us: ":flag_us:"
    };

    let guildRegion = message.guild.region
      .replace(/us-west/gi, `${flags.us} US West`)
      .replace(/us-east/gi, `${flags.us} US West`)
      .replace(/us-central/gi, `${flags.us} US West`)
      .replace(/us-south/gi, `${flags.us} US West`)
      .replace(/singapore/gi, `${flags.singapore} Singapore`)
      .replace(/southafrica/gi, `${flags.south_africa} South Africa`)
      .replace(/sydney/gi, `${flags.sydney} Sydney`)
      .replace(/europe/gi, `${flags.europe} Europe`)
      .replace(/brazil/gi, `${flags.brazil} Brazil`)
      .replace(/hongkong/gi, `${flags.hong_kong} Hong Kong`)
      .replace(/russia/gi, `${flags.russia} Russia`)
      .replace(/japan/gi, `${flags.japan} Japan`)
      .replace(/india/gi, `${flags.india} India`)
      .replace(/dubai/gi, `${flags.dubai} Dubai`)
      .replace(/amsterdam/gi, `${flags.amsterdam} Amsterdam`)
      .replace(/london/gi, `${flags.london} London`)
      .replace(/frankfurt/gi, `${flags.frankfurt} Frankfurt`)
      .replace(/eu-central/gi, `${flags.europe} Central Europe`)
      .replace(/eu-west/gi, `${flags.europe} Western Europe`);
      
    let guildFeatures = message.guild.features.join(`\n${await client.emoji("DGH_success")}: `)
            .replace(/animated_icon/ig, `Animated Icon`)
            .replace(/banner/ig, `Banner`)
            .replace(/commerce/ig, `Commerce`)
            .replace(/community/ig, `Community`)
            .replace(/discoverable/ig, `Discoverable`)
            .replace(/featurable/ig, `Featurable`)
            .replace(/invite_splash/ig, `Invite Splash`)
            .replace(/news/ig, `News`)
            .replace(/THREE_DAY_THREAD_ARCHIVE/ig, `Three Day Thread Archive`)
            .replace(/SEVEN_DAY_THREAD_ARCHIVE/ig, `Seven Day Thread Archive`)
            .replace(/PRIVATE_THREADS/ig, `Private`)
            .replace(/more_stickers/ig, `More Stickers`)
            .replace(/monetization_enabled/ig, `Monetization`)
            .replace(/ticketed_events_enabled/ig, `Ticketed Events`)
            .replace(/preview_enabled/ig, `Preview`)
            .replace(/member_verification_gate_enabled/ig, `Member Verification Gate`)
            .replace(/partnered/ig, `Partnered`)
            .replace(/relay_enabled/ig, `Relay Enabled`)
            .replace(/vanity_url/ig, `Vanity Link`)
            .replace(/verified/ig, `Verified`)
            .replace(/vip_regions/ig, `VIP Regions`)
            .replace(/welcome_screen_enabled/ig, `Welcome Screen`) || "None";
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
    let guildBanner = message.guild.splash ? message.guild.splashURL() : ""// message.guild.banner ? message.guild.banner : "";

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
    let guildOwner = message.guild.owner.user.tag; // await message.guild.members.fetch(message.guild.ownerID)
    let fetchedMembers = await message.guild.members.fetch();
  
    let onlineMembers = fetchedMembers.filter(
        c => c.presence.status === "online"
      ).size,
      offlineMembers = fetchedMembers.filter(
        c => c.presence.status === "offline"
      ).size,
      dndMembers = fetchedMembers.filter(c => c.presence.status === "dnd").size,
      idleMembers = fetchedMembers.filter(c => c.presence.status === "idle")
        .size,
      bots = fetchedMembers.filter(c => c.user.bot).size,
      humans = fetchedMembers.filter(c => !c.user.bot).size;
    let humanPercent = Math.round((message.guild.members.cache.filter(m => !m.user.bot).size / message.guild.memberCount) * 100);
    let botPercent = Math.round((message.guild.members.cache.filter(m => m.user.bot).size / message.guild.memberCount) * 100);
  
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
          `\n${await client.emoji("DGH_off")} ${offlineMembers} Offline` +
          `\n${await client.emoji("DGH_dnd")} ${dndMembers} DND` +
          `\n${await client.emoji("DGH_idle")} ${idleMembers} Idle`,
        true
      )
      .addField(
        "Guild:",
        `:id: Guild: ${guildName}` +
          `\n${await client.emoji("DGH_create_at") || "🕰️"} Created At: ${guildCreatedAt} (${guildCreatedAtFromNow})` +
          `\n${await client.emoji("DGH_owner_guild") || "👑"} Owner: [${guildOwner}](https://discord.com/users/${message.guild.ownerID} 'ID: ${message.guild.ownerID}.` +
          `\n${await client.emoji("DGH_create_at") || "🕰️"} Created At: ${message.guild.owner.user.createdAt}')` +
          `\n${await client.emoji("DGH_region") || "📍"}Region: ${guildRegion}` +
          `\n${await client.emoji("DGH_afk") || "⌨️"} AFK Channel: ${afkChannel}`,
        true
      )
      .addField("Server Features", await client.emoji("DGH_success") + ": "+ guildFeatures, true)
      .addField(
        "Misc",
        `${await client.emoji("DGH_role")} ${roleSize} Roles` +
          `\n${channelSize} **Channels**:` +
          `\n${await client.emoji("DGH_text")} ${textChannels} Text Channels` +
          `\n${await client.emoji("DGH_vc")} ${voiceChannels} Voice Channels` +
          `\n${await client.emoji("DGH_emoji")|| "🙂"} ${emojiSize} Emojis`,
        true
      )
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setImage(guildBanner);
    return message.channel.send(embed);
  }
};
