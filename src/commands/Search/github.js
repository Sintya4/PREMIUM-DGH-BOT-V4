const moment = require("moment");
const fetch = require("node-fetch");
module.exports = {
  name: "github",
  category: "search",
  usage: "Github <Name>",
  args: true,
  description: `Github User Account Information!`,
  run: async (client, message, args) => {
    message.delete();
    return fetch(`https://api.github.com/users/${args.join("-")}`)
      .then(res => res.json())
      .then(body => {
        if (body.message)
          return client.send(
            `User Not Found | Please Give Me A Valid Username!`,
            { message }
          );
        let {
          login,
          avatar_url,
          name,
          id,
          html_url,
          public_repos,
          public_gists,
          followers,
          following,
          location,
          created_at,
          email,
          site_admin,
          bio
        } = body;
        const embed = new client.Discord.MessageEmbed()
          .setColor("RANDOM")
          .setAuthor(`${login} Information!`, avatar_url)
          .setThumbnail(avatar_url)
          .setDescription(
            `Username: ${login}\nID: ${id}\nSite Admin: ${
              site_admin ? "Yes" : "No"
            }\nEmail : ${email || "No Email"}\nBio: ${bio ||
              "No Bio"}\nPublic Repositories: ${public_repos ||
              "None"}\nPublic Gists: ${public_gists ||
              "None"}\nFollowers: ${followers ||
              "No Followers"}\nFollowing: ${following ||
              "No Following"}\nLocation: ${location ||
              "No Location"}\nAccount Created: ${moment
              .utc(created_at)
              .format("dddd, MMMM, Do YYYY")}`
          )
          .setFooter(`Tysm For Using Me! ${message.author.username}`);
        message.channel.send({ embeds: [embed] });
      });
  }
};
