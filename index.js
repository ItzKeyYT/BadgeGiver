// Require everything that the whole bot needs
const { Client, IntentsBitField } = require('discord.js');
const readline = require('readline');

// Create a new client instance and intent stuff
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
    ],
});


// Create an interface to read input from the user
const tokenInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
    
// Tips for creating a bot
console.log(`-----`);
console.log(`How to get your Discord bot token:`);
console.log(`Go to https://discord.com/developers/applications.`);
console.log(`Create a new application in the top right corner and then click on "Bot".`);
console.log(`Click "Add Bot", then click "Yes, do it!"`);
console.log(`After that, click "Reset Token" (You might need to type a 6 number code if you have 2FA on and verify using a USB/NFC/Phone if you have "Security Keys" on.)`);
console.log(`Copy the token and paste it down below in the console.`);
console.log(`-----`);
    
// Ask the user to input the Discord bot token
tokenInterface.question('Please enter your Discord bot token: ', (input_token) => {
    // Close the interface
    tokenInterface.close();
        
    console.clear();
        
    // Try to login with the user's input and catch any errors
    client.login(input_token).catch(error => { // Login with the user's input and try to catch any errors
        console.log('An error occurred:\n', error); // Error Code
        if (error.code && error.code === 'TokenInvalid') { // Check if the error code is TokenInvalid
            console.log(`An error occurred: The discord bot token you've provided is not valid.`); // Send a dedicated error code message
            console.log(`Please try to run the code again and enter a valid token. Usage: "node ." or "npm run bot"`); // Message to instruct the user to try again with a valid token
        } else {
            console.log(error);
            console.log(`An error occurred: I don't recognise this error code, please copy the error code at the top and report the issue to the creator on GitHub.`); // Error code message for other error codes that was not "TokenInvalid"
        };
    });
    
    client.once('ready', async () => {
        console.log("d8888b.  .d8b.  d8888b.  d888b  d88888b  d888b  d888888b db    db d88888b d8888b.\n88  `8D d8' `8b 88  `8D 88' Y8b 88'     88' Y8b   `88'   88    88 88'     88  `8D\n88oooY' 88ooo88 88   88 88      88ooooo 88         88    Y8    8P 88ooooo 88oobY'\n88~~~b. 88~~~88 88   88 88  ooo 88~~~~~ 88  ooo    88    `8b  d8' 88~~~~~ 88`8b\n88   8D 88   88 88  .8D 88. ~8~ 88.     88. ~8~   .88.    `8bd8'  88.     88 `88.\nY8888P' YP   YP Y8888D'  Y888P  Y88888P  Y888P  Y888888P    YP    Y88888P 88   YD\n");
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
            console.log('Existing slash commands:');
            existingCommandNames.forEach(name => console.log(name));

            // Check if all of the commands are already deployed
            const allDeployed = commandsToDeploy.every(command => existingCommandNames.includes(command.name));

            if (allDeployed) {
                console.log('All of the slash commands are already deployed.');
            } else {
                // Deploy all of the slash commands that are not yet deployed
                const commandsToCreate = commandsToDeploy.filter(command => !existingCommandNames.includes(command.name));

                for (const command of commandsToCreate) {
                    await guild.commands.create(command);
                    console.log(`Deployed slash command: ${command.name}`);
                }

                console.log('All of the slash commands are deployed.');
                
            };

        } catch (error) { // Catch any errors and this is where the first line of the "try" code being catched  
            console.log('Error: There was an error while deploying the slash commands. Please report the issue to the creator on GitHub.\n', error); // Error code message
        };

        console.log(`${client.user.tag} is logged in using user's input token that was provided and it's ready to be used!`);

        const clientId = client.user.id;

        // Tips for copying a bot application id
        console.log(`------`);
        console.log("Paste this link down below in your browser to invite your bot to your server:");
        console.log(`https://discord.com/oauth2/authorize?client_id=${clientId}&scope=bot&permissions=applications.commands`);
        console.log(`-----`);
        console.log('After inviting the bot to your server, type "/get-badge" to finally get your badge!');
        console.log('Thank you for using the bot!');
        console.log(`-----`);
        console.log(`WARNING: Do not close the window before you run the "/get-badge" command!`);
    });
        
});
    

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
        
    const { commandName } = interaction;
    
    try {
        if (commandName === 'get-badge') {
            await interaction.reply('**☑ | You should now be able to get the Active Developer Badge!\nIf you need help, please look at this article by Discord:\nhttps://support-dev.discord.com/hc/en-us/articles/10113997751447-Active-Developer-Badge**');
        };
    } catch (error) {
        console.log('An error occurred:', error);
        await interaction.reply({ content: `**An error occurred while processing your command: \n**${error.message}`, ephemeral: true });
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
        console.log('An error occurred:\n', error);
        await interaction.reply({ content: `**An error occurred while processing your command: \n**${error.message}`, ephemeral: true });
    };

});