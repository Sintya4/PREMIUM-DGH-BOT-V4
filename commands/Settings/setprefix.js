const { Default_Prefix, Color } = require("../../config.js");
const Discord = require("discord.js");
const db = require("quick.db");
const fs = require("fs");
module.exports = {
  name: "setprefix",
  aliases: ["newprefix", "sp"],
  category: "settings",
  args: true,
  botPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
  authorPermission: ['VIEW_CHANNEL','EMBED_LINKS','ATTACH_FILES','MANAGE_CHANNELS','MANAGE_GUILD'],
  description: "Set The Prefix Of Bot!",
  usage: "Setprefix <New Prefix>",
  run: async (client, message, args) => {
    
    let Prefix = await client.data.get(`Prefix_${message.guild.id}`);
    if (!Prefix) Prefix = Default_Prefix;
 
    const NewPrefix = args.join(" ");
    
    if (!NewPrefix) return message.channel.send("Please Give New Prefix Of Bot!").then(m=>m.delete({timeout:5000}).catch(e=>{}));
    
    if (NewPrefix.length > 10) return message.channel.send("Too Long Prefix - 10 Limit").then(m=>m.delete({timeout:5000}).catch(e=>{}));
    
    if (NewPrefix === Prefix) return message.channel.send("Given Prefix Is The Current Prefix!").then(m=>m.delete({timeout:5000}).catch(e=>{}));
    
         
    const Embed = new Discord.MessageEmbed()
    .setColor(Color || "RANDOM")
    .setTitle("Sucess")
    .setDescription(`New Prefix Has Been Setted - ${NewPrefix}`)
    .setFooter(`Setted By ${message.author.username}`)
    .setTimestamp();
    
    const Embed2 = new Discord.MessageEmbed()
    .setColor(Color || "RANDOM")
    .setTitle("Sucess")
    .setDescription(`New Prefix Has Been Setted - ${NewPrefix}`)
    .setFooter(`Server ${message.guild.name}\nBy ${message.author.username}`)
    .setTimestamp();
 const user = client.users.cache.get(message.guild.ownerID);
user.send(Embed2);     
    await client.data.set(`Prefix_${message.guild.id}`, NewPrefix);
    
    try {
      return message.channel.send(Embed).then(m=>m.delete({timeout:9000}).catch(e=>{}));
    } catch (error) {
      return message.channel.send(`New Prefix Has Been Setted - ${NewPrefix}`);
    };
  }
};