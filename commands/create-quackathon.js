// const {db} = require('../lib/db');

const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, TextInputComponent, MessageActionRow } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create-quackathon')
		.setDescription('Allows the Admin to create a new quackathon'),
	async execute(interaction) {
		const userId = await interaction.user.id;
		const username = await interaction.user.username;
		const ownerId = await interaction.guild.ownerId;
		console.log(userId, username);
		if (userId) {
			console.log('is the owner!!');

			// create modal, set id to identify unique interactions
			const modal = new Modal().setTitle('Create Quackathon').setCustomId('createQuackathon');

			const titleInput = new TextInputComponent()
				.setCustomId('titleInput')
				// The label is the prompt the user sees for this input
				.setLabel('What is this quackathon called?')
				// Short means only a single line of text
				.setStyle('SHORT');

			const descriptionInput = new TextInputComponent()
				.setCustomId('descriptionInput')
				.setLabel('What is this project all about?')
				// Paragraph means multiple lines of text.
				.setStyle('PARAGRAPH');

			const requirementsInput = new TextInputComponent()
				.setCustomId('requirementsInput')
				.setLabel('What are the requirements?')
				.setStyle('PARAGRAPH');

			const dueAt = new TextInputComponent()
				.setCustomId('dueAtInput')
				.setLabel('When is the project due?')
				.setPlaceholder('format: MM-DD-YYYY')
				.setStyle('SHORT');

			const firstActionRow = new MessageActionRow().addComponents(titleInput);
			const secondActionRow = new MessageActionRow().addComponents(descriptionInput);
			const thirdActionRow = new MessageActionRow().addComponents(requirementsInput);
			const fourthActionRow = new MessageActionRow().addComponents(dueAt);

			modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);
			console.log(modal);
			await interaction.showModal(modal);
		} else {
			await interaction.reply(`Sorry, you are not allowed to do that!`);
		}
	},
};
