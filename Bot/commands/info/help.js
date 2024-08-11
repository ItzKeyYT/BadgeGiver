const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'help',
        description: 'Help for all available commands',
    },
    run: async ({ interaction, client, handler }) => {
        const commands = client.commands; // Fetch commands from the client

        console.log(client.commands); // Log the commands to see if they are loaded

        if (!commands || commands.size === 0) {
            await interaction.reply({
                content: 'No commands have been found, do you want an apple?',
                ephemeral: true,
            });
            return; // Exit the function to avoid running the rest of the code
        }

        const embed = new EmbedBuilder()
            .setTitle('Available Commands')
            .setDescription('Here are the available commands:')
            .setColor('#0099ff') // You can choose a color
            .setTimestamp()
            .setFooter({ text: 'Use /[command] for more details' });

        commands.forEach(command => {
            embed.addFields({
                name: `/${command.data.name}`, // Use command.data.name to access the command name
                value: command.data.description || 'No description available.', // Same for description
                inline: true, // Set to true if you want fields to be in a row, or false for a column layout
            });
        });

        // Send the help embed
        await interaction.reply({
            embeds: [embed],
            ephemeral: true,
        });
    },
    options: {
        deleted: true,
    }
};
