const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'help',
        description: 'Help for all available commands',
    },
    run: async ({ interaction, client, handler }) => {
        try {
            const commands = await client.application.commands.fetch(); // Fetch commands from the client
    
            if (!commands || commands.size === 0) {
                await interaction.reply({
                    content: 'No commands have been found, please send a email to [ItzKeyYT](mailto:contact@zubb.key.name.my) for reporting this issue.',
                    ephemeral: true,
                });
                return; // Exit the function to avoid running the rest of the code
            }
    
            const embed = new EmbedBuilder()
                .setTitle('Available Commands')
                .setDescription('Here are the available commands:')
                .setColor('#0099ff') // You can choose a color
                .setTimestamp()
                .setFooter({ text: `Requested by ` + interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
    
            commands.sort((a, b) => a.name.localeCompare(b.name));

            commands.forEach((command) => {
                if (command.options && command.options.length > 0) {
                    const subcommands = command.options.filter(option => option.type === 1);
                    subcommands.sort((a, b) => a.name.localeCompare(b.name));
            
                    subcommands.forEach((subcommand) => {
                        embed.addFields({
                            name: `/${command.name} ${subcommand.name}`,
                            value: subcommand.description || 'No description available.',
                            inline: true,
                        });
                    });
                } else {
                    embed.addFields({
                        name: `/${command.name}`,
                        value: command.description || 'No description available.',
                        inline: true,
                    });
                }
            });
                
                
    
            // Send the help embed
            await interaction.reply({
                embeds: [embed],
                ephemeral: true,
            });
        } catch (err) {
            console.log(`An error occurred while trying to fetch slash commands using the help command:\n`, err);
        }
    },
    options: {
        // deleted: true,
    }
};
