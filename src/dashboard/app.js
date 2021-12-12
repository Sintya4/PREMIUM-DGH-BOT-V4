const DBD = require("discord-dashboard");
const CaprihamTheme = require("dbd-capriham-theme");
const Discord = require("discord.js");
module.exports = async (client) => {
  let cmd = [];
  let options = {
    description:
      "DGH BOT is a multiple purpose bot including extraordinary features such as Moderation, Leveling System, Welcomer, Search, Misc and other commands!",
    image:
      "https://media.discordapp.net/attachments/850346094520434720/908270754443976704/DGH_BOT_V3.png",
  };
  client.commands.map((command) =>
    cmd.push({
      commandName: `!${command.name}`,
      commandUsage: command.usage || "No Usage",
      commandDescription: command.description || "No Description",
    })
  );
  const Dashboard = new DBD.Dashboard({
    port: 3000,
    client: {
      id: client.config.dash.id,
      secret: client.config.dash.secret,
    },
    redirectUri: `${client.config.dash.url}/discord/callback`,
    domain: client.config.dash.url,
    invite: {
      custom: `
<!DOCTYPE html>
<html>
<head>
<title>${client.user.username}</title>
<meta property="og:site_name" content="Add Me To Your server">
<meta property="og:title" content="${client.user.username}">
<meta property="og:image" content="${client.user.avatarURL()}">
<meta property="og:description" content="Thank you for adding me to your server">
<meta property="twitter:card" content="summary">
<meta property="twitter:title" content="${client.user.username}">
<meta property="twitter:image" content="${client.user.avatarURL()}">
<meta property="twitter:description" content="Thank you for adding me to your server">
<meta name="theme-color" content="#7289da">
<meta http-equiv="refresh" content="0; url=${client.config.bot.invite}">
</html>
  `,
    },
    noCreateServer: false,
    supportServer: {
      slash: "/dc",
      inviteUrl: client.config.server.invite,
    },
    bot: client,
    theme: CaprihamTheme({
      websiteName: client.user.username,
      footer: "឵",
      iconURL: client.user.avatarURL(),
      index: {
        card: {
          title: client.user.username,
          description: options.description,
          image: options.image,
        },
        information: {
          title: "Information",
          description:
            "To manage your bot, go to the <a href='/manage'>Server Management page</a>.<br><br>For a list of commands, go to the <a href='/commands'>Commands page</a>.",
        },
        feeds: {
          title: "Feeds",
          list: [
            {
              icon: "fa fa-user",
              text: "New user registered",
              timeText: "Just now",
              bg: "bg-light-info",
            },
            {
              icon: "fa fa-server",
              text: "Server issues",
              timeText: "3 minutes ago",
              bg: "bg-light-danger",
            },
          ],
        },
      },
      commands: {
        pageTitle: "Commands",
        table: {
          title: "List Commands",
          subTitle: "All Command",
          list: cmd,
        },
      },
    }),
    settings: [
      {
        categoryId: "setup",
        categoryName: "Setup",
        categoryDescription: "Setup your bot with default settings!",
        categoryOptionsList: [
          {
            optionId: "prefix",
            optionName: "Prefix",
            optionDescription: "The prefix on the current server is;",
            optionType: DBD.formTypes.input("Bot Prefix", 1, 3, false, true),
            getActualSet: async ({ guild }) => {
              return (await client.data.get(`Prefix_${guild.id}`)) || false;
            },
            setNew: async ({ guild, newData }) => {
              await client.data.set(`Prefix_${guild.id}`, newData);
              return;
            },
          },
          {
            optionId: "nickname",
            optionName: "Nickname",
            optionDescription: "Bot's nickname on the guild;",
            optionType: DBD.formTypes.input("Bot username", 1, 16, false, true),
            getActualSet: async ({ guild }) => {
              return (
                client.guilds.cache
                  .get(guild.id)
                  .members.cache.get(client.user.id).displayName || false
              );
            },
            setNew: async ({ guild, newData }) => {
              await client.guilds.cache
                .get(guild.id)
                .members.cache.get(client.user.id)
                .setNickname(newData);
              return;
            },
          },
          {
            optionId: "auto-roles",
            optionName: "Auto Roles",
            optionDescription: `Auto Roles For new members to enter the server;`,
            optionType: DBD.formTypes.rolesMultiSelect(false, true),
            getActualSet: async ({ guild }) => {
              return (await client.data.get(`roles_auto_${guild.id}`)) || false;
            },
            setNew: async ({ guild, newData }) => {
              await client.data.set(`roles_auto_${guild.id}`, newData);
              return;
            },
          },
          {
            optionId: "auto-nickname",
            optionName: "Auto Nickname",
            optionDescription:
              "Auto Nickname For new members to enter the server;",
            optionType: DBD.formTypes.input(
              "[Member] {username}",
              1,
              20,
              false,
              true
            ),
            getActualSet: async ({ guild }) => {
              return (await client.data.get(`nick_auto_${guild.id}`)) || false;
            },
            setNew: async ({ guild, newData }) => {
              await client.data.set(`nick_auto_${guild.id}`, newData);
              return;
            },
          },
        ],
      },
      {
        categoryId: "settings_ch",
        categoryName: "Setting Channel",
        categoryDescription: "Setup your bot with default settings!",
        categoryOptionsList: [
          {
            optionId: "ch-welcome",
            optionName: "Channel Welcome",
            optionDescription:
              "Notify that there is a new member on the server;",
            optionType: DBD.formTypes.channelsSelect(false, false),
            getActualSet: async ({ guild }) => {
              return (
                (await client.data.get(`wel_channel__${guild.id}`)) || false
              );
            },
            setNew: async ({ guild, newData }) => {
              await client.data.set(`wel_channel__${guild.id}`, newData);
              return;
            },
          },
          {
            optionId: "ch-leave",
            optionName: "Channel Leave",
            optionDescription: "Notifying that a member has left the server;",
            optionType: DBD.formTypes.channelsSelect(false, false),
            getActualSet: async ({ guild }) => {
              return (
                (await client.data.get(`lev_channel__${guild.id}`)) || false
              );
            },
            setNew: async ({ guild, newData }) => {
              await client.data.set(`lev_channel__${guild.id}`, newData);
              return;
            },
          },
          {
            optionId: "ch-level",
            optionName: "Channel Level Up",
            optionDescription:
              "Notifying that the member has leveled up on the server;",
            optionType: DBD.formTypes.channelsSelect(false, false),
            getActualSet: async ({ guild }) => {
              return (
                (await client.data.get(`lvl_channel__${guild.id}`)) || false
              );
            },
            setNew: async ({ guild, newData }) => {
              await client.data.set(`lvl_channel__${guild.id}`, newData);
              return;
            },
          },
          {
            optionId: "ch-modlog",
            optionName: "Channel Moderation Logs",
            optionDescription:
              "Notify that the staff is warning members or others;",
            optionType: DBD.formTypes.channelsSelect(false, false),
            getActualSet: async ({ guild }) => {
              return (await client.data.get(`modlog_${guild.id}`)) || false;
            },
            setNew: async ({ guild, newData }) => {
              await client.data.set(`modlog_${guild.id}`, newData);
              return;
            },
          },
          {
            optionId: "ch-star",
            optionName: "Channel Starboard",
            optionDescription:
              "Notifying that anyone react message with ⭐ eats on send on server;",
            optionType: DBD.formTypes.channelsSelect(false, false),
            getActualSet: async ({ guild }) => {
              return (
                (await client.data.get(`starboard_channel__${guild.id}`)) ||
                false
              );
            },
            setNew: async ({ guild, newData }) => {
              await client.data.set(`starboard_channel__${guild.id}`, newData);
              return;
            },
          },
        ],
      },
      {
        categoryId: "settings_msg",
        categoryName: "Setting Message",
        categoryDescription: "Setup your bot with default settings!",
        categoryOptionsList: [
          {
            optionId: "msg-welcome",
            optionName: "Message Welcome",
            optionDescription:
              "Text to be changed; {user} / {username}, {server}, {invite}, {inviter} / {inviter-username}, {member_join}, {member_at}, {membercount}, {:name_emoji}",
            optionType: DBD.formTypes.textarea(
              "Welcome {user}",
              15,
              20881,
              false,
              false
            ),
            getActualSet: async ({ guild }) => {
              return (
                (await client.data.get(`msg_welcome_${guild.id}`)) || false
              );
            },
            setNew: async ({ guild, newData }) => {
              await client.data.set(`msg_welcome_${guild.id}`, newData);
              return;
            },
          },
          {
            optionId: "msg-lev",
            optionName: "Message Leave",
            optionDescription:
              "Text to be changed; {user} / {username}, {server}, {member_leave}, {membercount}, {:name_emoji}",
            optionType: DBD.formTypes.textarea(
              "Goodbye {user}",
              15,
              20881,
              false,
              false
            ),
            getActualSet: async ({ guild }) => {
              return (await client.data.get(`msg_leave_${guild.id}`)) || false;
            },
            setNew: async ({ guild, newData }) => {
              await client.data.set(`msg_leave_${guild.id}`, newData);
              return;
            },
          },
          {
            optionId: "msg-lvl",
            optionName: "Message Level",
            optionDescription:
              "Text to be changed; {user} / {username}, {server}, {member_level}, {member_xp}, {:name_emoji}",
            optionType: DBD.formTypes.textarea(
              "You Have Leveled Up To Level **{member_level}**",
              8,
              129,
              false,
              false
            ),
            getActualSet: async ({ guild }) => {
              return (await client.data.get(`msg_level_${guild.id}`)) || false;
            },
            setNew: async ({ guild, newData }) => {
              await client.data.set(`msg_level_${guild.id}`, newData);
              return;
            },
          },
          {
            optionId: "msg-word",
            optionName: "Message Badword",
            optionDescription:
              "Text to be changed; {user} / {username}, {server}, {:name_emoji}",
            optionType: DBD.formTypes.textarea(
              "❌ | **{user}, The Word You said is blacklisted!**",
              8,
              129,
              false,
              false
            ),
            getActualSet: async ({ guild }) => {
              return (await client.data.get(`msg_word_${guild.id}`)) || false;
            },
            setNew: async ({ guild, newData }) => {
              await client.data.set(`msg_word_${guild.id}`, newData);
              return;
            },
          },
        ],
      },
    ],
  });
  Dashboard.init();
};