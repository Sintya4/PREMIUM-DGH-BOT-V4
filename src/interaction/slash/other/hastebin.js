const sourcebin = require("sourcebin_js");
module.exports = {
  name: "hastebin",
  description: "Create a source from the code and it will be uploaded to the hastebin web",
  options: [
    {
      type: "STRING",
      name: "name_code",
      description: "What is the name of the source?",
      required: true
    },
    {
      type: "STRING",
      name: "language_code",
      description: "What is the language in the source?",
      required: true,
      choices: [
        {
          name: "None",
          value: "NONE"
        },
        {
          name: "Java Script",
          value: "JavaScript"
        },
        {
          name: "Html",
          value: "HTML"
        },
        {
          name: "Python",
          value: "Python"
        },
        {
          name: "Java",
          value: "Java"
        },
        {
          name: "Css",
          value: "CSS"
        },
        {
          name: "SVG",
          value: "SVG"
        },
        {
          name: "C#",
          value: "C#"
        },
        {
          name: "XML",
          value: "XML"
        }
      ]
    },
    {
      type: "STRING",
      name: "code_type",
      description: "What's the source?",
      required: true
    },
    {
      type: "STRING",
      name: "description_code",
      description: "What is the description of the source?",
      required: false
    }
  ],
  async execute(client, interaction) {
    const Content = interaction.options.getString("code");
    const Title = interaction.options.getString("title");
    const Language = interaction.options.getString("language");
    const Description = interaction.options.getString("description");
    sourcebin
      .create(
        [
          {
            name: "Made By " + interaction.user.username,
            content: Content,
            languageId: Language
          }
        ],
        { title: Title, description: Description || "" }
      )
      .then(src => {
        let embed = new client.Discord.MessageEmbed()
          .setTitle(`Hastebin`)
          .setColor("RANDOM")
          .setDescription(
            `Code:\n\`\`\`js\n${
              Content ? Content.substr(0, 2048) : Content
            }\n\`\`\``
          );
        interaction.reply({
          content: src.url,
          embeds: [embed]
        });
      })
      .catch(e => {
        interaction.reply({
          content: `Error, try again later`,
          ephemeral: true
        });
      });
  }
};
