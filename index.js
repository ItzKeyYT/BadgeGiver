const { Client, IntentsBitField, Collection } = require('discord.js');
const fs = require('fs');
const readline = require('readline');
const dotenv = require('dotenv');
dotenv.config();

// Create a new client instance and intent stuff
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
    ],
});

// Check if the Discord bot token is provided in the .env file
if (!process.env.Bot_Token) {
    console.error('❌ | Error: Discord bot token is not provided in the .env file.');

    // Create an interface to read input from the user
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    // Ask the user to input the Discord bot token
    rl.question('Please enter your Discord bot token: ', (input_token) => {
        // Close the interface
        rl.close();

        client.login(input_token).catch((error) => {
            console.error(`❌ | Error: There's something wrong with the discord bot token you've provided. / It is not valid.`);
        });
        
        // Check if the client is ready and log into the discord bot with the user's input token that was provided
        client.on('ready', () => {
            console.log(`✔ | ${client.user.tag} is logged in using user's input token that was provided and it's ready to be used!`);
        });
    });

} else {
    // Check if the client is ready and log into the discord bot with the .env file token that was provided
    client.on('ready', () => {
        console.log(`✔ | ${client.user.tag} is logged in using .env file token that was provided and it's ready to be used!`);
    });

    client.login(process.env.Bot_Token).catch((error) => {
        console.error(`❌ | Error: There's something wrong with the discord bot token you've provided inside the .env file. / It is not valid.`);
    });
};