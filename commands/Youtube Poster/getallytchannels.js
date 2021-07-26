const { Client, Message, MessageEmbed } = require('discord.js');
module.exports = {
    name: 'getallytchannels',
    aliases: ['getalluser'],
    category: 'yt_poster',
    description: 'Get all setup Channels of this Guild',
    usage: '',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        //get all channels
        client.YTP.getAllChannels(message.guild.id)
            .then(chs => {
                message.channel.send(
                    new MessageEmbed()
                        .setDescription(`There are ${chs.length} Channels Setupped!`)
                        .setAuthor(message.author.tag)
                        .setThumbnail(message.author.displayAvatarURL({dynamic : true}))
                        .setColor("RANDOM") 
                        .setFooter(`DGH BOT V2`) 
               ).then(msg => msg.react("👍"))
            }).catch(e => {
                console.log(e);
                message.channel.send(`${e.message ? e.message : e}`, {
                    code: "js"
                })
            })

    }
}