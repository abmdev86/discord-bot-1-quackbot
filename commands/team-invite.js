const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('team-invite')
		.setDescription('Invite a member to your team')
		.addStringOption(option => option.setName('input').setDescription('The name of user').setRequired(true)),

	async execute(interaction) {
		try {
			await interaction.deferReply(); // defered and handled on event
		} catch (error) {
			console.error('AN ERROR', error);
			await interaction.reply({ content: 'An Error Occurred!', ephemeral: true });
		}
	},
};
