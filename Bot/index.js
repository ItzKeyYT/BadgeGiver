// Required Discord Bot packages
const { Client, GatewayIntentBits, ActivityType, PresenceUpdateStatus } = require('discord.js');
const { CommandKit } = require('commandkit');

// For file and folder fectching
const path = require('path');
const fs = require('fs');

// For env file
require('dotenv').config({ path: './Bot/.env' });
const readline = require('readline');

// For handler files
const versionHandler = require('./handlers/versionHandler.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
    ],
});

const ENV_PATH = './Bot/.env';
let envContent = fs.existsSync(ENV_PATH) ? fs.readFileSync(ENV_PATH, 'utf-8') : '';
let mainToken = envContent.match(/^TOKEN=.*$/m);
let additionalTokens = envContent.match(/^#\sTOKEN\d*=.*$/gm) || [];

function createReadlineInterface() {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
}

function askQuestion(query, rlInterface) {
    return new Promise(resolve => rlInterface.question(query, resolve));
}

async function getValidatedInput(question, tokenInterface) {
    let answer;
    do {
        answer = await askQuestion(question, tokenInterface);
        answer = answer.trim().toLowerCase();
        if (answer === 'y' || answer === 'yes' || answer === 'n' || answer === 'no') break;
        console.log('Invalid input. Please answer with "y/yes" or "n/no".');
    } while (true);

    return answer;
}

async function getTokenAndLogin() {
    const tokenInterface = createReadlineInterface();
    let input_token;

    // Check if the main TOKEN is already set
    if (mainToken) {
        console.log('Detected main TOKEN variable in .env file.');
        input_token = process.env.TOKEN;
        console.log(`Using existing TOKEN for login.`);

        // Attempt login with the existing token
        await loginWithToken(input_token, tokenInterface, false);
    } else {
        // No main TOKEN found, prompt the user to input one
        console.log(`\n-----`);
        console.log(`How to get your Discord bot token:`);
        console.log(`Go to https://discord.com/developers/applications.`);
        console.log(`Create a new application in the top right corner and then click on "Bot".`);
        console.log(`Click "Add Bot", then click "Yes, do it!"`);
        console.log(`After that, click "Reset Token" (2FA verification may be required while resetting token)`);
        console.log(`Copy the token and paste it down below in the console.`);
        console.log(`-----\n`);
        input_token = await askQuestion('Please enter your Discord bot token: ', tokenInterface);
        
        // Attempt login with the provided token
        await loginWithToken(input_token, tokenInterface, true);
    }
}

new CommandKit({
    client,
    commandsPath: path.join(__dirname, 'commands'),
    eventsPath: path.join(__dirname, 'events'),
    skipBuiltInValidations: true,
    bulkRegister: true,
});

async function loginWithToken(token, tokenInterface, shouldPromptSave) {
    console.clear();

    console.log("d8888b.  .d8b.  d8888b.  d888b  d88888b  d888b  d888888b db    db d88888b d8888b.");
    console.log("88  `8D d8' `8b 88  `8D 88' Y8b 88'     88' Y8b   `88'   88    88 88'     88  `8D");
    console.log("88oooY' 88ooo88 88   88 88      88ooooo 88         88    Y8    8P 88ooooo 88oobY'")
    console.log("88~~~b. 88~~~88 88   88 88  ooo 88~~~~~ 88  ooo    88    `8b  d8' 88~~~~~ 88`8b")
    console.log("88   8D 88   88 88  .8D 88. ~8~ 88.     88. ~8~   .88.    `8bd8'  88.     88 `88.")
    console.log("Y8888P' YP   YP Y8888D'  Y888P  Y88888P  Y888P  Y888888P    YP    Y88888P 88   YD\n");

    try {
        await client.login(token);
        
        if (shouldPromptSave) {           
            const newTokenVar = mainToken ? `TOKEN${additionalTokens.length + 1}` : 'TOKEN';
            const tokenLine = mainToken ? `# ${newTokenVar}=${token}` : `${newTokenVar}=${token}`;
            envContent = mainToken ? `${envContent}\n${tokenLine}` : `${tokenLine}\n${envContent}`;
            fs.writeFileSync(ENV_PATH, envContent);
            console.log(`Token saved in the .env file as ${newTokenVar}.`);
        }

        tokenInterface.close();
        
        console.log(`\n✅ Successfully logged in as ${client.user.tag}!`);

        console.log(`\n------`);
        console.log("Paste this link below into your browser to invite your bot to your server:");
        console.log(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=applications.commands`);
        console.log(`\n-----`);
        console.log('After inviting the bot to your server, type "/get-badge" to finally get your badge!');
        console.log('Thank you for using the bot!');
        console.log(`\n-----`);
        console.warn(`WARNING: Do not close the window before you run the "/badge give" command!\n`);
    } catch (error) {
        tokenInterface.close();
        if (error.code && error.code === 'TokenInvalid') {
            console.log(`The Discord bot token you've provided is not valid.`);
        } else {
            console.log(error);
            console.log(`❌ An unknown error occurred. Please check your token and try again.`);
        }
        getTokenAndLoginAgain();
    }
}

function getTokenAndLoginAgain() {
    getTokenAndLogin();
}

async function initializeBot() {
    console.clear();

    console.log("d8888b.  .d8b.  d8888b.  d888b  d88888b  d888b  d888888b db    db d88888b d8888b.");
    console.log("88  `8D d8' `8b 88  `8D 88' Y8b 88'     88' Y8b   `88'   88    88 88'     88  `8D");
    console.log("88oooY' 88ooo88 88   88 88      88ooooo 88         88    Y8    8P 88ooooo 88oobY'")
    console.log("88~~~b. 88~~~88 88   88 88  ooo 88~~~~~ 88  ooo    88    `8b  d8' 88~~~~~ 88`8b")
    console.log("88   8D 88   88 88  .8D 88. ~8~ 88.     88. ~8~   .88.    `8bd8'  88.     88 `88.")
    console.log("Y8888P' YP   YP Y8888D'  Y888P  Y88888P  Y888P  Y888888P    YP    Y88888P 88   YD\n");

    await getTokenAndLogin();
    versionHandler.checkForUpdate();
}

initializeBot();