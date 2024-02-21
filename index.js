// Require everything that the whole bot needs
const { Client, IntentsBitField, Collection } = require('discord.js');
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
    console.log('☒ | Error: Discord bot token is not provided in the .env file.');
    
    // Create an interface to read input from the user
    const tokenInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    
    // Tips for creating a bot
    console.log(`-----`);
    console.log(`💭 | How to get your Discord bot token:`);
    console.log(`🔗 | Go to https://discord.com/developers/applications.`);
    console.log(`➕  | Create a new application in the top right corner and then click on "Bot".`);
    console.log(`👆 | Click "Add Bot", then click "Yes, do it!"`);
    console.log(`👆 | After that, click "Reset Token" (You might need to type a 6 number code if you have 2FA on and verify using a USB/NFC/Phone if you have "Security Keys" on.)`);
    console.log(`🔃 | Copy the token and paste it down below in the console.`);
    console.log(`-----`);
    
    // Ask the user to input the Discord bot token
    tokenInterface.question('⌨  | Please enter your Discord bot token: ', (input_token) => {
        // Close the interface
        tokenInterface.close();
        
        console.clear();
        
        // Try to login with the user's input and catch any errors
        client.login(input_token).catch(error => { // Login with the user's input and try to catch any errors
            console.log('☒ | An error occurred:\n', error); // Error Code
            if (error.message.includes("TokenInvalid")) { // Check if the error code is TokenInvalid
                console.log(`☒ | Error: The discord bot token you've provided is not valid.`); // Send a dedicated error code message
                console.log(`🔃 | Please try to run the code again and enter a valid token. Usage: "node ." or "npm run bot"`); // Message to instruct the user to try again with a valid token
            } else {
                console.log(`☒ | Error: I don't recognise this error code, please report the issue to the creator on GitHub.`, error); // Error code message for other error codes that was not "TokenInvalid"
            };
        });

        client.once('ready', async () => {
            try {
                // Get the first guild the bot is in
                const guild = client.guilds.cache.first();

                // Fetching all of the existing slash commands
                const existingCommands = await guild.commands.fetch();
                const existingCommandNames = existingCommands.map(command => command.name);
                    
                // Slash commands that needed to be deployed
                const commandsToDeploy = [
                    { name: 'get-badge', description: 'Get the Active Developer Badge with a simple slash command!' },
                    { name: 'status', description: 'Show status of the bot.' },
                ];

                // Log all of the existing slash commands
                console.log('💻 | Existing slash commands:');
                existingCommandNames.forEach(name => console.log(name));

                // Check if all of the commands are already deployed
                const allDeployed = commandsToDeploy.every(command => existingCommandNames.includes(command.name));

                if (allDeployed) {
                    console.log('☑ | All of the slash commands are already deployed.');
                } else {
                    // Deploy all of the slash commands that are not yet deployed
                    const commandsToCreate = commandsToDeploy.filter(command => !existingCommandNames.includes(command.name));

                    for (const command of commandsToCreate) {
                        await guild.commands.create(command);
                        console.log(`☑ | Deployed slash command: ${command.name}`);
                    }

                    console.log('☑ | All of the slash commands are deployed.');
                
                };

            } catch (error) { // Catch any errors and this is where the first line of the "try" code being catched
                console.log('☒ | Error: There was an error while deploying the slash commands. Please report the issue to the creator on GitHub.\n', error); // Error code message
            };

            console.log(`☑ | ${client.user.tag} is logged in using user's input token that was provided and it's ready to be used!`);

            // Tips for copying a bot application id
            console.log(`------`);
            console.log(`🔗 | Go to https://discord.com/developers/applications.`);
            console.log(`👆 | Click on the application that you've just created.`);
            console.log(`🔃 | Copy Application ID.`);
            console.log("🔃 | Paste this link down below in your browser, then replace {clientId} with the Application ID that you've copied. (We're now inviting your bot into your server.)");
            console.log("🔗 | https://discord.com/oauth2/authorize?client_id={clientId}&scope=bot&permissions=applications.commands");
            console.log(`-----`);
            console.log('💻 | After inviting the bot to your server, type "/get-badge" to finally get your badge!')
        });
        
    });
    
} else {
    
    console.clear();

    client.login(process.env.Bot_Token).catch((error) => {
        console.log(error);
        if (error.message.includes("TokenInvalid")) {
            console.log(`☒ | Error: The discord bot token you've provided is not valid.`);
            console.log(`🔃 | Please enter the valid token into the ".env" file and try to run the code again. Usage: "node ." or "npm run bot"`);
        } else {
            console.log(`☒ | Error: I don't recognise this error code, please report the issue to the creator on GitHub.`, error);
        };
    });

    client.once('ready', async () => {    
        try {
            // Get the first guild the bot is in
            const guild = client.guilds.cache.first();

            // Fetching all of the existing slash commands
            const existingCommands = await guild.commands.fetch();
            const existingCommandNames = existingCommands.map(command => command.name);
                
            // Slash commands that needed to be deployed
            const commandsToDeploy = [
                { name: 'get-badge', description: 'Get the Active Developer Badge with a simple slash command!' },
                { name: 'status', description: 'Show status of the bot.' },
            ];

            // Log all of the existing slash commands
            console.log('💻 | Existing slash commands:');
            existingCommandNames.forEach(name => console.log(name));

            // Check if all of the commands are already deployed
            const allDeployed = commandsToDeploy.every(command => existingCommandNames.includes(command.name));

            if (allDeployed) {
                console.log('☑ | All of the slash commands are already deployed.');
            } else {
                // Deploy all of the slash commands that are not yet deployed
                const commandsToCreate = commandsToDeploy.filter(command => !existingCommandNames.includes(command.name));

                for (const command of commandsToCreate) {
                    await guild.commands.create(command);
                    console.log(`☑ | Deployed slash command: ${command.name}`);
                };

                console.log('☑ | All of the slash commands are deployed.');
            
            };

        } catch (error) { // Catch any errors
            console.log('☒ | Error: There was an error while deploying the slash commands. Please report the issue to the creator on GitHub.\n', error); // Error code message
        };

        console.log(`☑ | ${client.user.tag} is logged in using .env file token that was provided and it's ready to be used!`);

        // Tips for copying a bot application id
        cconsole.log(`------`);
        console.log(`🔗 | Go to https://discord.com/developers/applications.`);
        console.log(`👆 | Click on the application that you've just created.`);
        console.log(`🔃 | Copy Application ID.`);
        console.log("🔃 | Paste this link down below in your browser, then replace {clientId} with the Application ID that you've copied. (We're now inviting your bot into your server.)");
        console.log("🔗 | https://discord.com/oauth2/authorize?client_id={clientId}&scope=bot&permissions=applications.commands");
        console.log(`-----`);
        console.log('💻 | After inviting the bot to your server, type "/get-badge" to finally get your badge!')
    });

};

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
        
    const { commandName } = interaction;
    
    try {
        if (commandName === 'get-badge') {
            await interaction.reply('**☑ | You should now be able to get the Active Developer Badge!\nIf you need help, please look at this article by Discord:\nhttps://support-dev.discord.com/hc/en-us/articles/10113997751447-Active-Developer-Badge**');
        };
    } catch (error) {
        console.log('☒ | An error occurred:', error);
        await interaction.reply({ content: `**☒ | An error occurred while processing your command: \n**${error.message}`, ephemeral: true });
    };

    try {
        if (commandName === 'status') {
            const apiPing = client.ws.ping;
            const botPing = Date.now() - interaction.createdTimestamp;

            const days = Math.floor(client.uptime / 86400000);
            const hours = Math.floor(client.uptime / 3600000) % 24;
            const minutes = Math.floor(client.uptime / 60000) % 60;
            const seconds = Math.floor(client.uptime / 1000) % 60;
    
            const uptimeFormatted = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            
            await interaction.reply(`**🏓 | Pong! Here's the bot status:\n\n📡 | API Ping: ${apiPing}ms\n🏓 | Bot Ping: ${botPing}ms\n⏱️ | Uptime: ${uptimeFormatted}**`);
        };

    } catch (error) {
        console.log('☒ | An error occurred:\n', error);
        await interaction.reply({ content: `**☒ | An error occurred while processing your command: \n**${error.message}`, ephemeral: true });
    };

});