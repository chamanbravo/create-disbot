const ping = require("../commands/ping");
require("dotenv").config();

const commands = { ping };

module.exports = function command(message) {
  const args = message.content.split(" ");
  let cmd = args.shift();
  if (cmd.charAt(0) === process.env.PREFIX) {
    cmd = cmd.substring(1);
    commands[cmd](message);
  }
};
