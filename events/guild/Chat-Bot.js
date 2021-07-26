let fetch = require("node-fetch");
module.exports = async client => {
  client.on("message", async message => {
    if (message.author.bot || !message.guild || message.webhookID) return;
    let Prefix = await await client.data.get(`Prefix_${message.guild.id}`);
    let translate = require("@k3rn31p4nic/google-translate-api");
    let language = await client.data.get(`LANG_${message.guild.id}`);
    const cchann = await client.data.get(`chatbot_${message.guild.id}`);
    if (cchann === null) return;
    if (!cchann) return;
    if (message.channel.id == cchann) {
      if (message.author.bot) return;
      message.content = message.content
        .replace(/@(everyone)/gi, "everyone")
        .replace(/@(here)/gi, "here");
      message.channel.stopTyping();
      message.channel.startTyping();
      let data = await fetch(
        `https://api.udit.gq/api/chatbot?message=${message.content}[&name=DGH BOT V2&user=${message.author.id}&gender=botsgender]`
      ).then(res => res.json());
      let a = await translate(data.message, {
        to: language || "english"
      });
      message.inlineReply(a.text);
      message.channel.stopTyping();
    }
  });
};
