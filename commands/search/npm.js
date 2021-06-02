const fetch = require('node-fetch');
const moment = require('moment');
const discord = require ("discord.js")
module.exports = {
        name: "npm",
        usage: `npm <Package>`,
        category: "search",
        description: "Sends information on an NPM package.",
        args: true,
        cooldown: 0,
        permission: "",
    run: async (client, message, args) => {
//code
      const npm = args[0].replace(/ +/g, '-')
        if(!npm) return message.reply('Please Provide A Valid Package To Search.') // If No Packge In Searched.

        let response
        try {
            response = await fetch('https://api.npms.io/v2/search?q=' + args[0]).then(res => res.json()) // Search For Package
        }
        catch (e) {
            return message.reply('An Error Occured, Try Again Later.')    
        }
        try {
        const pkg = response.results[0].package
        const embed = new discord.MessageEmbed()
        .setAuthor('NPM', 'https://i.imgur.com/ErKf5Y0.png', 'https://www.npmjs.com/')
        .setTitle(pkg.name)
        .setColor(0xCB0000)
        .setURL(pkg.links.npm)
        .setThumbnail('https://images-ext-1.discordapp.net/external/JsiJqfRfsvrh5IsOkIF_WmOd0_qSnf8lY9Wu9mRUJYI/https/images-ext-2.discordapp.net/external/ouvh4fn7V9pphARfI-8nQdcfnYgjHZdXWlEg2sNowyw/https/cdn.auth0.com/blog/npm-package-development/logo.png')
        .setDescription(pkg.description)
        .addField('❯ Author', pkg.author ? pkg.author.name : 'None') // 'None' Because If No Author Is Their
        .addField('❯ Version', pkg.version)
        .addField('❯ Description', pkg.description || 'No description.')
        .addField('❯ Repository', pkg.links.repository ? pkg.links.repository : 'None')  // 'None' Because If No Repository Is Their
        .addField('❯ Maintainers', pkg.maintainers ? pkg.maintainers.map(e => e.username).join(', ') : 'None') // 'None' Because If No Maintainer Are Their
        .addField('❯ Keywords', pkg.keywords ? pkg.keywords.join(', ') : 'None') // 'None' Because If No keyWords Are Their
        .setTimestamp()
        message.channel.send(embed)
        }
  
    
      
        catch (err) {
            if (err.status === 404) return message.channel.send('Could not find any results.');
            return message.channel.send(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
        }
    }
}