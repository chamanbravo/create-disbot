// Require the necessary discord.js classes
const { Client, Intents, Collection } = require("discord.js");
require("dotenv").config();

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.commands = new Collection();

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log(`Logged in as ${client.user.username}`);
  client.user.setActivity("commands", {
    type: "LISTENING",
  });
});

const commandHandler = require("./handler/command");

//cmd
client.on("messageCreate", commandHandler);

// Login to Discord with your client's token
client.login(process.env.TOKEN);
