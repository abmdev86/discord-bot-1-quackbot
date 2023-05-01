const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create-team')
		.setDescription('Create a team')
		.addStringOption(option => option.setName('input').setDescription('The name of the team').setRequired(true)),

	async execute(interaction) {
		try {
			await interaction.deferReply(); // defered and handled on event
		} catch (error) {
			console.error('AN ERROR', error);
			await interaction.reply({ content: 'An Error Occurred!', ephemeral: true });
		}
	},
};
