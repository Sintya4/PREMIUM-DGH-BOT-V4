let fetch = require("node-fetch");
let Discord= require("discord.js");
module.exports = {
        name: "shorturl",
        usage: `shorturl <url>`,
        category: "utility",
        description: "",
        args: true,
        run: async (client, message, args) => {
//code
let url = args.join(" ")

const res = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURI(url)}`);
		const body = await res.text();
		if(body === "Error: Please enter a valid URL to shorten"){
			return message.channel.send("Error: Please enter a valid URL to shorten");
		}

		
const web = new client.button.MessageButton()
        .setStyle("green")
        .setLabel("Click Here")
        .setURL(body);
  
const embed = new Discord.MessageEmbed()
			.setColor("RANDOM")
			.setDescription(body);
		 
    client.button.send(null, {
      channel: message.channel.id,
      embed: embed,
      buttons: [[web]]
    });
}}