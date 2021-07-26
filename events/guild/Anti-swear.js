let { Default_Prefix } = require("../../config.js")
module.exports = async client => {

 client.on("message", async message => {
    if (message.author.bot || !message.guild || message.webhookID) return;

    let words = await client.data.get(`words_${message.guild.id}`);
    let yus = await client.data.get(`message_${message.guild.id}`);
    if (yus === null) {
      yus = ":x: | **{user-mention}, The Word You said is blacklisted!**";
    }
    let Prefix = await await client.data.get(`Prefix_${message.guild.id}`);
    if (!Prefix) Prefix = Default_Prefix;
    if (message.content.startsWith(Prefix + "addword")) return;
    if (message.content.startsWith(Prefix + "delword")) return;
    if (message.content.startsWith(Prefix + "set-warn-msg")) return;
    if (message.content.startsWith(Prefix + "words")) return;
    let pog = yus
      .split("{user-mention}")
      .join("<@" + message.author.id + ">")
      .split("{server-name}")
      .join(message.guild.name)
      .split("{user-tag}")
      .join(message.author.tag)
      .split("{user-username}")
      .join(message.author.username);
    if (words === null) return;
    function check(msg) {
      //is supposed to check if message includes da swear word
      return words.some(word =>
        message.content
          .toLowerCase()
          .split(" ")
          .join("")
          .includes(word.word.toLowerCase())
      );
    }
    if (check(message.content) === true) {
      message.delete();
      message.channel
        .send(pog)
        .then(m => m.delete({ timeout: 5000 }).catch(e => {}));
    }
  });
}