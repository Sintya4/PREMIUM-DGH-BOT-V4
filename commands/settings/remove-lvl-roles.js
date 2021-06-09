const fs = require('fs')
const Discord = require('discord.js')

module.exports = {
    name: 'remove-level-role',
    description: 'Remove a Level Role that is given when a user levels up.', 
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
        .setTitle('You need to provide a role ID.')
        .setColor('#c98aff')
        .setTimestamp()

        const Role_To_Remove = args[0]
        if(!Role_To_Remove) return message.channel.send(provide)
        if(isNaN(Role_To_Remove)) return message.channel.send(provide)

        const Level_Roles_Storage = fs.readFileSync('./Storages/Level-Roles.json')
        const Level_Roles = JSON.parse(Level_Roles_Storage.toString())
        
        const Level_Role_ID_Check = Level_Roles.find(id => {
            return (id.guildID === `${message.guild.id}` && id.Level_Role_ID === Role_To_Remove)
        })
        if(!Level_Role_ID_Check) {
            const No_Roles = new Discord.MessageEmbed()
            .setTitle('There is no Level Role with that ID.')
            .setColor("#c98aff")
            .setTimestamp()
            return message.channel.send(No_Roles)
        } else {
            const Removing_Level_Role = Level_Roles.filter(id => {
                return id.Level_Role_ID !== `${Role_To_Remove}`
            });
            fs.writeFileSync('./Storages/Level-Roles.json', JSON.stringify(Removing_Level_Role, null, 4));
            
            const Success = new Discord.MessageEmbed()
            .setTitle('Level Role has been successfully removed.')
            .setColor("#c98aff")
            .setTimestamp()
            message.channel.send(Success)
            //Saves the Data, this also means that it won't bring back the previous data after it got deleted
            return setTimeout(() => {
                const Saving_Data = fs.readFileSync('./Storages/Level-Roles.json', 'utf8')
                const Saved_Data = JSON.parse(Saving_Data.toString())
                fs.writeFileSync('./Storages/Level-Roles.json', JSON.stringify(Saved_Data, null, 4))
            }, 1000)
        }
    }
}