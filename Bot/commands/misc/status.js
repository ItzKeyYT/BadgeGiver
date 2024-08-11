const { EmbedBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
    data: {
        name: 'status',
        description: "Show the bot's status.",
    },

    run: async ({ interaction, client, handler }) => {
        const { guild } = interaction;
        await interaction.deferReply();
  
        try {
            const reply = await interaction.fetchReply();
        
            const ping = reply.createdTimestamp - interaction.createdTimestamp;
        
            const embed = new EmbedBuilder()
            .setTitle(':green_circle: | Uptime')
            .setColor('00FF00')
            .addFields(
                { name: 'Websocket heartbeat:', value: `${client.ws.ping}ms` },
                { name: 'Roundtrip Latency:', value: `${ping}ms` },
                { name: 'Uptime:', value: `${ms(client.uptime, { long: true })}` },
            )
            .setFooter({ text: 'Requested by ' + interaction.user.username, iconURL: interaction.user.displayAvatarURL() })
            .setTimestamp();
            interaction.editReply({ embeds: [embed] });
        } catch (err) {
            console.log(`["${guild?.name}" | ${guild?.id}] - ❌ | An error occurred while trying to execute the status command:\n`, err);
        };
    },
};