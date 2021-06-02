const db = require("quick.db");


module.exports = {

  name: "length",

  category: "utility",

  description: "lenght command :/",

  usage: "length <msg>",
args: true,
  run: async (client, message, args, del, member) => {
   message.delete();
    const usa = args.join(' ')
      if (!usa) return message.channel.send(`${message.author}, length <msg>`).then(m=>m.delete({timeout:5000}).catch(e=>{}))
   // const Channel = member.guild.channels.cache.get('797491226567114753') //insert channel id that you want to send to
     return message.channel.send(`String length : \`${args.join(' ').length}\``);
    

   }}