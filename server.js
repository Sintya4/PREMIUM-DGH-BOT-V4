const Discord = require("discord.js"); //Needed discord.js module
const client = new Discord.Client(); //Creating Discord new client

client.once("ready", () => {
  //When bot is ready , bot will run given code
  console.log("Ready!"); //Sends Ready to console as message
  client.user.setActivity(`I am Devil`); //Sets bot activity as "I am Devil"
});

client.on("message", message => {
  //when Someone message
  if (message.content === "!ping") {
    //if message is same as !ping
    return message.channel.send(`Pong ${client.ws.ping}`); //it will return message
  }
  if (message.content === "hi") {
   var callTime = (new Date()).getTime();
      return message.channel.send(
        `please wait ${10-((new Date()).getTime() - callTime )} more second(s) before reusing the \`hai\` command.`
      );
    }
});

client.login("ODI3MDM0MzA0MDA5MzM4OTAw.YGVJtw.DKki8_qxAwc8yhLj77I_OPybX1U"); //Paste Your Bot Token
