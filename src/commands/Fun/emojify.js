const mapping = {
  " ": "   ",
  "0": ":zero:",
  "1": ":one:",
  "2": ":two:",
  "3": ":three:",
  "4": ":four:",
  "5": ":five:",
  "6": ":six:",
  "7": ":seven:",
  "8": ":eight:",
  "9": ":nine:",
  "!": ":grey_exclamation:",
  "?": ":grey_question:",
  "#": ":hash:",
  "?": ":grey_question:",
  "*": ":asterisk:"
};

"abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
  mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
});

module.exports = {
  name: "emojify",
  aliases: [],
  category: "fun",
  usage: "emojify <text>",
  args: true,
  description: "Returns provided text in emojify (emotes) form.",
  run: async (client, message, args) => {
    await message.delete();
    message.channel.send({
      content: args
        .join(" ")
        .split("")
        .map(c => mapping[c] || c)
        .join("")
    });
  }
};
