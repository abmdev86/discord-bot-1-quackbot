const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, TextInputComponent, MessageActionRow } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
	async execute(interaction) {
		const modal = new Modal().setCustomId('myModal').setTitle('PONG');
		const favoriteColorInput = new TextInputComponent()
			.setCustomId('favoriteColorInput')
			.setLabel('What is your favorite color?')
			.setStyle('SHORT');
		const firstActionRow = new MessageActionRow().addComponents(favoriteColorInput);
		modal.addComponents(firstActionRow);
		await interaction.showModal(modal);
	},
};
