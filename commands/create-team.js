const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const {
	MessageActionRow,

	TextInputComponent,

	Modal,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('create-team').setDescription('Create a team'),
	async execute(interaction) {
		const confirmButton = new MessageButton({
			customId: 'create-team-confirm',
			label: 'Confirm',
			style: 'PRIMARY',
		});
		try {
			const row = new MessageActionRow({
				components: [],
			});
		} catch (error) {
			console.error('AN ERROR', error);
			await interaction.reply({ content: 'An Error Occurred!', ephemeral: true });
		}
	},
};
