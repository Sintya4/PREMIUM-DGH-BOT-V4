const { Client, Message, MessageEmbed } = require("discord.js");
const sr = require("yt-search");
let logo = "https://cdn.discordapp.com/attachments/868172328998146195/892831378515845130/1280px-YouTube_full-color_icon_2017.svg.png";
module.exports = {
    name: "yt-search",
    aliases: ["yt-s"],
    usage: "yt-search <YouTube Title/URL>",
    category: "search",
    run: async(client, message, args) => {
        const search = async (argument) => {
            const Result = await sr(argument);
            return (Result.videos.length > 1) ? Result.videos[0] : null;
        }

        const Vid = search(args.join(" "))
        if (Vid) {
            const Embed = new MessageEmbed()
            .setTitle((await Vid).title)
            .addFields(
                {
                    name: "Duration",
                    value: `${(await Vid).duration.timestamp} Minutes.`,
                    inline: true
                },
                {
                    name: "Created Ago",
                    value: `${(await Vid).ago}.`,
                    inline: true
                },
                {
                    name: "Views",
                    value: `${(await Vid).views} Views.`,
                    inline: true
                }
            )
            .setURL((await Vid).url)
            .setColor("RED").setTimestamp()
            .setImage((await Vid).thumbnail)
            .setAuthor((await Vid).author.name, logo, (await Vid).author.url)
            .setFooter(message.author.username, message.author.avatarURL({ dynamic: true }))
            return await message.reply({
                embeds: [Embed]
            })
        } else {
            const Embed = new MessageEmbed().setColor("#fcbd8f")
            .setDescription("No videos found! **>.<**")
            return message.reply({
                embeds: [Embed]
            });
        };
    },
};