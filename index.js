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
    const tokenInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    // Ask the user to input the Discord bot token
    tokenInterface.question('Please enter your Discord bot token: ', (input_token) => {
        // Close the interface
        tokenInterface.close();
        console.clear();

        client.login(input_token).catch((error) => {
            console.error(`❌ | Error: There's something wrong with the discord bot token you've provided. / It is not valid.`);
            console.log(`🔃 | Please try to run the code again and enter the valid token.`);
        });
        
        // Check if the client is ready and log into the discord bot with the user's input token that was provided
        client.on('ready', () => {
            console.log(`✔ | ${client.user.tag} is logged in using user's input token that was provided and it's ready to be used!`);
            console.log(`--------------------------------------------------------------------------------------------------------------------`);
            console.log(`🔗 | Now go to https://discord.com/developers/applications.`);
            console.log(`🔃 | Copy Application ID after clicking inside the app.`);
            console.log("🔃 | Paste this link down below in your browser, then replace {clientId} with the Application ID that you've copied.");
            console.log("🔗 | https://discord.com/oauth2/authorize?client_id=${clientId}&scope=bot&permissions=applications.commands");
            console.log(`--------------------------------------------------------------------------------------------------------------------`);
        });
    });

} else {
    // Check if the client is ready and log into the discord bot with the .env file token that was provided
    client.on('ready', () => {
        console.log(`✔ | ${client.user.tag} is logged in using .env file token that was provided and it's ready to be used!`);
        console.log(`--------------------------------------------------------------------------------------------------------------------`);
        console.log(`🔗 | Now go to https://discord.com/developers/applications.`);
        console.log(`🔃 | Copy Application ID after clicking inside the app.`);
        console.log("🔃 | Paste this link down below in your browser, then replace {clientId} with the Application ID that you've copied.");
        console.log("🔗 | https://discord.com/oauth2/authorize?client_id=${clientId}&scope=bot&permissions=applications.commands");
        console.log(`--------------------------------------------------------------------------------------------------------------------`);
    });

    client.login(process.env.Bot_Token).catch((error) => {
        console.error(`❌ | Error: There's something wrong with the discord bot token you've provided inside the .env file. / It is not valid.`);
    });
};