const express = require("express");
const app = express();
module.exports = client => {
  const cmds = `
    ${client.commands.map(
      cmd =>
        `<tr><th scope="row">${cmd.name || "Null"}</th><td>${
          cmd.aliases ? cmd.aliases.join(", ") : "None"
        }</td><td>${cmd.usage ? cmd.usage : "None"}</td><td>${
          cmd.description ? cmd.description : "None"
        }</td></tr>`
    )}`;
  let avs = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xhtml="http://www.w3.org/1999/xhtml" width="410px" height="218px">
<foreignObject x="0" y="0" width="410" height="218">
<div xmlns="http://www.w3.org/1999/xhtml" style="position: absolute;width: 400px;height: 200px;inset: 0;background-color: #1a1c1f;color: #fff;font-family: 'Century Gothic', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;font-size: 16px;display: flex;flex-direction: column;padding: 5px;border-radius: 10px;">
<div style="width: 400px;height: 100px;inset: 0;display: flex;flex-direction: row;padding-bottom: 5px;border-bottom: solid 0.5px hsl(0, 0%, 100%, 10%);">
<div style="display: flex;flex-direction: row;height: 80px;width: 80px;">
 
<!-- URL USER -->
<img src="${client.user.avatarURL() ||
   "https://images-ext-2.discordapp.net/external/lcfvj84IDvDjlCy05_sKs18Cxw-zfC8psWfOuPcM8nM/%3Fsize%3D256/https/cdn.discordapp.com/embed/avatars/0.png"}" style="border: solid 3px #00ccff;border-radius: 50%;width: 50px;height: 50px;position: relative;top: 50%;left: 50%;transform: translate(-50%, -50%);"/>
</div>
<!-- End URL USER -->
<div style=" height: 80px;width: 260px;">
<div style="display: flex;flex-direction: row;position: relative;top: 50%;transform: translate(0, -50%);height: 25px;">
<!-- NAME USER -->
<h1 style="font-size: 1.15rem;margin: 0 5px 0 0;">${
    client.user.tag
  }<span style="color: #ccc; font-weight: lighter;">#6174</span></h1>
<!-- END NAME USER -->
<!-- F.U -->
<img src="https://emoji.gg/assets/emoji/4713_ubot.png" style="width: 20px;height: 20px;position: relative;top: 50%;transform: translate(0%, -50%);margin: 0 0 0 4px;" />
</div></div></div>
<div style="display: flex;flex-direction: row;height: 150px;justify-content: center;align-items: center;">
<!-- END F.U -->
<!-- STATUS -->
<p style="font-style: italic;font-size: 0.8rem;color: #aaa;height: auto;text-align: center;">${client.user.presence.activities[0].name}</p>
<!-- END STATUS -->
</div></div></foreignObject></svg>
        `;

  const doc = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Discord Bot</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/fontawesome.min.css" />
</head>
 <body>`;

  const css = `
  <style>
    body {
        background: var(--bs-gray-dark);
        color: #fff;
    }
    .commands {
        margin-top: 100px;
    }
    .commands .title {
        position: relative;
        margin-bottom: 40px;
        padding-bottom: 25px;
        text-transform: uppercase;
        font-weight: 700;
        color: white;
    }
 
    .commands .title:before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 140px;
        height: 1px;
        background-color: #f70037;
    }
 
    .commands .title:after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 50%;
        transform: translateX(-50%);
        width: 45px;
        height: 3px;
        background-color: #f70037;
    }
 </style>`;
  const html = `${doc}
  <section class="main">
        <div class="commands" id="commands">
            <div class="container">
                <h2 class="title text-center">Commands</h2>
                <table class="table table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Command</th>
                            <th scope="col">Aliases</th>
                            <th scope="col">Usage</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>${cmds.split(",").join("")}</tbody>
                </table>
            </div>
        </div>
    </section></body>${css}`;

  app.get("/", async (req, res) => {
    res.status(200).send(html);
  });
  app.get("/widget", async (req, res) => {
    res.status(200).send(avs);
  });
  app.listen(process.env.PORT || 3000, function() {
    console.log(
      `Listening on port http://localhost:${process.env.PORT || 3000}`
    );
  });
};
