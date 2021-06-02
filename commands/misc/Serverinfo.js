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
      
    let guildFeatures = message.guild.features.join("\n")
            .replace(/animated_icon/ig, `${client.emotes.success}Animated Icon`)
            .replace(/banner/ig, `${client.emotes.success}Banner`)
            .replace(/commerce/ig, `${client.emotes.success}Commerce`)
            .replace(/community/ig, `${client.emotes.success}Community`)
            .replace(/discoverable/ig, `${client.emotes.success}Discoverable`)
            .replace(/featurable/ig, `${client.emotes.success}Featurable`)
            .replace(/invite_splash/ig, `${client.emotes.success}Invite Splash`)
            .replace(/news/ig, `${client.emotes.success}News`)
            .replace(/partnered/ig, `${client.emotes.success}Partnered`)
            .replace(/relay_enabled/ig, `${client.emotes.success}Relay Enabled`)
            .replace(/vanity_url/ig, `${client.emotes.success}Vanity Link`)
            .replace(/verified/ig, `${client.emotes.success}Verified`)
            .replace(/vip_regions/ig, `${client.emotes.success}VIP Regions`)
            .replace(/welcome_screen_enabled/ig, `${client.emotes.success}Welcome Screen Enabled`)

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

    let embed = new Discord.MessageEmbed()

      .setColor("RANDOM")
      .setTitle(message.guild.name)
      .setThumbnail(guildIcon)
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setDescription(`*${guildDescription}*`)
      .addField(
        "Members:",
        `**${guildMemberCount} Members**` +
        `\n🤖 ${bots} Bots` +
        `\n👋 ${humans} Humans`,
        true
      )
      .addField(
        `Presences:`,
        `${client.emotes.on}${onlineMembers} Online` +
          `\n${client.emotes.off}${offlineMembers} Offline` +
          `\n${client.emotes.dnd}${dndMembers} DND` +
          `\n${client.emotes.idle}${idleMembers} Idle`,
        true
      )
      .addField(
        "Guild:",
        `:id: Guild: ${guildName}` +
          `\n🕰️Created At: ${guildCreatedAt} (${guildCreatedAtFromNow})` +
          `\n👑Owner: [${guildOwner}](https://discord.com/users/${message.guild.ownerID} 'ID: ${message.guild.ownerID}.` +
          `\nCreated At: ${message.guild.owner.user.createdAt}')` +
          `\n📍Region: ${guildRegion}` +
          `\n⌨️ AFK Channel: ${afkChannel}`,
        true
      )
      .addField("Server Features", guildFeatures, true)
      .addField(
        "Misc",
        `${client.emotes.misc} ${roleSize} Roles` +
          `\n${channelSize} **Channels**:` +
          `\n${client.emotes.text} ${textChannels} Text Channels` +
          `\n${client.emotes.vc} ${voiceChannels} Voice Channels` +
          `\n🙂 ${emojiSize} Emojis`,
        true
      )
      .setFooter(client.user.username, client.user.displayAvatarURL())
      .setImage(guildBanner);
    return message.channel.send(embed);
  }
};
