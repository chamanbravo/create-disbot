const inquirer = require("inquirer");
const child_process = require("child_process");
const fs = require("fs-extra");

const questions = [
  {
    type: "input",
    name: "projectName",
    message: "Project Name",
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else {
        return "Project name may only include letters, numbers, underscores and hashes.";
      }
    },
  },
  {
    type: "input",
    name: "authorName",
    message: "Author Name",
  },
  {
    type: "input",
    name: "token",
    message: "Token",
  },
  {
    type: "input",
    name: "prefix",
    message: "Prefix",
  },
];

inquirer.prompt(questions).then((answers) => {
  const { projectName, authorName, token, prefix } = answers;
  fs.mkdirSync(`${projectName}`);
  const packageJson = `{
    "name": "${projectName}",
    "version": "1.0.0",
    "description": "A simple discordjs-v13 bot created using create-discordjs13-bot",
    "main": "index.js",
    "scripts": {
      "start": "node src/index.js"
    },
    "keywords": [
      "discordjs",
      "bot"
    ],
    "author": "${authorName}",
    "license": "ISC",
    "dependencies": {
      "discord.js": "^13.2.0-dev.1631664285.88e2622",
      "dotenv": "^10.0.0"
    }
}`;
  fs.writeFileSync(`${projectName}/package.json`, packageJson, "utf8");
  const env = `TOKEN = ${token}\nPREFIX = ${prefix}`;
  fs.writeFileSync(`${projectName}/.env`, env, "utf8");
  fs.copy(`templates`, `${projectName}`, (err) => {
    if (err) {
      console.log("error occured while creating the files...");
      return;
    }
  });
  console.log("Installing dependencies...");
  child_process.execSync(`cd ${projectName} && npm i`);
  const success = `
    Success! Created ${projectName} using create-discordjs13-bot

    Inside that directory you can run:
      * npm start: Runs the bot

    To start: 
      * cd ${projectName}
      * npm start
  `;
  console.log(success);
});
