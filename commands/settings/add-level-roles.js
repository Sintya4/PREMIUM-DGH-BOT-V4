const fs = require('fs')
const Discord = require('discord.js')

module.exports = {
    name: 'add-level-role',
    description: 'Add a Role that is given when a user reached a specific level.', 
    category: "settings",
    botPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
    authorPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
    run: async (client, message, args)=> {
        const permission = new Discord.MessageEmbed()
        .setAuthor(`${client.user.username}`, `${client.user.displayAvatarURL({ dynamic: true })}`)
        .setTitle(':x: You dont have any permissions to use this command. :x:')
        .setColor("#c98aff")
        .setTimestamp()
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(permission)

        const provide = new Discord.MessageEmbed()
        .setTitle('You need to mention a role.')
        .setColor('#c98aff')
        .setTimestamp()
        const provideLevel = new Discord.MessageEmbed()
        .setTitle('You need to provide a number.')
        .setDescription('This will give a user the role when the user reached the level.')
        .setColor('#c98aff')
        .setTimestamp()

        const Role_To_Add = message.mentions.roles.first()
        if(!Role_To_Add) return message.channel.send(provide)

        const Level_To_Reach = args[1]
        if(!Level_To_Reach) return message.channel.send(provideLevel)
        if(isNaN(Level_To_Reach)) return message.channel.send(provideLevel)

        if(Level_To_Reach.includes('+')) return message.channel.send(provideLevel)
        if(Level_To_Reach.includes('-')) return message.channel.send(provideLevel)
        if(Level_To_Reach.includes('.')) return message.channel.send(provideLevel)

        const Level_Roles_Storage = fs.readFileSync('./Storages/Level-Roles.json')
        const Level_Roles = JSON.parse(Level_Roles_Storage.toString())
        
        const Level_To_Reach_Check = Level_Roles.find(reach => {
            return (reach.guildID === `${message.guild.id}` && reach.Level_To_Reach === parseInt(Level_To_Reach))
        })
        if(!Level_To_Reach_Check) {
            Level_Roles.push(
                {   
                    guildID: `${message.guild.id}`,
                    Level_Role: `${Role_To_Add.name}`,
                    Level_Role_ID: `${Role_To_Add.id}`,
                    Level_To_Reach: parseInt(Level_To_Reach)
                }
            )
            //Important Line when Creating/Adding a Data to JSON
            const New_Level_Role = JSON.stringify(Level_Roles, null, 4)
            fs.writeFileSync('./Storages/Level-Roles.json', New_Level_Role)

            const Success = new Discord.MessageEmbed()
            .setTitle('New Level Role has been successfully added.')
            .setColor("#c98aff")
            .setTimestamp()
            return message.channel.send(Success)
        } else {
            const Already = new Discord.MessageEmbed()
            .setTitle('There is already a role that has that same level to reach.')
            .setColor("#c98aff")
            .setTimestamp()
            return message.channel.send(Already)
        }
    }
}