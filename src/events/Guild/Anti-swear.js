module.exports = async client => {
  client.on("messageCreate", async message => {
    if (!message.guild || message.webhookID) return;
    let words = await client.data.get(`words_${message.guild.id}`);
    let msg1 = await client.data.get(`msg_word_${message.guild.id}`);
    if (msg1 === null) {
      msg1 = ":x: | **{user}, The Word You said is blacklisted!**";
    }
    let Prefix = await client.data.get(`Prefix_${message.guild.id}`);
    if (!Prefix) Prefix = client.config.bot.prefix;
    if (message.content.startsWith(Prefix + "addword")) return;
    if (message.content.startsWith(Prefix + "delword")) return;
    if (msg1) {
      msg1 = msg1.replace(/{user}/g, message.author);
      msg1 = msg1.replace(/{server}/g, message.guild.name);
      msg1 = msg1.replace(/{username}/g, message.author.tag);
      let matches = msg1.match(/{:([a-zA-Z0-9]+)}/g);
      if (!matches) matches = msg1;
      for (const match of matches) {
        const rep = await message.guild.emojis.cache.find(
          emoji => emoji.name === match.substring(2, match.length - 1)
        );
        if (rep) msg1 = msg1.replace(match, rep);
      }
    }
    if (words === null) return;
    function check(msg) {
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
      client.send(msg1, { message, timeout: 5000 });
    }
  });
};
