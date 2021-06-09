const fs = require('fs')
const Discord = require('discord.js')

module.exports = {
    name: 'level-roles',
    description: 'Shows the list of Level Roles of the server.', 
    category: "settings",
    botPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
    authorPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
    run: async (client, message, args)=> {

        const Level_Roles_Storage = fs.readFileSync('./Storages/Level-Roles.json')
        const Level_Roles = JSON.parse(Level_Roles_Storage.toString())
        
        const Guild_Check = Level_Roles.find(reach => {
            return reach.guildID === `${message.guild.id}`
        })
        if(!Guild_Check) {
            const No_Roles = new Discord.MessageEmbed()
            .setTitle('There are no Level Roles yet.')
            .setColor("#c98aff")
            .setTimestamp()
            return message.channel.send(No_Roles)
        }

        const List_Of_Level_Roles = Level_Roles.filter(Level_Roles => {
            return Level_Roles.guildID === message.guild.id
        }).map(Roles => {
            return Roles.Level_Role
        })
        const List_Of_Levels_To_Reach = Level_Roles.filter(Level_Roles => {
            return Level_Roles.guildID === message.guild.id
        }).map(Roles => {
            return Roles.Level_To_Reach
        })
        const List_Of_IDs = Level_Roles.filter(Level_Roles => {
            return Level_Roles.guildID === message.guild.id
        }).map(Roles => {
            return Roles.Level_Role_ID
        })

        const Success = new Discord.MessageEmbed()
        .setAuthor(`${message.guild.name}`, `${message.guild.iconURL({ dynamic: true })}`)
        .setTitle('[ Level Roles ]')
        .addFields(
            {
                name: 'Name',
                value: List_Of_Level_Roles.join('\n'),
                inline: true
            },
            {
                name: 'Level To Reach',
                value: `${List_Of_Levels_To_Reach.join('\n')}`,
                inline: true
            },
            {
                name: 'ID',
                value: `${List_Of_IDs.join('\n')}`,
                inline: true
            }
        )
        .setImage('https://media.discordapp.net/attachments/832519166459510795/832837073274273797/Level_Roles.png?width=1085&height=610')
        .setColor("#c98aff")
        .setTimestamp()
        return message.channel.send(Success)
    }
}