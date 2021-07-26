const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'setytchannel',
    aliases: ['ytset'],
    authorPermission: ["ADMINISTRATOR"],
    category: 'yt_poster',
    description: 'Set a setup Channel with a CHANNELLINK, DCCHAT, DCUSER and a MESSAGE',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        let toreplace_format =
            `**\`{videourl}\` ==> URL / LINK**` + "\n" +
            `**\`{video}\` ==> URL / LINK**` + "\n" +
            `**\`{url}\` ==> URL / LINK**` + "\n" +
            `**\`{videotitle}\` ==> TITLE / NAME**` + "\n" +
            `**\`{name}\` ==> TITLE / NAME**` + "\n" +
            `**\`{title}\` ==> TITLE / NAME**` + "\n" +
            `**\`{videoauthorname}\` ==> Channelauthor NAME**` + "\n" +
            `**\`{authorname}\` ==> Channelauthor NAME**` + "\n" +
            `**\`{author}\` ==> Channelauthor NAME**` + "\n" +
            `**\`{creator}\` ==> Channelauthor NAME**` + "\n" +
            `**\`{creatorname}\` ==> Channelauthor NAME**` + "\n" +
            `**\`{discorduser}\` ==> ID of the LINKED USER**` + "\n" +
            `**\`{user}\` ==> ID of the LINKED USER**` + "\n" +
            `**\`{member}\` ==> ID of the LINKED USER**` + "\n\n" +
            `**__DEFAULT MESSAGE:__** \`\`\`${client.YTP.options.defaults.Notification}\`\`\``;


        let ChannelLink = args[0];
        let DiscordChannel = message.mentions.channels.filter(c => c.guild.id == message.guild.id).first() || message.guild.channels.cache.get(args[1]);
        let DiscordUser = message.mentions.members.filter(m => m.guild.id == message.guild.id).first() || message.guild.members.cache.get(args[2]) ;
        let Notification = args.slice(3).join(" ") || client.YTP.options.defaults.Notification;
        let preventDuplicates = true;

        if (!ChannelLink || !DiscordChannel || !DiscordUser) return message.channel.send(
            new MessageEmbed()
                .setColor("RED")
                .setDescription(`:x: Usage: \`<LINK> <CHANNEL> <USER> [TEXT...]\`\n\n**Replacements:**\n` + toreplace_format)
        )

        //set a Channel
        client.YTP.setChannel(ChannelLink, DiscordChannel, DiscordUser.user, Notification, preventDuplicates = true)
            .then(ch => {
                message.channel.send(
                    new MessageEmbed()
                 .setColor("RANDOM").setFooter(`DGH BOT V2`)   .setDescription(`I will now post Notifications for ${ch.YTchannel} (<@${ch.DiscordUser}>) in <#${ch.DiscordChannel}>\n\nThe Message:\n${ch.message}`)
                    .setAuthor(message.author.tag)
                    .setThumbnail(message.author.displayAvatarURL({dynamic : true}))
                ).then(msg => msg.react("👍"))
            }).catch(e => {
                console.log(e);
                message.channel.send(`${e.message ? e.message : e}`, {
                    code: "js"
                })
            })

    }
}